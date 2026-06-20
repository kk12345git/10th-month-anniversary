import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export const CinematicIntro = ({ onComplete }) => {
  const { lang } = useLanguage();
  const [slideIdx, setSlideIdx] = useState(0);

  const slides = {
    en: [
      { text: "Karthigeyan presents..." },
      { text: "A beautiful story of 10 months..." },
      { text: "Dedicated to my beautiful fiancée..." }
    ],
    ta: [
      { text: "கார்த்திகேயன் பெருமையுடன் வழங்கும்..." },
      { text: "10 மாதங்களின் அழகான காதல் கதை..." },
      { text: "என் அழகான காதலிக்கு அர்ப்பணிக்கப்பட்டது..." }
    ]
  };

  const currentSlides = slides[lang || 'en'];

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setSlideIdx(1);
    }, 2000);

    const timer2 = setTimeout(() => {
      setSlideIdx(2);
    }, 4000);

    const timer3 = setTimeout(() => {
      onComplete();
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A050D] text-white">
      {/* Cinematic background particles (very low density sparkles) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,182,193,0.05),transparent_70%)]" />
      
      <AnimatePresence mode="wait">
        {currentSlides.map((slide, idx) => {
          if (idx !== slideIdx) return null;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, filter: "blur(5px)" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="text-center px-6 max-w-xl select-none"
            >
              <h2 className="font-love-title text-2xl md:text-4xl font-light tracking-widest text-love-rose leading-relaxed drop-shadow-[0_0_8px_rgba(255,182,197,0.3)]">
                {slide.text}
              </h2>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "60px" }}
                transition={{ delay: 0.3, duration: 1.2 }}
                className="h-0.5 bg-love-rose/40 mx-auto mt-4 rounded-full"
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
