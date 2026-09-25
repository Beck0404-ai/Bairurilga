import React from 'react';

export default function MessageBlock({
  message = "Шинэхэн босгосон өргөө гэрийнхээ баяр баясгаланг хуваалцаж, шинэ гэрийг минь мялаах халуун дотно зоогт хүрэлцэн ирэхийг хүндэтгэн урьж байна.",
  note = ""
}) {
  return (
    <div className="px-7 text-center space-y-3">
      <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8b9dbb]">
        Урилга
      </div>
      <p className="whitespace-pre-line text-balance text-[15px] leading-relaxed text-white/90 font-heading text-lg sm:text-xl">
        {message}
      </p>
      {note && (
        <p className="text-xs leading-relaxed text-[#8b9dbb] bg-white/[0.03] p-3 rounded-xl border border-white/5">
          {note}
        </p>
      )}
    </div>
  );
}
