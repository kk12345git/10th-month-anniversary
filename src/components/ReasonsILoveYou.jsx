import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Heart } from 'lucide-react';

export const ReasonsILoveYou = () => {
  const { lang } = useLanguage();
  const currentText = content.reasons[lang || 'en'];

  // Card reveal variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section className="relative py-24 bg-love-light/60 overflow-hidden">
      
      {/* Decorative background hearts */}
      <div className="absolute top-10 left-10 text-love-rose/10 pointer-events-none select-none">
        <Heart size={120} className="fill-love-rose/5" />
      </div>
      <div className="absolute bottom-10 right-10 text-love-rose/10 pointer-events-none select-none">
        <Heart size={160} className="fill-love-rose/5" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
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

        {/* Reasons Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {currentText.items.map((item, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="glass-card p-8 rounded-3xl relative overflow-hidden border border-love-rose/30 shadow-sm flex flex-col items-center text-center group h-64 select-none"
            >
              {/* Giant Background SVG Heart */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <svg
                  className="w-48 h-48 text-love-rose/5 group-hover:text-love-rose/8 group-hover:scale-105 transition-all duration-500 ease-out"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              {/* Heart Icon header */}
              <div className="w-12 h-12 rounded-full bg-love-rose/10 group-hover:bg-love-rose/20 text-love-rose flex items-center justify-center mb-4 transition-colors duration-300 z-10">
                <Heart size={20} className="group-hover:fill-love-rose transition-all duration-300" />
              </div>

              {/* Title */}
              <h3 className="font-love-title text-xl font-semibold text-love-dark mb-3 z-10">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-love-dark/75 leading-relaxed font-light z-10 mt-1">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
