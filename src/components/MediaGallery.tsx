import React, { useState } from 'react';
import { Sparkles, Maximize2, X, Play } from 'lucide-react';
import { GALLERY_ITEMS, VIDEO_SHOWCASE } from '../data/content';
import { MediaItem } from '../types';

export const MediaGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'Tüm Arşiv (17 Fotoğraf)' },
    { id: 'aura', label: 'Işık Beden & Aura' },
    { id: 'seans', label: 'Seans & Şifa' },
    { id: 'kadim', label: 'Kadim Öğreti & Seans' },
    { id: 'nature', label: 'Doğa & Topraklanma' },
  ];

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="galeri" className="relative py-24 bg-[#101524] border-y border-purple-500/15">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-900/30 border border-purple-400/30 text-purple-200 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>ÖZGÜN FOTOĞRAF VE MEDYA ARŞİVİ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Işık Beden, Frekans ve <br />
            <span className="bg-gradient-to-r from-white via-purple-200 to-sky-200 bg-clip-text text-transparent">
              Dönüşüm Seansları
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            Osman Özden'in bioenerji çalışmalarından, holistik olumlama seanslarından ve Işık Beden dönüşümlerinden derlenen 17 parçalık standart görsel galerisi.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white hover:border-purple-400/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Video Feature Card */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl glass-panel border border-purple-400/30 bg-gradient-to-r from-[#182138]/90 via-[#141B2E] to-[#1A233C] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/30">
              ✦ ÖZEL VİDEO KAYDI
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              {VIDEO_SHOWCASE.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 font-light max-w-xl">
              {VIDEO_SHOWCASE.subtitle} – Birebir enerji akışını ve seans dinamiklerini videodan izleyin.
            </p>
          </div>

          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 hover:from-purple-500 hover:to-sky-500 text-white font-semibold text-xs shadow-xl shadow-purple-900/40 flex items-center gap-2.5 whitespace-nowrap hover:scale-105 active:scale-95 transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <Play className="w-3.5 h-3.5 fill-white text-white translate-x-0.5" />
            </div>
            <span>Videoyu Oynat</span>
          </button>
        </div>

        {/* Gallery Grid - Standard 600x900 (2:3 aspect ratio) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative rounded-2xl overflow-hidden glass-panel border border-slate-700/50 hover:border-purple-400/50 cursor-pointer shadow-lg transition-all duration-300 hover:-translate-y-1.5"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
                  loading="lazy"
                />
                
                {/* Number tag */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-purple-200 font-mono">
                  #{idx + 1}
                </div>

                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D111D] via-[#0D111D]/40 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-amber-200 font-serif line-clamp-1">{item.title}</span>
                    <Maximize2 className="w-3.5 h-3.5 text-purple-200 flex-shrink-0" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Photo Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-md w-full bg-[#141A2C] border border-purple-400/40 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[2/3] max-h-[75vh] w-full bg-slate-950 overflow-hidden flex items-center justify-center">
              <img
                src={selectedItem.url}
                alt={selectedItem.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="p-5 bg-[#101524] space-y-1.5 border-t border-slate-700">
              <span className="text-[10px] font-semibold text-purple-300 uppercase tracking-widest">
                {selectedItem.category}
              </span>
              <h3 className="text-base font-serif font-bold text-white">
                {selectedItem.title}
              </h3>
              <p className="text-xs text-slate-200 font-light">
                {selectedItem.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#141A2C] border border-purple-400/40 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video w-full bg-black">
              <video
                src={VIDEO_SHOWCASE.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-5 bg-[#101524] space-y-1 border-t border-slate-700">
              <h3 className="text-base font-serif font-bold text-white">
                {VIDEO_SHOWCASE.title}
              </h3>
              <p className="text-xs text-slate-200 font-light">
                {VIDEO_SHOWCASE.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
