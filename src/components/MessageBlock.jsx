import React from 'react';

export default function MessageBlock({
  message = "Ургах нарыг угтан сүндэрлэсэн\nУраг төрөл батжин дэлгэрсэн\nЭцэг өвгөдийнхөө голомтыг өргөтгөн тэлж буй бидний\nШинэ байрны цайллаганд хүрэлцэн ирэхийг урьж байна.",
  note = ""
}) {
  return (
    <div className="px-7 text-center space-y-3">
      <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-[0.25em] uppercase text-[#b82c1f]">
        У Р И Л Г А
      </h2>
      <p className="whitespace-pre-line text-balance text-base sm:text-lg leading-relaxed text-[#2c2523] font-heading font-medium">
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
