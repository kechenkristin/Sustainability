from django.urls import path
from . import views

urlpatterns = [
    path('', views.map_view, name='map_view'),
    path('update_database/', views.update_database, name='update_database'),
]
