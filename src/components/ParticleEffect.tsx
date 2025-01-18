import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 100

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;

  constructor(x = 0, y = 0, vx = 0, vy = 0, radius = 1) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
  }

  update(canvas: HTMLCanvasElement) {
    this.x += this.vx;
    this.y += this.vy;
  }
}

function createParticles(canvas: HTMLCanvasElement): Array<Particle> {
  const particles = [];
  
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const vx = (Math.random() < 0.5 ? -1 : 1) * 0.05;
    const vy = (Math.random() < 0.5 ? -1 : 1) * 0.05;
    const size = Math.random() * 2 + 0.6;
    particles.push(new Particle(x, y, vx, vy, size));
  }

  return particles;
}

function animateParticles(ctx: CanvasRenderingContext2D, particlesArray: Array<Particle>) {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  
  particlesArray.forEach(particle => {
    particle.draw(ctx);
    particle.update(ctx.canvas)
  })

  requestAnimationFrame(() => animateParticles(ctx, particlesArray));
}

const ParticleEffect = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      let particlesArray = createParticles(canvas);
      
      // Resize canvas
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight
        particlesArray = createParticles(canvas);
        animateParticles(ctx, particlesArray);
      }
      window.addEventListener('resize', handleResize)

      // Create particles and begin animation
      particlesArray = createParticles(canvas);
      animateParticles(ctx, particlesArray);

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    })

    return (
        <canvas ref={canvasRef} className="absolute w-full z-0">

        </canvas>
    );
};

export default ParticleEffect;