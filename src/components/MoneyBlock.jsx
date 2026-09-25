import React, { useState } from 'react';

const QUICK_AMOUNTS = [20000, 50000, 100000, 200000];

function formatMnt(amount) {
  return new Intl.NumberFormat('mn-MN').format(amount) + '₮';
}

export default function MoneyBlock() {
  const [selectedAmount, setSelectedAmount] = useState(50000);
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyAccount = () => {
    navigator.clipboard?.writeText('5000123456');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="px-6 text-center space-y-3">
      {/* Eyebrow */}
      <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8b9dbb]">
        Мялаалга
      </div>

      <div className="text-xs text-[#8b9dbb]">
        Шинэ гэрийн мялаалгыг QPay-ээр хялбархан илгээх боломжтой
      </div>

      {/* Quick Amount Pills */}
      <div className="flex flex-wrap justify-center gap-2 max-w-xs mx-auto">
        {QUICK_AMOUNTS.map((amt) => {
          const isSelected = selectedAmount === amt;
          return (
            <button
              key={amt}
              type="button"
              onClick={() => setSelectedAmount(amt)}
              className={`rounded-full px-3.5 py-1 text-xs font-semibold transition ${
                isSelected
                  ? 'bg-[#c0392b] text-white shadow'
                  : 'border border-[#f07b70]/40 text-[#f07b70] hover:bg-[#c0392b]/10'
              }`}
            >
              {formatMnt(amt)}
            </button>
          );
        })}
      </div>

      {/* Send Button */}
      <div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex h-11 min-w-[210px] items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold bg-[#c0392b] text-white shadow-md hover:bg-[#a93226] transition active:scale-95"
        >
          <img
            src="/brand/qpay-logo.png"
            alt="QPay"
            className="h-4 w-auto brightness-0 invert"
          />
          <span>Мялаалга илгээх</span>
          <span className="font-normal opacity-85">· {formatMnt(selectedAmount)}</span>
        </button>
      </div>

      {/* QPay Payment Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm rounded-3xl bg-[#0e1526] border border-white/10 p-6 shadow-2xl text-center space-y-4">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <img
                src="/brand/qpay-logo.png"
                alt="QPay"
                className="h-5 w-auto brightness-0 invert"
              />
              <span className="font-semibold text-white">QPay төлбөр</span>
            </div>

            <div className="text-2xl font-bold font-heading text-[#f07b70]">
              {formatMnt(selectedAmount)}
            </div>

            {/* QR Code Placeholder / Simulated QR */}
            <div className="mx-auto w-48 h-48 bg-white p-3 rounded-2xl shadow-inner flex flex-col items-center justify-center gap-2">
              <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                <rect x="0" y="0" width="30" height="30" rx="4" fill="currentColor" />
                <rect x="5" y="5" width="20" height="20" rx="2" fill="#fff" />
                <rect x="9" y="9" width="12" height="12" rx="1" fill="currentColor" />

                <rect x="70" y="0" width="30" height="30" rx="4" fill="currentColor" />
                <rect x="75" y="5" width="20" height="20" rx="2" fill="#fff" />
                <rect x="79" y="9" width="12" height="12" rx="1" fill="currentColor" />

                <rect x="0" y="70" width="30" height="30" rx="4" fill="currentColor" />
                <rect x="5" y="75" width="20" height="20" rx="2" fill="#fff" />
                <rect x="9" y="79" width="12" height="12" rx="1" fill="currentColor" />

                <rect x="38" y="10" width="8" height="8" fill="currentColor" />
                <rect x="52" y="18" width="8" height="8" fill="currentColor" />
                <rect x="38" y="38" width="24" height="24" rx="2" fill="#c0392b" />
                <rect x="70" y="45" width="8" height="18" fill="currentColor" />
                <rect x="18" y="45" width="8" height="18" fill="currentColor" />
                <rect x="42" y="72" width="16" height="8" fill="currentColor" />
                <rect x="70" y="72" width="22" height="18" fill="currentColor" />
              </svg>
            </div>
            <div className="text-[11px] text-[#8b9dbb]">
              Банкны аппаараа QR кодыг уншуулна уу
            </div>

            {/* Bank details fallback */}
            <div className="bg-white/[0.04] border border-white/5 rounded-2xl p-3 text-left space-y-1 text-xs">
              <div className="flex justify-between text-[#8b9dbb]">
                <span>Банк:</span>
                <span className="text-white font-medium">Хаан Банк</span>
              </div>
              <div className="flex justify-between text-[#8b9dbb]">
                <span>Данс:</span>
                <span className="text-white font-mono font-medium">5000123456</span>
              </div>
              <div className="flex justify-between text-[#8b9dbb]">
                <span>Хүлээн авагч:</span>
                <span className="text-white font-medium">Шинэ гэрийн эзэн</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyAccount}
              className="w-full h-10 rounded-full border border-white/15 bg-white/5 text-xs font-semibold text-white/90 hover:bg-white/10 transition"
            >
              {copied ? '✓ Дансны дугаар хуулагдлаа' : 'Данс хуулах'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
