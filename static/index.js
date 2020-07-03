function loadContent(name) {
  const request = new XMLHttpRequest();
  request.open("GET", `/${name}`);
  request.setRequestHeader("X-Requested-With", "XMLHttpRequest")
  request.onload = () => {
    const response = request.responseText;
    document.querySelector("#content").innerHTML = response;

    document.title = name;
    history.pushState(null, name, name);
  };
  request.send();
}

const links = document.querySelectorAll(".nav-link");

links.forEach(link => {
  link.addEventListener("click", function() {
    document.querySelector(".active").classList.remove("active")
    link.classList.add("active")

    loadContent(link.dataset.page);
  });
});

loadContent("about")
