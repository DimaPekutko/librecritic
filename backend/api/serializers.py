# api/serializers.py

from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Book

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password']

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'