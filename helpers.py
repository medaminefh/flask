from flask import redirect, render_template, session, jsonify
from functools import wraps


def login_required(f):
    """
    Decorate routes to require login.
    http://flask.pocoo.org/docs/0.12/patterns/viewdecorators/
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return jsonify({"error": "Not Logged In"})
        return f(*args, **kwargs)
    return decorated_function


def apology(text, code=400):
    return render_template("apology.html", top=code, bottom=text), code
