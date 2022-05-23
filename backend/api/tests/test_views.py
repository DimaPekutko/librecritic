from rest_framework.test import APIRequestFactory, force_authenticate
from django.test import TestCase
from django.contrib.auth import get_user_model

from ..models import Book, BookReview
from ..views import create_review, delete_review, get_all_books, get_book, get_book_reviews, get_user_info, get_user_reviews, register, update_review

User = get_user_model()
req_factory = APIRequestFactory()


class TestEndpoints(TestCase):
    def setUp(self):
        self._user = User.objects.create(
            username="dmitry",
            email="someemail@gmail.com",
            password="123"
        )
        self._book = Book.objects.create(
            title="title",
            img_src="https://some.com/file",
            author="author",
            desc="desc",
            votes_count=1,
            rating=4.3
        )
        self._review = BookReview.objects.create(
            user_id=self._user.id,
            book_id=self._book.id,
            content="content_content_content_content_content_content_content_content_",
            rating=4.3
        )

    def test_get_user_info(self):
        request = req_factory.post('user/')
        force_authenticate(request, user=self._user)
        response = get_user_info(request)
        self.assertEqual(
            self._user.email,
            response.data["email"]
        )

    def test_register(self):
        request = req_factory.post('register/', {
            "username": "second",
            "email": "second@gmail.com",
            "password": "123"
        })
        response = register(request)
        users_count = len(list(User.objects.filter()))
        self.assertEqual(users_count, 2)

    def test_get_all_books(self):
        request = req_factory.post('books/')
        response = get_all_books(request)
        self.assertEqual(response.data[0]["title"], self._book.title)

    def test_get_book(self):
        request = req_factory.post('book/', {"id": self._book.id})
        response = get_book(request)
        self.assertEqual(response.data["title"], self._book.title)

    def test_get_book_reviews(self):
        request = req_factory.post('book_reviews/', {"book_id": self._book.id})
        response = get_book_reviews(request)
        self.assertEqual(response.data[0]["content"], self._review.content)



    # TODD: fix create review test for asyncio  


    # def test_create_review(self):
    #     user = User.objects.create(
    #         username="second",
    #         email="second@gmail.com",
    #         password="123"
    #     )
    #     review_rating = 3.3
    #     request = req_factory.post('create_review/', {
    #         "user_id": user.id,  # second user generated in register test
    #         "book_id": self._book.id,
    #         "content": self._review.content+"second",
    #         "rating": review_rating
    #     })
    #     force_authenticate(request, user=user)
    #     response = create_review(request)
    #     self.assertEqual(BookReview.objects.filter(
    #         user_id=user.id).exists(), True)

    #     self.assertEqual(
    #         Book.objects.get(id=self._book.id).rating,
    #         round(float(review_rating+self._book.rating)/2, 1)
    #     )

    def test_update_review(self):
        new_content = self._review.content+"new"
        new_rating = 2.2
        request = req_factory.post('update_review/', {
            "id": self._review.id,
            "content": new_content,
            "rating": new_rating
        })
        force_authenticate(request, user=self._user)
        response = update_review(request)

        updated_book_review = BookReview.objects.get(id=self._review.id)

        self.assertEqual(updated_book_review.content, new_content)
        self.assertEqual(updated_book_review.rating, new_rating)
        self.assertEqual(Book.objects.get(id=self._book.id).rating,
                         new_rating
                         )

    def test_delete_review(self):
        request = req_factory.post('delete_review/', {
            "id": self._review.id
        })
        force_authenticate(request, user=self._user)
        response = delete_review(request)

        reviews_count = len(list(BookReview.objects.filter()))

        self.assertEqual(reviews_count, 0)
        self.assertEqual(Book.objects.get(id=self._book.id).rating, 0)

    def test_get_user_reviews(self):
        request = req_factory.post('user_reviews/')
        force_authenticate(request, user=self._user)
        response = get_user_reviews(request)

        self.assertEqual(response.data[0]["content"], self._review.content)
