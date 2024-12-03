const nav = document.querySelector("nav");
console.log("hello");
export function navSticky() {
  const siblings = document.querySelectorAll(".nav__link");
  // Opacity
  const handleHover = function (e) {
    if (e.target.classList.contains("nav__link")) {
      const link = e.target;
      //passing arguments this.
      siblings.forEach((el) => {
        if (el != link) el.style.opacity = this;
      });
    }
  };
  nav.addEventListener("mouseover", handleHover.bind(0.2));
  nav.addEventListener("mouseout", handleHover.bind(1));
  ///sticky
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
  //Afters and befores to be activated
  let titleSection = document.querySelector('section');


  console.log('eccomi',titleSection)
if(nav){
  siblings.forEach((element)=>{
    console.log(element.innerHTML)
    console.log(element.classList.contains(titleSection))
    if(titleSection.classList.contains(element.innerHTML.trim())){
      console.log('is true')
      element.classList.add('isActivated')
    }
  else{
    element.classList.remove('isActivated')
  }
  })}
}
