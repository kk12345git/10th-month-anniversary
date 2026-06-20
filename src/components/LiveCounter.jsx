import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Heart } from 'lucide-react';

export const LiveCounter = () => {
  const { lang } = useLanguage();
  const currentText = content.liveCounter[lang || 'en'];

  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const startDate = new Date('2025-08-15T00:00:00');
      const now = new Date();
      
      // Clamp to start date if now is somehow earlier
      if (now < startDate) {
        setTimeLeft({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      // Calculate calendar months
      let months = (now.getFullYear() - startDate.getFullYear()) * 12 + now.getMonth() - startDate.getMonth();
      let tempDate = new Date(startDate);
      tempDate.setMonth(tempDate.getMonth() + months);

      // If tempDate is past now, decrement month
      if (tempDate > now) {
        months--;
        tempDate = new Date(startDate);
        tempDate.setMonth(tempDate.getMonth() + months);
      }

      const diffMs = now.getTime() - tempDate.getTime();
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setTimeLeft({ months, days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: lang === 'ta' ? 'மாதங்கள்' : 'Months', value: timeLeft.months },
    { label: lang === 'ta' ? 'நாட்கள்' : 'Days', value: timeLeft.days },
    { label: lang === 'ta' ? 'மணிநேரம்' : 'Hours', value: timeLeft.hours },
    { label: lang === 'ta' ? 'நிமிடங்கள்' : 'Minutes', value: timeLeft.minutes },
    { label: lang === 'ta' ? 'விநாடிகள்' : 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section className="relative py-24 bg-love-light/60 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        
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

        {/* Counter Display Wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="glass-panel rounded-3xl p-8 border border-love-rose/40 shadow-xl relative max-w-2xl mx-auto select-none"
        >
          {/* Glowing hearts left and right */}
          <div className="absolute -top-6 left-6 text-love-rose animate-bounce">
            <Heart className="fill-love-rose text-love-rose drop-shadow-[0_0_8px_rgba(255,182,197,0.8)]" size={32} />
          </div>
          <div className="absolute -bottom-6 right-6 text-love-rose animate-bounce" style={{ animationDelay: '0.5s' }}>
            <Heart className="fill-love-rose text-love-rose drop-shadow-[0_0_8px_rgba(255,182,197,0.8)]" size={32} />
          </div>

          {/* Time block flex grid */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-4 text-center">
            {timeBlocks.map((block, idx) => (
              <div 
                key={idx} 
                className="flex flex-col bg-white/40 border border-white/50 rounded-xl py-3 px-1 sm:py-6 shadow-sm justify-between min-w-0"
              >
                {/* Timer Digit */}
                <div className="font-love-title text-lg sm:text-4xl md:text-5xl font-bold text-love-dark tracking-tight leading-none mb-2 font-mono">
                  {block.value}
                </div>
                
                {/* Timer Label */}
                <div className="text-[9px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-love-dark/60 truncate">
                  {block.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
