from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

class Advice(models.Model):
    text = models.TextField()
    question = models.TextField()
    likes = models.IntegerField(default=0)

    def increment_likes(self):
        self.likes += 1
        self.save()