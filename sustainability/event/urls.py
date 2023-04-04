from django.urls import path
from . import views

urlpatterns = [
    path('event_add', views.add_event, name='event_add'),
    path('event_list', views.event_list, name='event_list'),
    path('<int:eid>/attend', views.event_attend, name='event_attend'),
    path('<int:eid>/finish', views.event_finish, name='event_finish'),
    path('<int:eid>/remove', views.event_remove, name='event_remove'),
]