# Generated by Django 4.1.5 on 2023-04-04 09:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_profile_bio'),
        ('event', '0003_event_event_participants'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='event_participants',
            field=models.ManyToManyField(to='users.profile'),
        ),
    ]