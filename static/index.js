const typewriterWords = ["a Pianist", "a Runner", "a Game Developer", "a Weightlifter", "a Drummer", "a Composer", "a Perfectionist", "an INFP", "a Tech Enthusiast", "an Outdoorsman"]
var index = -1;

const typewriter = document.querySelector("#typewriter")
typewriter.addEventListener("animationiteration", () => {
  console.log("iteration")
  if (index % 2 === 0) typewriter.children[0].innerHTML = typewriterWords[index / 2];
  index++;
  if (index >= typewriterWords.length * 2 - 1) index = -1;
})

function loadContent(name) {
  const request = new XMLHttpRequest();
  request.open("GET", `/${name}`);
  request.setRequestHeader("X-Requested-With", "XMLHttpRequest")
  request.onload = () => {
    const response = request.responseText;
    document.querySelector("#content").innerHTML = response;

    //document.title = name;
    history.pushState(null, name, name);
  };
  request.send();
}

const links = document.querySelectorAll(".nav-link");

links.forEach(link => {
  link.addEventListener("click", function() {
    var active = document.querySelector(".active")
    if (active) active.classList.remove("active");
    link.classList.add("active")

    document.querySelector(".overlay").style.overflowY = "auto";

    if (link.dataset.page) loadContent(link.dataset.page);
  });
});
