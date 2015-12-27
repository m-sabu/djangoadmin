from django.template.context_processors import csrf

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny


class BackendConfig(APIView):

    permission_classes = (AllowAny,)

    def get(self, request, format=None):
        response = {
            #'CSRF_TOKEN': csrf(request),
            'RELEASE_TAG': '1429296797',
            'STATIC_URL': '//avanceio-wapp.s3.amazonaws.com/',
            'COUNTRY': 'se',
            'LANGUAGE': 'sv'
        }
        return Response(response)