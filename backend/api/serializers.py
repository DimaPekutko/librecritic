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
        fields = ['id','username']

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class BookReviewSerializer(serializers.ModelSerializer):
    user = ReviewUserSeializer(required=False)
    class Meta:
        model = BookReview
        fields = ["id","content", "rating", "user"]

    def validate(self, value):
        if value["rating"] > 5.0:
            raise serializers.ValidationError("Rating must be <= 5.0")
        if len(value["content"]) < 50:
            raise serializers.ValidationError("Content must be >= 50 symbols")
        return value