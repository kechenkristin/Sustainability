from django.db import models

# Create your models here.
class Advice:
    text = models.CharField()
    question = models.CharField()

