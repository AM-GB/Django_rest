from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    age = models.PositiveIntegerField('возраст', null=True)
    registered = models.DateTimeField(auto_now_add=True, null=True)
    email = models.EmailField(unique=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
