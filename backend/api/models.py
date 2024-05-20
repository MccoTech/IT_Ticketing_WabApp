from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission, User

# Create your models here.
class Users (User):
    typed = models.CharField(default='t',null=True,blank=True,max_length=20)
