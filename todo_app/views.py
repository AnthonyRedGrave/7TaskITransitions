from django.shortcuts import render
from .models import ToDo
from django.views.generic import View


class ToDoListView(View):
    def get(self, request):
        return render(request, 'todo_app/index.html', context={})
