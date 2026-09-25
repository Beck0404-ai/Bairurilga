import React from 'react';

export default function Divider() {
  return (
    <div className="flex items-center justify-center gap-2 px-6 my-1" aria-hidden="true">
      <span className="h-px w-10 bg-black/10" />
      <span className="h-1.5 w-1.5 rotate-45 bg-[#b82c1f]" />
      <span className="h-px w-10 bg-black/10" />
    </div>
  );
}
