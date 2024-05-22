from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import AdminResponse, Tags, Ticket, Users

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

class TagsSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Tags
        fields = '__all__'

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Ticket
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Users
        fields = '__all__'

class AdminResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model  = AdminResponse
        fields = '__all__'