from rest_framework.viewsets    import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators  import action
from rest_framework.response    import Response
from .models      import Prescription
from .serializers import PrescriptionSerializer


class PrescriptionViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class   = PrescriptionSerializer

    def get_queryset(self):
        return Prescription.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def set_default(self, request, pk=None):
        Prescription.objects.filter(user=request.user).update(is_default=False)
        p = self.get_object()
        p.is_default = True
        p.save()
        return Response(PrescriptionSerializer(p).data)
