from rest_framework import serializers
from todo_app.models import ToDo


class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.text = validated_data.get('text', instance.text)
        instance.color = validated_data.get('color', instance.color)
        print(self.context.get('view').request.FILES) # должно выводить картинку
        # instance.image = self.context.get('view').request.FILES
        instance.save()
        return instance