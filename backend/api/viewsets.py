from rest_framework import viewsets
from django.db import models
from rest_framework.permissions import IsAuthenticated
from .models import BookReview
from .serializers import BookReviewSerializer


class BookReviewViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = BookReview.objects.order_by("content")
    serializer_class = BookReviewSerializer

    def get_queryset(self):
        qs = super().get_queryset()

        # Get only contact about current authenticated user
        qs = qs.filter(user=self.request.user)

        # Add search capabilities
        search = self.request.query_params.get("search", None)
        if search:
            qs = qs.filter(
                models.Q(name__icontains=search)
                | models.Q(phone__icontains=search)
                | models.Q(email__icontains=search)
            )

        return qs