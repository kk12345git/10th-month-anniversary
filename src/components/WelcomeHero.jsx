import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { ChevronDown } from 'lucide-react';

export const WelcomeHero = ({ onBegin }) => {
  const { lang } = useLanguage();
  const currentText = content.welcomeHero[lang || 'en'];

  const scrollToTimeline = () => {
    const timeline = document.getElementById('timeline-section');
    if (timeline) {
      timeline.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-love-light via-love-light to-love-rose/20 text-center px-6">
      
      {/* Decorative floating rings or overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8),transparent_70%)] pointer-events-none" />

      {/* Main cinematic content card */}
      <div className="z-20 max-w-4xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-6xl md:text-8xl mb-6 select-none cursor-default filter drop-shadow-md"
        >
          ❤️
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.0, ease: 'easeOut' }}
          className="font-love-title text-4xl md:text-6xl font-bold tracking-tight text-love-dark leading-tight drop-shadow-sm px-4"
        >
          {currentText.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1.0 }}
          className="mt-6 text-lg md:text-2xl font-light text-love-dark/70 italic max-w-2xl px-6"
        >
          {currentText.subtitle}
        </motion.p>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-12"
        >
          <button
            onClick={scrollToTimeline}
            className="group px-8 py-4 bg-gradient-to-r from-love-rose to-love-pink text-love-dark font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 transition duration-300 flex items-center gap-3 border border-love-rose/40 cursor-pointer"
          >
            <span>{currentText.button}</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <ChevronDown size={20} className="group-hover:translate-y-0.5 transition-transform duration-300" />
            </motion.span>
          </button>
        </motion.div>
      </div>

      {/* Subtle indicator at the bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1.0 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-300"
        onClick={scrollToTimeline}
      >
        <span className="text-xs uppercase tracking-widest text-love-dark font-semibold">
          {lang === 'ta' ? 'கீழே உருட்டவும்' : 'Scroll Down'}
        </span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  );
};
