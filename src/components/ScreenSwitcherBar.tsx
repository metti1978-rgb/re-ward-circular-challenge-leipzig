import React from 'react';
import { ScreenId } from '../types';
import { LayoutGrid, UploadCloud, Smartphone, Monitor } from 'lucide-react';

interface ScreenSwitcherBarProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  viewMode: 'desktop' | 'mobile-mockup';
  onToggleViewMode: (mode: 'desktop' | 'mobile-mockup') => void;
}

export const ScreenSwitcherBar: React.FC<ScreenSwitcherBarProps> = ({
  currentScreen,
  onSelectScreen,
  viewMode,
  onToggleViewMode,
}) => {
  const screens: { id: ScreenId; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: '1. Startseite (Landingpage)', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'portal', label: '2. Bewerbungsformular', icon: <UploadCloud className="w-4 h-4" /> },
  ];

  return (
    <aside
      aria-label="Bildschirm-Navigation"
      className="sticky top-0 z-50 bg-[#111827] text-white border-b-2 border-[#F07E26] transition-all select-none"
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
        {/* Title badge */}
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 bg-[#F07E26] animate-pulse"></span>
          <span className="font-condensed font-bold uppercase tracking-wider text-label text-[#FED27A]">
            RE\WARD BILDSCHIRM-VORSCHAU:
          </span>
          <span className="hidden md:inline-block text-label font-condensed text-gray-400">
            [Landingpage Leipzig 2026]
          </span>
        </div>

        {/* Screen Tabs */}
        <div className="flex items-center flex-wrap gap-1">
          {screens.map((screen) => {
            const isActive = currentScreen === screen.id;
            return (
              <button
                key={screen.id}
                onClick={() => onSelectScreen(screen.id)}
                className={`relative px-2.5 py-1 text-label font-condensed font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer rounded-[20px] ${
                  isActive
                    ? 'bg-[#F07E26] text-[#111827]'
                    : 'text-gray-300 hover:text-white hover:bg-[#1F2937]'
                }`}
                title={`Zu Bildschirm: ${screen.label}`}
              >
                {screen.icon}
                <span className="hidden sm:inline">{screen.label}</span>
                <span className="sm:hidden">{screen.label.split(' ')[1] || screen.label}</span>
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle: Desktop / Mobile Device View */}
        <div className="hidden lg:flex items-center gap-1 border-l border-gray-700 pl-3">
          <button
            onClick={() => onToggleViewMode('desktop')}
            className={`px-2 py-1 text-label font-condensed uppercase flex items-center gap-1 cursor-pointer transition-colors corner-cut ${
              viewMode === 'desktop'
                ? 'bg-white text-[#111827] font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
            title="Vollbild Desktop-Ansicht"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => onToggleViewMode('mobile-mockup')}
            className={`px-2 py-1 text-label font-condensed uppercase flex items-center gap-1 cursor-pointer transition-colors corner-cut ${
              viewMode === 'mobile-mockup'
                ? 'bg-white text-[#111827] font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
            title="Smartphone Mockup-Ansicht (Mobile Frame)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile Frame</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
