from django.urls import path
from .views import AnalyzeFaceView, VirtualTryOnView

urlpatterns = [
    path('analyze/', AnalyzeFaceView.as_view()),
    path('overlay/', VirtualTryOnView.as_view()),
]
