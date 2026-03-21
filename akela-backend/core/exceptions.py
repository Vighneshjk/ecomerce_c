from rest_framework.views      import exception_handler
from rest_framework.exceptions import ValidationError, Throttled
from rest_framework.response   import Response

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is not None:
        if isinstance(exc, Throttled):
            wait = int(exc.wait or 60)
            response.data = {
                'error':       f'Too many requests. Please wait {wait} seconds.',
                'status':      429,
                'retry_after': wait,
            }
        elif isinstance(exc, ValidationError):
            response.data = {
                'error':   'Validation failed.',
                'details': response.data,
                'status':  response.status_code,
            }
        else:
            detail = response.data.get('detail', str(exc))
            response.data = {
                'error':  str(detail),
                'status': response.status_code,
            }
    return response
