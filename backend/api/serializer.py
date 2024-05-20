from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Users

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Users
        fields = '__all__'

class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)
    class Meta:
        model  = Users
        fields = '__all__'
