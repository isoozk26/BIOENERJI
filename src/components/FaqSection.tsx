import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ_ITEMS } from '../data/content';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="sss" className="relative py-24 bg-[#07080D]">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold border bg-slate-900 border-slate-700 text-slate-300">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            <span>SIKÇA SORULAN SORULAR</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Merak Edilenler & <br />
            <span className="bg-gradient-to-r from-purple-300 via-amber-200 to-cyan-300 bg-clip-text text-transparent">
              Seans Süreci Hakkında
            </span>
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-3xl glass-panel border border-slate-800 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors hover:bg-slate-900/40"
                >
                  <span className="text-base sm:text-lg font-serif font-bold text-white">
                    {item.question}
                  </span>
                  <div className="p-2 rounded-full border flex-shrink-0 bg-slate-900 border-slate-800 text-purple-400">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm leading-relaxed border-t animate-fadeIn font-light border-slate-800/60 text-slate-300">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
