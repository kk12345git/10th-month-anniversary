import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Heart } from 'lucide-react';

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
    }, 2500);

    const timer2 = setTimeout(() => {
      setSlideIdx(2);
    }, 5000);

    const timer3 = setTimeout(() => {
      onComplete();
    }, 7500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A050D]/93 backdrop-blur-xs text-white">
      {/* Cinematic radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,182,193,0.08),transparent_70%)] pointer-events-none" />
      
      <AnimatePresence mode="wait">
        {currentSlides.map((slide, idx) => {
          if (idx !== slideIdx) return null;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.96, y: 15, filter: "blur(4px)" }}
              animate={{ 
                opacity: [0, 1, 1, 0], 
                scale: [0.96, 1.02, 1.04, 1.08], 
                y: [15, 0, -5, -15], 
                filter: ["blur(4px)", "blur(0px)", "blur(0px)", "blur(4px)"]
              }}
              transition={{ 
                duration: 2.5, 
                times: [0, 0.25, 0.75, 1],
                ease: "easeInOut" 
              }}
              className="text-center px-6 max-w-xl select-none flex flex-col items-center gap-4"
            >
              <h2 className="font-love-title text-2xl md:text-4xl font-light tracking-widest text-love-rose leading-relaxed drop-shadow-[0_0_12px_rgba(255,182,197,0.4)]">
                {slide.text}
              </h2>
              
              {/* Pulsing golden heart separator */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="text-amber-200 mt-2"
              >
                <Heart size={18} className="fill-amber-200" />
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
