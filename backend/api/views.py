from django.contrib.auth import get_user_model
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Book

from .serializers import BookSerializer, UserSerializer


@api_view(['GET'])
def get_some(request):
    return Response({"works": "well"})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user
    serizlier = UserSerializer(user)
    return Response(serizlier.data)


@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    print(serializer.is_valid())
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