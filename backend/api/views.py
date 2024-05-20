from django.shortcuts import render
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
# from knox.models import AuthToken # type: ignore

from api.serializer import LoginSerializer, RegisterSerializer
from api.models import *
# Create your views here.

# class Register(generics.GenericAPIView):
#     queryset = Users.objects.all()
#     serializer_class = RegisterSerializer

class Register(APIView):
    serializer_class = RegisterSerializer
    
    def post(self, request):
        request.data['password'] = make_password(request.data['password'])
        serializer = self.serializer_class(data=request.data)
        request.data['username'] = request.data['email']
        # request.data.pop('confirm_password')
        serializer.is_valid(raise_exception=True)
        if serializer.is_valid():
            user = serializer.save() 
            return Response(
                    {
                        "message": "User created successfully!",
                    }, 
                    status=status.HTTP_201_CREATED
                )
        
        return Response({"error": "Invalid data!"}, status=status.HTTP_400_BAD_REQUEST)

class Login (APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data.get('email')
        password = serializer.validated_data.get('password')
        user = authenticate(request, username=username, password=password)
        if not user:
            return Response({"error":"Bad credentials"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({
            'user': user.email,
            'message': 'Login successful!'
        }, status=status.HTTP_200_OK)