import { useEffect, useRef } from "react";
import {
  createParticles,
  animateParticles,
} from "./particle";

interface ParticleEffectProps {
  particleDensity?: number;
}

const ParticleEffect = ({ particleDensity = 0.0001 }: ParticleEffectProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      let particleArr;
      
      // Resize canvas
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight
        // DRY
        particleArr = createParticles(canvas, particleDensity);
        animateParticles(ctx, particleArr);
      }
      window.addEventListener('resize', handleResize);

      // Create particles and begin animation
      // DRY
      particleArr = createParticles(canvas, particleDensity);
      animateParticles(ctx, particleArr);

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [particleDensity]);

    return (
        <canvas ref={canvasRef} className="fixed z-0"></canvas>
    );
};

export default ParticleEffect;