"""
URL configuration for edu_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

"""
Permissions are in accounts /permissions.py file
"""
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

from api.views import *
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'tags', TagsView, basename='tags')
router.register(r'ticket', TicketView, basename='ticket')
router.register(r'user', UserView, basename='user')
router.register(r'adminresponse', AdminResponseView, basename='adminresponse')

urlpatterns = [
    path('register/', Register.as_view() , name='register'),
    path('login/', Login.as_view() , name='login'),
    path('', include(router.urls)),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)