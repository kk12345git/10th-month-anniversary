import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Mail, MailOpen } from 'lucide-react';

const FlipCard = ({ letter, idx }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="w-full h-80 cursor-pointer select-none"
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className="w-full h-full relative"
        style={{
          transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* FRONT FACE (Envelope shape) */}
        <div 
          className="absolute inset-0 w-full h-full rounded-3xl p-6 bg-gradient-to-br from-love-rose to-love-pink flex flex-col justify-between items-center text-center border border-white/40 shadow-lg"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Top Envelope flap shape */}
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-love-dark/70 mt-4">
            <Mail size={22} className="animate-pulse" />
          </div>

          <h3 className="font-love-title text-xl md:text-2xl font-bold text-love-dark px-2 leading-relaxed">
            {letter.title}
          </h3>

          <span className="text-[10px] uppercase tracking-widest text-love-dark/50 font-semibold mb-2 bg-white/30 px-3 py-1 rounded-full">
            Click to Open / திறக்க தட்டவும்
          </span>
        </div>

        {/* BACK FACE (Letter sheet) */}
        <div 
          className="absolute inset-0 w-full h-full rounded-3xl p-6 bg-white/95 flex flex-col justify-between border-2 border-love-rose/60 shadow-xl overflow-y-auto"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="flex justify-between items-center border-b border-love-rose/30 pb-2 mb-3">
            <span className="font-love-title text-xs font-semibold text-love-rose tracking-wider truncate mr-2">
              {letter.title}
            </span>
            <div className="text-love-rose flex-shrink-0">
              <MailOpen size={16} />
            </div>
          </div>

          <p className="text-sm text-love-dark/95 leading-relaxed font-light flex-grow overflow-y-auto pr-1">
            {letter.content}
          </p>

          <div className="text-right mt-3 text-[10px] text-love-dark/50 italic border-t border-love-rose/10 pt-2 flex-shrink-0">
            Click to close / மூட தட்டவும்
          </div>
        </div>
      </div>
    </div>
  );
};

export const OpenWhen = () => {
  const { lang } = useLanguage();
  const currentText = content.openWhen[lang || 'en'];

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

        {/* Letters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {currentText.letters.map((letter, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <FlipCard letter={letter} idx={idx} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
