from django.shortcuts import render, redirect
from .models import ToDo
from django.views.generic import View
from .forms import ToDOForm


class ToDoListView(View):
    def get(self, request):
        form = ToDOForm()
        return render(request, 'todo_app/index.html', context={'form': form})


class UploadImage(View):
    def post(self, request, pk):
        form = ToDOForm(request.POST, request.FILES)
        if form.is_valid():
            todo = ToDo.objects.get(id = pk)
            todo.image = form.cleaned_data['image']
            todo.save()
        return redirect('index')
