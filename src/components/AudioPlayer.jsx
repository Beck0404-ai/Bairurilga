import React, { useEffect, useRef, useState } from 'react';

export default function AudioPlayer({
  src = `${import.meta.env.BASE_URL}music.mp3`,
  startSeconds = 22,
  shouldPlay = false
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (shouldPlay && !startedRef.current) {
      startedRef.current = true;
      audio.currentTime = startSeconds;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn('Playback error or auto-play prevented:', err);
            setIsPlaying(false);
          });
      }
    }
  }, [shouldPlay, startSeconds]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (!startedRef.current) {
        startedRef.current = true;
        audio.currentTime = startSeconds;
      }
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => console.warn('Audio play error:', err));
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        preload="auto"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Дуу зогсоох' : 'Дуу тоглуулах'}
        className="pointer-events-auto flex items-center gap-2 rounded-full bg-white/85 backdrop-blur-md px-3.5 py-2 text-xs font-semibold text-[#261f1d] border border-black/10 hover:bg-white transition shadow-md active:scale-95"
      >
        {isPlaying ? (
          <>
            <span className="flex items-end gap-0.5 h-3.5 w-3.5 pb-0.5" aria-hidden="true">
              <span className="w-1 bg-[#b82c1f] rounded-full h-3 animate-[pulse_0.8s_ease-in-out_infinite]" />
              <span className="w-1 bg-[#b82c1f] rounded-full h-2 animate-[pulse_1.2s_ease-in-out_0.2s_infinite]" />
              <span className="w-1 bg-[#b82c1f] rounded-full h-3.5 animate-[pulse_0.9s_ease-in-out_0.4s_infinite]" />
            </span>
            <span className="text-[11px] font-medium text-[#b82c1f]">Хөгжим</span>
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#b82c1f]" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span className="text-[11px] font-medium text-[#261f1d]">Дуу тоглуулах</span>
          </>
        )}
      </button>
    </>
  );
}
