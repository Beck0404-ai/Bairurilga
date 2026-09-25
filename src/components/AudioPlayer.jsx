import React, { useEffect, useRef, useState } from 'react';

export default function AudioPlayer({ youtubeId = "S1XO_TteDOI", startSeconds = 10, shouldPlay = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Load YouTube IFrame API if not already present
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.onYouTubeIframeAPIReady = initPlayer;
      document.body.appendChild(tag);
    } else {
      initPlayer();
    }

    function initPlayer() {
      if (playerRef.current) return;
      playerRef.current = new window.YT.Player('yt-hidden-player', {
        height: '1',
        width: '1',
        videoId: youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          start: startSeconds,
          loop: 1,
          playlist: youtubeId,
          playsinline: 1
        },
        events: {
          onReady: (event) => {
            if (shouldPlay) {
              event.target.playVideo();
              setIsPlaying(true);
            }
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
              setIsPlaying(false);
            }
          }
        }
      });
    }
  }, [youtubeId, startSeconds]);

  useEffect(() => {
    if (shouldPlay && playerRef.current && playerRef.current.playVideo) {
      try {
        playerRef.current.playVideo();
        setIsPlaying(true);
      } catch (e) {
        console.warn('Autoplay blocked', e);
      }
    }
  }, [shouldPlay]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <>
      <div id="yt-hidden-player" className="absolute -top-[9999px] -left-[9999px] pointer-events-none opacity-0" />
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Дуу зогсоох' : 'Дуу тоглуулах'}
        className="pointer-events-auto flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-md px-3.5 py-2 text-xs font-semibold text-white/90 border border-white/10 hover:bg-black/80 transition shadow-lg"
      >
        {isPlaying ? (
          <>
            <span className="flex items-end gap-0.5 h-3.5 w-3.5 pb-0.5">
              <span className="w-1 bg-[#f07b70] rounded-full animate-[music-bar_0.8s_ease-in-out_infinite]" />
              <span className="w-1 bg-[#f07b70] rounded-full animate-[music-bar_1.2s_ease-in-out_0.2s_infinite]" />
              <span className="w-1 bg-[#f07b70] rounded-full animate-[music-bar_0.9s_ease-in-out_0.4s_infinite]" />
            </span>
            <span className="text-[11px]">Хөгжим</span>
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white/70" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span className="text-[11px]">Дуу тоглуулах</span>
          </>
        )}
      </button>
    </>
  );
}
