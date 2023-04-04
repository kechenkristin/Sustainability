# myapp/views.py

from django.shortcuts import render
from django.conf import settings
import os

def react_app(request):
    return render(request, 'index.html')
