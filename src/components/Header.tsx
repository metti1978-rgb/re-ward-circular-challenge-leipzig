import React, { useState, useEffect } from 'react';
import { ScreenId } from '../types';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { AWARD_METRICS } from '../data/awardData';
import { RewardLogo } from './RewardLogo';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const diff = new Date(AWARD_METRICS.deadline).getTime() - new Date().getTime();
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / 1000 / 60) % 60);
        setTimeLeft({ days, hours, mins });
      }
    };
    calculateTime();
    const interval = setInterval(calculateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const sectionLinks: { id: string; label: string }[] = [
    { id: 'was-wir-suchen', label: 'Was wir suchen' },
    { id: 'teilnehmen', label: 'Wer teilnehmen kann' },
    { id: 'preise', label: 'Preise' },
    { id: 'faq', label: 'FAQ' },
  ];

  const goToSection = (id: string) => {
    if (currentScreen !== 'overview') {
      onNavigate('overview');
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className="w-full sticky top-[37px] z-40"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Simple info stripe: Hausschrift, einheitliche Größe */}
      <div className="py-1.5 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:text-left sm:gap-2">
          <p className="font-body font-normal text-body text-[#111827] m-0">
            Jetzt mitmachen und bewerben!
          </p>

          <div className="flex items-center gap-2 font-body font-normal text-body text-[#111827]">
            <span className="font-body font-normal tracking-wide text-body bg-[#FED27A]/40 text-[#F07E26] px-4 py-0.5 corner-cut">
              {timeLeft.days} Tage, {timeLeft.hours} Stunden, {timeLeft.mins} Minuten
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation row — Hoover-Fläche deckt die gesamte Zeile ab, nicht nur die Nav-Links */}
      <div className="w-full transition-colors duration-200 hover:bg-[#F07E26]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-5">
          <div className="flex items-center gap-6 xl:gap-10">
            {/* linker Spacer — balanciert die CTA/Toggle-Breite rechts, damit das Logo mittig steht (auch mobil) */}
            <div className="flex-1" />

            {/* Logo — zentriert in der Navigationszeile, auf allen Breakpoints */}
            <button
              onClick={() => {
                onNavigate('overview');
                requestAnimationFrame(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                });
              }}
              className="shrink-0 cursor-pointer translate-y-[0.6px] transition-transform duration-200 hover:scale-95 mx-auto"
              aria-label="Re:Ward Startseite"
            >
              <RewardLogo size="lg" variant="symbol-only" />
            </button>

            <div className="flex-1 flex items-center justify-end gap-3">
              {/* CTA Button */}
              <div className="hidden sm:flex items-center gap-3 -translate-y-1.5">
                <button
                  onClick={() => onNavigate('portal')}
                  className="btn-editorial-primary cursor-pointer px-6 py-3"
                >
                  <span>Jetzt Bewerben</span>
                </button>
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 text-[#111827] border border-[#111827] hover:bg-[#F8F9FA] cursor-pointer rounded-[20px]"
                aria-label="Menü öffnen"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>

          {/* Desktop Nav — eigene Zeile, zentriert unter dem Logo */}
          <nav className="hidden lg:flex items-center justify-center gap-2 xl:gap-3 mt-3">
            {sectionLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => goToSection(item.id)}
                className="group relative px-4 py-2.5 font-body text-h6 font-semibold uppercase tracking-wider cursor-pointer text-[#111827] rounded-[20px]"
              >
                {item.label}
                <span className="pointer-events-none absolute left-4 right-4 -bottom-0.5 h-[2px] origin-right scale-x-0 bg-[#111827] transition-transform duration-300 group-hover:scale-x-100" />
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#111827] bg-white px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="pb-2 border-b border-gray-100 flex items-center justify-between text-label font-condensed uppercase font-semibold text-gray-500">
            <span>Navigation</span>
            <span className="text-[#F07E26]">9.000 € Preisgeld</span>
          </div>
          {sectionLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                goToSection(item.id);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 font-condensed text-h6 font-semibold uppercase tracking-wider flex items-center justify-between text-gray-700 hover:bg-gray-50 rounded-[20px]"
            >
              <span>{item.label}</span>
              <ArrowUpRight className="w-4 h-4 text-gray-400" />
            </button>
          ))}
          <div className="pt-3">
            <button
              onClick={() => {
                onNavigate('portal');
                setMobileMenuOpen(false);
              }}
              className="w-full btn-editorial-primary py-3"
            >
              <span>Projekt Einreichen</span>
              <ArrowUpRight className="w-4 h-4 text-[#FED27A]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
