from django.forms import CharField
from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Book, BookReview

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password']

class ReviewUserSeializer(UserSerializer):
    class Meta:
        model = User
        fields = ['username']

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class BookReviewSerializer(serializers.ModelSerializer):
    user = ReviewUserSeializer()
    class Meta:
        model = BookReview
        # fields = '__all__'
        exclude = ["book"]