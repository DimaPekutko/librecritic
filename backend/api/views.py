import asyncio
from django.contrib.auth import get_user_model
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from asgiref.sync import sync_to_async

from .models import Book, BookReview

from .serializers import BookReviewSerializer, BookSerializer, ReviewUserSeializer, UserSerializer


User = get_user_model()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user
    serizlier = UserSerializer(user)
    return Response(serizlier.data)


@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        User = get_user_model()
        user = User.objects.create(
            username=serializer.initial_data["username"],
            email=serializer.initial_data["email"],
        )
        user.set_password(serializer.initial_data["password"])
        user.save()
        return Response({"status": "signed up"})
    return Response(serializer._errors, status=400)


@api_view(['POST'])
def get_all_books(request):
    books = Book.objects.all()
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def get_book(request):
    if "id" in request.data:
        try:
            book = Book.objects.get(id=request.data["id"])
            serializer = BookSerializer(book)
            return Response(serializer.data)
        except Book.DoesNotExist:
            return Response(status=400)
    return Response(status=400)


@api_view(['POST'])
def get_book_reviews(request):
    if "book_id" in request.data:
        try:
            Book.objects.get(id=request.data["book_id"])  # for error except
            reviews = BookReview.objects.filter(
                book_id=request.data["book_id"])
            serializer = BookReviewSerializer(reviews, many=True)
            return Response(serializer.data)
        except Book.DoesNotExist:
            return Response(status=400)
    return Response(status=400)

    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_review(request):
    serializer = BookReviewSerializer(data=request.data)

    # validation failed
    if not serializer.is_valid():
        return Response(serializer._errors, status=400)

    # if undefined book
    if not Book.objects.filter(
        id=serializer.initial_data["book_id"],
    ).exists():
        return Response("Undefined book for sent id", status=400)

    book = Book.objects.get(id=serializer.initial_data["book_id"]) 

    async def _create_review():
        await sync_to_async(BookReview.objects.create)(
            user_id=request.user.id,
            book_id=serializer.initial_data["book_id"],
            content=serializer.initial_data["content"],
            rating=serializer.initial_data["rating"]
        )
        return 0

    async def _update_book_rating():
        book.votes_count += 1
        if book.votes_count == 1:
            book.rating = serializer.initial_data["rating"]
        else:
            book.rating = round(
                float(book.rating*int(book.votes_count-1) +
                    float(serializer.initial_data["rating"]))/book.votes_count,
                2)
        await sync_to_async(book.save)()
        return 0
    
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    tasks = [
        loop.create_task(_create_review()),
        loop.create_task(_update_book_rating())
    ]
    loop.run_until_complete(asyncio.wait(tasks))
    loop.close()

    return Response({"status": "created"})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_review(request):
    serializer = BookReviewSerializer(data=request.data)

    # validation failed
    if not serializer.is_valid():
        return Response(serializer._errors, status=400)

    if not BookReview.objects.filter(
        id=serializer.initial_data["id"],
        user_id=request.user.id
    ).exists():
        return Response("Undefined review for sent user_id or book_id", status=400)

    review = BookReview.objects.get(
        id=serializer.initial_data["id"],
        user_id=request.user.id,
    )
    book = Book.objects.get(id=review.book_id)

    # update book review
    review.content = serializer.initial_data["content"]
    review.rating = serializer.initial_data["rating"]

    review.save()

    # update book rating
    if book.votes_count == 1:
        book.rating = serializer.initial_data["rating"]
    else:
        book.rating = round(
            float(book.rating*int(book.votes_count-1) +
                  float(serializer.initial_data["rating"]))/book.votes_count,
            2)

    book.save()

    return Response({"status": "updated"})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_review(request):
    if not "id" in request.data:
        return Response("excepted id field", status=400)

    review_id = request.data["id"]

    if not BookReview.objects.filter(
        id=review_id,
        user_id=request.user.id
    ).exists():
        return Response("Undefined review for sent id and user_id", status=400)

    review = BookReview.objects.get(id=review_id, user_id=request.user.id)
    book = Book.objects.get(id=review.book_id)
    if book.votes_count == 1:
        book.rating = 0
    else:
        book.rating = round(
            float((book.rating*int(book.votes_count) -
                   review.rating))/(book.votes_count-1), 2)
    book.votes_count -= 1
    book.save()
    review.delete()
    return Response({"status": "deleted"})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_user_reviews(request):
    reviews = BookReview.objects.filter(
        user_id=request.user.id
    )

    serializer = BookReviewSerializer(reviews, many=True)
    return Response(serializer.data)
