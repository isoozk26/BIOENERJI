import React from 'react';
import { ShieldAlert, Link2Off, BatteryLow, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { THREE_CORE_ISSUES } from '../data/content';

interface ThreeCoreIssuesProps {
  onOpenAppointment: (topic: string) => void;
  onOpenQuiz: () => void;
}

export const ThreeCoreIssues: React.FC<ThreeCoreIssuesProps> = ({ onOpenAppointment, onOpenQuiz }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert':
        return <ShieldAlert className="w-3.5 h-3.5 text-purple-300" />;
      case 'Link2Off':
        return <Link2Off className="w-3.5 h-3.5 text-sky-400" />;
      case 'BatteryLow':
        return <BatteryLow className="w-3.5 h-3.5 text-amber-300" />;
      default:
        return <AlertCircle className="w-3.5 h-3.5 text-purple-300" />;
    }
  };

  return (
    <section id="sorunlar" className="relative py-14 sm:py-16 bg-[#101524] border-y border-purple-500/15">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/30 border border-red-400/30 text-red-300 text-xs font-semibold backdrop-blur-md">
            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
            <span>FARKINDALIK VE TEŞHİS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white tracking-tight">
            Son 1 Ayda Danışanlarımızdan En Çok Gelen <br />
            <span className="bg-gradient-to-r from-red-200 via-amber-200 to-purple-200 bg-clip-text text-transparent">
              3 Gizli Enerji Tıkanıklığı
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            Çoğu insan bu belirtileri hayatın “normal bir parçası” zanneder. Oysa sebepsiz ağırlıklar, tekrarlayan döngüler ve bitkinlik enerjisel blokajların net bir uyarısıdır.
          </p>
        </div>

        {/* 3 Core Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {THREE_CORE_ISSUES.map((issue) => (
            <div
              key={issue.id}
              className="group relative rounded-3xl glass-panel p-5 sm:p-6 flex flex-col justify-between border border-purple-500/20 hover:border-purple-400/40 hover:bg-[#182138]/80 transition-all duration-300 shadow-lg"
            >
              <div>
                {/* Visual Thumbnail Photo Header */}
                <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden mb-5 border border-purple-400/30 shadow-md bg-slate-900 group-hover:border-purple-400/60 transition-all">
                  {issue.image && (
                    <img
                      src={issue.image}
                      alt={issue.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
                      loading="lazy"
                    />
                  )}
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101524] via-transparent to-transparent opacity-80" />
                  
                  {/* Category Pill Tag on Image */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-purple-400/40 text-[10px] uppercase tracking-wider font-semibold text-purple-200 flex items-center gap-1.5 shadow-sm">
                    {getIcon(issue.icon)}
                    <span>{issue.subtitle}</span>
                  </div>

                  {/* Number Badge inside image */}
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 flex items-center justify-center font-serif font-bold text-xs text-amber-300 shadow-sm">
                    0{issue.id}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white font-serif mb-2 group-hover:text-purple-200 transition-colors">
                  {issue.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4 font-light">
                  {issue.description}
                </p>

                {/* Quote Box */}
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-700/50 mb-5 text-xs text-slate-300 italic">
                  "{issue.quote}"
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onOpenAppointment(issue.title)}
                className="w-full py-3 px-4 rounded-2xl bg-purple-900/30 hover:bg-purple-900/50 border border-purple-400/30 hover:border-purple-400 text-purple-200 font-medium text-xs flex items-center justify-center gap-2 transition-all duration-200 group/btn"
              >
                <span>{issue.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Interactive Banner bottom */}
        <div className="mt-10 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-purple-900/40 via-[#182138] to-sky-950/40 border border-purple-400/30 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left shadow-xl">
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-bold text-white font-serif flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              Sizde bu belirtilerden hangisi var?
            </h4>
            <p className="text-xs sm:text-sm text-slate-200">
              3 soruluk mini test ile tıkanıklık merkezinizi 1 dakikada keşfedin.
            </p>
          </div>
          <button
            onClick={onOpenQuiz}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 whitespace-nowrap hover:scale-105 active:scale-95 transition-all"
          >
            Hızlı Testi Başlat (Ücretsiz)
          </button>
        </div>

      </div>
    </section>
  );
};
