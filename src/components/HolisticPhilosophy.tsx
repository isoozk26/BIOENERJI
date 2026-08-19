import React, { useState } from 'react';
import { Sparkles, HeartPulse, Sun, Clock, CheckCircle2 } from 'lucide-react';
import { PHILOSOPHY_PILLARS } from '../data/content';

export const HolisticPhilosophy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('holos');

  const getPillarIcon = (id: string) => {
    switch (id) {
      case 'holos':
        return <Sparkles className="w-5 h-5 text-purple-300" />;
      case 'affirmation':
        return <HeartPulse className="w-5 h-5 text-amber-300" />;
      case 'lightbody':
        return <Sun className="w-5 h-5 text-sky-300" />;
      case 'destiny':
        return <Clock className="w-5 h-5 text-emerald-300" />;
      default:
        return <Sparkles className="w-5 h-5 text-purple-300" />;
    }
  };

  const currentPillar = PHILOSOPHY_PILLARS.find((p) => p.id === activeTab) || PHILOSOPHY_PILLARS[0];

  return (
    <section id="felsefe" className="relative py-24 bg-[#0D111D] overflow-hidden">
      {/* Background soft glow */}
      <div className="aura-glow-circle w-[500px] h-[500px] bg-purple-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-900/30 border border-purple-400/30 text-purple-200 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>KADİM ÖĞRETİ & BÜTÜNCÜL YAKLAŞIM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white tracking-tight">
            Holistik Olumlama & <br />
            <span className="bg-gradient-to-r from-white via-purple-200 to-sky-200 bg-clip-text text-transparent">
              Işık Beden Felsefesi
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            "Holistik" sözcüğü Yunanca <em>holos</em> (bütün, tam) kökünden gelir. İnsanı parçalara ayırmadan; duyguları, zihinsel döngüleri ve bedensel hisleri tek bir enerjisel harmoni olarak ele alırız.
          </p>
        </div>

        {/* Interactive Tabs + Display Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Tabs Selector List */}
          <div className="lg:col-span-5 space-y-3">
            {PHILOSOPHY_PILLARS.map((pillar) => {
              const isSelected = activeTab === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActiveTab(pillar.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                    isSelected
                      ? 'bg-purple-900/30 border-purple-400/60 shadow-lg shadow-purple-950/30 translate-x-2'
                      : 'bg-[#151C2E]/60 border-slate-700/50 text-slate-300 hover:bg-[#1B243B] hover:border-purple-400/30'
                  }`}
                >
                  <div className={`p-3 rounded-xl border ${isSelected ? 'bg-purple-800/40 border-purple-300' : 'bg-slate-800 border-slate-700'}`}>
                    {getPillarIcon(pillar.id)}
                  </div>
                  <div>
                    <h3 className={`text-base font-serif font-bold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {pillar.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Content Spotlight Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl p-6 sm:p-8 glass-panel border border-purple-400/30 bg-gradient-to-br from-[#182138]/90 via-[#141B2E]/90 to-[#101524] shadow-2xl">
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Photo in 2:3 */}
                <div className="md:col-span-4 flex justify-center">
                  <div className="relative w-36 sm:w-44 aspect-[2/3] rounded-2xl overflow-hidden border border-purple-400/40 shadow-xl bg-slate-900">
                    <img
                      src={currentPillar.image}
                      alt={currentPillar.title}
                      className="w-full h-full object-cover filter brightness-100 contrast-105"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Text Description */}
                <div className="md:col-span-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-300 text-purple-200">
                      {getPillarIcon(currentPillar.id)}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest block">
                        {currentPillar.subtitle}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                        {currentPillar.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-light">
                    {currentPillar.content}
                  </p>

                  {/* Bullet points */}
                  <div className="grid grid-cols-1 gap-2 pt-2 text-xs text-slate-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Dıştan zorlama yok, içsel potansiyelin uyanışı</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>7 Ana Çakra hattı ve meridyen dengelemesi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Tekrarlayan kader döngülerini sevgiyle dönüştürme</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mystic quote footer */}
              <div className="mt-6 p-3.5 rounded-xl bg-slate-800/60 border-l-4 border-amber-300 text-xs text-amber-100 italic">
                "Bazı kapılar taştan yapılır… Ama asıl açılan kapı içeridedir. Eğer bugün yolun buradan geçtiyse, belki de gelmen gerekiyordu."
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
