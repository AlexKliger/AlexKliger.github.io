import { useEffect, useRef } from "react";
import {
  Particle,
  createParticles,
  createMouseParticle,
  animateParticles,
  animateMouseParticle,
} from "./particle";

interface ParticleEffectProps {
  particleDensity?: number;
}

const ParticleEffect = ({ particleDensity = 0.0001 }: ParticleEffectProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const mousePos = useRef({x: 0, y: 0});

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      let particleArr;
      let mouseParticle;
      
      // Resize canvas
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight
        // DRY
        particleArr = createParticles(canvas, particleDensity);
        animateParticles(ctx, particleArr);
        mouseParticle = new Particle(mousePos.current.x, mousePos.current.y, 0, 0, 5);
        animateMouseParticle(ctx, mouseParticle, mousePos.current)
      }
      window.addEventListener('resize', handleResize);

      const handleMouseMove = (event: MouseEvent) => {
        mousePos.current.x = event.clientX
        mousePos.current.y = event.clientY
      }
      window.addEventListener('mousemove', handleMouseMove)

      // Create particles and begin animation
      // DRY
      particleArr = createParticles(canvas, particleDensity);
      animateParticles(ctx, particleArr);
      mouseParticle = createMouseParticle(mousePos.current.x, mousePos.current.y);
      animateMouseParticle(ctx, mouseParticle, mousePos.current);

      return () => {
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }, [particleDensity]);

    return (
        <canvas ref={canvasRef} className="fixed z-0"></canvas>
    );
};

export default ParticleEffect;