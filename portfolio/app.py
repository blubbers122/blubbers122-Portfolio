from flask import Flask, render_template, request, session, redirect
from flask_caching import Cache

app = Flask(__name__)
cache = Cache(app, config={
    "CACHE_TYPE": "filesystem",
    "CACHE_DIR": "cache-directory"
})
cache.clear()

def create_app():
    app = Flask(__name__)
    return app

@app.errorhandler(404)
def page_not_found(e):
    return redirect("/")

max_age = 1

@app.route("/")
@cache.cached(timeout=max_age)
def home():
    reqXHRKey = request.headers.get("X-Requested-With")
    if reqXHRKey and reqXHRKey == "XMLHttpRequest":
        pass
    return render_template("index.html")


@app.route("/about")
@cache.cached(timeout=max_age)
def about():
    reqXHRKey = request.headers.get("X-Requested-With")
    if reqXHRKey and reqXHRKey == "XMLHttpRequest":
        return render_template("about.html")
    return redirect("/")


@app.route("/skills")
@cache.cached(timeout=max_age)
def skills():
    reqXHRKey = request.headers.get("X-Requested-With")
    if reqXHRKey and reqXHRKey == "XMLHttpRequest":
        return render_template("skills.html")
    return redirect("/")


@app.route("/projects")
@cache.cached(timeout=max_age)
def projects():
    reqXHRKey = request.headers.get("X-Requested-With")
    if reqXHRKey and reqXHRKey == "XMLHttpRequest":
        return render_template("projects.html")
    return redirect("/")


@app.route("/contact")
@cache.cached(timeout=max_age)
def contact():
    reqXHRKey = request.headers.get("X-Requested-With")
    if reqXHRKey and reqXHRKey == "XMLHttpRequest":
        return render_template("contact.html")
    return redirect("/")
