import React from 'react';
import { Sparkles, MessageCircle, ArrowUp, MapPin, Phone } from 'lucide-react';
import { SITE_CONFIG } from '../data/content';

interface FooterProps {
  onOpenAppointment: () => void;
  onOpenQuiz: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAppointment, onOpenQuiz }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#090C16] text-slate-400 pt-16 pb-24 md:pb-16 border-t border-purple-500/15">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-amber-300 p-[1px]">
                <div className="w-full h-full bg-[#0D111D] rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-purple-300" />
                </div>
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-white tracking-wider">
                  Bio Enerji
                </span>
                <span className="block text-[11px] text-slate-400 font-light">
                  {SITE_CONFIG.practitioner}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm font-light">
              {SITE_CONFIG.tagline}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-pink-400 hover:border-pink-500/40 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-serif">
              Hızlı Erişim
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#sorunlar" className="hover:text-purple-300 transition-colors">3 Gizli Blokaj</a></li>
              <li><a href="#felsefe" className="hover:text-purple-300 transition-colors">Holistik Olumlama Felsefesi</a></li>
              <li><a href="#seanslar" className="hover:text-purple-300 transition-colors">Seans & Hizmet Alanları</a></li>
              <li><a href="#hakkimda" className="hover:text-purple-300 transition-colors">Osman Özden Kimdir?</a></li>
              <li><a href="#galeri" className="hover:text-purple-300 transition-colors">Görsel & Medya Arşivi</a></li>
              <li><a href="#sss" className="hover:text-purple-300 transition-colors">Sıkça Sorulan Sorular</a></li>
            </ul>
          </div>

          {/* Contact & Free Consultation */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-serif">
              İletişim & Randevu
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>{SITE_CONFIG.location}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>{SITE_CONFIG.phone}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={onOpenAppointment}
                className="w-full py-2.5 px-4 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/40 text-purple-200 text-xs font-medium transition-all text-center"
              >
                Ücretsiz İlk Ön Görüşme Al
              </button>

              <button
                onClick={onOpenQuiz}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-medium transition-all text-center"
              >
                Enerji Blokaj Testini Başlat
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright & Scroll To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 MedyaLeon - Osman Özden. Tüm hakları saklıdır.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-300 hover:text-purple-300 transition-colors"
          >
            <span>Yukarı Çık</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
