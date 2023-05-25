(function () {
  let CSS = `
    .animation--text-typing:after{
      display:inline-block;
      content:"|";
      box-shadow:inset 0 0 0 2em;
      opacity:.6;
      transition:margin .2s;
      animation:animation--text-typing-fade 1s linear infinite;
    }
    .animation--text-typing:not(:empty):after{
      margin-left:.25em;
    }
    @keyframes animation--text-typing-fade{
      0%{opacity:1}
      24%{opacity:1}
      26%{opacity:0}
      74%{opacity:0}
      76%{opacity:1}
      100%{opacity:1}
    }
    `
  let style = document.createElement("style");
  style.innerHTML = CSS;
  document.head.append(style);
})();

var nAnimations = nAnimations || (nAnimations = {});

nAnimations.TextTyping = function (el) {
  let texts = el.getAttribute("data-texts").split("|");
  let textIndex = 0, textIndent = 0, textMove = 1;

  function interval() {
    if (textMove == 1) {
      textIndent += 1;
      el.innerHTML = texts[textIndex].substr(0, textIndent) || "&nbsp;";
      if (textIndent == texts[textIndex].length + 40) {
        textMove = -1;
        textIndent = texts[textIndex].length;
      }
    }
    if (textMove == -1) {
      textIndent -= 1;
      el.innerHTML = texts[textIndex].substr(0, textIndent) || "&nbsp;";
      if (textIndent == -10) {
        textMove = 1;
        textIndex = (textIndex + 1) % texts.length;
      }
    }
  }

  let inter = setInterval(e => { interval() }, 50)
}

document.addEventListener('DOMContentLoaded', function () {
  Array.from(document.querySelectorAll(".animation--text-typing")).forEach(el => {
    nAnimations.TextTyping(el)
  })
})


function UpdateHash() {
  let hash = location.hash || "ana";
  let list = Array.from(document.querySelectorAll(".navbar-menu")).map(e => e.getAttribute("href")).filter(e => e != "" && e != null).filter(e => e.startsWith("#")).map(e => e.substring(1))
  let elements = list.map(e => document.querySelector("#" + e)).filter(e => e != null)
  // find nearest element
  let nearest = elements.reduce((a, b) => Math.abs(a.getBoundingClientRect().top) < Math.abs(b.getBoundingClientRect().top) ? a : b)
  let nearestId = nearest.getAttribute("id")
  // update navbar
  let active = document.querySelector(".navbar-menu[href='#" + nearestId + "']")
  if (active && active.classList.contains("active") == false) {
    active.classList.add("active")
  }
  document.querySelectorAll(".navbar-menu").forEach(e => {
    if (e == active) return;
    if (e.classList.contains("active"))
      e.classList.remove("active")
  })


}
setInterval(() => { UpdateHash() }, 100);