import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { videos } from '../data/media';
import { Play, X } from 'lucide-react';

export const VideoMemories = () => {
  const { lang } = useLanguage();
  const currentText = content.videoMemories[lang || 'en'];
  
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);

  const openVideo = (url) => {
    setActiveVideoUrl(url);
  };

  const closeVideo = () => {
    setActiveVideoUrl(null);
  };

  return (
    <section className="relative py-24 bg-love-light/60 overflow-hidden">
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

        {/* Video Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {videos.map((url, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                onClick={() => openVideo(url)}
                className="glass-card rounded-3xl overflow-hidden cursor-pointer relative group aspect-video border border-love-rose/30 shadow-md select-none"
              >
                {/* Video HTML5 element for first-frame thumbnail */}
                <div className="w-full h-full bg-black relative">
                  <video 
                    src={url} 
                    preload="metadata" 
                    className="w-full h-full object-cover opacity-85 group-hover:scale-102 transition-transform duration-500 ease-out"
                    muted
                    playsInline
                  />
                  
                  {/* Glassy Play Overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/40 shadow-xl transition-all duration-300"
                    >
                      <Play size={26} className="fill-white ml-1 text-white" />
                    </motion.div>
                  </div>

                  {/* Caption Bar */}
                  <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-love-dark/70 to-transparent backdrop-blur-sm px-4 py-2 rounded-xl text-white border border-white/5">
                    <span className="font-love-title text-sm font-semibold tracking-wide">
                      {lang === 'ta' ? `காணொளி நினைவு ${idx + 1}` : `Video Memory #${idx + 1}`}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideo}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            {/* Close Button */}
            <button
              onClick={closeVideo}
              className="absolute top-6 right-6 text-white/80 hover:text-white hover:scale-115 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 cursor-pointer z-50"
              aria-label="Close video player"
            >
              <X size={24} />
            </button>

            {/* Video Player Card */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/10"
            >
              <video
                src={activeVideoUrl}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
