const navLargeScreen = document.querySelector(".largeScreen");
const navSmallScreen = document.querySelector(".smallScreen");
const navWrapper = document.querySelector(".navToStylizeSmall");
const prettyLine = document.querySelectorAll(".prettyLine");
const header = document.querySelector("header");
const menuBurger = document.getElementById("menuToggle");
const modalMenu = document.querySelector(".modalMenu");
const modalWrapper = document.querySelector(".modalWrapper");
const burgerMenuWrapper = document.querySelector(".burgerMenuWrapper");

export function navSizes() {
  const screenWidth = window.innerWidth;
  if (screenWidth > 800) {
    navLargeScreen.style.display = "flex";
    navSmallScreen.style.display = "none";
  } else {
    navSmallScreen.style.display = "flex";
    navLargeScreen.style.display = "none";
  }
  if (screenWidth < 600) {
    navSmallScreen.style.display = "none";
    menuBurger.style.display = "block";
  } else {
    menuBurger.style.display = "none";
  } 
  
  modalMenu.classList.add("hideMenu");
  window.addEventListener("resize", navSizes);
  menuBurger.addEventListener("click", () => {
    modalWrapper.style.display = "flex";
    modalWrapper.style.visibility = "visible";
    modalWrapper.style.opacity = "1";
    modalMenu.classList.remove("hideMenu");

    modalMenu.classList.add("showModal");
    modalMenu.style.opacity = "1";
  });
  const closeBtn = document.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
    modalWrapper.style.display = "none";
    modalWrapper.style.visibility = "hidden";
    modalWrapper.style.opacity = "0";

    modalMenu.classList.remove("showModal");
    modalMenu.classList.add("hideMenu");
  });
  if (screenWidth > 600) {
    modalWrapper.style.display = "none";
  }

  const stickyNav1 = function (entries) {
    const screenWidth = window.innerWidth;
    const [entry] = entries;
    if (!entry.isIntersecting) {
      navWrapper.classList.add("sticky");
      prettyLine.forEach((pretty, i) => {
        if (i === 1 && screenWidth < 800) {
          pretty.style.setProperty("width", "70%", "important");
        }
      });
      console.log("sticky fatto");
    } else {
      navWrapper.classList.remove("sticky");
      console.log("qualcosa è andato storto");
      prettyLine.forEach((pretty, i) => {
        if (i === 1 && screenWidth < 800) {
          pretty.style.setProperty("width", "90%", "important");
        } else {
          console.log("cIo");
        }
      });
    }
  };

  const headerObserver = new IntersectionObserver(stickyNav1, {
    root: null,
    threshold: 0,
    rootMargin: `${window.innerHeight}px`,
  });

  headerObserver.observe(header);
  //   window.addEventListener("resize", stickyNav1);
}
