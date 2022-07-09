from itertools import product
import re
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product, Order, OrderItem, ShippingAdress
from base.serializers import ProductSerializer

from rest_framework import status 



@api_view(['POST'])
@permission_classes(['IsAuthenticated'])
def addOrderItems(request):
    user = request.user
    data = request.data
    
    orderItems = data['orderItems']
    
    
    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status = status.HTTP_400_BAD_REQUEST)
    else:
        
        #create Order
        order = Order.objects.create(
            user = user,
            paymentMethod = data['PaymentMethod'],
            taxPrice = data['taxPrice'],
            shippingPrice = data['shippingPrice'],
            totalPrice=data['totalPrice']
        )
        
        # Create shipping address
        
        shipping = ShippingAdress.objects.create(
            order=order,
            address=data['shippingAdress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country = data['shippingAddress']['country'],
            
        )
        
        # Create order items and set order order to orderItem relationship
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])
            
            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )
            
        # Update stock
        product.countInStock -= item.qty
        product.save()
    
    return Response('ORDER')