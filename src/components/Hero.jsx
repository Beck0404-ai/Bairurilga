import React from 'react';

export default function Hero({ coverUrl = "/cover.jpg" }) {
  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-b-3xl shadow-2xl">
      <img
        src={coverUrl}
        alt="Шинэ гэрийн найр"
        className="w-full h-full object-cover object-center"
      />
      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#240805] via-transparent to-black/20" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#240805] to-transparent" />
    </div>
  );
}
