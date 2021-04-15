from flask import Flask, render_template, request, redirect, session
from flask_session import Session
from cs50 import SQL
from helpers import apology
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
def hello_world():
    if(request.method == "GET"):
        print(db.execute("SELECT * FROM users"))
        '''
        db.execute(
            "CREATE TABLE users (id INTEGER, username TEXT, password TEXT, PRIMARY KEY(id))")
        '''
        return render_template("articles.html")
    else:
        return "POST FROM / {hello_world function}"


@app.route("/about", methods=['GET', "POST"])
def about():
    if(request.method == "GET"):
        return render_template("about.html", name="med Amine Fh")
    else:
        return "Hello world from POST about!"


@app.route("/login", methods=["GET", "POST"])
def login():
    session.clear()
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        if not username or not password:
            return apology("fill all the fields!")
        user = db.execute("SELECT * FROM users WHERE username = ?", username)
        print("User :", user)
        if not user:
            return apology("username not exist", 404)
        if not check_password_hash(user[0]['password'], password):
            return apology("Password Incorrect!")
        return render_template("home.html", user=user[0])
    return render_template("login.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    session.clear()
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


@app.route("/user/<name>")
def user(name):
    return '<h1>Hello %s</h1>' % name, 205


@app.errorhandler(404)
# Error handler method in flask 404 (Not Found)
def errors(e):
    return f"<h2> Page Not Found 404 ! {e} </h2>", 404


if __name__ == '__main__':
    app.run(debug=True)
