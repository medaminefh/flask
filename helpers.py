from flask import render_template, session, jsonify, request
from functools import wraps
import jwt
from secrets import secret, algorithm as algo


def login_required(f):
    """
    Decorate routes to require login.
    http://flask.pocoo.org/docs/0.12/patterns/viewdecorators/
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        author = request.headers.get("Authorization")
        if author is None:
            return jsonify({"error": "Not Logged In"})
        try:
            user = jwt.decode(author, secret, algorithms=[algo])
        except Exception as e:
            print(f'JwtError: {e}')
            return jsonify({"jwtError": e})
        return f(user, *args, **kwargs)
    return decorated_function
    '''
        if session.get("user_id") is None:
            return jsonify({"error": "Not Logged In"})
        return f(*args, **kwargs)
    return decorated_function
    '''


def apology(text, code=400):
    return render_template("apology.html", top=code, bottom=text), code
