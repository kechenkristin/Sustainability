# Generated by Django 4.1.5 on 2023-04-04 08:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event_name', models.TextField(max_length=60)),
                ('event_date', models.DateField(null=True)),
                ('event_points', models.BigIntegerField()),
                ('submitter', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='submitted_events', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]