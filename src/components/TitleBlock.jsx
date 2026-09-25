import React from 'react';

export default function TitleBlock({ title = "Шинэ гэрийн найр", from = "" }) {
  return (
    <div className="px-6 text-center space-y-2">
      <h1 className="font-heading text-3xl sm:text-4xl font-semibold tracking-wide text-white leading-tight">
        {title}
      </h1>
      {from && (
        <div className="text-sm italic font-heading text-[#f07b70]">
          — {from}
        </div>
      )}
    </div>
  );
}
