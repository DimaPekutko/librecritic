# api/serializers.py

from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Book


class UserSerializer(serializers.Serializer):
    username = serializers.CharField()
    email    = serializers.EmailField()


class BookSerializer(serializers.ModelSerializer):
    # title       = serializers.CharField()
    # img_src     = serializers.URLField()
    # author      = serializers.CharField()
    # desc        = serializers.CharField()
    # rating      = serializers.FloatField()
    # votes_count = serializers.IntegerField()
    class Meta:
        model = Book
        fields = '__all__'