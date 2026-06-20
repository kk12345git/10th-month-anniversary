import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export const LanguageGate = () => {
  const { lang, setLang } = useLanguage();

  return (
    <AnimatePresence>
      {!lang && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-radial from-love-light to-love-pink/50 p-6 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="glass-panel max-w-md w-full rounded-3xl p-8 text-center border-love-rose/40"
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-6xl mb-6 cursor-default"
            >
              ❤️
            </motion.div>
            
            <h1 className="font-love-title text-2xl md:text-3xl font-semibold mb-2 text-love-dark tracking-wide">
              Choose Your Language
            </h1>
            <h2 className="font-love-title text-xl md:text-2xl font-medium mb-8 text-love-dark/80">
              உங்கள் மொழியை தேர்வு செய்யுங்கள்
            </h2>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center">
              <button
                onClick={() => setLang('en')}
                className="px-8 py-3 bg-gradient-to-r from-love-rose to-love-pink text-love-dark font-medium rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition duration-300 font-love-title border border-love-rose/30"
              >
                English
              </button>
              
              <button
                onClick={() => setLang('ta')}
                className="px-8 py-3 bg-gradient-to-r from-love-rose to-love-pink text-love-dark font-medium rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition duration-300 font-love-title border border-love-rose/30"
              >
                தமிழ்
              </button>
            </div>
            
            <p className="mt-8 text-xs text-love-dark/50 italic">
              "Every love story is beautiful, but ours is my favorite."
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
