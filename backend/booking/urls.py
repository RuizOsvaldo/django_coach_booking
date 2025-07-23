# backend/booking/urls.py
from django.urls import path
from .views import book_lesson

urlpatterns = [
    path('book/', book_lesson),
]
