import React from 'react';

export default function Hero({ coverUrl = `${import.meta.env.BASE_URL}cover.jpg` }) {
  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-b-3xl shadow-2xl">
      <img
        src={coverUrl}
        alt="Шинэ байрны найр"
        className="w-full h-full object-cover object-center"
      />
      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/10" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}
