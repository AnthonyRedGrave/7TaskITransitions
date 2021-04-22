from django.shortcuts import render, redirect
from .models import ToDo
from django.views.generic import View
from .forms import ToDOForm


class ToDoListView(View):
    def get(self, request):
        form = ToDOForm()
        return render(request, 'todo_app/index.html', context={'form': form})

