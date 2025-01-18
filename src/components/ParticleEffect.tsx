import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;

  constructor(x = 0, y = 0, vx = 0, vy = 0, radius = 1) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.size = radius
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

function createParticles(canvas: HTMLCanvasElement, particleDensity): Array<Particle> {
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

function animateParticles(ctx: CanvasRenderingContext2D, particlesArray: Array<Particle>) {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  
  particlesArray.forEach(particle => {
    particle.draw(ctx);
    particle.update(ctx.canvas)
  })

  requestAnimationFrame(() => animateParticles(ctx, particlesArray));
}

interface ParticleEffectProps {
  particleDensity?: number;
}

const ParticleEffect = ({ particleDensity = 0.0001 }: ParticleEffectProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      let particlesArray;
      
      // Resize canvas
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight
        particlesArray = createParticles(canvas, particleDensity);
        animateParticles(ctx, particlesArray);
      }
      window.addEventListener('resize', handleResize)

      // Create particles and begin animation
      particlesArray = createParticles(canvas, particleDensity);
      animateParticles(ctx, particlesArray);

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [particleDensity]);

    return (
        <canvas ref={canvasRef} className="absolute w-full z-0"></canvas>
    );
};

export default ParticleEffect;