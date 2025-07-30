const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particlesArray = [];

function initCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

window.addEventListener('resize', () => {
  initCanvas();
  particlesArray = [];
  createParticles();
});

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.color = 'rgba(255, 255, 255, 0.6)';
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > width) this.speedX = -this.speedX;
    if (this.y < 0 || this.y > height) this.speedY = -this.speedY;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function createParticles() {
  const particlesCount = Math.floor((width * height) / 8000);
  for (let i = 0; i < particlesCount; i++) {
    particlesArray.push(new Particle());
  }
}

function connectParticles() {
  let opacityValue = 0.2;
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a + 1; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animate);
}

initCanvas();
createParticles();
animate();
