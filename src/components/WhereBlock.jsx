import React from 'react';

function StaticMap({ lat = 44.88799, lng = 110.1286, zoom = 16 }) {
  const r = 2 ** zoom;
  const s = ((lng + 180) / 360) * r;
  const o =
    ((1 -
      Math.log(
        Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)
      ) /
        Math.PI) /
      2) *
    r;
  const c = Math.floor(s);
  const i = Math.floor(o);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#172036]">
      <div
        className="absolute"
        style={{
          left: `calc(50% - ${(s - c) * 256}px - 256px)`,
          top: `calc(50% - ${(o - i) * 256}px - 128px)`,
          width: 768,
          height: 512,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 256px)'
        }}
      >
        {[-1, 0, 1].flatMap((dy) =>
          [-1, 0, 1].map((dx) => (
            <img
              key={`${dx}-${dy}`}
              src={`https://tile.openstreetmap.org/${zoom}/${c + dx}/${i + dy}.png`}
              alt="Map tile"
              width={256}
              height={256}
              loading="lazy"
              className="brightness-90 contrast-105 saturate-75"
              style={{ gridColumn: dx + 2, gridRow: dy + 2 }}
            />
          ))
        )}
      </div>

      {/* Center Marker Pin */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
        <div className="relative flex flex-col items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c0392b] text-white shadow-xl ring-4 ring-white/30 animate-bounce">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          <div className="h-1.5 w-1.5 rounded-full bg-black/60 shadow-lg" />
        </div>
      </div>
    </div>
  );
}

export default function WhereBlock({
  name = "223-р байр, 501 тоот",
  address = "Дорноговь аймаг, Сайншанд сум, 6-р баг\n223-р байр, 501 тоот",
  lat = 44.88799,
  lng = 110.1286
}) {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <div className="px-6 text-center space-y-3">
      {/* Eyebrow */}
      <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7d6e68]">
        Хаана
      </div>

      {/* Name and Address */}
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-[#1f1b1a]">
          {name}
        </h3>
        <p className="text-xs text-[#5c504b] whitespace-pre-line leading-relaxed">
          {address}
        </p>
      </div>

      {/* OpenStreetMap Preview */}
      <div className="mx-auto aspect-[2/1] w-full max-w-sm overflow-hidden rounded-2xl border border-black/10 shadow-md">
        <StaticMap lat={lat} lng={lng} />
      </div>

      {/* Directions button */}
      <div>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-semibold bg-[#c0392b] text-white shadow-md hover:bg-[#a93226] transition active:scale-95"
        >
          <span aria-hidden="true">➤</span>
          <span>Зам заалгах</span>
        </a>
      </div>
    </div>
  );
}
