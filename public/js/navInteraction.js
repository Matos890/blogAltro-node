const nav = document.querySelector('nav');
console.log("hello");
export function navSticky() {
  const handleHover = function (e) {
    if (e.target.classList.contains("nav__link")) {
      const link = e.target;
      const siblings = document.querySelectorAll(".nav__link");
      //passing arguments this.
      siblings.forEach((el) => {
        if (el != link) el.style.opacity = this;
      });
      logo.style.opacity = this;
    }
  };
  nav.addEventListener("mouseover", handleHover.bind(0.2));
  nav.addEventListener("mouseout", handleHover.bind(1));
  const header = document.querySelector("header");
  const navWrapper = document.querySelector(".navToStylize");
  const mainContent = document.querySelector(".mainContent");
  const navHeight = navWrapper.getBoundingClientRect().height;
  const altroIcon = document.querySelector(".altroIcon");
  const stickyNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      navWrapper.classList.add("sticky");
      console.log("sticky fatto");
    } else {
      navWrapper.classList.remove("sticky");
      console.log("qualcosa è andato storto");
    }
  };
  const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `${window.innerHeight}px`, //accept only px
  });
  headerObserver.observe(header);
}
