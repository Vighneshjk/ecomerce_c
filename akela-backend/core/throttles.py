from rest_framework.throttling import ScopedRateThrottle

class LoginThrottle(ScopedRateThrottle):
    scope = 'login'

class RegisterThrottle(ScopedRateThrottle):
    scope = 'register'

class PaymentThrottle(ScopedRateThrottle):
    scope = 'payment'

class FaceAnalysisThrottle(ScopedRateThrottle):
    scope = 'face_analysis'
