import React from 'react';
import { Sparkles, Calendar, MessageCircle, ArrowRight, ShieldCheck, HeartPulse, Compass, Star } from 'lucide-react';
import { SITE_CONFIG } from '../data/content';

interface HeroProps {
  onOpenQuiz: () => void;
  onOpenAppointment: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuiz, onOpenAppointment }) => {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 flex items-center justify-center overflow-hidden border-b border-purple-500/15">
      {/* Soft Ambient Radiant Halos */}
      <div className="aura-glow-circle w-[600px] h-[600px] bg-purple-500/15 top-1/4 left-1/4 -translate-x-1/2 pointer-events-none"></div>
      <div className="aura-glow-circle w-[500px] h-[500px] bg-sky-400/12 top-1/3 right-10 pointer-events-none"></div>
      <div className="aura-glow-circle w-[420px] h-[420px] bg-amber-300/10 bottom-10 left-10 pointer-events-none"></div>

      {/* Main Full-Width Balanced Container */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column - Headline, Copy & Actions (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-400/30 text-purple-200 text-xs font-semibold backdrop-blur-xl shadow-lg shadow-purple-950/20">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
              <span className="tracking-wider uppercase">BİOENERJİ & HOLİSTİK OLUMLAMA</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-serif leading-[1.12]">
              Enerjinin Aktığı Yerde <br />
              <span className="bg-gradient-to-r from-white via-purple-200 to-amber-200 bg-clip-text text-transparent">
                Şifa Kendiliğinden Büyür.
              </span>
            </h1>

            {/* Sub-headline / Copy */}
            <p className="text-base sm:text-lg text-slate-200 font-light max-w-2xl leading-relaxed">
              Zihin, beden ve ruh ayrılmaz bir bütündür. <strong className="text-purple-300 font-normal">Osman Özden</strong> rehberliğinde; sebepsiz yorgunlukları, geçmişin enerjisel yüklerini ve tıkanıklıkları dönüştürerek <span className="text-amber-200 font-normal">Işık Bedeninizi</span> yeniden aktive edin.
            </p>

            {/* Value Props Grid - Light & Translucent */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 max-w-2xl">
              <div className="flex items-center gap-2 text-xs text-slate-200 bg-slate-800/40 border border-slate-700/50 px-3.5 py-2.5 rounded-xl backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>1. Ön Görüşme <strong>Ücretsiz</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200 bg-slate-800/40 border border-slate-700/50 px-3.5 py-2.5 rounded-xl backdrop-blur-md">
                <HeartPulse className="w-4 h-4 text-purple-300 flex-shrink-0" />
                <span>Bireysel Holistik Uyum</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200 bg-slate-800/40 border border-slate-700/50 px-3.5 py-2.5 rounded-xl backdrop-blur-md">
                <Compass className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>Yüz Yüze & Online</span>
              </div>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={onOpenAppointment}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-semibold text-sm shadow-xl shadow-purple-900/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <Calendar className="w-4 h-4 text-amber-200" />
                <span>Ücretsiz Ön Görüşme Al</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenQuiz}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800/90 border border-purple-400/30 hover:border-sky-400/50 text-slate-100 hover:text-white font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2.5 group backdrop-blur-md"
              >
                <Sparkles className="w-4 h-4 text-sky-300 group-hover:rotate-45 transition-transform" />
                <span>Enerji Blokaj Testini Başlat</span>
              </button>
            </div>

            {/* Trust note & WhatsApp */}
            <div className="pt-3 flex flex-wrap items-center gap-6 text-xs text-slate-300 border-t border-slate-700/50">
              <div className="flex items-center gap-1.5 text-amber-300">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-slate-200 ml-1">Kişiye Özel Seanslar</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span>Doğrudan İletişim:</span>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Merhaba Osman Bey, seanslar hakkında bilgi almak istiyorum.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold underline inline-flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp Hattı
                </a>
              </div>
            </div>

          </div>

          {/* Right Column - Standard 600x900 (2:3) FOTO_X Photo Card */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Outer Radiant Glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-purple-500/40 via-sky-400/30 to-amber-400/30 rounded-3xl blur-2xl opacity-60 animate-pulse-slow"></div>
              
              {/* Main Card */}
              <div className="relative rounded-3xl overflow-hidden glass-panel border border-purple-400/30 shadow-2xl bg-[#141A2C]/80">
                
                {/* 600x900 (2:3) Aspect Ratio Image */}
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900">
                  <img
                    src="/assets/foto_x/foto_1.jpg"
                    alt="Osman Özden Bio Enerji Bioenerji ve Işık Beden"
                    className="w-full h-full object-cover object-center filter brightness-100 contrast-105 hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                </div>

                {/* Overlay Quote Strip */}
                <div className="p-5 bg-gradient-to-t from-[#101524] via-[#101524]/90 to-transparent space-y-2">
                  <div className="flex items-center justify-between text-xs text-purple-200 font-serif">
                    <span className="font-bold">OSMAN ÖZDEN</span>
                    <span className="text-amber-300 font-semibold">✦ IŞIK BEDEN ✦</span>
                  </div>
                  <p className="text-xs text-slate-300 italic">
                    "Olumlama, dışarıdan gelen bir müdahale değil; kişinin kendi iç bilgeliğiyle yeniden uyanışıdır."
                  </p>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-300 border-t border-slate-700/50">
                    <span>Holistik Olumlama Uygulayıcısı</span>
                    <span className="text-emerald-400 font-medium">● Seans Randevuları Açık</span>
                  </div>
                </div>
              </div>

              {/* Floating Mini Energy Badge Top Right */}
              <div className="absolute -top-3 -right-3 px-3.5 py-2 rounded-2xl bg-[#182034]/90 border border-amber-400/40 text-amber-200 text-xs font-semibold shadow-xl backdrop-blur-xl flex items-center gap-2 animate-float">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>432 Hz Doğal Frekans</span>
              </div>

              {/* Floating Healing Badge Bottom Left */}
              <div className="absolute -bottom-3 -left-3 px-3.5 py-2 rounded-2xl bg-[#182034]/90 border border-purple-400/40 text-purple-200 text-xs font-semibold shadow-xl backdrop-blur-xl flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-purple-300" />
                <span>Holos Bütüncül Şifa</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
