import React from 'react';

export default function ContactBlock({ phone = "96011047" }) {
  // Format phone as 9601 1047 or 9601-1047
  const formatted = phone.length === 8 ? `${phone.slice(0, 4)} ${phone.slice(4)}` : phone;

  return (
    <div className="px-6 text-center space-y-2.5">
      {/* Eyebrow */}
      <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7d6e68]">
        Холбоо барих
      </div>

      <div>
        <a
          href={`tel:${phone}`}
          className="inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-semibold bg-[#b82c1f] text-white shadow-md hover:bg-[#9e2418] transition active:scale-95 border border-black/5"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z" />
          </svg>
          <span>Залгах · {formatted}</span>
        </a>
      </div>
    </div>
  );
}
