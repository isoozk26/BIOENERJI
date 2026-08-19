import React, { useState } from 'react';
import { Sparkles, X, MessageCircle, RotateCcw } from 'lucide-react';
import { QUIZ_QUESTIONS, SITE_CONFIG } from '../data/content';

interface EnergyQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAppointment: (topic: string) => void;
}

export const EnergyQuizModal: React.FC<EnergyQuizModalProps> = ({ isOpen, onClose, onOpenAppointment }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSelectOption = (index: number) => {
    const updated = [...selectedAnswers, index];
    setSelectedAnswers(updated);

    if (currentStep + 1 < QUIZ_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setIsFinished(false);
  };

  // Result calculation based on choices
  const getAnalysisResult = () => {
    const primaryChoice = selectedAnswers[0] ?? 0;
    if (primaryChoice === 0) {
      return {
        title: "Aura Tıkanıklığı & Yaşam Enerjisi (Prana) Boşalması",
        badge: "Kök / Sakral Çakra Dengeleme İhtiyacı",
        description: "Enerji alanınızda kronik yorgunluk ve dinlenememe yaratan belirgin bir enerji sızıntısı bulunuyor. Çevresel yükler ve blokajlar nedeniyle yaşam enerjiniz (Prana) hücresel düzeyde serbest akamıyor.",
        recommendation: "Bioenerji ile çakra merkezlerinin temizlenmesi ve topraklanma protokolü ile doğal frekansınıza dönmeniz önerilir."
      };
    } else if (primaryChoice === 1) {
      return {
        title: "Bitmemiş Bağlar & Duygusal Enerji Kordonları",
        badge: "Kalp Çakrası & Aura Arındırma İhtiyacı",
        description: "Geçmişte yaşadığınız olaylar ve unuttuğunuzu sandığınız kişiler enerjinizde görünmez kordonlar oluşturmuş. Bu durum yeni fırsatların ve içsel neşenizin önüne set çekiyor.",
        recommendation: "Holistik Olumlama ve Bağ Kesme çalışmasıyla bu yükleri sevgiyle serbest bırakıp kendi auranızı koruma altına alabilirsiniz."
      };
    } else if (primaryChoice === 2) {
      return {
        title: "Zihinsel Aşırı Yüklenme & Düşünce Sarmalı",
        badge: "Üçüncü Göz & Taç Çakra Dengesizliği",
        description: "Zihniniz sürekli geçmiş veya gelecek projeksiyonlarıyla meşgul. Aşırı zihinsel enerji, bedensel huzurunuzu tüketiyor ve karar verme netliğini engelliyor.",
        recommendation: "Zihinsel detoks ve Işık Beden rezonansı ile içsel sessizliğe ve duru farkındalığa ulaşabilirsiniz."
      };
    } else {
      return {
        title: "Döngüsel Blokaj & Bilinçaltı Direnci",
        badge: "Solar Pleksus & Holistik Olumlama İhtiyacı",
        description: "Hayatınızda benzer olayların ve insanların tekrar etmesi, bilinçdışında çözülmemiş bir inanç kalıbından kaynaklanıyor.",
        recommendation: "Holistik Olumlama seansı ile bu kök inançları dönüştürerek kader döngünüzü özgürleştirebilirsiniz."
      };
    }
  };

  const result = getAnalysisResult();
  const currentQuestion = QUIZ_QUESTIONS[currentStep];

  const sendResultToWhatsApp = () => {
    const message = `Merhaba Osman Bey, web sitenizdeki Enerji Blokaj Testini tamamladım.
Analiz Sonucum: ${result.title} (${result.badge})
Bu konu hakkında ücretsiz ilk ön görüşme randevusu almak istiyorum.`;

    const url = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden bg-[#0F121E]">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 blur-3xl pointer-events-none bg-purple-600/20"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full border border-slate-700 text-slate-400 hover:text-white bg-slate-900 transition-colors"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {!isFinished ? (
          <div>
            {/* Step Progress Bar */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 text-purple-400">
                <Sparkles className="w-3.5 h-3.5" />
                Soru {currentStep + 1} / {QUIZ_QUESTIONS.length}
              </span>
              <div className="flex gap-1.5">
                {QUIZ_QUESTIONS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx <= currentStep ? 'w-6 bg-purple-500' : 'w-2 bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question Text */}
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-6 leading-snug">
              {currentQuestion.question}
            </h3>

            {/* Options List */}
            <div className="space-y-3">
              {currentQuestion.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className="w-full text-left p-4 rounded-2xl border border-slate-800 hover:border-purple-500 hover:bg-purple-950/30 text-slate-200 transition-all duration-200 flex items-center gap-3.5 group bg-slate-900/80"
                >
                  <span className="w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs transition-colors flex-shrink-0 bg-slate-800 group-hover:bg-purple-600 text-purple-300 group-hover:text-white">
                    {opt.label}
                  </span>
                  <span className="text-sm font-medium leading-relaxed">
                    {opt.text}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 text-center text-xs text-slate-500">
              Cevaplarınız gizlidir ve yalnızca enerjisel farkındalık içindir.
            </div>
          </div>
        ) : (
          /* Result Screen */
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-2xl border mb-2 bg-purple-500/20 border-purple-400 text-purple-300">
                <Sparkles className="w-8 h-8" />
              </div>
              <span className="block text-xs font-bold uppercase tracking-widest text-amber-400">
                {result.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {result.title}
              </h3>
            </div>

            <div className="p-5 rounded-2xl border space-y-3 text-sm bg-slate-900/80 border-slate-800 text-slate-300">
              <p className="leading-relaxed">{result.description}</p>
              <div className="p-3.5 rounded-xl border text-xs bg-purple-950/40 border-purple-500/30 text-purple-200">
                <strong>Rehber Tavsiyesi:</strong> {result.recommendation}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={sendResultToWhatsApp}
                className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Sonucumu Osman Özden'e Gönder & Ücretsiz Görüş</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onOpenAppointment(result.title);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl border text-xs font-semibold transition-all text-center bg-purple-950/60 border-purple-500/40 text-purple-200 hover:bg-purple-900/60"
                >
                  Form İle Randevu Al
                </button>

                <button
                  onClick={handleReset}
                  className="py-3 px-4 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Tekrarla</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
