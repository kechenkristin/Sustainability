# myapp/views.py

from django.shortcuts import render

def react_app(request):
    return render(request, 'Sustainability/frontend/build/static/index.html')

