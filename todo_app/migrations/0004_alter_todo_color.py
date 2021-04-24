# Generated by Django 3.2 on 2021-04-20 09:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo_app', '0003_alter_todo_color'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='color',
            field=models.CharField(blank=True, choices=[('#00FFFF', 'Голубой'), ('#FF1493', 'Розовый'), ('#ff9218', 'Желтый'), ('default', '#304B5F')], default='default', max_length=20, null=True, verbose_name='Цвет'),
        ),
    ]