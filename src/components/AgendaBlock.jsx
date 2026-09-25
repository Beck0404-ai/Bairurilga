import React from 'react';

const SCHEDULE = [
  {
    time: '10:00 - 12:00',
    title: 'Хамаатан садан',
    desc: 'Ах дүү, хамаатан садны зочдоо хүлээн авах'
  },
  {
    time: '12:00 - 14:00',
    title: 'Хамт олон',
    desc: 'Ажлын хамт олны зочдоо хүлээн авах'
  },
  {
    time: '14:00 - 16:00',
    title: 'Найзууд',
    desc: 'Найз нөхдөө хүлээн авах'
  }
];

export default function AgendaBlock() {
  return (
    <div className="px-6 space-y-4">
      {/* Eyebrow */}
      <div className="text-center">
        <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7d6e68]">
          Цагийн хуваарь
        </div>
        <div className="mt-1 text-xs text-[#7d6e68]">
          Зочдоо хүлээн авах нарийвчилсан хуваарь
        </div>
      </div>

      {/* Timeline items */}
      <div className="mx-auto max-w-sm space-y-2.5">
        {SCHEDULE.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3.5 p-3 rounded-2xl bg-black/[0.02] border border-black/5 hover:border-black/10 transition shadow-sm"
          >
            {/* Time Pill */}
            <div className="shrink-0 flex items-center justify-center px-2.5 py-1.5 rounded-xl bg-[#b82c1f]/10 border border-[#b82c1f]/20 text-[#b82c1f] text-xs font-semibold tabular-nums">
              {item.time}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-[#1f1b1a] leading-snug">
                {item.title}
              </div>
              <div className="text-[11px] text-[#7d6e68] leading-tight mt-0.5">
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
