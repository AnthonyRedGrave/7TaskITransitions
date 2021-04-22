from django.db import models


class ToDo(models.Model):
    COLOR_CHOICES = [
        ('#008B8B', 'Голубой'),
        ('#FF1493', 'Розовый'),
        ('#ff9218', 'Желтый'),
        ('default', '#304B5F')
    ]

    name = models.CharField('Название заметки', max_length=150)
    text = models.TextField('Текст заметки')
    image = models.ImageField('Картинка', upload_to='todo_images/', null=True, blank=True)
    color = models.CharField('Цвет', choices=COLOR_CHOICES, max_length=20, default='default', blank=True, null=True)
    date_time = models.DateTimeField('Дата', auto_now=True)

    def __str__(self):
        return f'{self.name}, {self.text}'

    class Meta:
        verbose_name = 'Заметка'
        verbose_name_plural = 'Заметки'
