from django.urls import path
from .views import *

urlpatterns = [
    path('', ToDoListView.as_view(), name='index'),
]