from django.shortcuts import render
from rest_framework.response import Response

from .serializers import ToDoSerializer
from todo_app.models import ToDo
from rest_framework.viewsets import ModelViewSet


class ToDOViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer

    def update(self, request, *args, **kwargs):
        if request.method == 'PATCH':
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
        return Response('Wrong!')
