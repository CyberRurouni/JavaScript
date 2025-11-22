export default class decisionFatigue {
  hardChoice(content) {
    const hardChoice = `<div class="hard-choice">
      <div class="products">
        <div class="product">
          <div class="watch">
            <div class="inner-face" style="background-color: #f00">
              <div class="brand">Developers Mania</div>
              <div class="markers"></div>
              <div class="hand hour"></div>
              <div class="hand minute"></div>
              <div class="hand second"></div>
              <div class="center"></div>
              <div class="digital-time"></div>
            </div>
          </div>
          <div class="title">Vivid Red Watch</div>
          <div class="description">
            Bright red with a bold, striking appearance.
          </div>
          <div class="price">$99.99</div>
          <button class="cta">Add to Cart</button>
        </div>
        <div class="product">
          <div class="watch">
            <div class="inner-face" style="background-color: #f34">
              <div class="brand">Developers Mania</div>
              <div class="markers"></div>
              <div class="hand hour"></div>
              <div class="hand minute"></div>
              <div class="hand second"></div>
              <div class="center"></div>
              <div class="digital-time"></div>
            </div>
          </div>
          <div class="title">Flame Red Watch</div>
          <div class="description">
            Warm red hue with a dynamic, fiery tone.
          </div>
          <div class="price">$99.99</div>
          <button class="cta">Add to Cart</button>
        </div>
        <div class="product">
          <div class="watch">
            <div class="inner-face" style="background-color: #f54">
              <div class="brand">Developers Mania</div>
              <div class="markers"></div>
              <div class="hand hour"></div>
              <div class="hand minute"></div>
              <div class="hand second"></div>
              <div class="center"></div>
              <div class="digital-time"></div>
            </div>
          </div>
          <div class="title">Brick Red Watch</div>
          <div class="description">
            Muted red with an earthy, sophisticated shade.
          </div>
          <div class="price">$99.99</div>
          <button class="cta">Add to Cart</button>
        </div>
      </div>
    </div>`;
    content.innerHTML = hardChoice;
    const container = content.querySelector(".hard-choice");
    if (container) {
      container.classList.add("fade-in");
      this.createMarkers(content);
      this.initializeWatches(content);
      this.updateWatch(content);
    }
  }
  easyChoice(content) {
    const easyChoice = `<div class="easy-choice">
      <div class="products">
        <div class="product">
          <div class="watch">
            <div class="inner-face" style="background-color: #f00">
              <div class="brand">Developers Mania</div>
              <div class="markers"></div>
              <div class="hand hour"></div>
              <div class="hand minute"></div>
              <div class="hand second"></div>
              <div class="center"></div>
              <div class="digital-time"></div>
            </div>
          </div>
          <div class="title">Vivid Red Watch</div>
          <div class="description" data-type="true"></div>
          <div class="price">$99.99</div>
          <button class="cta">Add to Cart</button>
        </div>
        <div class="product">
          <div class="watch">
            <div class="inner-face" style="background-color: #ea9902">
              <div class="brand">Developers Mania</div>
              <div class="markers"></div>
              <div class="hand hour"></div>
              <div class="hand minute"></div>
              <div class="hand second"></div>
              <div class="center"></div>
              <div class="digital-time"></div>
            </div>
          </div>
          <div class="title">Amber Watch</div>
          <div class="description" data-type="true"></div>
          <div class="price">$99.99</div>
          <button class="cta">Add to Cart</button>
        </div>
      </div>
    </div>`;
    content.innerHTML = easyChoice;
    const container = content.querySelector(".easy-choice");
    if (container) {
      container.classList.add("fade-in");
      this.createMarkers(content);
      this.initializeWatches(content);
      this.updateWatch(content);
      this.typeDescription();
    }
  }
  createMarkers(watch) {
    const markers = watch.querySelector(".markers");
    for (let i = 0; i < 60; i++) {
      const marker = document.createElement("div");
      marker.className = "marker";
      marker.style.transform = `rotate(${i * 6}deg)`;
      markers.appendChild(marker);
    }
  }

  updateWatch(watch) {
    const hourHand = watch.querySelector(".hour");
    const minuteHand = watch.querySelector(".minute");
    const secondHand = watch.querySelector(".second");
    const digitalTime = watch.querySelector(".digital-time");

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    const hourDegrees = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;
    const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
    const secondDegrees = (seconds / 60) * 360 + (milliseconds / 1000) * 6;

    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;

    digitalTime.textContent = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  initializeWatches(content) {
    const watches = content.querySelectorAll(".watch");

    // Use arrow function to maintain the correct `this` context
    watches.forEach((watch) => this.createMarkers(watch));

    setInterval(() => {
      watches.forEach((watch) => this.updateWatch(watch));
    }, 50);
  }

  typeDescription() {
    const productDescription = document.querySelectorAll("[data-type='true']");
    const descriptions = [
      "If you are a fan of Brand(x) then this is for you.",
      "Most Sold Watch, If you want to be trendy then this is for you.",
    ];

    let typingDelay = 20;

    const typeWriter = (pd, description) => {
      let charIndex = 0;

      const type = () => {
        if (charIndex < description.length) {
          pd.textContent += description.charAt(charIndex);
          charIndex++;
          setTimeout(type, typingDelay);
        }
      };

      type();
    };

    productDescription.forEach((pd, index) => {
      typeWriter(pd, descriptions[index]);
    });
  }
}
