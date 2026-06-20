import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Heart } from 'lucide-react';

export const MemoryPolaroids = () => {
  const { lang } = useLanguage();
  const currentText = content.polaroids[lang || 'en'];

  // Photos: image11 to image16
  const getPhotoForPolaroid = (idx) => {
    return `/images/image${11 + idx}.jpg`;
  };

  // Pre-defined rotations for consistent but scattered appearance
  const rotations = [-4, 3, -2, 4, -3, 2];

  // String lights data (left percentage, top offset, color)
  const lights = [
    { left: '5%', top: '10px', color: 'bg-love-pink shadow-love-pink/50', delay: '0.1s' },
    { left: '15%', top: '18px', color: 'bg-amber-300 shadow-amber-300/50', delay: '0.4s' },
    { left: '25%', top: '22px', color: 'bg-love-lavender shadow-love-lavender/50', delay: '0.7s' },
    { left: '35%', top: '18px', color: 'bg-love-pink shadow-love-pink/50', delay: '0.2s' },
    { left: '45%', top: '12px', color: 'bg-amber-300 shadow-amber-300/50', delay: '0.5s' },
    { left: '55%', top: '12px', color: 'bg-love-lavender shadow-love-lavender/50', delay: '0.8s' },
    { left: '65%', top: '18px', color: 'bg-love-pink shadow-love-pink/50', delay: '0.3s' },
    { left: '75%', top: '22px', color: 'bg-amber-300 shadow-amber-300/50', delay: '0.6s' },
    { left: '85%', top: '18px', color: 'bg-love-lavender shadow-love-lavender/50', delay: '0.9s' },
    { left: '95%', top: '10px', color: 'bg-love-pink shadow-love-pink/50', delay: '0.2s' }
  ];

  return (
    <section className="relative py-28 bg-love-light overflow-hidden">
      
      {/* String Lights Wire Container */}
      <div className="absolute top-10 left-0 right-0 h-16 pointer-events-none z-20">
        {/* Hanging wire line */}
        <svg className="w-full h-full text-love-dark/20" viewBox="0 0 100 10" preserveAspectRatio="none">
          <path d="M0,0 Q25,8 50,4 Q75,8 100,0" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
        
        {/* Pulsing light bulbs */}
        {lights.map((light, idx) => (
          <div
            key={idx}
            className={`absolute w-3.5 h-3.5 rounded-full ${light.color} animate-pulse shadow-[0_0_8px_4px]`}
            style={{
              left: light.left,
              top: light.top,
              animationDelay: light.delay,
              animationDuration: '1.8s'
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
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

        {/* Polaroids Row (flex container with horizontal scrolling on mobile, wrap on desktop) */}
        <div className="flex flex-row flex-nowrap md:flex-wrap overflow-x-auto md:overflow-visible gap-8 pb-10 px-4 scrollbar-thin md:justify-center items-center">
          {currentText.captions.map((caption, idx) => {
            const rotation = rotations[idx % rotations.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: rotation }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ 
                  type: 'spring', 
                  damping: 15, 
                  stiffness: 100, 
                  delay: idx * 0.15 
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 0, 
                  zIndex: 30,
                  transition: { duration: 0.3 } 
                }}
                className="flex-shrink-0 w-64 bg-white p-4 pb-6 shadow-lg border border-love-dark/5 rounded-sm relative group select-none cursor-default"
                style={{
                  boxShadow: '0 10px 25px -5px rgba(74, 21, 37, 0.1), 0 8px 10px -6px rgba(74, 21, 37, 0.1)'
                }}
              >
                {/* Polaroid pin/tape decoration */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-10 h-6 bg-love-rose/25 backdrop-blur-xs rotate-2 shadow-xs border border-white/40" />

                {/* Photo frame */}
                <div className="w-full aspect-square bg-love-light overflow-hidden rounded-xs border border-love-dark/5 relative">
                  <img
                    src={getPhotoForPolaroid(idx)}
                    alt={caption}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-15 group-hover:grayscale-0 transition-all duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.1)) pointer-events-none" />
                </div>

                {/* Handwriting Caption */}
                <div className="mt-5 text-center text-love-dark/90">
                  <p className="font-love-signature text-2xl md:text-3xl leading-relaxed tracking-wide truncate px-1">
                    {caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
