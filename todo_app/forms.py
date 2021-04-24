from django import forms
from .models import *


class ToDOForm(forms.ModelForm):
    image = forms.ImageField(label=False)
    class Meta:
        model = ToDo
        fields = ['image']