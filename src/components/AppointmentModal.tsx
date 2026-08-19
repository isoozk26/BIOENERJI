import React, { useState } from 'react';
import { X, ShieldCheck, MessageCircle, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../data/content';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose, defaultTopic = '' }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState(defaultTopic || 'Bioenerji & Çakra Dengeleme');
  const [sessionType, setSessionType] = useState('Online');
  const [note, setNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = `🌟 Yeni Ön Görüşme Talebi (LUMORA Web)
• İsim: ${name}
• Telefon: ${phone}
• Tercih Edilen Seans: ${topic}
• Seans Türü: ${sessionType}
• Ek Not / Belirti: ${note || 'Belirtilmedi'}
• Not: Ücretsiz 1. Ön Görüşme talebidir.`;

    const url = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-lg border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden bg-[#0F121E]">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-60 h-60 blur-3xl pointer-events-none bg-purple-600/15"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors bg-slate-900"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-left space-y-1 mb-5">
              <span className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                ÜCRETSİZ İLK ÖN GÖRÜŞME
              </span>
              <h3 className="text-2xl font-serif font-bold text-white">
                Seans & Danışmanlık Randevusu
              </h3>
              <p className="text-xs font-light text-slate-400">
                Bilgilerinizi girin, Osman Özden ile birebir ön görüşmenizi planlayalım.
              </p>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-xs font-medium mb-1.5 text-slate-300">
                Adınız ve Soyadınız *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Örn: Ayşe Yılmaz"
                className="w-full px-4 py-3 rounded-xl border border-slate-800 focus:border-purple-500 focus:outline-none text-white text-sm bg-slate-900/90"
              />
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-xs font-medium mb-1.5 text-slate-300">
                Telefon Numaranız (WhatsApp) *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Örn: 05XX XXX XX XX"
                className="w-full px-4 py-3 rounded-xl border border-slate-800 focus:border-purple-500 focus:outline-none text-white text-sm bg-slate-900/90"
              />
            </div>

            {/* Topic Selector */}
            <div>
              <label className="block text-xs font-medium mb-1.5 text-slate-300">
                İlgilendiğiniz Konu / Seans
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-800 focus:border-purple-500 focus:outline-none text-white text-sm bg-slate-900/90"
              >
                <option value="Bioenerji & Çakra Dengeleme">Bioenerji & Çakra Dengeleme</option>
                <option value="Holistik Olumlama & Bilinçaltı">Holistik Olumlama & Bilinçaltı</option>
                <option value="Bitmemiş Bağları Arındırma">Bitmemiş Bağları Arındırma</option>
                <option value="Mekan & Yaşam Alanı Temizliği">Mekan & Yaşam Alanı Temizliği</option>
                <option value="Sebepsiz Kronik Yorgunluk">Sebepsiz Kronik Yorgunluk</option>
                <option value="Diğer / Genel Ön Görüşme">Diğer / Genel Ön Görüşme</option>
              </select>
            </div>

            {/* Session Type (Online vs Yüz Yüze) */}
            <div>
              <label className="block text-xs font-medium mb-1.5 text-slate-300">
                Görüşme Tercihi
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSessionType('Online (Görüntülü)')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-all ${
                    sessionType.includes('Online')
                      ? 'bg-purple-600/30 border-purple-400 text-purple-200'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  🌐 Online (Görüntülü)
                </button>
                <button
                  type="button"
                  onClick={() => setSessionType('Yüz Yüze (İstanbul)')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-all ${
                    sessionType.includes('Yüz Yüze')
                      ? 'bg-purple-600/30 border-purple-400 text-purple-200'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  📍 Yüz Yüze (İstanbul)
                </button>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-medium mb-1.5 text-slate-300">
                Paylaşmak İstediğiniz Bir Not (Opsiyonel)
              </label>
              <textarea
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Kısaca bahsetmek istediğiniz detay..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 focus:border-purple-500 focus:outline-none text-white text-sm resize-none bg-slate-900/90"
              />
            </div>

            {/* Privacy note */}
            <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-400" />
              <span>Bilgileriniz tamamen gizli tutulur. Asla 3. kişilerle paylaşılmaz.</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 text-white shadow-purple-950/50"
            >
              <MessageCircle className="w-4 h-4 text-amber-200" />
              <span>WhatsApp İle Randevumu Oluştur</span>
            </button>
          </form>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center border bg-emerald-500/20 border-emerald-400 text-emerald-300">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-serif font-bold text-white">
              Talebiniz Alındı!
            </h4>
            <p className="text-sm max-w-sm mx-auto text-slate-300">
              WhatsApp yönlendirmeniz gerçekleştirildi. Osman Özden en kısa sürede sizinle iletişime geçecektir.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl text-white text-xs font-semibold bg-purple-600"
            >
              Pencereyi Kapat
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
