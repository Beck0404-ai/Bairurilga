import React, { useState } from 'react';
import FocusGate from './components/FocusGate';
import FireworksCanvas from './components/FireworksCanvas';
import Hero from './components/Hero';
import TitleBlock from './components/TitleBlock';
import Divider from './components/Divider';
import WhenBlock from './components/WhenBlock';
import WhereBlock from './components/WhereBlock';
import MessageBlock from './components/MessageBlock';
import AgendaBlock from './components/AgendaBlock';
import ContactBlock from './components/ContactBlock';
import AudioPlayer from './components/AudioPlayer';

export default function App() {
  const [gateOpen, setGateOpen] = useState(false);
  const [burstTrigger, setBurstTrigger] = useState(0);
  const [shouldPlayAudio, setShouldPlayAudio] = useState(false);

  const handleGateOpen = () => {
    setGateOpen(true);
    setBurstTrigger((prev) => prev + 1);
    setShouldPlayAudio(true);
  };

  const handleResetGate = () => {
    setGateOpen(false);
    setShouldPlayAudio(false);
  };

  return (
    <div className="relative min-h-screen bg-[#f7f4ee] text-[#261f1d] flex flex-col items-center justify-start overflow-x-hidden">

      {/* Focus Gate (Overlay before opening) */}
      {!gateOpen && (
        <FocusGate
          onOpen={handleGateOpen}
        />
      )}

      {/* Top Floating Bar */}
      <header className="fixed top-0 inset-x-0 z-30 pointer-events-none flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
        {/* Left: Re-lock Gate or Home button */}
        <button
          type="button"
          onClick={handleResetGate}
          title="Хаалгыг дахин хаах"
          className="pointer-events-auto flex items-center justify-center w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-stone-700 hover:text-stone-900 border border-black/10 transition shadow-md"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right: Audio Player */}
        <div className="pointer-events-auto">
          <AudioPlayer
            youtubeId="S1XO_TteDOI"
            startSeconds={10}
            shouldPlay={shouldPlayAudio}
          />
        </div>
      </header>

      {/* Main Card Scroll Container */}
      <main className="relative w-full max-w-md min-h-screen bg-white shadow-2xl flex flex-col justify-between overflow-hidden border-x border-black/5 pb-8">
        {/* Background Tümen Nast Pattern */}
        <div className="tumen-pattern opacity-10" />

        {/* Background Radial Glow */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[65vh]"
          style={{ background: 'var(--card-glow)' }}
        />

        {/* Live Canvas Fireworks */}
        <FireworksCanvas active={gateOpen} burstTrigger={burstTrigger} />

        {/* Card Content Stack */}
        <div className="relative z-20 space-y-7">
          {/* Cover Hero Photo */}
          <Hero coverUrl={`${import.meta.env.BASE_URL}cover.jpg`} />

          {/* Title */}
          <TitleBlock title="Шинэ байрны найр" />

          {/* Divider */}
          <Divider />

          {/* Date, Calendar & Countdown */}
          <WhenBlock targetDateStr="2026-10-13T10:00:00" time="10:00 - 16:00" />

          {/* Schedule / Agenda */}
          <AgendaBlock />

          {/* Divider */}
          <Divider />

          {/* Where & Map */}
          <WhereBlock
            name="223-р байр, 501 тоот"
            address={"Дорноговь аймаг, Сайншанд сум, 6-р баг\n223-р байр, 501 тоот"}
            lat={44.88799}
            lng={110.1286}
          />

          {/* Message */}
          <MessageBlock
            message={`Ургах нарыг угтан сүндэрлэсэн\nУраг төрөл батжин дэлгэрсэн\nЭцэг өвгөдийнхөө голомтыг өргөтгөн тэлж буй бидний\nШинэ байрны цайллаганд хүрэлцэн ирэхийг урьж байна.`}
          />

          {/* Contact */}
          <ContactBlock phone="96011047" />

          {/* Ending Ornament */}
          <div className="pt-6 pb-16 text-center">
            <Divider />
          </div>
        </div>
      </main>
    </div>
  );
}
