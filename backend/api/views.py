from django.shortcuts import render
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
# from knox.models import AuthToken # type: ignore
from rest_framework import viewsets, filters

from api.serializer import AdminResponseSerializer, LoginSerializer, RegisterSerializer, TagsSerializer, TicketSerializer, UserSerializer
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
        users = Users.objects.get(user_ptr_id = user.id)
        if not user:
            return Response({"error":"Bad credentials"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({
            'user': user.email,
            'type': users.type,
            'message': 'Login successful!'
        }, status=status.HTTP_200_OK)
    
class TagsView(viewsets.ModelViewSet):
    queryset = Tags.objects.all()
    serializer_class = TagsSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = [
        'name',
    ]

class TicketView(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = [
        'description',
        'user__first_name',
        'user__last_name',
        'user__email',
        'rank',
        'tags__name',
    ]

    def create(self, request, *args, **kwargs):
        print(request.data)
        T = []
        tags = {}
        if 'tags' in request.data:
            tags = request.data['tags']
            request.data.pop('tags')
        # request.data['tags'] = T
        request.data['rank'] = 0
        request.data['user'] = Users.objects.get(email=request.data.pop('email'))
        Ti = Ticket.objects.create(**request.data)
        Ti.tags.set([Tags.objects.get_or_create(name=tag)[0].id for tag in tags if not tag==''])
        Ti.save()
        return Response({},201)

    def get(self, request, *args, **kwargs):
        ts = Ticket.objects.all()
        print('hi')
        return Response({[self.modified_data(T) for T in ts]},200)
        # return super().retrieve(request, *args, **kwargs)
    
    def modified_data(data):
        return{
            'description':data.description,
            'rank':data.rank,
            'tags': [[Tags.objects.get(id=t).name,Tags.objects.get(id=t).color] for t in data.tags ],
            'user': Users.objects.get(pk=data.user),
            'key':data.id
        }

class UserView(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = [
        'first_name',
        'last_name',
        'email',
    ]

class AdminResponseView(viewsets.ModelViewSet):
    queryset = AdminResponse.objects.all()
    serializer_class = AdminResponseSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = [
        'description',
        'user__first_name',
        'user__last_name',
        'user__email',
        'ticket__description',
    ]
    def create(self, request, *args, **kwargs):
        request.data['user'] = Users.objects.get(email=request.data['user']).id
        return super().create(request, *args, **kwargs)