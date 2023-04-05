from django.contrib import admin
from .models import Profile

from advice.models import Advice
admin.site.register(Profile)
admin.site.register(Advice)
