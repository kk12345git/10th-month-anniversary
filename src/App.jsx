import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { LanguageGate } from './components/LanguageGate';
import { CinematicIntro } from './components/CinematicIntro';
import { AmbientCanvas } from './components/AmbientCanvas';
import { MusicPlayer } from './components/MusicPlayer';
import { WelcomeHero } from './components/WelcomeHero';
import { Timeline } from './components/Timeline';
import { Gallery } from './components/Gallery';
import { VideoMemories } from './components/VideoMemories';
import { LoveInNumbers } from './components/LoveInNumbers';
import { ReasonsILoveYou } from './components/ReasonsILoveYou';
import { LoveLetter } from './components/LoveLetter';
import { LiveCounter } from './components/LiveCounter';
import { MemoryPolaroids } from './components/MemoryPolaroids';
import { LoveNotes } from './components/LoveNotes';
import { OpenWhen } from './components/OpenWhen';
import { SecretSurprise } from './components/SecretSurprise';
import { GrandFinale } from './components/GrandFinale';
import { AnniversaryCelebration } from './components/AnniversaryCelebration';
import { Globe, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();

  if (!lang) return null;

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'ta' : 'en');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="fixed top-6 right-6 z-40 glass-panel flex items-center gap-2 px-4 py-2 rounded-full shadow-md text-love-dark font-medium border border-love-rose/40 hover:bg-love-pink/15 transition duration-300 cursor-pointer text-sm"
      aria-label="Toggle Language / மொழி மாற்று"
    >
      <Globe size={15} className="text-love-rose animate-spin-slow" />
      <span className="font-love-title font-semibold">
        {lang === 'en' ? 'தமிழ்' : 'English'}
      </span>
    </motion.button>
  );
};

const MainContent = () => {
  const { lang, isGateRequired } = useLanguage();
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  return (
    <>
      {/* 1. Language Gate overlays everything if no language is selected */}
      <LanguageGate />

      {/* 2. Main wrapper loads once language is picked */}
      {!isGateRequired && (
        <div className="relative min-h-screen text-love-dark">
          {/* Ambient Background Canvas (active immediately to float behind credits) */}
          <AmbientCanvas />

          {/* Floating Music player (starts audio instantly on language click) */}
          <MusicPlayer />

          {/* Cinematic movie intro overlay */}
          {!isIntroComplete && (
            <CinematicIntro onComplete={() => setIsIntroComplete(true)} />
          )}

          {/* Floating Language Toggle (hidden during credits, visible after) */}
          {isIntroComplete && <LanguageToggle />}

          {/* 15 Sections - revealed with a slow luxury fade in */}
          {isIntroComplete && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <WelcomeHero />
              <Timeline />
              <Gallery />
              <VideoMemories />
              <LoveInNumbers />
              <ReasonsILoveYou />
              <LoveLetter />
              <LiveCounter />
              <MemoryPolaroids />
              <LoveNotes />
              <OpenWhen />
              <SecretSurprise />
              <GrandFinale />
              <AnniversaryCelebration />

              {/* Elegant Footer */}
              <footer className="py-12 bg-love-light text-center border-t border-love-rose/20 relative z-20">
                <div className="flex items-center justify-center gap-2 text-love-dark/40 font-love-title text-sm tracking-wider">
                  <span>Made with</span>
                  <Heart size={14} className="text-love-rose fill-love-rose" />
                  <span>for My Forever Love</span>
                </div>
                <p className="mt-2 text-[10px] text-love-dark/30 tracking-widest uppercase">
                  Happy 10th Month Anniversary · August 15, 2025 - Present
                </p>
              </footer>
            </motion.div>
          )}
        </div>
      )}
    </>
  );
};

function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}

export default App;
