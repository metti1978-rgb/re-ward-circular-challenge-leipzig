import React, { useState, useRef, useEffect } from 'react';
import { ScreenId } from './types';
import { ScreenSwitcherBar } from './components/ScreenSwitcherBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PhotoStrip } from './components/PhotoStrip';
import { OverviewScreen } from './components/screens/OverviewScreen';
import { SubmissionPortalScreen } from './components/screens/SubmissionPortalScreen';
import { LegalPageScreen } from './components/screens/LegalPageScreen';
import { IMPRESSUM_CONTENT, DATENSCHUTZ_CONTENT } from './data/legalContent';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('overview');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile-mockup'>('desktop');
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setHeaderHeight(entries[0].contentRect.height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [viewMode]);

  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'overview':
        return <OverviewScreen onNavigate={handleNavigate} />;
      case 'portal':
        return <SubmissionPortalScreen onNavigate={handleNavigate} />;
      case 'impressum':
        return <LegalPageScreen onNavigate={handleNavigate} eyebrow="Rechtliches" title="Impressum" content={IMPRESSUM_CONTENT} />;
      case 'datenschutz':
        return <LegalPageScreen onNavigate={handleNavigate} eyebrow="Rechtliches" title="Datenschutz" content={DATENSCHUTZ_CONTENT} />;
      case 'teilnahmebedingungen':
        return <LegalPageScreen onNavigate={handleNavigate} eyebrow="Rechtliches" title="Teilnahmebedingungen" />;
      default:
        return <OverviewScreen onNavigate={handleNavigate} />;
    }
  };

  const rootStyle = { ['--header-h' as any]: `${headerHeight}px` } as React.CSSProperties;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#141B2B]">
      {/* 1. Screen Switcher Tool Bar (dev-only tool to easily view & switch all screens) */}
      {import.meta.env.DEV && (
        <ScreenSwitcherBar
          currentScreen={currentScreen}
          onSelectScreen={(screen) => handleNavigate(screen)}
          viewMode={viewMode}
          onToggleViewMode={setViewMode}
        />
      )}

      {/* Main Website Frame (Full Desktop or Mobile Mockup Frame) */}
      {viewMode === 'mobile-mockup' ? (
        <div className="flex-1 bg-gray-800 py-8 px-4 flex justify-center items-start overflow-x-auto">
          {/* Mobile phone bezel mockup */}
          <div className="w-[390px] min-h-[844px] bg-white border-[12px] border-[#111827] rounded-[36px] shadow-2xl overflow-hidden flex flex-col relative">
            {/* Phone notch */}
            <div className="h-6 bg-[#111827] flex items-center justify-center">
              <div className="w-20 h-3 bg-black rounded-b-md"></div>
            </div>

            <div className="flex-1 overflow-y-auto" style={rootStyle}>
              <div ref={headerRef}>
                <Header currentScreen={currentScreen} onNavigate={handleNavigate} />
              </div>
              <main className="flex-1">{renderActiveScreen()}</main>
              <PhotoStrip />
              <Footer onNavigate={handleNavigate} />
            </div>

            {/* Bottom home bar */}
            <div className="h-4 bg-white flex items-center justify-center py-1">
              <div className="w-32 h-1 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col" style={rootStyle}>
          <div ref={headerRef}>
            <Header currentScreen={currentScreen} onNavigate={handleNavigate} />
          </div>
          <main className="flex-1">{renderActiveScreen()}</main>
          <PhotoStrip />
          <Footer onNavigate={handleNavigate} />
        </div>
      )}
    </div>
  );
}
