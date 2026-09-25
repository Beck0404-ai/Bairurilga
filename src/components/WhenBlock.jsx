import React, { useState, useEffect, useMemo } from 'react';

const MN_DAYS = ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'];
const MN_MONTHS = [
  '1-р сар', '2-р сар', '3-р сар', '4-р сар', '5-р сар', '6-р сар',
  '7-р сар', '8-р сар', '9-р сар', '10-р сар', '11-р сар', '12-р сар'
];

export default function WhenBlock({ targetDateStr = null, time = "18:00" }) {
  // Compute eventDate based on props
  const eventDate = useMemo(() => {
    if (targetDateStr) return new Date(targetDateStr);
    const d = new Date();
    d.setDate(d.getDate() + 21);
    d.setHours(18, 0, 0, 0);
    return d;
  }, [targetDateStr]);

  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = eventDate.getTime() - now;
      if (diff <= 0) {
        setCountdown({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      setCountdown({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((diff % (1000 * 60)) / 1000)
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [eventDate]);

  const year = eventDate.getFullYear();
  const month = eventDate.getMonth();
  const day = eventDate.getDate();
  const dayOfWeekName = MN_DAYS[eventDate.getDay()];

  // Mini Calendar generation
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <div className="px-6 text-center space-y-4">
      {/* Eyebrow */}
      <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8b9dbb]">
        Хэзээ
      </div>

      {/* Date Main Row */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 max-w-xs mx-auto">
        <div className="text-right text-sm text-[#8b9dbb] font-medium">
          {dayOfWeekName}
        </div>
        <div className="text-5xl font-semibold leading-none font-heading text-[#f07b70]">
          {day}
        </div>
        <div className="text-left text-sm text-[#8b9dbb] font-medium">
          {time}
        </div>
      </div>

      {/* Mini Calendar Widget */}
      <div className="mx-auto w-full max-w-[280px] rounded-2xl p-3 bg-white/[0.04] border border-white/10 shadow-inner">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8b9dbb] mb-2">
          {MN_MONTHS[month]} {year}
        </div>
        <div className="grid grid-cols-7 gap-y-1 text-[11px]">
          {['Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя', 'Ня'].map((d) => (
            <div key={d} className="py-0.5 text-[#8b9dbb]/70 font-medium">
              {d}
            </div>
          ))}
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
            const isTarget = d === day;
            return (
              <div key={d} className="flex items-center justify-center">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] transition ${
                    isTarget
                      ? 'bg-[#c0392b] text-white font-bold shadow-md'
                      : 'text-white/80 hover:bg-white/5'
                  }`}
                >
                  {d}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Countdown Timer */}
      <div className="mx-auto inline-flex gap-2 rounded-2xl px-4 py-2.5 bg-white/[0.04] border border-white/10 shadow-sm">
        {[
          { label: 'Өдөр', val: countdown.d },
          { label: 'Цаг', val: countdown.h },
          { label: 'Мин', val: countdown.m },
          { label: 'Сек', val: countdown.s }
        ].map(({ label, val }) => (
          <div key={label} className="min-w-[44px]">
            <div className="text-lg font-semibold leading-none text-[#f07b70] tabular-nums font-heading">
              {String(val).padStart(2, '0')}
            </div>
            <div className="text-[9px] uppercase tracking-wider text-[#8b9dbb] mt-1">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
