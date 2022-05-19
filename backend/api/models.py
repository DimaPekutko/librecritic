from pyexpat import model
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Book(models.Model):
    title = models.CharField(max_length=100)
    img_src = models.URLField()
    author = models.CharField(max_length=100)
    desc = models.TextField()
    rating = models.FloatField(default=0, max_length=5, editable=False)
    votes_count = models.IntegerField(default=0, editable=False)

    def __str__(self):
        return self.title
