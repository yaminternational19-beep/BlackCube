'use client';
import { useState } from 'react';

export function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-black/30">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-4 py-3 flex items-center justify-between"
      >
        <span className="font-semibold">{title}</span>
        <span className="text-primary-gray text-sm">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}


