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
        return <ShieldAlert className="w-7 h-7 text-purple-400" />;
      case 'Link2Off':
        return <Link2Off className="w-7 h-7 text-cyan-400" />;
      case 'BatteryLow':
        return <BatteryLow className="w-7 h-7 text-amber-400" />;
      default:
        return <AlertCircle className="w-7 h-7 text-purple-400" />;
    }
  };

  return (
    <section id="sorunlar" className="relative py-24 bg-[#090C16] border-y border-purple-950/40">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-semibold">
            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
            <span>FARKINDALIK VE TEŞHİS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white tracking-tight">
            Son 1 Ayda Danışanlarımızdan En Çok Gelen <br />
            <span className="bg-gradient-to-r from-red-300 via-amber-200 to-purple-300 bg-clip-text text-transparent">
              3 Gizli Enerji Tıkanıklığı
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-light">
            Çoğu insan bu belirtileri hayatın “normal bir parçası” zanneder. Oysa sebepsiz ağırlıklar, tekrarlayan döngüler ve bitkinlik enerjisel blokajların net bir uyarısıdır.
          </p>
        </div>

        {/* 3 Core Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {THREE_CORE_ISSUES.map((issue) => (
            <div
              key={issue.id}
              className="group relative rounded-3xl glass-panel p-8 flex flex-col justify-between border border-slate-800 hover:border-purple-500/50 hover:bg-[#111524] transition-all duration-300 shadow-xl"
            >
              {/* Number Badge */}
              <div className="absolute top-6 right-6 text-4xl font-serif font-black text-slate-800 group-hover:text-purple-900/40 transition-colors">
                0{issue.id}
              </div>

              <div>
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-slate-900/90 border border-slate-700/60 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                  {getIcon(issue.icon)}
                </div>

                {/* Subtitle */}
                <span className="text-xs uppercase tracking-wider font-semibold text-purple-400 block mb-1">
                  {issue.subtitle}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-white font-serif mb-3 group-hover:text-purple-200 transition-colors">
                  {issue.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-light">
                  {issue.description}
                </p>

                {/* Quote Box */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 mb-6 text-xs text-slate-400 italic">
                  "{issue.quote}"
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onOpenAppointment(issue.title)}
                className="w-full py-3.5 px-4 rounded-2xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 hover:border-purple-400 text-purple-200 font-medium text-xs flex items-center justify-center gap-2 transition-all duration-200 group/btn"
              >
                <span>{issue.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Interactive Banner bottom */}
        <div className="mt-14 p-7 rounded-3xl bg-gradient-to-r from-purple-950/60 via-[#101424] to-cyan-950/50 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xl">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white font-serif flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Sizde bu belirtilerden hangisi var?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              3 soruluk mini test ile tıkanıklık merkezinizi 1 dakikada keşfedin.
            </p>
          </div>
          <button
            onClick={onOpenQuiz}
            className="px-7 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 whitespace-nowrap hover:scale-105 active:scale-95 transition-all"
          >
            Hızlı Testi Başlat (Ücretsiz)
          </button>
        </div>

      </div>
    </section>
  );
};
