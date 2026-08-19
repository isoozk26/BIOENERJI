import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { LEGAL_DISCLAIMER } from '../data/content';

export const LegalNotice: React.FC = () => {
  return (
    <section className="py-12 bg-[#05060A] border-t border-slate-900">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800/80 flex flex-col sm:flex-row items-start gap-4">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex-shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1.5 text-xs text-slate-400 leading-relaxed">
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              YASAL UYARI VE ETİK BİLGİLENDİRME
            </h4>
            <p>
              {LEGAL_DISCLAIMER}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
