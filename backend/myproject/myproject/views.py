# import json

# from django.contrib.auth import get_user_model
# from django.contrib.auth.models import AnonymousUser
# from django.http import HttpResponse
# from django.utils.decorators import method_decorator
# from django.utils.encoding import smart_text
# from django.views.decorators.csrf import csrf_exempt

# from rest_framework import exceptions
# from rest_framework.authentication import get_authorization_header
# from rest_framework.authtoken.models import

# from django.conf import settings
# from django.core.exceptions import ObjectDoesNotExist
# from django.http import HttpResponseRedirect
from graphql_jwt.utils import get_credentials
from graphql_jwt.shortcuts import get_user_by_token
from graphql_jwt.exceptions import JSONWebTokenError


User = get_user_model()


class TokenAuthMixin:
    """
    Simple token based authentication.
    Clients should authenticate by passing the token key in the "Authorization"
    HTTP header, prepended with the string "Token ".  For example:
        Authorization: Token 401f7ac837da42b97f613d789819ff93537bee6a
    """

    keyword = "JWT"
    model = None

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        try:
            request.user, request.token = self.authenticate(request)
        except exceptions.AuthenticationFailed as e:
            response = HttpResponse(
                json.dumps({"errors": [str(e)]}),
                status=401,
                content_type="application/json",
            )

            return response

        return super().dispatch(request, *args, **kwargs)

    def get_model(self):
        if self.model is not None:
            return self.model

        return Token

    """
    A custom token model may be used, but must have the following properties.
    * key -- The string identifying the token
    * user -- The user to which the token belongs
    """

    def authenticate(self, request):
        auth = get_authorization_header(request).split()

        if not auth or auth[0].lower() != self.keyword.lower().encode():
            return None

        if len(auth) == 1:
            msg = "Invalid token header. No credentials provided."
            raise exceptions.AuthenticationFailed(msg)
        elif len(auth) > 2:
            msg = "Invalid token header. Token string should not contain spaces."
            raise exceptions.AuthenticationFailed(msg)

        try:
            token = auth[1].decode()
        except UnicodeError:
            msg = "Invalid token header. Token string should not contain invalid characters."
            raise exceptions.AuthenticationFailed(msg)

        return self.authenticate_credentials(token)

    def authenticate_credentials(self, key):
        model = self.get_model()
        try:
            token = model.objects.select_related("user").get(key=key)
        except model.DoesNotExist:
            raise exceptions.AuthenticationFailed("Invalid token.")

        if not token.user.is_active:
            raise exceptions.AuthenticationFailed("User inactive or deleted.")

        return (token.user, token)

    def authenticate_header(self, request):
        return self.keyword


class PrivateGraphQLView(TokenAuthMixin, GraphQLView):
    pass
