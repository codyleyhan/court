from functools import wraps
from flask import g, request, redirect, url_for

from court.errors import AuthorizationError

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if g.user_id is None:
            raise AuthorizationError()
        return f(*args, **kwargs)
    return decorated_function