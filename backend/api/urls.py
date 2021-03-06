from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import get_user_info, register, get_all_books, get_book, get_book_reviews, create_review, update_review, delete_review, get_user_reviews

urlpatterns = [
    path('user/', get_user_info),
    path('user_reviews/', get_user_reviews),
    path('register/', register),
    path('books/', get_all_books),
    path('book/', get_book),
    path('book_reviews/', get_book_reviews),
    path('create_review/', create_review),
    path('update_review/', update_review),
    path('delete_review/', delete_review),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
