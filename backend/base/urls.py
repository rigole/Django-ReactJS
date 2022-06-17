from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path('api/users/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', views.getRoutes, name="routes"),
    path('products/', views.getProducts, name="routes"),
    path('products/<str:pk>/', views.getProduct, name="product")
]

