import React from 'react';
import { Sparkles, ShieldCheck, UserCheck, CheckCircle } from 'lucide-react';
import { HEALER_MANIFESTO, SITE_CONFIG } from '../data/content';

interface AboutHealerProps {
  onOpenAppointment: () => void;
}

export const AboutHealer: React.FC<AboutHealerProps> = ({ onOpenAppointment }) => {
  return (
    <section id="hakkimda" className="relative py-24 bg-[#0D111D] overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Healer Portrait */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Glowing Aura Ring */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-purple-500/40 via-amber-400/30 to-sky-400/30 rounded-3xl blur-xl opacity-50 animate-pulse-slow"></div>
              
              <div className="relative rounded-3xl overflow-hidden glass-panel border border-purple-400/30 shadow-2xl bg-[#141A2C]">
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900">
                  <img
                    src="/assets/foto_x/foto_2.jpg"
                    alt="Osman Özden Bioenerji ve Holistik Olumlama"
                    className="w-full h-full object-cover object-center filter brightness-100 contrast-105 hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>

                <div className="p-6 bg-gradient-to-t from-[#101524] via-[#101524]/95 to-transparent space-y-2">
                  <h3 className="text-xl font-serif font-bold text-white flex items-center justify-between">
                    <span>{SITE_CONFIG.practitioner}</span>
                    <span className="text-xs font-sans font-medium px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
                      Uygulayıcı
                    </span>
                  </h3>
                  <p className="text-xs text-purple-200 font-light">
                    {SITE_CONFIG.title}
                  </p>
                  
                  {/* Social Profile */}
                  <div className="pt-2 flex items-center gap-3">
                    <a
                      href={SITE_CONFIG.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-slate-300 hover:text-pink-300 flex items-center gap-1.5 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span>{SITE_CONFIG.instagram}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Floating Quote Badge */}
              <div className="absolute -bottom-6 right-2 sm:-right-4 max-w-[260px] p-3.5 rounded-2xl bg-[#182034]/95 border border-purple-400/40 shadow-2xl backdrop-blur-xl text-[11px] text-slate-200 italic animate-float">
                "En sevdiğim yer, en sevdiğim insanlarla birlikte olduğum andır."
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Philosophy & Acceptance Rules */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/30 border border-amber-400/30 text-amber-200 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>UYGULAYICI HAKKINDA & ETİK İLKELER</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              "Ben Rabbimin ve Evrenin Bana Bahşettiği <br />
              <span className="bg-gradient-to-r from-white via-purple-200 to-amber-200 bg-clip-text text-transparent">
                Pozitif Enerjiyle Hizmet Ediyorum."
              </span>
            </h2>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-light">
              {HEALER_MANIFESTO.intro} Evrensel yaşam enerjisiyle doğrudan temas kurabilen, sezgisel ve doğal bir enerji aktarım yeteneğine sahip bir Holistik Olumlama uygulayıcısıyım. Amacım sizi değiştirmek değil; içinizdeki saf, dengeli ve güçlü Işık Bedeni hatırlatıp ayağa kaldırmaktır.
            </p>

            {/* Acceptance Criteria Box */}
            <div className="p-6 rounded-2xl glass-panel border border-slate-700/60 bg-[#141A2C]/80 space-y-4">
              <h4 className="text-base font-serif font-bold text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-purple-300" />
                <span>Kabul Koşullarım ve Çalışma Prensiplerim</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
                {HEALER_MANIFESTO.acceptanceConditions.map((condition, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{condition}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Free Consultation Highlight Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-900/40 via-[#161F34] to-amber-950/30 border border-purple-400/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-semibold text-amber-300 flex items-center justify-center sm:justify-start gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  ŞEFFAF VE GÜVENLİ İLK ADIM
                </span>
                <p className="text-sm font-medium text-white">
                  İlk ön görüşme yüz yüze veya online olarak yapılır ve <strong>ÜCRETSİZDİR</strong>.
                </p>
              </div>

              <button
                onClick={onOpenAppointment}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold whitespace-nowrap shadow-md shadow-purple-900/40 hover:scale-105 active:scale-95 transition-all"
              >
                Görüşme Randevusu Al
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
