from flask import Flask, render_template, request, redirect, session, jsonify
from flask_session import Session
from flask_cors import CORS
from cs50 import SQL
from helpers import apology, login_required
from tempfile import mkdtemp
from werkzeug.security import check_password_hash, generate_password_hash
import jwt
from secrets import secret, algorithm

# This line of code below tells flask to convert this file to a flask app
app = Flask(__name__)
CORS(app)
# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Auto reload App
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Connect to the db
db = SQL("sqlite:///sql.db")


@app.route('/')
@login_required
def home():
    '''
    db.execute(
        "CREATE TABLE users(id INTEGER ,username TEXT UNIQUE NOT NULL,password TEXT NOT NULL , PRIMARY KEY(id))")

    db.execute("CREATE TABLE photos(id INTEGER,img_url TEXT NOT NULL,user_id INTEGER NOT NULL,FOREIGN KEY(user_id) REFERENCES users(id),PRIMARY KEY(id))")

    db.execute("CREATE TABLE comments(id INTEGER,text TEXT NOT NULL,photo_id INTEGER NOT NULL,user_id INTEGER NOT NULL,FOREIGN KEY(photo_id) REFERENCES photos(id),FOREIGN KEY(user_id) REFERENCES users(id),PRIMARY KEY(id))")

    db.execute("CREATE TABLE likes(user_id INTEGER NOT NULL,photo_id INTEGER NOT NULL,FOREIGN KEY(user_id) REFERENCES users(id),FOREIGN KEY(photo_id) REFERENCES photos(id),PRIMARY KEY(user_id, photo_id))")

    db.execute("CREATE TABLE follows(follower_id INTEGER NOT NULL,followee_id INTEGER NOT NULL,FOREIGN KEY(follower_id) REFERENCES users(id),FOREIGN KEY(followee_id) REFERENCES users(id),PRIMARY KEY(follower_id, followee_id))")
    '''
    photos = db.execute("SELECT * FROM photos")
    return jsonify({"photos": photos, "session": session.get("user_id")})


@app.route("/login", methods=["POST"])
def login():
    session.clear()
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        if not username or not password:
            return jsonify({"error": "fill all the fields!"})
        user = db.execute("SELECT * FROM users WHERE username = ?", username)
        if not user:
            return jsonify({"error": "username not exist"}, 404)
        if not check_password_hash(user[0]['password'], password):
            return jsonify({"error": "Password Incorrect!"})
        session["user_id"] = user[0]['id']
        user = {"username": user[0]['username'], "id": user[0]['id']}
        encoded_jwt = jwt.encode(
            {"id": user['id']}, secret, algorithm=algorithm)
        return jsonify({"user": user, "jwt": encoded_jwt}), 200


@app.route("/logout")
def logout():
    # clear the session
    session.clear()
    # redirect to the login page
    return redirect("/")


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        confirm = request.form.get("confirm")
        if not username or not password or not confirm:
            return apology("Please fill all the fields")
        elif password != confirm:
            return apology("password don't match")
        user = db.execute("SELECT * FROM users WHERE username = ?", username)
        if user:
            return apology("This user is already exists", 400)
        # hash the password
        password = generate_password_hash(
            password, method='pbkdf2:sha256', salt_length=8)
        # Create a user
        result = db.execute(
            "INSERT INTO users (username , password) VALUES(?, ?)", username, password)
        session["user_id"] = result
        return redirect("/")
    else:
        return render_template("register.html")


@app.route("/profile")
@login_required
def profile():
    user = db.execute("SELECT * FROM users WHERE id = ?",
                      session["user_id"])[0]
    return render_template("profile.html", user=user)


@app.route("/user/<name>")
@login_required
def user(name):
    return '<h1>Hello %s</h1>' % name, 205


@app.route("/post", methods=["GET", "POST"])
@login_required
def post():
    if request.method == "POST":
        title = request.form.get("title")
        body = request.form.get("body")
        img = request.form.get("img")
        if not title or not body:
            return apology("post can't be empty!")

        db.execute("INSERT INTO posts (user_id, title, body, img_url) VALUES (?, ?, ?, ?)",
                   session['user_id'], title, body, img)
        return redirect("/")
    return render_template("posts.html")


@app.route("/delete/<id>")
@login_required
def delete(id):
    db.execute("DELETE FROM posts WHERE id = ?", id)
    return redirect('/')


@app.errorhandler(404)
# Error handler method in flask 404 (Not Found)
def errors(e):
    return f"<h2> Page Not Found 404 ! {e} </h2>", 404


if __name__ == '__main__':
    app.run(debug=True)
