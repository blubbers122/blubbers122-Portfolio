// forces retrieval of page from server
window.addEventListener( "pageshow", function ( event ) {
  var historyTraversal = event.persisted ||
                         ( typeof window.performance != "undefined" &&
                              window.performance.navigation.type === 2 );
  if ( historyTraversal ) {
    // Handle page restore.
    window.location.reload();
  }
});

window.onload = function() {
  var reloading = sessionStorage.getItem("reloading");
    if (reloading) {
        sessionStorage.removeItem("reloading");
        loadContent(window.location.pathname);
    }
}

const typewriterWords = ["a Pianist", "a Runner", "a Game Developer", "a Weightlifter", "a Drummer", "a Composer", "a Perfectionist", "an INFP", "a Tech Enthusiast", "an Outdoorsman"]
var index = -1;
const typewriter = document.querySelector("#typewriter")

// resets typewriter animation when you refocus on tab to
// prevent incorrect values for index after refocus
document.addEventListener("visibilitychange", function() {
  if (document.visibilityState == "visible") index = -1;
})

// loops through typewriter word bank
typewriter.addEventListener("animationiteration", () => {
  var typewriterWidth = typewriter.firstElementChild.getBoundingClientRect().width
  if (typewriterWidth == 0) {
    index++;
    typewriter.children[0].innerHTML = typewriterWords[index];
  }

  if (index >= typewriterWords.length - 1) index = -1;
})

const navMenu = document.querySelector(".navbar-nav")

window.addEventListener("resize", function() {updateNavCollapse()})

function updateNavCollapse() {
  if (document.body.clientWidth < 768) {
    navMenu.dataset.target = ".navbar-collapse"
  }
  else {
    navMenu.dataset.target = ""
  }
}

updateNavCollapse()

// handles loading dynamic page content with AJAX
function loadContent(name) {
  const request = new XMLHttpRequest();
  request.open("GET", `/${name}`);
  request.setRequestHeader("X-Requested-With", "XMLHttpRequest")
  request.onload = () => {
    const response = request.responseText;
    document.querySelector("#content").innerHTML = response;

    // adds modal button event listeners when project content is loaded
    if (name == "projects") {

      modalButtons = document.querySelectorAll(".open-modal-btn");
      modalButtons.forEach(button => {
        button.addEventListener("click", () => {
          document.querySelector(".modal-title").innerHTML = button.dataset.title;
          document.querySelector(".video-wrapper iframe").src = button.dataset.video;
        });
      });

      // ensures the video doesn't continue playing after exiting modal
      $('.modal').on('hide.bs.modal', function() {
        var memory = $(this).html();
        $(this).html(memory);
      });
    }
  };
  request.send();

}

// loads single page web app content when clicking nav items
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(navItem => {
  navItem.addEventListener("click", function() {
    var link = navItem.firstElementChild

    if (link.id === "resume-download") return;

    var active = document.querySelector(".active")
    if (active) active.classList.remove("active");
    link.classList.add("active")

    document.querySelector(".overlay").style.overflowY = "auto";

    if (link.dataset.page) loadContent(link.dataset.page);
  });
});
