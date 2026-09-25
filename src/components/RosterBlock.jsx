import React from 'react';

const SAMPLE_ROSTER = [
  { name: 'Т******н', response: 'yes', plus: 1, amount: '50,000₮' },
  { name: 'Б. Болд', response: 'yes', plus: 0, amount: '20,000₮' },
  { name: 'Д. Оюун', response: 'no', plus: 0, amount: null },
  { name: 'Сарнай', response: 'yes', plus: 0, amount: null }
];

export default function RosterBlock() {
  return (
    <div className="px-6 space-y-3">
      {/* Eyebrow */}
      <div className="text-center">
        <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8b9dbb]">
          Оролцогчид <span className="opacity-60 font-normal">· жишээ</span>
        </div>
        <div className="mt-1 text-xs text-[#8b9dbb]">
          3 хүн очно · 2 хүн мялаалга илгээсэн
        </div>
      </div>

      {/* List */}
      <ul className="mx-auto max-w-sm space-y-2 text-sm">
        {SAMPLE_ROSTER.map((guest, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 bg-white/[0.04] border border-white/5"
          >
            <span className="truncate font-medium text-white/90">
              {guest.name}
              {guest.plus > 0 && (
                <span className="text-xs text-[#8b9dbb] ml-1">+{guest.plus}</span>
              )}
            </span>
            <span className="shrink-0 text-xs text-[#8b9dbb] font-medium">
              {guest.amount ? (
                <span className="text-[#f07b70]">{guest.amount}</span>
              ) : guest.response === 'yes' ? (
                <span className="text-emerald-400">Очно</span>
              ) : (
                <span>Боломжгүй</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
