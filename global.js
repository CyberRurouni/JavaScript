import POC from "./psychology of colors/POC.js";
import Emotions from "./Emotions/script.js";
import SensoryBranding from "./SensoryBranding/script.js";
import decisionFatigue from "./Decision Fatique/script.js";
import CognitiveBias from "./Cognitive Bias/script.js";
import NLP from "./NLP/NLP.js";

const poc = new POC();
const emotions = new Emotions();
const SB = new SensoryBranding();
const df = new decisionFatigue();
const cb = new CognitiveBias();
const nlp = new NLP();
const global = () => {
  document.addEventListener("DOMContentLoaded", () => {
    /////////// Psychology of Colors

    //// Variables
    const cards = document.querySelectorAll(".card");
    const content = document.querySelector(".content");

    //// Initiators

    // for Card Number
    let num;

    // text Animation necessities
    let typingTimeout;
    let indexLearnMore = 0;
    let typingDelay = 30;

    // for text Animation
    const firstPhrase0 =
      "Have you ever wondered why world leading brands are so meticulous with designs, specific colors, etc? If you look at Facebook, it uses a blue color for its icon. Why blue? Why not red? Now if we analyze the Coca-Cola brand, it uses red color, not blue. Why?";
    const secondPhrase0 =
      "The reason why they lead the world is that they are selective and sensitive in every manner. The color blue shows trust, and the color red shows excitement, and you see both colors play their roles perfectly.";
    const text0 = [firstPhrase0, secondPhrase0];
    const firstPhrase1 = "Will you choose this:";
    const secondPhrase1 = "over This?";
    const text1 = [firstPhrase1, secondPhrase1];
    const firstPhrase2 =
      "Imagine you saw ads of the Digital Marketing Agencies, for instance let us assume that their logos were as corresponding:";
    const secondPhrase2 =
      "Now let us Imagine you need digital service, let us suppose you need a website for your business, the Agency that will come to your mind will be probably:";
    const text2 = [firstPhrase2, secondPhrase2];
    const firstPhrase3 =
      "Imagine you need a watch and you are expose to such a variety of options:";
    const secondPhrase3 =
      "Notice It was hard for you to choose, Now Imagine you are given these choices only:";
    const text3 = [firstPhrase3, secondPhrase3];
    const firstPhrase4 =
      "Imagine you want to buy a phone, you are searching online and these products catch your attention, which one will you end up choosing?";
    const secondPhrase4 =
      "Probably the second one but why? Aren't they both the same, maybe, this decision of yours was heavily nurtured by how people, by how they responded to this product.";
    const text4 = [firstPhrase4, secondPhrase4];
    const firstPhrase5 =
      "Imagine I were to show you a milk bottle with the following set up:";
    const secondPhrase5 =
      "wait,wait, weren't you expecting a drink such as Coca-Cola, cause that set up was well matched for Coca-Cola, even though I leaked the end result, yet still you expected a drink such as Coca-Cola! Why?";
    const text5 = [firstPhrase5, secondPhrase5];
    const texts = [text0, text1, text2, text3, text4, text5];

    // for next phrase
    let phraseIndex = 0;

    // for LearnMore
    const learnMoreText1 = "Learn more about selective and sensitive designs";
    const learnMoreText2 = "Stop selling product Start Selling Emotions";
    const learnMoreText3 =
      "This is known as Sensory Branding, this technique is widely used by Apple, Check out the Captions:";
    const learMoreText4 =
      "If you like Brand(x) or if you like vivid red color, you will choose first option and if you want to be trendy or the other way round you will choose the second option. When you are exposed to many options, and you are unsure of which one to choose, That is known as decision fatigue, Apple uses this Knowledge to help you select the right product. Check out the Captions to learn More: ";
    const learnMoreText5 =
      "This is know as Cognitive Bias, when your cognitive abilities are interrupted or influenced by your emotions, experiences, etc, it involves different patterns and triggers, like in this case being more liked and frequently bought acted as a trigger, emphasizing demand and lavishness of the product, check out captions to learn more:";
    const learnMoreText6 =
      "Well, the answer is quite simple, Coca-Cola has successfully embedded this thought in your mind that whenever you hear the fzz sound, it will remind you of Coca-Cola, this is known as NLP:Neuro-Linguistic Programming. It is the use of language patterns or using certain aspects to connect your brand with it so that to make it more rememberable. Check out the Captions to learn more:";
    const learnMoreTexts = [
      learnMoreText1,
      learnMoreText2,
      learnMoreText3,
      learMoreText4,
      learnMoreText5,
      learnMoreText6,
    ];

    //// Main Function
    function init() {
      displayNumbers();
    }

    function displayNumbers() {
      cards.forEach((card, index) => {
        card.style.setProperty("--card-index", `"${index + 1}"`);
      });
    }

    window.addEventListener("keydown", (e) => {
      if (e.key === "1") {
        num = 0;
      } else if (e.key === "2") {
        num = 1;
      } else if (e.key === "3") {
        num = 2;
      } else if (e.key === "4") {
        num = 3;
      } else if (e.key === "5") {
        num = 4;
      } else if (e.key === "6") {
        num = 5;
      }
      if (num === undefined) {
        return;
      } else {
        setTimeout(startAnimation, 500);
      }
    });
    function startAnimation() {
      cards.forEach((card) => card.classList.add("animate"));
      arrangeCards();
      setTimeout(() => animateCards(num), 500);
    }

    function arrangeCards() {
      const totalCards = cards.length;
      const angleStep = 10;
      const centerIndex = totalCards / 2;

      cards.forEach((card, index) => {
        const angle = (index - centerIndex) * angleStep;
        card.style.transform = `rotate(${angle}deg)`;
        card.style.zIndex = index;
      });
    }
    function animateCards(num) {
      const firstCard = cards[num];
      firstCard.style.top = "10%";
      firstCard.style.left = "20%";
      firstCard.style.transform = "rotate(0deg)";
      firstCard.style.transition =
        "top 1.5s ease, left 1.5s ease, transform 1.5s ease";

      setTimeout(() => {
        cards.forEach((card) => (card.style.transform = "rotate(0deg)"));
        setTimeout(() => flipCard(num), 1000);
      }, 1000);
    }

    function flipCard(num) {
      cards[num].setAttribute("data-flip", "true");
      setTimeout(disintegrate, 1000);
    }
    function disintegrate() {
      const cards = document.querySelectorAll(".card:not([data-flip])");

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const particlesContainer = document.createElement("div");
        particlesContainer.style.position = "absolute";
        particlesContainer.style.left = rect.left + "px";
        particlesContainer.style.top = rect.top + "px";
        particlesContainer.style.width = rect.width + "px";
        particlesContainer.style.height = rect.height + "px";
        particlesContainer.style.overflow = "hidden";
        document.body.appendChild(particlesContainer);

        const particleCount = 150;
        const colors = ["#2c3e50", "#34495e", "#7f8c8d"]; // Muted, sophisticated colors

        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement("div");
          particle.style.position = "absolute";
          particle.style.left = Math.random() * 100 + "%";
          particle.style.top = Math.random() * 100 + "%";
          particle.style.width = "3px";
          particle.style.height = "3px";
          particle.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];
          particle.style.opacity = "0.8";
          particle.style.transition =
            "all 1.5s cubic-bezier(0.25, 0.1, 0.25, 1)";
          particlesContainer.appendChild(particle);

          setTimeout(() => {
            const angle = Math.random() * Math.PI * 2;
            const distance = 100 + Math.random() * 150;
            particle.style.transform = `translate(${
              Math.cos(angle) * distance
            }px, ${Math.sin(angle) * distance}px)`;
            particle.style.opacity = "0";
          }, Math.random() * 300);
        }

        card.style.transition = "all 1.5s cubic-bezier(0.25, 0.1, 0.25, 1)";
        card.style.opacity = "0";

        setTimeout(() => {
          card.style.display = "none";
          particlesContainer.remove();
          typeContent();
        }, 1800);
      });
    }

    function typeContent() {
      const firstPhrase = texts[num][0];
      const secondPhrase = texts[num][1];
      typePhrases(firstPhrase, secondPhrase);
    }

    let learnMoreTimeout;
    function typeLearnMore(learnMoreText) {
      const words = learnMoreText.split(/(\s+|\b)/);
      const typingDelay = 20;

      function typeWord() {
        clearTimeout(learnMoreTimeout);
        if (indexLearnMore < words.length) {
          let word = words[indexLearnMore];
          if (num === 0) {
            if (word === "selective") {
              word = '<span style="color: #f40009;">selective</span>';
            }
            if (word === "sensitive") {
              word = '<span style="color: #f40009;">sensitive</span>';
            }
          }
          if (num === 1) {
            if (word === "Stop") {
              word = '<span style="color: red;">Stop</span>';
            }
            if (word === "selling") {
              word = '<span style="color: red;">selling</span>';
            }
            if (word === "Start") {
              word = '<span style="color: #00bfffff;">Start</span>';
            }
            if (word === "Selling") {
              word = '<span style="color: #45ca22;">Selling</span>';
            }
          }
          if (num === 2) {
            if (word === "Sensory") {
              word = '<span style="color: #00bfffff;">Sensory</span>';
            }
            if (word === "Branding") {
              word = '<span style="color: #45ca22;">Branding</span>';
            }
            if (word === "technique") {
              word = '<span style="color: #f40009;">technique</span>';
            }
            if (word === "Apple") {
              word =
                '<span> <img style="transform: translateY(5px);" src="./SensoryBranding/pics/pngwing.com.png" alt=""></span>';
            }
          }
          if (num === 3) {
            if (word === "Apple") {
              word =
                '<span> <img style="transform: translateY(5px);" src="./SensoryBranding/pics/pngwing.com.png" alt=""></span>';
            }
            if (word === "Brand") {
              word = '<span style="color: #c0c0c0;">Brand</span>';
            }
            if (word === "vivid") {
              word = '<span style="color: #f40009;">vivid</span>';
            }
            if (word === "red") {
              word = '<span style="color: #f40009;">red</span>';
            }
            if (word === "color") {
              word = '<span style="color: #f40009;">color</span>';
            }
            if (word === "trendy") {
              word = '<span style="color: #ea2249;">trendy</span>';
            }
            if (word === "choose") {
              word = '<span style="color: #45ca22;">choose</span>';
            }
            if (word === "decision") {
              word = '<span style="color: #f40009;">decision</span>';
            }
            if (word === "fatigue") {
              word = '<span style="color: #f40009;">fatigue</span>';
            }
            if (word === "Knowledge") {
              word = '<span style="color: #55bfff;">knowledge</span>';
            }
            if (word === "help") {
              word = '<span style="color: #00bfff;">help</span>';
            }
            if (word === "right") {
              word = '<span style="color: #99bfff;">right</span>';
            }
          }
          content.innerHTML += word;
          indexLearnMore++;
          learnMoreTimeout = setTimeout(typeWord, typingDelay);
        }
      }
      typeWord();
    }

    init();

    ////////// Helper Functions
    function typePhrases(firstPhrase, secondPhrase) {
      console.log("a");
      typePhrase(firstPhrase, () => {
        if (num === 1) {
          emotions.showZeroEmotions(content);
        }
        if (num === 2) {
          SB.signatures(content);
        }
        if (num === 3) {
          setTimeout(() => {
            df.hardChoice(content);
          }, 700);
        }
        if (num === 4) {
          setTimeout(() => {
            cb.products(content);
          }, 700);
        }
        if (num === 5) {
          setTimeout(() => {
            nlp.bottle(content);
          }, 500);
        }
        setTimeout(() => {
          removePhrase();
          setTimeout(() => {
            console.log("b");
            typePhrase(secondPhrase, () => {
              if (num === 0) {
                poc.stats(content);
              }
              if (num === 1) {
                emotions.showEmotions(content);
              }
              if (num === 2) {
                SB.designedLogo(content);
              }
              if (num === 3) {
                setTimeout(() => {
                  df.easyChoice(content);
                }, 500);
              }
              if (num === 4) {
                setTimeout(() => {
                  cb.Influence(content);
                }, 500);
              }
            });
            setTimeout(() => {
              eradicate();
            }, 4000);
          }, firstPhrase.length + secondPhrase.length);
        }, 2000);
      });
    }
    function typePhrase(phrase, callback) {
      const words = phrase.split(/(\s+|\b)/);

      function type() {
        clearTimeout(typingTimeout);
        if (phraseIndex < words.length) {
          let word = words[phraseIndex];
          if (num === 0) {
            if (word === "Facebook") {
              word = '<span style="color: blue;">Facebook</span>';
            }
            if (word === "Coca") {
              word = '<span style="color: #f40009;">Coca</span>';
            }
            if (word === "-") {
              word = '<span style="color: #f40009;">-</span>';
            }
            if (word === "Cola") {
              word = '<span style="color: #f40009;">Cola</span>';
            }
            if (word === "blue") {
              word = '<span style="color: blue;">blue</span>';
            }
            if (word === "red") {
              word = '<span style="color: red;">red</span>';
            }
          }
          if (num === 1) {
            if (word === "this") {
              word = '<span style="color: red;">this</span>';
            }
            if (word === "This") {
              word = '<span style="color: #45ca22;">This</span>';
            }
          }
          if (num === 2) {
            if (word === "ads") {
              word = '<span style="color: red;">ads</span>';
            }
            if (word === "logos") {
              word = '<span style="color: #33bccc;">logos</span>';
            }
            if (word === "digital") {
              word = '<span style="color: #00bfffff;">digital</span>';
            }
            if (word === "service") {
              word = '<span style="color: #45ca22;">service</span>';
            }
            if (word === "website") {
              word = '<span style="color: #ea9902;">website</span>';
            }
            if (word === "Agency") {
              word = '<span style="color: #22eaaa;">Agency</span>';
            }
            if (word === "probably") {
              word = '<span style="color: #55bfff;">probably</span>';
            }
          }
          if (num === 3) {
            if (word === "watch") {
              word = `<span style="color:#45ca22">watch</span>`;
            }
            if (word === "expose") {
              word = `<span style="color:#00bfff">expose</span>`;
            }
            if (word === "options") {
              word = `<span style="color:#f55">options</span>`;
            }
            if (word === "hard") {
              word = `<span style="color:#f00">options</span>`;
            }
            if (word === "given") {
              word = `<span style="color:#55bfff">given</span>`;
            }
            if (word === "choices") {
              word = `<span style="color:#ea9902">choices</span>`;
            }
          }
          content.innerHTML += word;
          phraseIndex++;
          typingTimeout = setTimeout(type, typingDelay);
        } else {
          phraseIndex = 0;
          if (callback) callback();
        }
      }
      type();
    }
    function removePhrase() {
      content.innerHTML = "";
    }

    function eradicate() {
      setTimeout(() => {
        content.classList.add("fade-out");
        setTimeout(() => {
          content.innerHTML = "";
          content.classList.remove("fade-out");
        }, 1000);
        setTimeout(() => typeLearnMore(learnMoreTexts[num]), 1200);
      }, 3000);
    }
  });
};
global();
export default global;
