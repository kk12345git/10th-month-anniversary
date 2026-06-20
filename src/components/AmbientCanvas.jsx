import React, { useEffect, useRef } from 'react';

export const AmbientCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Arrays to store particles
    const hearts = [];
    const petals = [];
    const sparkles = [];
    const trail = [];
    const bursts = [];

    // Configuration
    const maxHearts = 15;
    const maxPetals = 20;
    const maxSparkles = 25;

    // Helper: draw heart
    const drawHeart = (c, x, y, size, opacity, colorPrefix = 'rgba(255, 182, 197, ') => {
      c.save();
      c.beginPath();
      c.translate(x, y);
      c.scale(size / 12, size / 12);
      c.moveTo(0, -3);
      c.bezierCurveTo(-5, -8, -10, -5, -10, 0);
      c.bezierCurveTo(-10, 5, -3, 10, 0, 15);
      c.bezierCurveTo(3, 10, 10, 5, 10, 0);
      c.bezierCurveTo(10, -5, 5, -8, 0, -3);
      c.fillStyle = colorPrefix + opacity + ')';
      c.fill();
      c.restore();
    };

    // Helper: draw petal
    const drawPetal = (c, x, y, rX, rY, angle, opacity) => {
      c.save();
      c.translate(x, y);
      c.rotate(angle);
      c.beginPath();
      c.ellipse(0, 0, rX, rY, 0, 0, Math.PI * 2);
      c.fillStyle = `rgba(255, 110, 130, ${opacity})`;
      c.fill();
      c.restore();
    };

    // Helper: draw sparkle star
    const drawSparkle = (c, x, y, size, opacity) => {
      c.save();
      c.beginPath();
      c.translate(x, y);
      for (let i = 0; i < 4; i++) {
        c.rotate(Math.PI / 2);
        c.lineTo(0, -size);
        c.lineTo(size / 3, 0);
      }
      c.closePath();
      c.fillStyle = `rgba(255, 240, 150, ${opacity})`;
      c.fill();
      c.restore();
    };

    // Initialize particles
    const initParticles = () => {
      // Hearts floating up
      for (let i = 0; i < maxHearts; i++) {
        hearts.push({
          x: Math.random() * width,
          y: Math.random() * height + height, // Start below screen
          size: Math.random() * 8 + 6,
          speedY: Math.random() * 0.8 + 0.4,
          wiggle: Math.random() * 2 * Math.PI,
          wiggleSpeed: Math.random() * 0.02 + 0.01,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }

      // Petals falling down
      for (let i = 0; i < maxPetals; i++) {
        petals.push({
          x: Math.random() * width,
          y: Math.random() * height - height, // Start above screen
          rX: Math.random() * 6 + 4,
          rY: Math.random() * 4 + 2,
          speedY: Math.random() * 0.6 + 0.5,
          speedX: Math.random() * 0.4 - 0.2,
          angle: Math.random() * Math.PI * 2,
          spinSpeed: Math.random() * 0.02 - 0.01,
          opacity: Math.random() * 0.6 + 0.3,
        });
      }

      // Sparkles
      for (let i = 0; i < maxSparkles; i++) {
        sparkles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 4 + 2,
          opacity: Math.random(),
          speed: Math.random() * 0.02 + 0.01,
          growing: Math.random() > 0.5,
        });
      }
    };

    initParticles();

    // Mouse movement listener (for heart cursor trail on desktop)
    let lastMoveTime = 0;
    const handleMouseMove = (e) => {
      // Only generate if desktop (mouse devices usually have pointer type mouse)
      const now = Date.now();
      if (now - lastMoveTime > 80) { // Limit trail density
        trail.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 6 + 4,
          opacity: 1,
          color: Math.random() > 0.5 ? 'rgba(255, 182, 197, ' : 'rgba(230, 230, 250, ',
        });
        lastMoveTime = now;
      }
    };

    // Tap/Click burst listener
    const handleTap = (e) => {
      const x = e.clientX || (e.touches && e.touches[0].clientX);
      const y = e.clientY || (e.touches && e.touches[0].clientY);
      if (!x || !y) return;

      // Create a burst of 15 particles
      for (let i = 0; i < 15; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 3 + 1;
        bursts.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity - 1, // Slight upward bias
          size: Math.random() * 5 + 3,
          life: 1.0,
          decay: Math.random() * 0.03 + 0.02,
          type: Math.random() > 0.4 ? 'heart' : 'sparkle',
          color: Math.random() > 0.5 ? 'rgba(255, 105, 180, ' : 'rgba(255, 223, 0, ',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleTap);
    window.addEventListener('touchstart', handleTap);

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw & Update Sparkles
      sparkles.forEach((s) => {
        if (s.growing) {
          s.opacity += s.speed;
          if (s.opacity >= 0.8) s.growing = false;
        } else {
          s.opacity -= s.speed;
          if (s.opacity <= 0.1) s.growing = true;
        }
        drawSparkle(ctx, s.x, s.y, s.size, s.opacity);
      });

      // 2. Draw & Update Floating Hearts
      hearts.forEach((h) => {
        h.y -= h.speedY;
        h.wiggle += h.wiggleSpeed;
        const currentX = h.x + Math.sin(h.wiggle) * 15;

        // If heart goes off screen, reset below screen
        if (h.y < -30) {
          h.y = height + 30;
          h.x = Math.random() * width;
          h.size = Math.random() * 8 + 6;
          h.opacity = Math.random() * 0.5 + 0.2;
        }

        drawHeart(ctx, currentX, h.y, h.size, h.opacity);
      });

      // 3. Draw & Update Falling Petals
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.angle += p.spinSpeed;

        // If goes off screen, reset above screen
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
          p.angle = Math.random() * Math.PI * 2;
          p.opacity = Math.random() * 0.6 + 0.3;
        }

        drawPetal(ctx, p.x, p.y, p.rX, p.rY, p.angle, p.opacity);
      });

      // 4. Draw & Update Mouse Cursor Trail (Desktop)
      for (let i = trail.length - 1; i >= 0; i--) {
        const t = trail[i];
        t.opacity -= 0.02;
        if (t.opacity <= 0) {
          trail.splice(i, 1);
        } else {
          drawHeart(ctx, t.x, t.y, t.size, t.opacity, t.color);
        }
      }

      // 5. Draw & Update Taps/Clicks Burst
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.x += b.vx;
        b.y += b.vy;
        b.vy += 0.05; // Gravity
        b.life -= b.decay;

        if (b.life <= 0) {
          bursts.splice(i, 1);
        } else {
          if (b.type === 'heart') {
            drawHeart(ctx, b.x, b.y, b.size, b.life, b.color);
          } else {
            drawSparkle(ctx, b.x, b.y, b.size, b.life);
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleTap);
      window.removeEventListener('touchstart', handleTap);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />;
};
