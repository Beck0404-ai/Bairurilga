import React from 'react';

export default function TitleBlock({ title = "Шинэ байрны найр", from = "" }) {
  return (
    <div className="px-6 text-center space-y-2">
      <h1 className="font-heading text-3xl sm:text-4xl font-semibold tracking-wide text-[#1f1b1a] leading-tight">
        {title}
      </h1>
      {from && (
        <div className="text-sm italic font-heading text-[#b82c1f]">
          — {from}
        </div>
      )}
    </div>
  );
}
