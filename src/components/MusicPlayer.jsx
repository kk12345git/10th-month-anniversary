import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const MusicPlayer = () => {
  const { lang } = useLanguage();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Autoplay on mount (since user already interacted by picking a language)
    const playAudio = () => {
      audio.play().then(() => {
        setIsPlaying(true);
        setShowPrompt(false);
      }).catch((err) => {
        console.log("Autoplay on mount deferred: ", err);
      });
    };
    
    const playTimer = setTimeout(playAudio, 300);

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration || 0);
    const handleAudioEnded = () => {
      setIsPlaying(false);
      audio.currentTime = 0;
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleAudioEnded);

    return () => {
      clearTimeout(playTimer);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleAudioEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        setShowPrompt(false);
      }).catch((err) => {
        console.log("Audio autoplay failed or cancelled: ", err);
      });
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      audioRef.current.muted = newVol === 0;
      setIsMuted(newVol === 0);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Prompts translation
  const prompts = {
    en: "Tap to play our song 🎵",
    ta: "நமது பாடலைக் கேட்க தட்டவும் 🎵"
  };

  return (
    <div 
      className="fixed bottom-6 left-6 z-40 flex items-center gap-3 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <audio ref={audioRef} src="/audio/song.mp3" loop />

      {/* Pulsing prompt banner */}
      {showPrompt && (
        <div 
          onClick={togglePlay}
          className="glass-panel text-xs text-love-dark font-medium px-4 py-2 rounded-full cursor-pointer animate-pulse whitespace-nowrap shadow-md border-love-rose/40 hover:bg-love-pink/20 transition-all duration-300"
        >
          {prompts[lang || 'en']}
        </div>
      )}

      {/* Main player controls wrapper */}
      <div 
        className={`glass-panel flex items-center gap-2 p-2 rounded-full shadow-lg border-love-rose/40 transition-all duration-500 overflow-hidden ${
          isHovered || isPlaying ? 'max-w-72 px-4' : 'max-w-12 px-2'
        }`}
        style={{ width: 'auto' }}
      >
        {/* Play/Pause circular button */}
        <button
          onClick={togglePlay}
          className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-love-rose to-love-pink text-love-dark rounded-full hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer"
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
        </button>

        {/* Extended controls shown when hovered or playing */}
        {(isHovered || isPlaying) && (
          <div className="flex items-center gap-3 animate-fade-in w-48">
            <div className="flex flex-col flex-grow">
              {/* Progress Slider */}
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleProgressChange}
                className="w-full accent-love-rose h-1 rounded-lg appearance-none bg-love-dark/10 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-love-dark/60 mt-1 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Volume Icon & Mute Toggle */}
            <div className="flex items-center gap-1.5">
              <button 
                onClick={toggleMute} 
                className="text-love-dark/80 hover:text-love-dark transition cursor-pointer"
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-12 accent-love-rose h-1 rounded-lg appearance-none bg-love-dark/10 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Floating icon if player is collapsed */}
        {!(isHovered || isPlaying) && (
          <div className="w-8 h-8 flex items-center justify-center text-love-rose animate-spin-slow">
            <Music size={16} />
          </div>
        )}
      </div>
    </div>
  );
};
