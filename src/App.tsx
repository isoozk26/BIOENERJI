import React, { useState } from 'react';
import { AuraCanvas } from './components/AuraCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ThreeCoreIssues } from './components/ThreeCoreIssues';
import { HolisticPhilosophy } from './components/HolisticPhilosophy';
import { ServicesSection } from './components/ServicesSection';
import { AboutHealer } from './components/AboutHealer';
import { MediaGallery } from './components/MediaGallery';
import { FaqSection } from './components/FaqSection';
import { LegalNotice } from './components/LegalNotice';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { EnergyQuizModal } from './components/EnergyQuizModal';
import { AppointmentModal } from './components/AppointmentModal';

export const App: React.FC = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [appointmentTopic, setAppointmentTopic] = useState<string>('Bioenerji & Çakra Dengeleme');

  const handleOpenAppointment = (topic?: string) => {
    if (topic) {
      setAppointmentTopic(topic);
    }
    setIsAppointmentOpen(true);
  };

  const handleOpenQuiz = () => {
    setIsQuizOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#0D111D] text-slate-100 overflow-x-hidden font-sans selection:bg-purple-500/30 selection:text-purple-200">
      {/* Soft Luminous Cosmic Atmosphere */}
      <AuraCanvas />

      {/* Top Navigation */}
      <Navbar
        onOpenQuiz={handleOpenQuiz}
        onOpenAppointment={handleOpenAppointment}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero
          onOpenQuiz={handleOpenQuiz}
          onOpenAppointment={() => handleOpenAppointment()}
        />

        {/* 3 Core Issues */}
        <ThreeCoreIssues
          onOpenAppointment={handleOpenAppointment}
          onOpenQuiz={handleOpenQuiz}
        />

        {/* Holistic Philosophy */}
        <HolisticPhilosophy />

        {/* Healing Sessions */}
        <ServicesSection
          onOpenAppointment={handleOpenAppointment}
        />

        {/* About Healer */}
        <AboutHealer
          onOpenAppointment={() => handleOpenAppointment()}
        />

        {/* Media Gallery (17 Standard FOTO_X + Video) */}
        <MediaGallery />

        {/* FAQ */}
        <FaqSection />

        {/* Legal Disclaimer */}
        <LegalNotice />
      </main>

      {/* Footer */}
      <Footer
        onOpenAppointment={() => handleOpenAppointment()}
        onOpenQuiz={handleOpenQuiz}
      />

      {/* Mobile Sticky Bar */}
      <MobileStickyBar
        onOpenAppointment={() => handleOpenAppointment()}
        onOpenQuiz={handleOpenQuiz}
      />

      {/* Interactive Modals */}
      <EnergyQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onOpenAppointment={handleOpenAppointment}
      />

      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        defaultTopic={appointmentTopic}
      />
    </div>
  );
};

export default App;
