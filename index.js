document.addEventListener("click", (event) => {
  const { target } = event;
  if (target.classList.contains("easy")) {
    document.querySelector(".menu").classList.add("hidden");
    maze("easy");
  } else if (target.classList.contains("medium")) {
    document.querySelector(".menu").classList.add("hidden");
    maze("medium");
  } else if (target.classList.contains("hard")) {
    document.querySelector(".menu").classList.add("hidden");
    maze("hard");
  } else if (target.classList.contains("expert")) {
    document.querySelector(".menu").classList.add("hidden");
    maze("expert");
  }
  // } else if (target.classList.contains("playagain")) {
  //   document.querySelector(".winner").classList.add("hidden");
  //   document.querySelector(".menu").classList.remove("hidden");
  // }
});
document.addEventListener("touchstart", (event) => {
  const { target } = event;
  if (target.classList.contains("easy")) {
    document.querySelector(".menu").classList.add("hidden");
    maze("easy");
  } else if (target.classList.contains("medium")) {
    document.querySelector(".menu").classList.add("hidden");
    maze("medium");
  } else if (target.classList.contains("hard")) {
    document.querySelector(".menu").classList.add("hidden");
    maze("hard");
  } else if (target.classList.contains("expert")) {
    document.querySelector(".menu").classList.add("hidden");
    maze("expert");
  }
  // } else if (target.classList.contains("playagain")) {
  //   document.querySelector(".winner").classList.add("hidden");
  //   document.querySelector(".menu").classList.remove("hidden");
  // }
});
