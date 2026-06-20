import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { photos } from '../data/media';
import { Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const Gallery = () => {
  const { lang } = useLanguage();
  const currentText = content.gallery[lang || 'en'];
  
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [likedPhotos, setLikedPhotos] = useState(() => {
    const saved = localStorage.getItem('gallery_likes');
    return saved ? JSON.parse(saved) : {};
  });

  const openLightbox = (idx) => {
    setSelectedIdx(idx);
  };

  const closeLightbox = () => {
    setSelectedIdx(null);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const handleLike = (e, idx) => {
    e.stopPropagation(); // Prevent opening lightbox
    
    // Toggle like state
    const newLikes = { ...likedPhotos, [idx]: !likedPhotos[idx] };
    setLikedPhotos(newLikes);
    localStorage.setItem('gallery_likes', JSON.stringify(newLikes));
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (selectedIdx === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') setSelectedIdx((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
      if (e.key === 'ArrowRight') setSelectedIdx((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx]);

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

        {/* Pinterest Style Columns Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6 [column-fill:_balance]">
          {photos.map((url, idx) => {
            const isLiked = likedPhotos[idx];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
                onClick={() => openLightbox(idx)}
                className="break-inside-avoid relative rounded-3xl overflow-hidden glass-card cursor-pointer group shadow-sm border border-love-rose/20 select-none"
              >
                {/* Photo Image */}
                <img
                  src={url}
                  alt={`Memory ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-auto object-cover transform group-hover:scale-103 transition-transform duration-500 ease-out"
                />

                {/* Card Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-love-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 z-10">
                  <span className="text-white text-sm font-love-title font-medium tracking-wide">
                    {lang === 'ta' ? `நினைவு ${idx + 1}` : `Memory #${idx + 1}`}
                  </span>
                  
                  {/* Heart React Button */}
                  <motion.button
                    whileTap={{ scale: 1.4 }}
                    onClick={(e) => handleLike(e, idx)}
                    className="p-2.5 rounded-full bg-white/95 text-love-rose shadow-md hover:scale-110 active:scale-95 transition-transform duration-200"
                    aria-label="React with Love"
                  >
                    <Heart 
                      size={18} 
                      className={`${isLiked ? 'fill-love-rose text-love-rose' : 'text-love-dark/60'} transition-colors duration-200`} 
                    />
                  </motion.button>
                </div>

                {/* Floating Heart Icon if Reacted (always visible if liked) */}
                {isLiked && (
                  <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-sm z-10">
                    <Heart size={14} className="fill-love-rose text-love-rose animate-pulse" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/80 hover:text-white hover:scale-115 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 cursor-pointer z-50"
              aria-label="Close Lightbox"
            >
              <X size={24} />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-6 text-white/80 hover:text-white hover:scale-110 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer z-50"
              aria-label="Previous Image"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-6 text-white/80 hover:text-white hover:scale-110 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer z-50"
              aria-label="Next Image"
            >
              <ChevronRight size={28} />
            </button>

            {/* Main Lightbox Card */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] w-full flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={photos[selectedIdx]}
                alt={`Expanded Memory ${selectedIdx + 1}`}
                className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-white/10"
              />

              {/* Lightbox Info Bar */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/60 backdrop-blur-md border border-white/10 px-6 py-3.5 rounded-xl text-white">
                <span className="font-love-title text-base font-semibold tracking-wide">
                  {lang === 'ta' ? `நினைவு ${selectedIdx + 1} / 18` : `Memory #${selectedIdx + 1} of 18`}
                </span>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => handleLike(e, selectedIdx)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition duration-200 text-xs font-semibold cursor-pointer border border-white/5"
                  >
                    <Heart 
                      size={14} 
                      className={likedPhotos[selectedIdx] ? 'fill-love-rose text-love-rose' : 'text-white'} 
                    />
                    <span>{likedPhotos[selectedIdx] ? currentText.reactBurst : 'React'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
