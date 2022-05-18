# api/serializers.py

from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserSerializer(serializers.Serializer):
    username = serializers.CharField()
    email    = serializers.EmailField()