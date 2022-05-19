from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import get_some, get_user_info, register, get_all_books, get_book

urlpatterns = [
    path('', get_some),
    path('user/', get_user_info),
    path('register/', register),
    path('books/', get_all_books),
    path('book/', get_book),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]