const navLargeScreen = document.querySelector(".largeScreen");
const navSmallScreen = document.querySelector(".smallScreen");
const navWrapper = document.querySelector(".navToStylizeSmall");
const prettyLine = document.querySelectorAll(".prettyLine");
const header = document.querySelector("header");
const menuBurger = document.getElementById("menuToggle");
const modalMenu = document.querySelector(".modalMenu");
const modalWrapper = document.querySelector(".modalWrapper");
const burgerMenuWrapper = document.querySelector(".burgerMenuWrapper");
const closeBtn = document.querySelector(".close-btn");

export function navSizes() {
  function updateNav() {
    const screenWidth = window.innerWidth;
    console.log('screenwidth:',screenWidth)

    if (screenWidth > 960) {
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

    if (screenWidth > 600) {
      modalWrapper.style.display = "none"
      navSmallScreen.style.display = "none";
    }
  }

  function toggleMenu(open) {
    if (open) {
      modalWrapper.style.display = "flex";
      modalWrapper.style.visibility = "visible";
      modalWrapper.style.opacity = "1";
      modalMenu.classList.remove("hideMenu");
      modalMenu.classList.add("showModal");
    } else {
      modalWrapper.style.display = "none";
      modalWrapper.style.visibility = "hidden";
      modalWrapper.style.opacity = "0";
      modalMenu.classList.remove("showModal");
      modalMenu.classList.add("hideMenu");
    }
  }

  function stickyNav(entries) {
    const screenWidth = window.innerWidth;
    const [entry] = entries;
    if (!entry.isIntersecting) {
      navWrapper.classList.add("sticky");
      prettyLine.forEach((pretty, i) => {
        if (i === 1 && screenWidth < 800) {
          pretty.style.width = "70%";
        }
      });
    } else {
      navWrapper.classList.remove("sticky");
      prettyLine.forEach((pretty, i) => {
        if (i === 1 && screenWidth < 800) {
          pretty.style.width = "90%";
        }
      });
    }
  }

  // Inizializza gli eventi una sola volta
  window.addEventListener("resize", updateNav);
  menuBurger?.addEventListener("click", () => toggleMenu(true));
  closeBtn?.addEventListener("click", () => toggleMenu(false));

  const observer = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `${window.innerHeight}px`,
  });

  observer.observe(header);

  // Esegui una prima chiamata per aggiornare lo stato iniziale
  updateNav();
}
