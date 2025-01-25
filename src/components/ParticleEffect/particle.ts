class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;

  constructor(x = 0, y = 0, vx = 0, vy = 0, size = 1) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.size = size
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.fillStyle = 'white';
    ctx.fill();
  }

  update(canvas: HTMLCanvasElement) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) {
      this.x = canvas.width;
    } else if (this.x > canvas.width) {
      this.x = 0;
    }

    if (this.y < 0) {
      this.y = canvas.height;
    } else if (this.y > canvas.height) {
      this.y = 0;
    }
  }
}

class Edge {
  p1: Particle;
  p2: Particle;

  constructor(p1: Particle, p2: Particle) {
    this.p1 = p1;
    this.p2 = p2;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
  }
}

function createParticles(canvas: HTMLCanvasElement, particleDensity: number): Array<Particle> {
  const particles = [];
  const canvasArea = canvas.width * canvas.height;

  for (let i = 0; i < canvasArea*particleDensity; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const vx = (Math.random() < 0.5 ? -1 : 1) * 0.05;
    const vy = (Math.random() < 0.5 ? -1 : 1) * 0.05;
    const size = Math.random() * 5 + 0.6;
    particles.push(new Particle(x, y, vx, vy, size));
  }

  return particles;
}

function createMouseParticle(x: number, y: number) {
  return new Particle(x, y, 0, 0, 5);
}

function animateParticles(ctx: CanvasRenderingContext2D, particleArr: Array<Particle>) {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  
  particleArr.forEach(particle => {
    particle.draw(ctx);
    particle.update(ctx.canvas)
  })

  requestAnimationFrame(() => animateParticles(ctx, particleArr));
}
  
function animateMouseParticle(ctx: CanvasRenderingContext2D, particle: Particle, mousePos: {x: number, y: number}) {
  particle.x = mousePos.x
  particle.y = mousePos.y
  particle.draw(ctx);

  requestAnimationFrame(() => animateMouseParticle(ctx, particle, mousePos))
}

export { Particle, Edge, createParticles, createMouseParticle, animateParticles, animateMouseParticle }