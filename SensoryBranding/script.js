export default class SensoryBranding {
  signatures(content) {
    const signatures = `<div id="signatures">
      <div id="simpleLogo" class="simple">Developers Mania</div>
      <div id="signatureContainer" class="designed">
        <canvas id="signatureCanvas"></canvas>
        <div id="finalText">Developers Mania</div>
      </div>
    </div>`;
    content.innerHTML += signatures;
    const container = content.querySelector("#signatureContainer"); // Fixed selector
    this.animations(container);
    if (container) {
      container.classList.add("fade-in");
    }
  }

  designedLogo(content) {
    const designedLogo = `<div id="signatures">
      <div id="signatureContainer" class="designed">
        <canvas id="signatureCanvas"></canvas>
        <div id="finalText">Developers Mania</div>
      </div>
    </div>`;
    content.innerHTML += designedLogo;
    const container = content.querySelector("#signatureContainer"); // Fixed selector
    this.animations(container);
    if (container) {
      container.classList.add("fade-in");
    }
  }

  animations(containerElement) {
    const container = containerElement;
    const canvas = container.querySelector("#signatureCanvas");
    const ctx = canvas.getContext("2d");
    const finalText = container.querySelector("#finalText");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const text = "Developers Mania";
    const particles = [];

    class Particle {
      constructor(x, y, baseX, baseY) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 1;
        this.baseX = baseX;
        this.baseY = baseY;
        this.color = Math.random() > 0.5 ? "#f1f1f1" : "#ffffff";
        this.opacity = 0;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        this.x += (this.baseX - this.x) * 0.05;
        this.y += (this.baseY - this.y) * 0.05;
      }

      dissipate() {
        this.x += (Math.random() - 0.5) * 20;
        this.y += (Math.random() - 0.5) * 20;
        this.opacity -= 0.05;
      }
    }

    function init() {
      particles.length = 0;
      ctx.font = "bold 80px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);

      const textCoordinates = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      for (let y = 0; y < textCoordinates.height; y += 4) {
        for (let x = 0; x < textCoordinates.width; x += 4) {
          if (
            textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] >
            128
          ) {
            const startX = Math.random() * canvas.width;
            const startY = Math.random() * canvas.height;
            const baseX = x;
            const baseY = y;
            particles.push(new Particle(startX, startY, baseX, baseY));
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      requestAnimationFrame(animate);
    }

    function dissipateParticles() {
      gsap.to(particles, {
        duration: 2,
        opacity: 0,
        x: (i) => particles[i].x + (Math.random() - 0.5) * 300,
        y: (i) => particles[i].y + (Math.random() - 0.5) * 300,
        ease: "power2.out",
        onUpdate: () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          for (const particle of particles) {
            particle.draw();
          }
        },
        onComplete: () => {
          finalText.style.opacity = 1;
        },
      });
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    }

    window.addEventListener("resize", resizeCanvas);

    init();
    animate();

    // GSAP Animations
    gsap.to(particles, {
      duration: 2,
      opacity: 1,
      ease: "power2.inOut",
      stagger: {
        from: "center",
        amount: 1.5,
      },
      onComplete: () => {
        finalText.style.opacity = 1; // Show final text
        dissipateParticles();
      },
    });

    gsap.to(particles, {
      duration: 2,
      x: (i) => particles[i].baseX,
      y: (i) => particles[i].baseY,
      ease: "power2.inOut",
    });
  }
}
