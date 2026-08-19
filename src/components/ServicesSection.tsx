import React from 'react';
import { Sparkles, Clock, Check, ArrowRight, Calendar, MessageCircle } from 'lucide-react';
import { SERVICES, SITE_CONFIG } from '../data/content';

interface ServicesSectionProps {
  onOpenAppointment: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenAppointment }) => {
  return (
    <section id="seanslar" className="relative py-24 bg-[#101524]">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-950/40 border border-sky-400/30 text-sky-200 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-sky-300" />
            <span>SEANSLAR VE ÇALIŞMA ALANLARI</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white tracking-tight">
            Kişiye Özel <br />
            <span className="bg-gradient-to-r from-white via-purple-200 to-sky-200 bg-clip-text text-transparent">
              Holistik Enerji Seansları
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            Her bireyin enerjisel frekansı ve yaşam yolculuğu benzersizdir. Seanslarımız hazır kalıplarla değil; tamamen sizin aurik haritanıza ve blokajlarınıza özel tasarlanır.
          </p>
        </div>

        {/* Services 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="relative rounded-3xl glass-panel p-6 sm:p-8 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-purple-900/20"
            >
              <div>
                {/* Image and Header Row */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 mb-5 items-center">
                  {/* Photo in 2:3 */}
                  <div className="sm:col-span-4 flex justify-center">
                    <div className="relative w-28 sm:w-full aspect-[2/3] rounded-2xl overflow-hidden border border-purple-400/30 shadow-md bg-slate-900">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-100"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Title & Badge */}
                  <div className="sm:col-span-8 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-purple-500/20 text-purple-200 border border-purple-400/30">
                        {service.badge}
                      </span>

                      <div className="flex items-center gap-1 text-[11px] text-slate-300">
                        <Clock className="w-3 h-3 text-sky-300" />
                        <span>{service.sessionDuration}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-purple-200 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-slate-200 text-xs leading-relaxed font-light">
                      {service.summary}
                    </p>
                  </div>
                </div>

                {/* Details List */}
                <div className="space-y-2 mb-5">
                  {service.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                      <div className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-purple-300" />
                      </div>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Key Benefits Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6 pt-3 border-t border-slate-700/50">
                  {service.benefits.map((benefit, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md bg-slate-800/60 border border-slate-700/60 text-[10px] text-amber-200 font-medium"
                    >
                      ✦ {benefit}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenAppointment(service.title)}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2 transition-all group/btn"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Ön Görüşme Talep Et</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Merhaba Osman Bey, "${service.title}" seansı hakkında bilgi almak ve randevu oluşturmak istiyorum.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto py-3 px-4 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-400/40 text-emerald-300 font-medium text-xs flex items-center justify-center gap-2 transition-all"
                  title="WhatsApp'tan Yaz"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
