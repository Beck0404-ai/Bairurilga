import React, { useState } from 'react';

export default function RsvpBlock({ onRsvpChange }) {
  const [choice, setChoice] = useState(null);
  const [plusOne, setPlusOne] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (val) => {
    setLoading(true);
    setTimeout(() => {
      setChoice(val);
      setLoading(false);
      setSubmitted(true);
      if (onRsvpChange) onRsvpChange(val, plusOne);
    }, 400);
  };

  const handlePlusChange = (delta) => {
    const next = Math.max(0, Math.min(3, plusOne + delta));
    setPlusOne(next);
    if (onRsvpChange && choice) onRsvpChange(choice, next);
  };

  return (
    <div className="px-6 text-center space-y-3">
      {/* Eyebrow */}
      <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8b9dbb]">
        Хариу
      </div>

      <div className="text-xs text-[#8b9dbb]">
        Та энэхүү баярт хүрэлцэн ирэх боломжтой юу?
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-3 max-w-xs mx-auto">
        <button
          type="button"
          disabled={loading}
          onClick={() => handleSelect('yes')}
          className={`h-11 flex-1 rounded-full text-sm font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-1.5 shadow-sm ${
            choice === 'yes'
              ? 'bg-[#c0392b] text-white ring-2 ring-[#f07b70]'
              : 'border border-[#f07b70]/60 text-[#f07b70] hover:bg-[#c0392b]/10'
          }`}
        >
          {loading && choice === 'yes' && (
            <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
          )}
          {choice === 'yes' ? '✓ Очно' : 'Очно'}
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() => handleSelect('no')}
          className={`h-11 flex-1 rounded-full text-sm font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-1.5 shadow-sm ${
            choice === 'no'
              ? 'bg-[#c0392b] text-white ring-2 ring-[#f07b70]'
              : 'border border-[#f07b70]/60 text-[#f07b70] hover:bg-[#c0392b]/10'
          }`}
        >
          {loading && choice === 'no' && (
            <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
          )}
          {choice === 'no' ? '✓ Боломжгүй' : 'Боломжгүй'}
        </button>
      </div>

      {/* Plus one counter */}
      {choice === 'yes' && (
        <div className="mt-3 flex items-center justify-center gap-3 text-xs text-[#8b9dbb] bg-white/[0.03] p-2.5 rounded-xl border border-white/5 animate-fade-in">
          <span>Хамт очих зочин:</span>
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-2 py-0.5">
            <button
              type="button"
              onClick={() => handlePlusChange(-1)}
              disabled={plusOne <= 0}
              className="w-5 h-5 flex items-center justify-center text-white font-bold disabled:opacity-30 hover:bg-white/10 rounded-full"
            >
              -
            </button>
            <span className="text-white font-semibold text-xs tabular-nums">+{plusOne}</span>
            <button
              type="button"
              onClick={() => handlePlusChange(1)}
              disabled={plusOne >= 3}
              className="w-5 h-5 flex items-center justify-center text-white font-bold disabled:opacity-30 hover:bg-white/10 rounded-full"
            >
              +
            </button>
          </div>
        </div>
      )}

      {submitted && (
        <div className="text-xs text-emerald-400 font-medium animate-fade-in">
          ✓ Баярлалаа! Таны хариуг тэмдэглэлээ.
        </div>
      )}
    </div>
  );
}
