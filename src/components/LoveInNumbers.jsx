import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Heart } from 'lucide-react';

const AnimatedNumber = ({ value }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(value, 10);
    if (isNaN(end)) return;
    if (start === end) {
      setCount(end);
      return;
    }

    const duration = 2000; // 2 seconds animation
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Quadratic ease-out
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.floor(start + easeProgress * (end - start));

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, value]);

  return <span ref={ref} className="tabular-nums">{count}</span>;
};

export const LoveInNumbers = () => {
  const { lang } = useLanguage();
  const currentText = content.loveInNumbers[lang || 'en'];
  
  const [totalDays, setTotalDays] = useState(0);

  useEffect(() => {
    const calculateDays = () => {
      const anniversaryStart = new Date('2026-06-15T00:00:00');
      const now = new Date();
      const diffInMs = now.getTime() - anniversaryStart.getTime();
      // Calculate float days, floor it, clamp to min 0
      const days = Math.max(0, Math.floor(diffInMs / (1000 * 60 * 60 * 24)));
      setTotalDays(days);
    };

    calculateDays();
    // Update every hour in case she stays on the tab
    const interval = setInterval(calculateDays, 3600000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: currentText.months, value: 10, icon: "❤️" },
    { label: currentText.days, value: totalDays, icon: "🗓️" },
    { label: currentText.photos, value: 18, icon: "📸" },
    { label: currentText.videos, value: 4, icon: "🎥" }
  ];

  return (
    <section className="relative py-24 bg-love-light overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-love-title text-3xl md:text-5xl font-bold text-love-dark tracking-wide">
              {currentText.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-love-rose to-love-pink mx-auto mt-4 rounded-full" />
            <p className="mt-4 text-sm md:text-base text-love-dark/70 font-light italic max-w-xl mx-auto">
              {currentText.subtitle}
            </p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-card p-6 rounded-3xl text-center border border-love-rose/30 shadow-sm flex flex-col justify-between items-center h-48 group select-none"
            >
              {/* Floating icon */}
              <div className="text-3xl mb-2 group-hover:scale-115 transition-transform duration-300">
                {stat.icon}
              </div>

              {/* Number */}
              <div className="font-love-title text-4xl md:text-5xl font-bold text-love-dark tracking-tight my-2">
                <AnimatedNumber value={stat.value} />
              </div>

              {/* Label */}
              <p className="text-xs md:text-sm font-medium text-love-dark/70 uppercase tracking-wider mt-auto">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
