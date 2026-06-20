import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Heart } from 'lucide-react';

export const Timeline = () => {
  const { lang } = useLanguage();
  const currentText = content.timeline[lang || 'en'];

  // Photos corresponding to months 1-10
  const getPhotoForMonth = (index) => {
    return `/images/image${index + 1}.jpg`;
  };

  return (
    <section id="timeline-section" className="relative py-24 bg-love-light/60 overflow-hidden">
      
      {/* Decorative vertical dashed line in center (desktop) or left (mobile) */}
      <div className="absolute left-8 md:left-1/2 top-32 bottom-20 w-0.5 border-r-2 border-dashed border-love-rose/60 transform md:-translate-x-1/2 z-0" />

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

        {/* Timeline Cards Container */}
        <div className="space-y-16">
          {currentText.months.map((month, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={idx}
                className={`flex flex-col md:flex-row items-center w-full ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* 1. Left/Right Spacer for desktop layout */}
                <div className="w-full md:w-1/2 flex justify-center pl-16 pr-4 md:px-12">
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="glass-card w-full max-w-md rounded-3xl overflow-hidden border border-love-rose/30 shadow-md group relative"
                  >
                    {/* Hover floating heart effect */}
                    <div className="absolute top-4 right-4 z-20 bg-white/70 p-2 rounded-full scale-0 group-hover:scale-100 transition-all duration-300 shadow-sm">
                      <Heart className="text-love-rose fill-love-rose animate-pulse" size={18} />
                    </div>

                    {/* Card Photo */}
                    <div className="relative h-64 overflow-hidden bg-love-rose/10">
                      <img
                        src={getPhotoForMonth(idx)}
                        alt={month.title}
                        loading="lazy"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Card Text Content */}
                    <div className="p-6">
                      <span className="text-xs font-semibold uppercase tracking-wider text-love-rose bg-love-rose/10 px-3 py-1 rounded-full">
                        {month.date}
                      </span>
                      <h3 className="font-love-title text-xl font-semibold text-love-dark mt-3">
                        {month.title}
                      </h3>
                      <p className="mt-2 text-sm text-love-dark/75 leading-relaxed font-light">
                        {month.description}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* 2. Timeline Point (Middle Circle) */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="w-6 h-6 rounded-full bg-gradient-to-r from-love-rose to-love-pink flex items-center justify-center border-4 border-white shadow-md cursor-default"
                  >
                    <Heart size={8} className="text-white fill-white" />
                  </motion.div>
                </div>

                {/* 3. Outer alignment block (Empty on desktop for balance) */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
