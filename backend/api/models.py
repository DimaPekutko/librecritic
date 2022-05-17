from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()

class BookReview(models.Model):
    user        = models.ForeignKey(User, models.CASCADE)
    content     = models.TextField(null=True, blank=True)
    rating      = models.FloatField()

    def __str__(self) -> str:
        return self.content

