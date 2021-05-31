from django.contrib import admin

from .models import Project, ProjectUsers, Todo

admin.site.register(ProjectUsers)
admin.site.register(Project)
admin.site.register(Todo)
