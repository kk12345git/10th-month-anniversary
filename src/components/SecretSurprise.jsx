import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SecretSurprise = () => {
  const { lang } = useLanguage();
  const currentText = content.secretSurprise[lang || 'en'];
  
  const [isRevealed, setIsRevealed] = useState(false);

  const handleSurprise = () => {
    setIsRevealed(true);
    
    // Trigger double side confetti cannon
    const end = Date.now() + (3 * 1000); // 3 seconds explosion
    const colors = ['#FFC0CB', '#FFB7C5', '#FF69B4', '#FF1493', '#FFE4E1'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <section className="relative py-24 bg-love-light/60 overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
      
      {/* Decorative sparkles */}
      <div className="absolute top-10 left-10 text-love-rose/25 animate-pulse">
        <Sparkles size={36} />
      </div>
      <div className="absolute bottom-10 right-10 text-love-rose/25 animate-pulse" style={{ animationDelay: '0.8s' }}>
        <Sparkles size={36} />
      </div>

      <div className="max-w-2xl mx-auto px-6 text-center z-10 relative">
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="button"
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, shadow: '0 10px 25px rgba(255, 182, 197, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSurprise}
                className="px-8 py-4 bg-white/40 backdrop-blur-md text-love-dark font-medium text-lg rounded-full shadow-md border-2 border-love-rose/40 hover:bg-love-pink/10 transition-all duration-300 flex items-center gap-3 mx-auto cursor-pointer"
              >
                <Heart size={20} className="fill-love-rose text-love-rose animate-bounce" />
                <span>{currentText.button}</span>
                <Heart size={20} className="fill-love-rose text-love-rose animate-bounce" style={{ animationDelay: '0.2s' }} />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', damping: 15, stiffness: 100 }}
              className="glass-panel p-8 md:p-12 rounded-3xl border-2 border-love-rose/50 shadow-xl max-w-xl mx-auto select-none relative"
            >
              {/* Seal crown */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-love-rose to-love-pink text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                <Heart size={20} className="fill-white text-white" />
              </div>

              <h3 className="font-love-title text-2xl md:text-3xl font-bold text-love-dark mb-6 mt-4">
                {lang === 'ta' ? 'உனக்கான என் ஆச்சரியம்' : 'My Special Surprise'}
              </h3>
              
              <p className="font-serif text-lg md:text-xl text-love-dark/90 leading-relaxed font-medium italic">
                "{currentText.message}"
              </p>
              
              <div className="mt-8 flex justify-center gap-2 text-love-rose">
                <Sparkles size={16} />
                <Sparkles size={16} className="animate-ping" />
                <Sparkles size={16} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
