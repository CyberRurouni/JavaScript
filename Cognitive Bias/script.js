export default class CognitiveBias {
  products(content) {
    const products = `
  <div class="phones">
    <div class="product">
      <div class="phone simple-phone">
        <div class="notch"></div>
        <div class="screen">
          <i class="fas fa-mobile-alt"></i>
        </div>
        <div class="button"></div>
      </div>
      <div class="details">
        <div class="info">
          <div class="likes">
            <i class="fas fa-heart"></i>
            <div class="num">950</div>
          </div>
          <div class="bought">
            <i class="fas fa-shopping-cart"></i>
            <div class="num">650</div>
          </div>
        </div>
        <div class="info">
          <div class="rating">
            <i class="fas fa-star"></i>
            <div class="num">4.5</div>
          </div>
          <div class="reviews">
            <i class="fas fa-comment"></i>
            <div class="num">280</div>
          </div>
        </div>
        <div class="price">$1000</div>
      </div>
    </div> 
    <div class="product luxury">
      <div class="phone luxury-phone">
        <div class="tag"></div>
        <div class="notch"></div>
        <div class="screen">
          <i class="fas fa-mobile-alt"></i>
        </div>
        <div class="button"></div>
      </div>
      <div class="details">
        <div class="info">
          <div class="likes">
            <i class="fas fa-heart"></i>
            <div class="num"></div>
            <div class="animation-container"></div>
          </div>
          <div class="bought">
            <i class="fas fa-shopping-cart"></i>
            <div class="num"></div>
            <div class="animation-container"></div>
          </div>
        </div>
        <div class="info">
          <div class="rating">
            <i class="fas fa-star"></i>
            <div class="num">4.8</div>
          </div>
          <div class="reviews">
            <i class="fas fa-comment"></i>
            <div class="num"></div>
            <div class="animation-container"></div>
          </div>
        </div>
        <div class="price">$999.99</div>
      </div>
    </div>
  </div>
</div>`;

    content.innerHTML = products;
    const container = content.querySelector(".phones");
    if (container) {
      container.classList.add("fade-in");
      this.luxuryProduct(content);
    }
  }
  Influence(content) {
    const changes = document.createElement("div");
    changes.classList.add("changes");
    changes.style.display = "flex";
    changes.style.justifyContent = "center";
    changes.style.alignItems = "center";
    changes.style.flexDirection = "column";
    changes.style.gap = "5rem";

    // Append 'changes' to 'content'
    content.appendChild(changes);

    const change1 = `
    <div class='change-item'>
      <span class="old-value"><i class="fas fa-heart">1.1k</i></span>
      <span class="arrow">=></span>
      <span class="new-value"><i class="fas fa-heart">1.2k</i></span>
    </div>
    `;
    const change2 = `
    <div class='change-item'>
      <span class="old-value"><i class="fas fa-shopping-cart">820</i></span>
      <span class="arrow">=></span>
      <span class="new-value"><i class="fas fa-shopping-cart">820</i></span>
    </div>
    `;
    const change3 = `
    <div class='change-item'>
      <span class="old-value"><i class="fas fa-comments">405</i></span>
      <span class="arrow">=></span>
      <span class="new-value"><i class="fas fa-comments">420</i></span>
    </div>
    `;

    const changeDetector = (selector) => {
      const element = changes.querySelector(selector);
      if (element) {
        element.classList.add("fade-in");
      }
    };

    changes.innerHTML += change1;
    changeDetector(".change-item:first-child");

    setTimeout(() => {
      changes.innerHTML += change2;
      changeDetector(".change-item:nth-child(2)");

      setTimeout(() => {
        changes.innerHTML += change3;
        changeDetector(".change-item:nth-child(3)");
      }, 500);
    }, 500);
  }
  luxuryProduct(content) {
    const likes = content.querySelector(".luxury .likes .num");
    const bought = content.querySelector(".luxury .bought .num");
    const reviews = content.querySelector(".luxury .reviews .num");
    const tag = content.querySelector(".luxury .tag");

    const heart = content.querySelector(".luxury .likes .animation-container");
    const cart = content.querySelector(".luxury .bought .animation-container");
    const msg = content.querySelector(".luxury .reviews .animation-container");

    // Values
    let like = 1.1;
    let boughtCount = 820;
    let reviewsCount = 405;
    let remaining = 31;

    // Insert
    likes.textContent = `${like}k`;
    bought.textContent = boughtCount;
    reviews.textContent = reviewsCount;
    tag.textContent = `Last ${remaining} remaining`;

    function Increment(value, element, animationContainer, iconClass) {
      if (element.textContent.includes("k")) {
        element.textContent = `${value.toFixed(1)}k`;
      } else {
        element.textContent = `${value}`;
      }

      element.classList.add("pulse");
      setTimeout(() => {
        element.classList.remove("pulse");
      }, 300);

      animateIcon(animationContainer, iconClass);
    }

    function animateIcon(container, iconClass) {
      const icon = document.createElement("i");
      icon.className = `fas ${iconClass} animation-icon`;

      // Start position (center of the container)
      icon.style.left = "50%";
      icon.style.top = "50%";
      icon.style.transform = "translate(-50%, -50%)";

      container.appendChild(icon);

      // Generate random end position for trajectory
      const endX = Math.random() * 50; // px
      const endY = -50 - Math.random() * 50; // px, negative to go upwards

      // Set custom properties for the animation
      icon.style.setProperty("--tx", `${endX}px`);
      icon.style.setProperty("--ty", `${endY}px`);

      // Delayed start for smoother appearance
      setTimeout(() => {
        icon.style.animation = `float-trajectory 1s ease-out forwards`;
      }, 50);

      setTimeout(() => {
        icon.remove();
      }, 1050);
    }

    function updateTag(value) {
      tag.textContent = `Last ${value} remaining`;
      tag.classList.add("tag-pulse");
      setTimeout(() => {
        tag.classList.remove("tag-pulse");
      }, 300);
    }
    function updateTag(value) {
      tag.textContent = `Last ${value} remaining`;
      tag.classList.add("tag-pulse");

      if (value <= 10) {
        tag.style.backgroundColor = "#ff4757"; // More intense red
      }
      if (value <= 5) {
        tag.style.backgroundColor = "#ff1e1e"; // Even more intense red
      }

      setTimeout(() => {
        tag.classList.remove("tag-pulse");
      }, 300);
    }

    setTimeout(() => {
      Increment((boughtCount += 1), bought, cart, "fa-shopping-cart");
      remaining -= 1;
      updateTag(remaining);
      Increment((reviewsCount += 1), reviews, msg, "fa-comment");
      setTimeout(() => {
        Increment((boughtCount += 3), bought, cart, "fa-shopping-cart");
        remaining -= 3;
        updateTag(remaining);
        Increment((boughtCount += 0), bought, cart, "fa-shopping-cart");
        Increment((reviewsCount += 1), reviews, msg, "fa-comment");
        setTimeout(() => {
          Increment((boughtCount += 6), bought, cart, "fa-shopping-cart");
          remaining -= 6;
          updateTag(remaining);
          Increment((boughtCount += 0), bought, cart, "fa-shopping-cart");
          Increment((boughtCount += 0), bought, cart, "fa-shopping-cart");
          Increment((boughtCount += 0), bought, cart, "fa-shopping-cart");
          Increment((reviewsCount += 3), reviews, msg, "fa-comment");
          Increment((reviewsCount += 0), reviews, msg, "fa-comment");
          Increment((reviewsCount += 0), reviews, msg, "fa-comment");
          setTimeout(() => {
            Increment((boughtCount += 15), bought, cart, "fa-shopping-cart");
            remaining -= 15;
            updateTag(remaining);
            Increment((boughtCount += 0), bought, cart, "fa-shopping-cart");
            Increment((boughtCount += 0), bought, cart, "fa-shopping-cart");
            Increment((boughtCount += 0), bought, cart, "fa-shopping-cart");
            Increment((boughtCount += 0), bought, cart, "fa-shopping-cart");
            Increment((boughtCount += 0), bought, cart, "fa-shopping-cart");
            Increment((boughtCount += 0), bought, cart, "fa-shopping-cart");
            Increment((reviewsCount += 6), reviews, msg, "fa-comment");
            Increment((reviewsCount += 0), reviews, msg, "fa-comment");
            Increment((reviewsCount += 0), reviews, msg, "fa-comment");
            Increment((reviewsCount += 0), reviews, msg, "fa-comment");
            setTimeout(() => {
              Increment((like += 0.1), likes, heart, "fa-heart");
              Increment((boughtCount += 5), bought, cart, "fa-shopping-cart");
              remaining -= 5;
              updateTag(remaining);
              Increment((boughtCount += 0), bought, cart, "fa-shopping-cart");
              Increment((boughtCount += 0), bought, cart, "fa-shopping-cart");
              Increment((reviewsCount += 2), reviews, msg, "fa-comment");
              Increment((reviewsCount += 0), reviews, msg, "fa-comment");
            }, 500);
          }, 500);
        }, 500);
      }, 700);
    }, 1000);
  }
}
