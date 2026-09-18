import React from 'react';
import { ScreenId } from '../types';
import { RewardLogo } from './RewardLogo';

interface FooterProps {
  onNavigate: (screen: ScreenId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer
      className="w-full text-white pt-16 pb-12 px-3 sm:px-6"
      style={{ background: '#111827' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-10">
        <RewardLogo size="lg" variant="symbol-only" inverted={true} className="transition-transform duration-200 hover:scale-95" />

        <p className="text-body text-white/80 max-w-md leading-relaxed">
          Die Circular Challenge der Stadt Leipzig — für marktfähige Produkte, Dienstleistungen
          und Geschäftsmodelle rund um Repair, Reuse, Repurpose, Recycling und Rethink.
        </p>

        <div className="flex items-center justify-center gap-10 sm:gap-16 pt-2">
          <a
            href="https://www.wiederschoen-leipzig.de"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Wiederschön (öffnet in neuem Fenster)"
            className="transition-transform duration-200 hover:scale-95"
          >
            <img src="/assets/LO WS.svg" alt="Wiederschön" className="h-8 sm:h-10 w-auto invert" />
          </a>
          <a
            href="https://www.stadtreinigung-leipzig.de"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Stadtreinigung Leipzig (öffnet in neuem Fenster)"
            className="transition-transform duration-200 hover:scale-95"
          >
            <img src="/assets/LO SRL.jpg" alt="Stadtreinigung Leipzig" className="h-8 sm:h-10 w-auto" />
          </a>
          <a
            href="https://www.leipzig.de"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Stadt Leipzig (öffnet in neuem Fenster)"
            className="transition-transform duration-200 hover:scale-95"
          >
            <img src="/assets/LO Leipzig.svg" alt="Stadt Leipzig" className="h-8 sm:h-10 w-auto invert" />
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full justify-center">
          <button
            onClick={() => onNavigate('impressum')}
            className="group relative px-4 py-2.5 font-body text-h6 font-semibold uppercase tracking-wider text-white cursor-pointer"
          >
            Impressum
            <span className="pointer-events-none absolute left-4 right-4 -bottom-0.5 h-[2px] origin-right scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
          </button>
          <button
            onClick={() => onNavigate('datenschutz')}
            className="group relative px-4 py-2.5 font-body text-h6 font-semibold uppercase tracking-wider text-white cursor-pointer"
          >
            Datenschutz
            <span className="pointer-events-none absolute left-4 right-4 -bottom-0.5 h-[2px] origin-right scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
          </button>
          <button
            onClick={() => onNavigate('teilnahmebedingungen')}
            className="group relative px-4 py-2.5 font-body text-h6 font-semibold uppercase tracking-wider text-white cursor-pointer"
          >
            Teilnahmebedingungen
            <span className="pointer-events-none absolute left-4 right-4 -bottom-0.5 h-[2px] origin-right scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
          </button>
        </div>

        <div className="text-label font-condensed text-white/60">
          © 2026 <strong className="font-bold">RE\WARD</strong> — Die Circular Challenge · Stadt Leipzig. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
};
