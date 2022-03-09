document.addEventListener("click", (event) => {
  const className = event.path[0];
  if (className.classList.contains("easy")) {
    document.querySelector(".menu").classList.add("hidden");
    maze("easy");
  } else if (className.classList.contains("medium")) {
    document.querySelector(".menu").classList.add("hidden");
    maze("medium");
  } else if (className.classList.contains("hard")) {
    document.querySelector(".menu").classList.add("hidden");
    maze("hard");
  } else if (className.classList.contains("expert")) {
    document.querySelector(".menu").classList.add("hidden");
    maze("expert");
  }
  // } else if (className.classList.contains("playagain")) {
  //   document.querySelector(".winner").classList.add("hidden");
  //   document.querySelector(".menu").classList.remove("hidden");
  // }
});
document.addEventListener("touchstart", (event) => {
  const className = event.path[0];
  if (className.classList.contains("easy")) {
    document.querySelector(".menu").classList.add("hidden");
    maze("easy");
  } else if (className.classList.contains("medium")) {
    document.querySelector(".menu").classList.add("hidden");
    maze("medium");
  } else if (className.classList.contains("hard")) {
    document.querySelector(".menu").classList.add("hidden");
    maze("hard");
  } else if (className.classList.contains("expert")) {
    document.querySelector(".menu").classList.add("hidden");
    maze("expert");
  }
  // } else if (className.classList.contains("playagain")) {
  //   document.querySelector(".winner").classList.add("hidden");
  //   document.querySelector(".menu").classList.remove("hidden");
  // }
});
