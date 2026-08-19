import React from 'react';
import { MessageCircle, Calendar, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../data/content';

interface MobileStickyBarProps {
  onOpenAppointment: () => void;
  onOpenQuiz: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenAppointment, onOpenQuiz }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden px-4 py-2.5 backdrop-blur-2xl shadow-2xl border-t bg-[#0A0D17]/95 border-purple-900/40">
      <div className="flex items-center gap-2">
        
        {/* Quick Quiz Mini Button */}
        <button
          onClick={onOpenQuiz}
          className="p-2.5 rounded-xl border flex items-center justify-center flex-shrink-0 bg-cyan-950/70 border-cyan-500/40 text-cyan-300"
          aria-label="Enerji Testi"
          title="Enerji Testi"
        >
          <Sparkles className="w-4 h-4" />
        </button>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Merhaba Osman Bey, bioenerji seansları hakkında bilgi ve ön görüşme randevusu almak istiyorum.')}`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/40"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>

        {/* Free Consultation CTA */}
        <button
          onClick={onOpenAppointment}
          className="flex-1 py-2.5 px-3 rounded-xl text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 shadow-purple-950/40"
        >
          <Calendar className="w-4 h-4 text-amber-200" />
          <span>Ön Görüşme</span>
        </button>

      </div>
    </div>
  );
};
