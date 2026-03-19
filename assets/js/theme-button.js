(() => {
  const func = (root, initTheme, changeTheme) => {
    const $ = (s) => {
      let dom = root.querySelectorAll(s);
      return dom.length == 1 ? dom[0] : dom;
    };
    let mainButton = $(".main-button");
    let daytimeBackground = $(".daytime-background");
    let cloud = $(".cloud");
    let cloudList = $(".cloud-son");
    let cloudLight = $(".cloud-light");
    let components = $(".components");
    let moon = $(".moon");
    let stars = $(".stars");
    let star = $(".star");
    let isMoved = false;
    let isClicked = false;
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      toggleThemeBasedOnSystem();
    });
    const toggleThemeBasedOnSystem = () => {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        if (!isMoved) {
          components.onclick();
        }
      } else {
        if (isMoved) {
          components.onclick();
        }
      }
    };
    components.onclick = () => {
      if (isMoved) {
        mainButton.style.transform = "translateX(0)";
        mainButton.style.backgroundColor = "rgba(255, 195, 35,1)";

        mainButton.style.boxShadow =
          "3em 3em 5em rgba(0, 0, 0, 0.5), inset  -3em -5em 3em -3em rgba(0, 0, 0, 0.5), inset  4em 5em 2em -2em rgba(255, 230, 80,1)";

        daytimeBackground[0].style.transform = "translateX(0)";
        daytimeBackground[1].style.transform = "translateX(0)";
        daytimeBackground[2].style.transform = "translateX(0)";
        cloud.style.transform = "translateY(10em)";
        cloudLight.style.transform = "translateY(10em)";
        components.style.backgroundColor = "rgba(70, 133, 192,1)";

        moon[0].style.opacity = "0";
        moon[1].style.opacity = "0";
        moon[2].style.opacity = "0";

        stars.style.transform = "translateY(-125em)";
        stars.style.opacity = "0";

        changeTheme("light");
      } else {
        mainButton.style.transform = "translateX(110em)";
        mainButton.style.backgroundColor = "rgba(195, 200,210,1)";

        mainButton.style.boxShadow =
          "3em 3em 5em rgba(0, 0, 0, 0.5), inset  -3em -5em 3em -3em rgba(0, 0, 0, 0.5), inset  4em 5em 2em -2em rgba(255, 255, 210,1)";

        daytimeBackground[0].style.transform = "translateX(110em)";
        daytimeBackground[1].style.transform = "translateX(80em)";
        daytimeBackground[2].style.transform = "translateX(50em)";
        cloud.style.transform = "translateY(80em)";
        cloudLight.style.transform = "translateY(80em)";
        components.style.backgroundColor = "rgba(25,30,50,1)";

        moon[0].style.opacity = "1";
        moon[1].style.opacity = "1";
        moon[2].style.opacity = "1";

        stars.style.transform = "translateY(-62.5em)";
        stars.style.opacity = "1";

        changeTheme("dark");
      }

      isClicked = true;

      setTimeout(function () {
        isClicked = false;
      }, 500);
      isMoved = !isMoved;
    };

    mainButton.addEventListener("mousemove", function () {
      if (isClicked) return;

      if (isMoved) {
        mainButton.style.transform = "translateX(100em)";
        daytimeBackground[0].style.transform = "translateX(100em)";
        daytimeBackground[1].style.transform = "translateX(73em)";
        daytimeBackground[2].style.transform = "translateX(46em)";

        star[0].style.top = "10em";
        star[0].style.left = "36em";
        star[1].style.top = "40em";
        star[1].style.left = "87em";
        star[2].style.top = "26em";
        star[2].style.left = "16em";
        star[3].style.top = "38em";
        star[3].style.left = "63em";
        star[4].style.top = "20.5em";
        star[4].style.left = "72em";
        star[5].style.top = "51.5em";
        star[5].style.left = "35em";
      } else {
        mainButton.style.transform = "translateX(10em)";
        daytimeBackground[0].style.transform = "translateX(10em)";
        daytimeBackground[1].style.transform = "translateX(7em)";
        daytimeBackground[2].style.transform = "translateX(4em)";

        cloudList[0].style.right = "-24em";
        cloudList[0].style.bottom = "10em";
        cloudList[1].style.right = "-12em";
        cloudList[1].style.bottom = "-27em";
        cloudList[2].style.right = "17em";
        cloudList[2].style.bottom = "-43em";
        cloudList[3].style.right = "46em";
        cloudList[3].style.bottom = "-39em";
        cloudList[4].style.right = "70em";
        cloudList[4].style.bottom = "-65em";
        cloudList[5].style.right = "109em";
        cloudList[5].style.bottom = "-54em";
        cloudList[6].style.right = "-23em";
        cloudList[6].style.bottom = "10em";
        cloudList[7].style.right = "-11em";
        cloudList[7].style.bottom = "-26em";
        cloudList[8].style.right = "18em";
        cloudList[8].style.bottom = "-42em";
        cloudList[9].style.right = "47em";
        cloudList[9].style.bottom = "-38em";
        cloudList[10].style.right = "74em";
        cloudList[10].style.bottom = "-64em";
        cloudList[11].style.right = "110em";
        cloudList[11].style.bottom = "-55em";
      }
    });

    mainButton.addEventListener("mouseout", function () {
      if (isClicked) {
        return;
      }
      if (isMoved) {
        mainButton.style.transform = "translateX(110em)";
        daytimeBackground[0].style.transform = "translateX(110em)";
        daytimeBackground[1].style.transform = "translateX(80em)";
        daytimeBackground[2].style.transform = "translateX(50em)";

        star[0].style.top = "11em";
        star[0].style.left = "39em";
        star[1].style.top = "39em";
        star[1].style.left = "91em";
        star[2].style.top = "26em";
        star[2].style.left = "19em";
        star[3].style.top = "37em";
        star[3].style.left = "66em";
        star[4].style.top = "21em";
        star[4].style.left = "75em";
        star[5].style.top = "51em";
        star[5].style.left = "38em";
      } else {
        mainButton.style.transform = "translateX(0em)";
        daytimeBackground[0].style.transform = "translateX(0em)";
        daytimeBackground[1].style.transform = "translateX(0em)";
        daytimeBackground[2].style.transform = "translateX(0em)";

        cloudList[0].style.right = "-20em";
        cloudList[0].style.bottom = "10em";
        cloudList[1].style.right = "-10em";
        cloudList[1].style.bottom = "-25em";
        cloudList[2].style.right = "20em";
        cloudList[2].style.bottom = "-40em";
        cloudList[3].style.right = "50em";
        cloudList[3].style.bottom = "-35em";
        cloudList[4].style.right = "75em";
        cloudList[4].style.bottom = "-60em";
        cloudList[5].style.right = "110em";
        cloudList[5].style.bottom = "-50em";
        cloudList[6].style.right = "-20em";
        cloudList[6].style.bottom = "10em";
        cloudList[7].style.right = "-10em";
        cloudList[7].style.bottom = "-25em";
        cloudList[8].style.right = "20em";
        cloudList[8].style.bottom = "-40em";
        cloudList[9].style.right = "50em";
        cloudList[9].style.bottom = "-35em";
        cloudList[10].style.right = "75em";
        cloudList[10].style.bottom = "-60em";
        cloudList[11].style.right = "110em";
        cloudList[11].style.bottom = "-50em";
      }
    });

    const getRandomDirection = () => {
      const directions = ["2em", "-2em"];
      return directions[Math.floor(Math.random() * directions.length)];
    };

    const moveElementRandomly = (element) => {
      const randomDirectionX = getRandomDirection();
      const randomDirectionY = getRandomDirection();
      element.style.transform = `translate(${randomDirectionX}, ${randomDirectionY})`;
    };

    const cloudSons = root.querySelectorAll(".cloud-son");
    setInterval(() => {
      cloudSons.forEach(moveElementRandomly);
    }, 1000);

    if (initTheme === "dark") {
      components.onclick();
    }
  };

  class ThemeButton extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      const initTheme = this.getAttribute("value") || "light";
      const size = +this.getAttribute("size") || 3;
      const shadow = this.attachShadow({ mode: "closed" });
      const container = document.createElement("div");
      container.setAttribute("class", "container");
      container.setAttribute("style", `font-size: ${(size / 3).toFixed(2)}px`);
      container.innerHTML =
        '<div class="components"><div class="main-button"><div class="moon"></div><div class="moon"></div><div class="moon"></div></div><div class="daytime-background"></div><div class="daytime-background"></div><div class="daytime-background"></div><div class="cloud"><div class="cloud-son"></div><div class="cloud-son"></div><div class="cloud-son"></div><div class="cloud-son"></div><div class="cloud-son"></div><div class="cloud-son"></div></div><div class="cloud-light"><div class="cloud-son"></div><div class="cloud-son"></div><div class="cloud-son"></div><div class="cloud-son"></div><div class="cloud-son"></div><div class="cloud-son"></div></div><div class="stars"><div class="star big"><div class="star-son"></div><div class="star-son"></div><div class="star-son"></div><div class="star-son"></div></div><div class="star big"><div class="star-son"></div><div class="star-son"></div><div class="star-son"></div><div class="star-son"></div></div><div class="star medium"><div class="star-son"></div><div class="star-son"></div><div class="star-son"></div><div class="star-son"></div></div><div class="star medium"><div class="star-son"></div><div class="star-son"></div><div class="star-son"></div><div class="star-son"></div></div><div class="star small"><div class="star-son"></div><div class="star-son"></div><div class="star-son"></div><div class="star-son"></div></div><div class="star small"><div class="star-son"></div><div class="star-son"></div><div class="star-son"></div><div class="star-son"></div></div></div></div>';
      const style = document.createElement("style");
      style.textContent =
        "* { margin: 0; padding: 0; transition: 0.7s; -webkit-tap-highlight-color:rgba(0,0,0,0); } .container { position: relative; width: 180em; height: 70em; display: inline-block; vertical-align: middle; transform: translate3d(0, 0, 0); } .components{ position: relative; width: 180em; height: 70em; background-color: rgba(70, 133, 192,1); border-radius: 100em; box-shadow: inset 0 0 5em 3em rgba(0, 0, 0, 0.5); overflow: hidden; transition: 0.7s; transition-timing-function: cubic-bezier( 0,0.5, 1,1); cursor: pointer; } .main-button{ margin: 7.5em 0 0 7.5em; width: 55em; height:55em; background-color: rgba(255, 195, 35,1); border-radius: 50%; box-shadow:3em 3em 5em rgba(0, 0, 0, 0.5), inset -3em -5em 3em -3em rgba(0, 0, 0, 0.5), inset 4em 5em 2em -2em rgba(255, 230, 80,1); transition: 1.0s; transition-timing-function: cubic-bezier(0.56, 1.35, 0.52, 1.00); } .moon{ position: absolute; background-color: rgba(150, 160, 180, 1); box-shadow:inset 0em 0em 1em 1em rgba(0, 0, 0, 0.3) ; border-radius: 50%; transition: 0.5s; opacity: 0; } .moon:nth-child(1){ top: 7.5em; left: 25em; width: 12.5em; height: 12.5em; } .moon:nth-child(2){ top: 20em; left: 7.5em; width: 20em; height: 20em; } .moon:nth-child(3){ top: 32.5em; left: 32.5em; width: 12.5em; height: 12.5em; } .daytime-background { position: absolute; border-radius: 50%; transition: 1.0s; transition-timing-function: cubic-bezier(0.56, 1.35, 0.52, 1.00); } .daytime-background:nth-child(2){ top: -20em; left: -20em; width: 110em; height:110em; background-color: rgba(255, 255, 255,0.2); z-index: -2; } .daytime-background:nth-child(3){ top: -32.5em; left: -17.5em; width: 135em; height:135em; background-color: rgba(255, 255, 255,0.1); z-index: -3; } .daytime-background:nth-child(4){ top: -45em; left: -15em; width: 160em; height:160em; background-color: rgba(255, 255, 255,0.05); z-index: -4; } .cloud,.cloud-light{ transform: translateY(10em); transition: 1.0s; transition-timing-function: cubic-bezier(0.56, 1.35, 0.52, 1.00); } .cloud{ position: absolute; top: 0; left: 0; width: 100%; height: 100%; } .cloud-son{ position: absolute; background-color: rgba(255, 255, 255, 1); border-radius: 50%; box-shadow: inset -0.5em -1em 2em -0.5em rgba(0, 0, 0, 0.2); } .cloud-son:nth-child(1){ top: 10em; right: -20em; width: 25em; height: 25em; } .cloud-son:nth-child(2){ top: 25em; right: -10em; width: 30em; height: 30em; } .cloud-son:nth-child(3){ top: 40em; right: 20em; width: 25em; height: 25em; } .cloud-son:nth-child(4){ top: 35em; right: 50em; width: 30em; height: 30em; } .cloud-son:nth-child(5){ top: 60em; right: 75em; width: 25em; height: 25em; } .cloud-son:nth-child(6){ top: 50em; right: 110em; width: 30em; height: 30em; } .cloud-light{ position: absolute; top: 0; left: 0; width: 100%; height: 100%; filter: blur(1.2em); } .cloud-light .cloud-son{ background-color: rgba(255, 255, 255, 0.8); box-shadow: inset -0.5em -1em 2em -0.5em rgba(0, 0, 0, 0.1); } .stars{ position: absolute; top: 62.5em; left: 0; width: 100%; height: 100%; transform: translateY(-125em); opacity: 0; } .star{ position: absolute; background-color: white; border-radius: 50%; box-shadow: 0 0 1em 0.1em white; overflow: hidden; } .star.big{ width: 2.5em; height: 2.5em; } .star.medium{ width: 1.8em; height: 1.8em; } .star.small{ width: 1.2em; height: 1.2em; } .star:nth-child(1){ top: 11em; left: 39em; } .star:nth-child(2){ top: 39em; left: 91em; } .star:nth-child(3){ top: 26em; left: 19em; } .star:nth-child(4){ top: 37em; left: 66em; } .star:nth-child(5){ top: 21em; left: 75em; } .star:nth-child(6){ top: 51em; left: 38em; } .star-son{ position: absolute; width: 100%; height: 100%; background-color: white; } .star-son:nth-child(1){ transform: rotate(0deg); } .star-son:nth-child(2){ transform: rotate(45deg); } .star-son:nth-child(3){ transform: rotate(90deg); } .star-son:nth-child(4){ transform: rotate(135deg); } .star.big .star-son{ animation: star-light-big 2s infinite; } .star.medium .star-son{ animation: star-light-medium 2s infinite; } .star.small .star-son{ animation: star-light-small 2s infinite; } @keyframes star-light-big { 0% { transform: scale(1); } 50% { transform: scale(0.2); } 100% { transform: scale(1); } } @keyframes star-light-medium { 0% { transform: scale(0.8); } 50% { transform: scale(0.1); } 100% { transform: scale(0.8); } } @keyframes star-light-small { 0% { transform: scale(0.6); } 50% { transform: scale(0.05); } 100% { transform: scale(0.6); } }";
      const changeTheme = (detail) => {
        this.dispatchEvent(new CustomEvent("change", { detail }));
      };
      func(container, initTheme, changeTheme);
      shadow.appendChild(style);
      shadow.appendChild(container);
    }
  }

  customElements.define("theme-button", ThemeButton);
})();
