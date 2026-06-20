import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { favoritePhoto } from '../data/media';

export const GrandFinale = () => {
  const { lang } = useLanguage();
  const currentText = content.grandFinale[lang || 'en'];

  return (
    <section className="relative py-28 bg-love-light overflow-hidden flex flex-col justify-center items-center text-center">
      
      {/* Soft overlay gradient */}
      <div className="absolute inset-0 bg-radial-gradient(circle_at_center,rgba(255,240,245,0.7),transparent_80%) pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Main/Favorite Photo Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="relative max-w-md w-full aspect-square md:aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-white mb-12 select-none group"
        >
          {/* Subtle glow behind photo */}
          <div className="absolute -inset-1 bg-gradient-to-r from-love-rose to-love-pink rounded-3xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-500 z-0" />
          
          <img
            src={favoritePhoto}
            alt="Our Forever"
            className="w-full h-full object-cover relative z-10 transform group-hover:scale-102 transition-transform duration-700 ease-out"
          />
        </motion.div>

        {/* Emotional Closing Line */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: 0.4, duration: 1.0, ease: 'easeOut' }}
          className="font-love-title text-3xl md:text-5xl font-bold text-love-dark leading-relaxed max-w-2xl drop-shadow-xs px-2"
        >
          {currentText.text}
        </motion.h2>
      </div>
    </section>
  );
};
