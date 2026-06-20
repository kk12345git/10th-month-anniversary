import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Heart } from 'lucide-react';

export const LoveLetter = () => {
  const { lang } = useLanguage();
  const currentText = content.loveLetter[lang || 'en'];

  return (
    <section className="relative py-24 bg-love-light overflow-hidden">
      
      {/* Decorative floating hearts background */}
      <div className="absolute top-1/4 left-1/4 opacity-10 animate-float pointer-events-none select-none">
        <Heart size={48} className="text-love-rose fill-love-rose" />
      </div>
      <div className="absolute bottom-1/4 right-1/4 opacity-10 animate-float pointer-events-none select-none" style={{ animationDelay: '2s' }}>
        <Heart size={64} className="text-love-rose fill-love-rose" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
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

        {/* Love Letter Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="glass-panel rounded-3xl p-8 md:p-12 border-2 border-love-rose/40 relative shadow-xl max-w-3xl mx-auto select-none"
        >
          {/* Heart corner decorations */}
          <div className="absolute top-4 left-4 text-love-rose/40"><Heart size={16} className="fill-love-rose/20" /></div>
          <div className="absolute top-4 right-4 text-love-rose/40"><Heart size={16} className="fill-love-rose/20" /></div>
          <div className="absolute bottom-4 left-4 text-love-rose/40"><Heart size={16} className="fill-love-rose/20" /></div>
          <div className="absolute bottom-4 right-4 text-love-rose/40"><Heart size={16} className="fill-love-rose/20" /></div>

          {/* Letter Inner Border */}
          <div className="border border-dashed border-love-rose/30 rounded-2xl p-6 md:p-10 bg-white/10 relative">
            
            {/* Conditional Rendering of Letter copy based on Language */}
            {lang === 'en' ? (
              <div className="font-serif text-base md:text-lg text-love-dark/95 leading-loose space-y-6 whitespace-pre-line">
                {/* TODO: paste your personal letter here */}
                {currentText.letter}
              </div>
            ) : (
              <div className="font-serif text-base md:text-lg text-love-dark/95 leading-loose space-y-6 whitespace-pre-line">
                {/* TODO: paste your personal letter here */}
                {currentText.letter}
              </div>
            )}
            
            {/* Decorative Wax Seal / Floating Heart at signature */}
            <div className="mt-12 flex justify-end items-center gap-4">
              <div className="h-0.5 bg-love-rose/30 w-16" />
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="w-12 h-12 rounded-full bg-gradient-to-tr from-love-rose to-love-pink flex items-center justify-center text-white shadow-md border-2 border-white select-none cursor-default"
              >
                <Heart size={18} className="fill-white text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
