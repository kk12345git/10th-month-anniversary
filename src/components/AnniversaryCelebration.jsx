import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { favoritePhoto } from '../data/media';
import { Heart } from 'lucide-react';

export const AnniversaryCelebration = () => {
  const { lang } = useLanguage();
  const currentText = content.celebration[lang || 'en'];
  
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const fireworks = [];
    const particles = [];
    const sparkles = [];

    // Max counts for safety
    const maxParticles = 120;
    const colors = ['#FFC0CB', '#FFB7C5', '#FF69B4', '#FF1493', '#FFE4E1', '#FFF0F5', '#FFD700'];

    class Firework {
      constructor() {
        this.x = Math.random() * width;
        this.y = height;
        this.tx = Math.random() * width;
        this.ty = Math.random() * (height * 0.4) + height * 0.1; // Target height
        this.speed = Math.random() * 2 + 2;
        this.angle = Math.atan2(this.ty - this.y, this.tx - this.x);
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Check if reached destination
        const dist = Math.hypot(this.tx - this.x, this.ty - this.y);
        return dist < 10 || this.y <= this.ty;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.life = 1.0;
        this.decay = Math.random() * 0.02 + 0.015;
        this.color = color;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.03; // Soft gravity
        this.life -= this.decay;
        return this.life <= 0;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.random() * 2 + 1, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    const explode = (x, y, color) => {
      const count = 20;
      for (let i = 0; i < count; i++) {
        if (particles.length < maxParticles) {
          particles.push(new Particle(x, y, color));
        }
      }
    };

    // Populate sparkles
    for (let i = 0; i < 15; i++) {
      sparkles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        opacity: Math.random(),
        speed: Math.random() * 0.03 + 0.01,
        growing: Math.random() > 0.5
      });
    }

    // Launch firework timer
    let launchTimer = 0;

    const animate = () => {
      // Semi-transparent clear to leave beautiful trails
      ctx.fillStyle = 'rgba(255, 240, 245, 0.2)';
      ctx.fillRect(0, 0, width, height);

      // Launch new firework
      launchTimer++;
      if (launchTimer > 50) {
        if (fireworks.length < 3) {
          fireworks.push(new Firework());
        }
        launchTimer = 0;
      }

      // Update & Draw Fireworks
      for (let i = fireworks.length - 1; i >= 0; i--) {
        const fw = fireworks[i];
        const exploded = fw.update();
        if (exploded) {
          explode(fw.x, fw.y, fw.color);
          fireworks.splice(i, 1);
        } else {
          fw.draw();
        }
      }

      // Update & Draw Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const dead = p.update();
        if (dead) {
          particles.splice(i, 1);
        } else {
          p.draw();
        }
      }

      // Draw Sparkles
      sparkles.forEach((s) => {
        if (s.growing) {
          s.opacity += s.speed;
          if (s.opacity >= 0.9) s.growing = false;
        } else {
          s.opacity -= s.speed;
          if (s.opacity <= 0.1) s.growing = true;
        }
        ctx.save();
        ctx.globalAlpha = s.opacity;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = '#FFD700'; // Golden sparks
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isInView]);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[90vh] py-24 bg-love-light overflow-hidden flex flex-col items-center justify-center text-center"
    >
      {/* Celebration Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0" 
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Pulsing Glowing Badge */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-full bg-gradient-to-tr from-love-rose to-love-pink text-white flex items-center justify-center shadow-lg border-2 border-white mb-8"
        >
          <Heart size={24} className="fill-white text-white" />
        </motion.div>

        {/* Big Anniversary Greeting */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="font-love-title text-4xl md:text-6xl font-bold tracking-tight text-love-dark leading-tight px-4 max-w-3xl filter drop-shadow-xs"
        >
          {currentText.title}
        </motion.h1>

        {/* Favorite Photo with glowing borders */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1.0 }}
          className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl mt-12 select-none group"
        >
          {/* Pulsing pink glow box */}
          <div className="absolute inset-0 bg-gradient-to-tr from-love-rose to-love-pink rounded-full blur-xl opacity-60 animate-pulse z-0" />
          
          <img
            src={favoritePhoto}
            alt="Celebrating Us"
            className="w-full h-full object-cover relative z-10 rounded-full scale-101"
          />
        </motion.div>

        {/* Final tiny tag */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 1.0 }}
          className="mt-12 text-xs md:text-sm font-semibold uppercase tracking-widest text-love-dark/50"
        >
          {lang === 'ta' ? 'என்றென்றும் அன்புடன் 💌' : 'Created with Love for You 💌'}
        </motion.p>
      </div>
    </section>
  );
};
