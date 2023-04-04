from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

class Advice(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="liked_advices")
    text = models.TextField()
    question = models.TextField()

    class Meta:
        unique_together = ('user', 'text', 'question')

    def __str__(self):
        return f"{self.user.username} - {self.question1} / {self.question2}"
