# backend/booking/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import os
import smtplib
from email.message import EmailMessage

@api_view(['POST'])
def book_lesson(request):
    data = request.data
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')

    # Basic validation
    if not name or not email or not phone:
        return Response({'error': 'Missing fields'}, status=status.HTTP_400_BAD_REQUEST)

    # TODO: Add to database if needed
    # TODO: Create Google Calendar invite

    # Example: Send email to coach
    coach_email = os.environ.get('EMAIL_HOST_USER')
    msg = EmailMessage()
    msg['Subject'] = f'New Booking from {name}'
    msg['From'] = coach_email
    msg['To'] = coach_email
    msg.set_content(f'Name: {name}\nEmail: {email}\nPhone: {phone}')

    try:
        with smtplib.SMTP(os.environ['EMAIL_HOST'], int(os.environ['EMAIL_PORT'])) as server:
            server.starttls()
            server.login(coach_email, os.environ['EMAIL_HOST_PASSWORD'])
            server.send_message(msg)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({'message': 'Booking received!'}, status=status.HTTP_200_OK)
