import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';

export const LoveNotes = () => {
  const { lang } = useLanguage();
  const currentText = content.loveNotes[lang || 'en'];

  // Pastel sticky note colors
  const stickyColors = [
    'bg-rose-100 border-rose-200 text-rose-900',
    'bg-amber-100 border-amber-200 text-amber-900',
    'bg-violet-100 border-violet-200 text-violet-900',
    'bg-sky-100 border-sky-200 text-sky-900',
    'bg-yellow-100 border-yellow-200 text-yellow-900',
    'bg-pink-100 border-pink-200 text-pink-900'
  ];

  // Specific rotations for scatter effect
  const stickyRotations = [-2, 3, -1, 4, -3, 2];

  return (
    <section className="relative py-24 bg-love-light/60 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        
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

        {/* Scattered Sticky Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {currentText.notes.map((note, idx) => {
            const colorClass = stickyColors[idx % stickyColors.length];
            const rotation = stickyRotations[idx % stickyRotations.length];
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  type: 'spring',
                  damping: 12,
                  stiffness: 90,
                  delay: idx * 0.1 
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 0, 
                  zIndex: 20,
                  boxShadow: '0 15px 30px -10px rgba(74, 21, 37, 0.2)'
                }}
                className={`p-6 rounded-xs border shadow-md relative aspect-square flex items-center justify-center text-center select-none ${colorClass} cursor-default`}
                style={{
                  boxShadow: '2px 8px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                }}
              >
                {/* Washi Tape/Sticky strip decoration */}
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 w-20 h-7 bg-white/40 border border-white/20 rotate-1 shadow-xs" 
                     style={{ backdropFilter: 'blur(1px)' }} />

                {/* Hand-written text content */}
                <p className="font-love-signature text-3xl leading-relaxed tracking-wider md:px-2">
                  {note}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
