import React, { useState, useEffect } from 'react';
import { Sparkles, Volume2, VolumeX, Menu, X, MessageCircle, Calendar } from 'lucide-react';
import { SITE_CONFIG } from '../data/content';
import { soundManager } from '../utils/sound';

interface NavbarProps {
  onOpenQuiz: () => void;
  onOpenAppointment: (defaultTopic?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuiz, onOpenAppointment }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const active = soundManager.toggle();
    setIsPlayingSound(active);
  };

  const navLinks = [
    { name: 'Belirtiler', href: '#sorunlar' },
    { name: 'Holistik Felsefe', href: '#felsefe' },
    { name: 'Seanslar', href: '#seanslar' },
    { name: 'Hakkımda', href: '#hakkimda' },
    { name: 'Galeri', href: '#galeri' },
    { name: 'SSS', href: '#sss' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07080D]/90 backdrop-blur-xl border-b border-purple-900/20 py-3 shadow-2xl shadow-purple-950/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-full p-[1.5px] shadow-lg bg-gradient-to-tr from-purple-600 via-indigo-500 to-amber-400 shadow-purple-500/20 transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full rounded-full flex items-center justify-center bg-[#07080D]">
              <Sparkles className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <span className="font-serif font-bold text-xl tracking-wider text-white flex items-center gap-1.5">
              {SITE_CONFIG.name}
              <span className="text-[10px] uppercase font-sans font-medium px-2 py-0.5 rounded border bg-purple-500/20 text-purple-300 border-purple-500/30">
                Aura
              </span>
            </span>
            <span className="block text-[11px] text-slate-400 tracking-wider font-light">
              {SITE_CONFIG.practitioner}
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-purple-300 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Sound Wave Frequency Button */}
          <button
            onClick={toggleSound}
            title={isPlayingSound ? "432 Hz Sesi Durdur" : "432 Hz Meditatif Ambians Sesi Başlat"}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ${
              isPlayingSound
                ? 'bg-purple-500/20 border-purple-400 text-purple-200 shadow-md shadow-purple-500/30 animate-pulse'
                : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:border-slate-600'
            }`}
          >
            {isPlayingSound ? <Volume2 className="w-3.5 h-3.5 text-purple-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>432 Hz {isPlayingSound ? 'Açık' : 'Frekans'}</span>
          </button>

          {/* Mini Quiz CTA */}
          <button
            onClick={onOpenQuiz}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-cyan-950/50 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/60 transition-all duration-200 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enerji Testi</span>
          </button>

          {/* Appointment CTA */}
          <button
            onClick={() => onOpenAppointment()}
            className="relative group overflow-hidden rounded-full p-[1px] font-medium text-xs focus:outline-none"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 rounded-full group-hover:scale-105 transition-transform duration-300"></span>
            <span className="relative flex items-center gap-2 px-4 py-2 bg-[#0F121C] rounded-full text-white group-hover:bg-opacity-90 transition-all duration-300">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <span>Ücretsiz Ön Görüşme</span>
            </span>
          </button>
        </div>

        {/* Mobile Hamburger & Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleSound}
            className={`p-2 rounded-full border text-xs ${
              isPlayingSound ? 'bg-purple-500/20 border-purple-400 text-purple-300' : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
            aria-label="Frekans Sesi"
          >
            {isPlayingSound ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-200 hover:text-white"
            aria-label="Menüyü Aç"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0D17]/95 border-b border-purple-900/30 px-6 py-6 backdrop-blur-2xl transition-all">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-purple-300 py-1 border-b border-slate-800/40"
              >
                {link.name}
              </a>
            ))}

            <div className="flex flex-col gap-3 pt-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuiz();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-sm font-medium flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Enerji Blokaj Testi Yap</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAppointment();
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Ücretsiz İlk Ön Görüşme Al</span>
              </button>

              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Merhaba Osman Bey, bioenerji seansları hakkında bilgi ve ön görüşme randevusu almak istiyorum.')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-sm font-medium flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Doğrudan Mesaj</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
