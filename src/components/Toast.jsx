import React, { useEffect } from 'react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-sm px-4 py-2.5 rounded-full bg-black/85 text-white text-xs font-medium backdrop-blur-md border border-white/10 shadow-2xl animate-fade-in flex items-center gap-2">
      <span>💡</span>
      <span>{message}</span>
    </div>
  );
}
