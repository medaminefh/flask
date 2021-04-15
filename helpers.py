from flask import render_template, request


def apology(text, code=400):
    return render_template("apology.html", top=code, bottom=text), code
