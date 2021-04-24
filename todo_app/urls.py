from django.urls import path
from .views import *

urlpatterns = [
    path('', ToDoListView.as_view(), name='index'),
    path('upload_image/<int:pk>/', UploadImage.as_view(), name='upload_image')
]