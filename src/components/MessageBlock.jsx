import React from 'react';

export default function MessageBlock({
  message = "Шинэхэн орсон өргөө байрныхаа баяр баясгаланг хуваалцаж, шинэ байрыг минь мялаах халуун дотно зоогт хүрэлцэн ирэхийг хүндэтгэн урьж байна.",
  note = ""
}) {
  return (
    <div className="px-7 text-center space-y-3">
      <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7d6e68]">
        Урилга
      </div>
      <p className="whitespace-pre-line text-balance text-[15px] leading-relaxed text-[#2c2523] font-heading text-lg sm:text-xl font-medium">
        {message}
      </p>
      {note && (
        <p className="text-xs leading-relaxed text-[#5c504b] bg-black/[0.02] p-3 rounded-xl border border-black/5">
          {note}
        </p>
      )}
    </div>
  );
}
