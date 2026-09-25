import React from 'react';

export default function DemoToolbar({ onCta, onPrev, onNext, price = "19,900₮" }) {
  return (
    <div
      className="sticky bottom-0 z-40 w-full border-t border-white/10 bg-[#0e1526]/95 px-4 py-3 text-white backdrop-blur-md"
      style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
    >
      <div className="mx-auto flex w-full max-w-md items-center gap-3">
        {/* Previous */}
        <button
          type="button"
          onClick={onPrev}
          aria-label="Өмнөх загвар"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 active:scale-95"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>

        {/* Create with this template */}
        <button
          type="button"
          onClick={onCta}
          className="h-12 min-w-0 flex-1 rounded-full bg-white px-5 text-sm sm:text-base font-semibold text-[#0e1526] shadow-lg transition hover:bg-white/90 active:scale-98 flex items-center justify-center gap-1.5"
        >
          <span>Энэ загвараар үүсгэх</span>
          <span className="opacity-70 font-normal">· {price}</span>
        </button>

        {/* Next */}
        <button
          type="button"
          onClick={onNext}
          aria-label="Дараах загвар"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 active:scale-95"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
