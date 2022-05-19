from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser

User = get_user_model()
User._meta.get_field('email')._unique = True


class Book(models.Model):
    title = models.CharField(max_length=100)
    img_src = models.URLField()
    author = models.CharField(max_length=100)
    desc = models.TextField()
    rating = models.FloatField(default=0, max_length=5, editable=False)
    votes_count = models.IntegerField(default=0, editable=False)

    def __str__(self):
        return self.title

class BookReview(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, null=True)
    content = models.TextField()
    rating = models.FloatField(default=0, max_length=5, editable=False)

    def __str__(self):
        return self.content

