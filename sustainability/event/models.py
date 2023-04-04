from django.db import models

# Create your models here.

# Create your models here.
from django.contrib.auth.models import User
from users.models import Profile


class Event(models.Model):
    submitter = models.ForeignKey(
        User,
        null=True,
        on_delete=models.SET_NULL,
        related_name='submitted_events',
    )
    event_name = models.TextField(max_length=60)
    event_date = models.DateField(null=True)
    event_points = models.BigIntegerField()
    event_description = models.TextField(null=True)
    event_url = models.URLField(max_length=200, default="http://127.0.0.1:8000")

    event_participant = models.ForeignKey(
        Profile,
        null=True,
        on_delete=models.SET_NULL,
        related_name='submitted_events',
    )

    def __str__(self):
        return self.event_name