from flask import Flask, render_template, request, redirect, session
from flask_session import Session
import cloudinary.uploader
from cs50 import SQL
from helpers import apology, login_required, cloudinary
from tempfile import mkdtemp
from werkzeug.security import check_password_hash, generate_password_hash

# This line of code below tells flask to convert this file to a flask app
app = Flask(__name__)
# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Auto reload App
app.config["TEMPLATES_AUTO_RELOAD"] = True

db = SQL("sqlite:///sql.db")


@app.route('/')
@login_required
def hello_world():
    print(db.execute("SELECT * FROM posts"))
    '''
    db.execute(
        "CREATE TABLE posts (id INTEGER, user_id INTEGER, title TEXT, body TEXT, img_url TEXT DEFAULT FALSE, PRIMARY KEY(id))")
    db.execute(
        "CREATE TABLE users (id INTEGER, username TEXT, password TEXT, PRIMARY KEY(id))")
    '''
    posts = db.execute(
        "SELECT * FROM posts WHERE user_id = ?", session["user_id"])
    user = db.execute("SELECT * FROM users WHERE id = ?",
                      session["user_id"])[0]
    return render_template("home.html", posts=posts, user=user)


@app.route("/login", methods=["GET", "POST"])
def login():
    session.clear()
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        if not username or not password:
            return apology("fill all the fields!")
        user = db.execute("SELECT * FROM users WHERE username = ?", username)
        if not user:
            return apology("username not exist", 404)
        if not check_password_hash(user[0]['password'], password):
            return apology("Password Incorrect!")
        session["user_id"] = user[0]['id']
        return redirect("/")
    return render_template("login.html")


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
        if img:
            img = cloudinary.uploader.upload(img)
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
