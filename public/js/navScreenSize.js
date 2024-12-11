const navLargeScreen = document.querySelector(".largeScreen");
const navSmallScreen = document.querySelector(".smallScreen");
const navWrapper = document.querySelector(".navToStylizeSmall");
const prettyLine = document.querySelectorAll(".prettyLine");
const header = document.querySelector("header");

export function navSizes() {
  const screenWidth = window.innerWidth;
  if (screenWidth > 800) {
    navLargeScreen.style.display = "flex";
    navSmallScreen.style.display = "none";
  } else {
    navSmallScreen.style.display = "flex";
    navLargeScreen.style.display = "none";
  }

  window.addEventListener("resize", navSizes);

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
        }
        else{
            console.log('cIo')
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
