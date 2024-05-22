from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission, User

# Create your models here.
class Users (User):
    type = models.CharField(default='',null=True,blank=True,max_length=200)

class Tags(models.Model):
    name = models.TextField(null=False,blank=False)
    color = models.CharField(default="yellow",blank=True, null=True,max_length=200)

class Ticket(models.Model):
    description = models.TextField(null=False, blank=False)
    user = models.ForeignKey(Users, null=True, on_delete=models.CASCADE)
    rank = models.SmallIntegerField(default=0)
    tags = models.ManyToManyField(Tags,blank = True,null=True)

class AdminResponse(models.Model):
    description = models.TextField(null=False, blank=False)
    user = models.ForeignKey(Users,on_delete=models.SET_NULL,null=True)
    ticket = models.ForeignKey(Ticket,on_delete=models.SET_NULL,null=True)