from django.db import models
from django.contrib.auth import get_user_model

from authapp.models import User


class Project(models.Model):
    name = models.CharField('имя проекта', max_length=64)
    repo = models.CharField('ссылка на репозиторий', max_length=250)
    user_admin = models.ManyToManyField(User)

    def __str__(self):
        return f'{self.name}'


class ProjectUsers(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE,)
    user = models.OneToOneField(User, on_delete=models.CASCADE)


class Todo(models.Model):
    project = models.ForeignKey(Project,
                                on_delete=models.CASCADE,
                                related_name='todo')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField('описание', blank=True)
    add_date = models.DateTimeField('время', auto_now_add=True)
    update_date = models.DateTimeField('время', auto_now=True)
    is_active = models.BooleanField('активна', db_index=True, default=True)
