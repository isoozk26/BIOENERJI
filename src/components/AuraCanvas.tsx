import React, { useEffect, useRef } from 'react';

export const AuraCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Softer, luminous, breathing ambient light orbs (Pastel Lavender, Sky Blue, Soft Champagne)
    const orbs = [
      { x: width * 0.25, y: height * 0.2, radius: 460, color: 'rgba(192, 132, 252, 0.12)', vx: 0.2, vy: 0.14 },
      { x: width * 0.75, y: height * 0.3, radius: 480, color: 'rgba(56, 189, 248, 0.10)', vx: -0.15, vy: 0.18 },
      { x: width * 0.5, y: height * 0.65, radius: 520, color: 'rgba(253, 230, 138, 0.08)', vx: 0.12, vy: -0.16 },
      { x: width * 0.2, y: height * 0.8, radius: 420, color: 'rgba(168, 85, 247, 0.10)', vx: 0.16, vy: -0.12 },
    ];

    // Delicate stardust
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.28,
      speedY: (Math.random() - 0.5) * 0.28,
      opacity: Math.random() * 0.45 + 0.25
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render soft glowing light spheres
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < 0 || orb.x > width) orb.vx *= -1;
        if (orb.y < 0 || orb.y > height) orb.vy *= -1;

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'rgba(13, 17, 29, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render soft stardust
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(241, 245, 249, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  );
};
