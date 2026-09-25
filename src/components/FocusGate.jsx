import React, { useState } from 'react';

export default function FocusGate({ onOpen }) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    if (onOpen) onOpen();
  };

  return (
    <div
      onClick={handleOpen}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ease-in-out cursor-pointer select-none ${
        opening ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse 85% 75% at 50% 50%, #681b12 0%, #48130c 45%, #220705 100%)'
      }}
    >
      {/* Background Pattern Mask */}
      <div
        className="tumen-pattern"
        style={{
          backgroundColor: '#e58774',
          opacity: 0.22
        }}
      />

      {/* Radial Vignette */}
      <div className="ux-fc-vignette pointer-events-none" />

      {/* Center Layout exactly as in screenshot */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center gap-5 px-6 animate-fade-in">
        {/* Kicker */}
        <div className="text-xs font-semibold tracking-[0.25em] uppercase text-white/95 drop-shadow-md">
          ТАНД УРИЛГА ИРЛЭЭ
        </div>

        {/* Circular Hand Icon with Ripple Ring */}
        <div className="relative flex items-center justify-center my-1">
          <span className="ux-tap-ring" />
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white shadow-2xl backdrop-blur-md transition transform hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 11.5V5.5a1.5 1.5 0 0 1 3 0V11" />
              <path d="M12 10.5a1.5 1.5 0 0 1 3 0V12" />
              <path d="M15 11.5a1.5 1.5 0 0 1 3 0V13" />
              <path d="M18 12.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2.5a6 6 0 0 1-5.2-3L4.6 15.4a1.5 1.5 0 0 1 2.5-1.6L9 16v-4.5" />
            </svg>
          </div>
        </div>

        {/* Pill Hint Button */}
        <div className="rounded-full border border-white/30 bg-white/10 px-8 py-2.5 backdrop-blur-md shadow-xl transition hover:bg-white/15 active:scale-95">
          <span className="text-sm font-semibold tracking-wide text-white drop-shadow">
            Энд дарж нээнэ үү
          </span>
        </div>
      </div>
    </div>
  );
}
