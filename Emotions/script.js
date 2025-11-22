export default class Emotions {
  /////// Role of emotions
  textAnimation(textContainer) {
    const words = ["Reconcile", " with", " your", " friends"];
    const colors = ["#45ca22", "#fff", "#fff", "#ea9902"];

    function setupText() {
      words.forEach((word, index) => {
        const wordSpan = document.createElement("span");
        wordSpan.style.color = colors[index];
        wordSpan.style.display = "inline-block"; // Ensures wordSpan acts as a block for transformation

        for (let char of word) {
          const charSpan = document.createElement("span");
          charSpan.style.display = "inline-block"; // Ensures charSpan acts as a block for transformation
          charSpan.style.transform = "rotate(90deg)";
          charSpan.style.transition =
            "transform 0.5s linear, opacity 0.5s linear";
          charSpan.textContent = char;
          charSpan.classList.add("char");
          wordSpan.appendChild(charSpan);
        }

        textContainer.appendChild(wordSpan);
      });
    }

    setupText();

    function revelText() {
      const chars = document.querySelectorAll(".char");
      chars.forEach((char, index) => {
        char.style.opacity = "0"; // Start with invisible characters
        setTimeout(() => {
          char.style.opacity = "1";
          char.style.transform = "rotate(0deg)"; // Rotate back to the original position
        }, 50 * index);
      });
    }

    revelText();
  }
  showZeroEmotions(content) {
    const zeroEmotion = `
          <div class="zero-emotions">
            <div class="product">
              <img src="Emotions/pics/Untitled design.png" alt="" />
            </div>
            <div class="cta">
              <button>Buy</button>
            </div>
          </div>
        `;
    content.innerHTML += zeroEmotion;
    const zeroEmotionsElement = content.querySelector(".zero-emotions");
    if (zeroEmotionsElement) {
      zeroEmotionsElement.classList.add("fade-in");
    }
  }
  showEmotions(content) {
    const emotions = `
       <div class="emotions">
        <div class="emotional-container">
          <div class="emotional-product">
            <img
             src="Emotions/pics/Come one, Come all_ Boxcar Social - Life & Thyme.jfif"
              alt=""
             />
        </div>
         <div class="emotional-text"></div>
      </div>
      <div id="enjoy">
      <button>Enjoy</button>
      </div>
    </div>
        `;
    content.innerHTML += emotions;
    const textContainer = content.querySelector(".emotional-text");
    this.textAnimation(textContainer);
    const emotionalElement = content.querySelector(".emotions");
    if (emotionalElement) {
      emotionalElement.classList.add("fade-in");
    }
  }
}
