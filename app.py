from flask import Flask, render_template

# This line of code below tells flask to convert this file to a flask app
app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template("about.html", name="Med Amine Fh")
