from flask import Flask, render_template, request, session, redirect
#from waitress import serve

def create_app():
    app = Flask(__name__)
    return app

@app.errorhandler(404)
def page_not_found(e):
    return redirect("/")


@app.route("/")
def home():
    reqXHRKey = request.headers.get("X-Requested-With")
    if reqXHRKey and reqXHRKey == "XMLHttpRequest":
        pass
    return render_template("index.html")


@app.route("/about")
def about():
    reqXHRKey = request.headers.get("X-Requested-With")
    if reqXHRKey and reqXHRKey == "XMLHttpRequest":
        return render_template("about.html")
    return redirect("/")


@app.route("/skills")
def skills():
    reqXHRKey = request.headers.get("X-Requested-With")
    if reqXHRKey and reqXHRKey == "XMLHttpRequest":
        return render_template("skills.html")
    return redirect("/")


@app.route("/projects")
def projects():
    reqXHRKey = request.headers.get("X-Requested-With")
    if reqXHRKey and reqXHRKey == "XMLHttpRequest":
        return render_template("projects.html")
    return redirect("/")


@app.route("/contact")
def contact():
    reqXHRKey = request.headers.get("X-Requested-With")
    if reqXHRKey and reqXHRKey == "XMLHttpRequest":
        return render_template("contact.html")
    return redirect("/")


#if __name__ == "__main__":
    #app.run(debug=True)
