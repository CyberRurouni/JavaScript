export default class POC {
  stats(content) {
    const statsSection = `<div class = "stats-container">
          <div class="facebook">
            <div class="description"></div>
          </div>
          <div class="coca-cola">
          <div class="description"></div>
          </div>
        </div>`;
    content.innerHTML += statsSection;
    const facebookElement = content.querySelector(".facebook");
    const cocaElement = content.querySelector(".coca-cola");
    if (facebookElement) {
      const description = facebookElement.querySelector(".description");
      this.typeWriter(description, "Facebook needs trust & engagement");
      setTimeout(() => {
        const info = ` <div class = "info">
            <div class="icon">
              <img src="./psychology of colors/pics/facebook.png" />
            </div>
            <div class="downloads">
              <span class="data">5B+</span>
              <span class="platform">
                on Play Store
                <img src="./psychology of colors/pics/playstore.png" />
              </span>
            </div>
            </div>`;
        facebookElement.innerHTML += info;
        if (facebookElement.querySelector(".info")) {
          const infoElement = facebookElement.querySelector(".info");
          infoElement.classList.add("fade-in");
        }
        this.animateValues(content, ".facebook");
      }, 1000);
    }
    setTimeout(() => {
      if (cocaElement) {
        const description = cocaElement.querySelector(".description");
        this.typeWriter(
          description,
          "Coca-Cola needs excited youth to generate $."
        );
        setTimeout(() => {
          const info = ` <div class = "info">
            <div class="icon">
              <img src="./psychology of colors/pics/coke.png" />
            </div>
            <div class="revenue">
              <span class="data">45B+</span>
              <span class="annual">Annual Revenue Record of 2023</span>
            </div>
          </div>`;
          cocaElement.innerHTML += info;
          if (cocaElement.querySelector(".info")) {
            const infoElement = cocaElement.querySelector(".info");
            infoElement.classList.add("fade-in");
          }
          this.animateValues(content, ".coca-cola");
        }, 1000);
      }
    }, 1000);
  }

  animateValues(content, className) {
    const element = content.querySelector(`${className} .data`);
    if (element) {
      const finalValue = parseInt(element.textContent);
      const duration = 1000;
      let initialValue = 0;
      this.animate(initialValue, finalValue, duration, element);
    }
  }

  animate(initialValue, finalValue, duration, element) {
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      if (progress < 1) {
        const currentValue =
          initialValue + (finalValue - initialValue) * progress;
        element.textContent = parseFloat(currentValue.toFixed(0)) + "B+";
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  typeWriter(element, description) {
    const p = element;
    const material = description;
    let typingDelay = 20;

    function typeContent() {
      let charIndex = 0;

      const type = () => {
        if (charIndex < material.length) {
          p.textContent += material.charAt(charIndex);
          charIndex++;
          setTimeout(type, typingDelay);
        }
      };

      type();
    }

    typeContent();
  }
}
