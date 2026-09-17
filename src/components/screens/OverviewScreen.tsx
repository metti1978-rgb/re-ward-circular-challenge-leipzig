import React, { useState, useEffect } from 'react';
import { ScreenId } from '../../types';
import {
  PRIZES,
  FINALIST_BENEFITS,
  SOLUTIONS_WE_SEEK,
  MATERIAL_STREAMS,
  NOT_FITTING,
  TARGET_GROUPS,
  LEIPZIG_CONNECTION_EXAMPLES,
  TIMELINE
} from '../../data/awardData';
import { Check, X, ArrowUpRight, MapPin, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OverviewScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

const tagClass =
  'font-condensed text-label font-semibold uppercase tracking-wide corner-cut';

// Hero-Slider: Slide 2 = Logo + H1 "Save the date". Slide 3 = nur Headline-Text, ohne Logo.
const HERO_SLIDES = [
  { before: 'AUS ', highlight: 'STOFFSTROM', after: ' WIRD GESCHÄFTSMODELL.' },
  { minimal: true, plain: 'Save the date' },
  { minimal: true, noLogo: true, before: 'DEINE IDEE. LEIPZIGS STOFFSTRÖME. ', highlight: '9.000 EURO', after: '.' },
];

const HERO_FACTS: { label: string; value: string; hint: string; accent?: boolean }[] = [
  { label: 'Preisgeld', value: '9.000 €', hint: 'gestaffelt' },
  { label: 'Extra', value: 'Wiederschön', hint: 'Mietfläche für den 1. Platz' },
  { label: 'Bewerbung', value: '23. Okt', hint: 'Bewerbungsschluss 2026', accent: true },
  { label: 'Pitch', value: 'November', hint: 'Pitch-Event in Leipzig' },
];

const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: 'Wer kann sich bewerben?',
    answer:
      'Startups, kleine und mittlere Unternehmen, Handwerksbetriebe, Sozialunternehmen, Entsorger, Recyclingunternehmen, Hersteller, Händler sowie Forschungsteams mit Praxispartner — deutschlandweit, solange ein klarer Bezug zu Leipzig besteht.',
  },
  {
    question: 'Wie lange dauert die Bewerbung?',
    answer:
      'Rund 10 Minuten. Du beantwortest überwiegend Auswahlfragen und lädst am Ende eine PDF mit maximal 3 Seiten hoch.',
  },
  {
    question: 'Muss meine Lösung schon fertig sein?',
    answer:
      'Nein, aber sie sollte mindestens als Prototyp existieren — besser schon pilotfähig sein. Reine Ideen ohne Prototyp, Einzelstücke aus Restmaterial und Studien ohne Marktperspektive passen nicht zu RE/WARD.',
  },
  {
    question: 'Was passiert nach der Bewerbung?',
    answer:
      'Wir sichten alle Bewerbungen und melden uns bis zum 30. Oktober bei den Shortlist-Teams. Diese pitchen im November persönlich vor Jury, Fachpublikum, potenziellen Partnern und Presse — danach werden die Preise verliehen.',
  },
];

const SLIDE_INTERVAL_MS = 15000;
const SLIDE_FADE_MS = 400;
// Slide 2 & 3 sind vorerst deaktiviert (bis auf Abruf) — nur Slide 1 wird gezeigt.
// Daten bleiben in HERO_SLIDES erhalten; einfach auf true stellen, um den Slider wieder zu aktivieren.
const SLIDER_ACTIVE = false;

export const OverviewScreen: React.FC<OverviewScreenProps> = ({ onNavigate }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [visible, setVisible] = useState(true);
  const [selectedPhase, setSelectedPhase] = useState(() => {
    const activeIndex = TIMELINE.findIndex((item) => item.status === 'active');
    return activeIndex >= 0 ? activeIndex : 0;
  });
  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 });

  const handleSpotMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  useEffect(() => {
    if (!SLIDER_ACTIVE) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        setVisible(true);
      }, SLIDE_FADE_MS);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setVisible(false);
    setTimeout(() => {
      setActiveSlide(index);
      setVisible(true);
    }, SLIDE_FADE_MS);
  };

  const fireConfetti = () => {
    const colors = ['#F07E26', '#FED27A', '#FFF6A6'];
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.4 },
      colors,
      startVelocity: 45,
    });
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 80,
      origin: { x: 0, y: 0.6 },
      colors,
    });
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 80,
      origin: { x: 1, y: 0.6 },
      colors,
    });
  };

  const slide = HERO_SLIDES[SLIDER_ACTIVE ? activeSlide : 0];

  return (
    <div>
      {/* HERO + BULLET-FACTS — zusammen immer so hoch wie Bildschirm minus Navigation */}
      <div
        className="relative flex flex-col"
        style={{ minHeight: 'calc(100dvh - var(--header-h, 0px))' }}
      >
        {/* Mittlere Linie — läuft über Hero + Bullet-Facts hinweg, deshalb außerhalb der Hero-Section (die per overflow-hidden clippt) */}
        <div
          className="absolute inset-y-0 left-1/2 z-[1] w-[10px] bg-white pointer-events-none"
          style={{ transform: 'translateX(-50%) rotate(-13.2deg)' }}
        />

        {/* 1. HERO — Fläche: Sekundärfarben-Verlauf (deckend, ohne Hintergrundbild) */}
        <section
          className="relative overflow-hidden w-full border-b border-[#111827]/10 flex-1 flex items-start py-10 sm:py-16 pb-16 sm:pb-20 px-4 sm:px-6 -mt-px"
          style={{
            background: 'linear-gradient(to top, rgba(17,24,39,0.25) 0%, rgba(255,255,255,1) 100%)',
          }}
        >
          <div
            className="absolute z-[1] w-[10px] h-[240px] bg-white pointer-events-none"
            style={{ top: '-48px', left: '20%', transform: 'rotate(-13.2deg)' }}
          />
          <div
            className="absolute z-[1] w-[10px] h-[288px] bg-white pointer-events-none"
            style={{ bottom: '-57.6px', right: '20%', transform: 'rotate(-13.2deg)' }}
          />

          <div className="relative z-10 max-w-7xl mx-auto w-full">
            {!slide.noLogo && !slide.minimal && (
              <div className="grid grid-cols-[6rem_minmax(0,1fr)_6rem] sm:grid-cols-[15rem_minmax(0,1fr)_15rem] items-start gap-2 sm:gap-4 mb-10 sm:mb-14">
                <div
                  className="w-24 sm:w-[18.75rem] mt-[0.3rem] ml-[0.6rem] sm:mt-[0.9375rem] sm:ml-[1.875rem] justify-self-start"
                  style={{ animation: 'pulse-scale 2.5s ease-in-out infinite' }}
                >
                  <img
                    src="/assets/STD.svg"
                    alt="Save the Date"
                    onClick={fireConfetti}
                    className="w-full cursor-pointer transition-transform duration-200 hover:scale-95"
                  />
                </div>
                <div className="flex flex-col items-center gap-4 sm:gap-6 justify-self-center">
                  <img
                    src="/assets/Award.png"
                    alt="Re:Ward Pokal"
                    className="w-full max-w-[25.92rem] sm:max-w-[35.64rem] md:max-w-[45.36rem] transition-transform duration-200 hover:scale-95"
                  />
                  <div className="text-center">
                    <span className="block font-condensed font-semibold uppercase text-[#F07E26] text-h4 sm:text-h3">
                      Ende September 2026
                    </span>
                    <p className="font-body uppercase tracking-[0.2em] leading-tight text-h4 sm:text-h3 mt-1">
                      <span className="font-bold text-[#111827]">Die Circular Challenge</span>
                      <br />
                      <span className="font-light text-[#111827]">der Stadt Leipzig</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-6 sm:gap-8 justify-self-end mt-[0.3rem] mr-[0.6rem] sm:mt-[0.9375rem] sm:mr-[1.875rem]">
                  <a
                    href="https://www.leipzig.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-32 sm:w-[11.5rem] transition-transform duration-200 hover:scale-95"
                    aria-label="Stadt Leipzig (öffnet in neuem Fenster)"
                  >
                    <img src="/assets/LO Leipzig.svg" alt="Stadt Leipzig" className="w-full" />
                  </a>
                  <a
                    href="https://www.wiederschoen-leipzig.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-32 sm:w-[11.5rem] transition-transform duration-200 hover:scale-95"
                    aria-label="Wiederschön (öffnet in neuem Fenster)"
                  >
                    <img src="/assets/LO WS.svg" alt="Wiederschön" className="w-full" />
                  </a>
                </div>
              </div>
            )}

            <div
              className={`max-w-4xl mx-auto text-center space-y-10 sm:space-y-12 transition-opacity duration-[400ms] ${
                visible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {!slide.minimal && (
                <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => onNavigate('portal')}
                    className="btn-editorial-primary px-6 py-4 cursor-pointer"
                  >
                    <span>Jetzt bewerben — 10 Minuten</span>
                  </button>

                  <a
                    href="#was-wir-suchen"
                    className="btn-editorial-secondary px-6 py-4 cursor-pointer hover:bg-white!"
                  >
                    <span>Was wir suchen</span>
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
              )}

              {slide.minimal && slide.plain ? (
                <h1 className="text-[#111827] text-h1 font-bold leading-[1.05] tracking-tight break-words min-h-[3.2em] sm:min-h-[2.2em]">
                  {slide.plain}
                </h1>
              ) : slide.minimal ? (
                <h1 className="uppercase text-[#111827] text-h1 font-bold leading-[1.05] tracking-tight break-words min-h-[3.2em] sm:min-h-[2.2em]">
                  {slide.before}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F07E26] via-[#EA580C] to-[#B8560F]">
                    {slide.highlight}
                  </span>
                  {slide.after}
                </h1>
              ) : (
                <>
                  <h1 className="uppercase text-[#111827] text-h1 font-bold leading-[1.05] tracking-tight break-words min-h-[3.2em] sm:min-h-[2.2em]">
                    {slide.before}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F07E26] via-[#EA580C] to-[#B8560F]">
                      {slide.highlight}
                    </span>
                    {slide.after}
                  </h1>

                  <p className="text-gray-700 text-body leading-relaxed max-w-3xl mx-auto">
                    Für Lösungen, die Material im Wert halten und sich verkaufen lassen.
                  </p>

                  <div className="space-y-6 max-w-3xl mx-auto">
                    <p className="text-h3 text-[#111827] font-semibold leading-snug">
                      Du hast eine Idee, wie sich ein Stoffstrom neu denken lässt und ein Geschäftsmodell dazu?
                      <br />
                      Dann suchen wir dich.
                    </p>

                    <p className="text-gray-700 text-body leading-relaxed">
                      Reparieren statt ersetzen. Wiederverwenden statt entsorgen. Aufbereiten statt neu beschaffen.
                      <br />
                      In der Kreislaufwirtschaft steckt ein Markt. Aber viele gute Lösungen scheitern nicht an der
                      Idee, sondern an Gewährleistung, Logistik, Qualitätsnachweisen oder daran, dass niemand den
                      ersten Auftrag gibt.
                    </p>

                    <p className="text-gray-700 text-body leading-relaxed">
                      Genau da setzt <strong className="font-bold text-[#111827]">RE/WARD</strong> an. Wir suchen marktfähige Produkte, Dienstleistungen und
                      Geschäftsmodelle für Repair, Reuse, Repurpose, Recycling und Rethink. Offen für jeden
                      Stoffstrom — von {MATERIAL_STREAMS.join(', ')}.
                    </p>

                    <p className="text-gray-700 text-body leading-relaxed">
                      <strong className="font-bold text-[#111827]">Leipzig wird dabei zu deinem Testfeld.</strong>{' '}
                      Ausgewählte Teams bekommen Zugang zu echten
                      Stoffströmen, zu kommunalen und gewerblichen Anwendungsfällen, zu Testumgebungen und zu
                      potenziellen Erstkunden. Nicht als Aussicht, sondern als Teil des Preises.
                    </p>
                  </div>
                </>
              )}
            </div>

          </div>

          {/* Slider-Punkte — Slide 2 & 3 sind bis auf Abruf komplett ausgeblendet (nicht nur deaktiviert); SLIDER_ACTIVE wieder auf true stellen, um sie zurückzuholen */}
          <div className="absolute z-10 bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
            {HERO_SLIDES.map((_, i) => {
              if (!SLIDER_ACTIVE && i !== 0) return null;
              return (
                <button
                  key={i}
                  onClick={() => SLIDER_ACTIVE && goToSlide(i)}
                  disabled={!SLIDER_ACTIVE && i !== 0}
                  aria-label={`Slide ${i + 1} anzeigen`}
                  className={`h-3 rounded-full transition-all ${
                    !SLIDER_ACTIVE && i !== 0 ? 'cursor-default' : 'cursor-pointer'
                  } ${
                    i === (SLIDER_ACTIVE ? activeSlide : 0) ? 'w-8 bg-[#F07E26]' : 'w-3 bg-[#111827]/20'
                  }`}
                />
              );
            })}
          </div>
        </section>

        {/* BULLET-FACTS — doppelte Höhe, Punkt mittig über jeder Spalte, doppelt so groß */}
        <section
          className="relative z-10 w-full border-b border-[#111827]/10 py-16 sm:py-20 px-4 sm:px-6 -mt-px"
          style={{ background: 'linear-gradient(105deg, #F07E26 0%, #F07E26 66%, #B8560F 100%)' }}
        >
          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {HERO_FACTS.map((fact) => (
              <div key={fact.label} className="flex flex-col items-center text-center gap-3">
                <div>
                  <div className={`${tagClass} text-white/80`}>{fact.label}</div>
                  <div className="text-h2 font-semibold text-white">{fact.value}</div>
                  <div className="text-label text-white/70">{fact.hint}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 2. WAS WIR SUCHEN — Fläche: weiß */}
      <section
        id="was-wir-suchen"
        className="relative overflow-hidden w-full py-14 sm:py-20 px-4 sm:px-6"
        style={{ background: 'linear-gradient(to top, rgba(17,24,39,0.25) 0%, rgba(255,255,255,1) 100%)' }}
      >
        <div
          className="absolute left-1/2 z-[1] w-[10px] bg-white pointer-events-none"
          style={{ top: '-80px', bottom: '-80px', transform: 'translateX(-50%) rotate(-13.2deg)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="mb-8 w-full">
            <span className={`${tagClass} text-[#F07E26]`}>DIE AUSSCHREIBUNG</span>
            <h2 className="uppercase text-[#111827] text-h2">WAS WIR SUCHEN</h2>
            <p className="text-gray-700 text-body max-w-3xl mt-3 mx-auto leading-relaxed">
              Konkret werden reicht. Wir wollen keinen Businessplan und keine Vision für 2035. Wir wollen
              wissen: Welches Materialproblem löst du, wer bezahlt dafür, und wie weit bist du damit heute?
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 w-2/3 mx-auto">
            <div className="bg-white border border-[#111827] corner-cut p-6 flex flex-col items-center text-center space-y-4">
              <Check className="text-[#F07E26] shrink-0" style={{ width: '2.5em', height: '2.5em' }} strokeWidth={2.5} />
              <h3 className="text-[#111827] text-h3">
                Diese Lösungen suchen wir zum Beispiel
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {SOLUTIONS_WE_SEEK.map((item) => (
                  <span
                    key={item}
                    className={`${tagClass} text-[#111827] bg-white border border-[#111827]/20 px-2.5 py-1.5`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#F07E26] text-white corner-cut p-6 border border-[#111827] flex flex-col items-center text-center space-y-4">
              <X className="text-white shrink-0" style={{ width: '2.5em', height: '2.5em' }} strokeWidth={2.5} />
              <h3 className="text-white text-h3">
                Was nicht passt
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {NOT_FITTING.map((item) => (
                  <span
                    key={item}
                    className={`${tagClass} text-[#111827] bg-white border border-white/30 px-2.5 py-1.5`}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-label text-white/80 border-t border-white/20 pt-3">
                Deine Lösung sollte mindestens als Prototyp existieren — besser schon pilotfähig sein.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WER TEILNEHMEN KANN — Fläche: tertiary-tint */}
      <section
        id="teilnehmen"
        className="w-full py-14 sm:py-20 px-4 sm:px-6"
        style={{ background: '#FFFFFF' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="mb-8 w-full">
            <span className={`${tagClass} text-[#F07E26]`}>TEILNAHME</span>
            <h2 className="uppercase text-[#111827] text-h2">WER TEILNEHMEN KANN</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 w-2/3 mx-auto">
            <div className="bg-white border border-[#111827] corner-cut p-6 flex flex-col items-center text-center space-y-4">
              <h3 className="text-[#111827] text-h3">
                Offen für diese Profile
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {TARGET_GROUPS.map((group) => (
                  <span
                    key={group}
                    className={`${tagClass} text-[#111827] bg-white border border-[#111827]/20 px-2.5 py-1.5`}
                  >
                    {group}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#F07E26] text-white corner-cut p-6 border border-[#111827] flex flex-col items-center text-center space-y-4">
              <h3 className="text-white text-h3">
                Deutschlandweit offen —
                <br />
                mit einer Bedingung: LEIPZIG
              </h3>
              <p className="text-body text-white/90 leading-relaxed">
                Deine Lösung braucht einen klaren Bezug zu Leipzig, zum Beispiel durch:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {LEIPZIG_CONNECTION_EXAMPLES.map((item) => (
                  <span
                    key={item}
                    className={`${tagClass} text-[#111827] bg-white border border-white/30 px-2.5 py-1.5`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PREISBLOCK — Fläche: weiß-grau Verlauf wie "Die Ausschreibung" */}
      <section
        id="preise"
        className="relative overflow-hidden w-full py-14 sm:py-20 px-4 sm:px-6"
        style={{ background: 'linear-gradient(to top, rgba(17,24,39,0.25) 0%, rgba(255,255,255,1) 100%)' }}
      >
        <div
          className="absolute left-1/2 z-[1] w-[10px] bg-white pointer-events-none"
          style={{ top: '-80px', bottom: '-80px', transform: 'translateX(-50%) rotate(-13.2deg)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="mb-8 w-full">
            <span className={`${tagClass} text-[#F07E26]`}>PREISE</span>
            <h2 className="uppercase text-[#111827] text-h2">Das gibt es zu gewinnen</h2>
          </div>

          <div className="w-2/3 mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRIZES.map((prize, idx) => (
                <div
                  key={prize.place}
                  className={`p-6 border border-[#111827] corner-cut flex flex-col items-center text-center gap-3 ${
                    idx === 0 ? 'bg-[#FED27A]/25' : 'bg-[#F8F9FA]'
                  }`}
                >
                  <div className={`${tagClass} text-gray-500`}>{prize.place}</div>
                  <div className="text-h2 font-semibold text-[#111827]">{prize.amount}</div>
                  {prize.description && (
                    <p className="text-body text-gray-700 leading-relaxed">{prize.description}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-[#F8F9FA] border border-[#111827] corner-cut p-6 flex flex-col items-center text-center space-y-4">
              <h3 className="text-[#111827] text-h3">
                Für alle im Finale
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {FINALIST_BENEFITS.map((benefit) => (
                  <span
                    key={benefit}
                    className={`${tagClass} text-[#111827] bg-white border border-[#111827]/20 px-2.5 py-1.5`}
                  >
                    {benefit}
                  </span>
                ))}
              </div>
              <p className="text-body text-gray-600 italic border-t border-gray-200 pt-4">
                Für viele Teams ist das der eigentliche Gewinn: nicht das Preisgeld, sondern der erste
                Auftrag danach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SAVE THE DATE — Fläche: ink (dunkel) */}
      <section
        id="save-the-date"
        className="relative overflow-hidden w-full text-white py-14 sm:py-20 px-4 sm:px-6"
        style={{ background: '#111827' }}
        onMouseMove={handleSpotMouseMove}
      >
        <div
          className="absolute z-0 rounded-full pointer-events-none"
          style={{
            width: '600px',
            height: '600px',
            left: spotPos.x - 300,
            top: spotPos.y - 300,
            background: 'radial-gradient(circle, rgba(240,126,38,0.9) 0%, rgba(240,126,38,0.4) 45%, rgba(240,126,38,0) 70%)',
            filter: 'blur(30px)',
            transition: 'left 0.12s ease-out, top 0.12s ease-out',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center space-y-3">
          <img
            src="/assets/Award.png"
            alt="Re:Ward Pokal"
            className="w-1/2 mb-4 transition-transform duration-200 hover:scale-95"
          />
          <span className={`${tagClass} text-white`}>
            SAVE THE DATE
          </span>
          <h3 className="uppercase tracking-tight leading-tight text-h3">
            Pitch-Veranstaltung
            <br />
            im November
          </h3>
          <p className="text-white/80 text-label uppercase tracking-wide">
            Termin wird noch bekanntgegeben · November 2026 · Leipzig
          </p>
          <p className="text-white/80 text-body pt-2">
            Die besten eingereichten Konzepte werden live vorgestellt — vor Jury, Fachpublikum,
            potenziellen Partnern und Presse. Danach werden die Preise verliehen.
          </p>
          <p className="text-white/80 text-body">
            Wenn du dich bewirbst, blocke dir den Termin jetzt. Wer in die Shortlist kommt, pitcht an
            diesem Tag persönlich. Wir melden uns bis zum 30. Oktober bei euch.
          </p>
          <div className="flex flex-col items-center gap-3 pt-4">
            <button
              disabled
              title="Der Kalender-Eintrag folgt, sobald der Pitch-Termin feststeht."
              className={`${tagClass} bg-[#F07E26] text-white py-4 px-6 border border-white/30 flex items-center justify-center gap-2 cursor-not-allowed`}
            >
              <Calendar className="w-4 h-4" />
              <span>Termin folgt — in Kalender übernehmen</span>
            </button>
            <span className="text-center text-label text-white/80 font-condensed">
              Wir geben das genaue Datum bekannt, sobald es feststeht
            </span>
          </div>
        </div>
      </section>

      {/* 6. ÜBERGANG ZUM FORMULAR — Fläche: tertiary-tint */}
      <section
        className="w-full py-14 sm:py-20 px-4 sm:px-6"
        style={{ background: 'linear-gradient(105deg, #F8F9FA 0%, #F8F9FA 66%, #E7E5DD 100%)' }}
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-3">
          <span className={`${tagClass} text-[#F07E26]`}>
            BEWERBUNGSSCHLUSS: FREITAG, 23. OKTOBER 2026
          </span>
          <h3 className="tracking-tight leading-tight text-[#111827] text-h3">
            Bewirb dich
          </h3>
          <p className="text-gray-700 text-body">
            Das Ausfüllen des Formulars dauert nur 10 Minuten. Du beantwortest überwiegend
            Auswahlfragen — keine Aufsätze. Am Ende lädst du eine PDF mit maximal 3 Seiten hoch.
          </p>
          <p className="text-gray-600 text-label">
            Fragen? Schreib uns direkt an{' '}
            <a href="mailto:kontakt@reward-leipzig.de" className="font-condensed text-[#F07E26] hover:underline">
              kontakt@reward-leipzig.de
            </a>
            .
          </p>
          <div className="flex flex-col items-center gap-3 pt-4">
            <button
              onClick={() => onNavigate('portal')}
              className="btn-editorial-primary py-4 px-6 cursor-pointer"
            >
              <span>Jetzt bewerben</span>
            </button>
            <span className="text-center text-label text-gray-600 font-condensed">
              Dauer: ca. 10 Minuten · kostenfrei
            </span>
          </div>
        </div>
      </section>

      {/* TIMELINE — Fläche: canvas */}
      <section
        className="w-full py-14 sm:py-20 px-4 sm:px-6"
        style={{ background: 'linear-gradient(105deg, #F8F9FA 0%, #F8F9FA 66%, #E7E5DD 100%)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="mb-8 w-full">
            <span className={`${tagClass} text-[#F07E26]`}>TIMELINE</span>
            <h2 className="uppercase text-[#111827] text-h2">VON DER BEWERBUNG ZUM PITCH</h2>
          </div>

          {/* Offene Zeitachse, zentriert, ohne Kästen, durchgehende Linie mit mittigem Punkt je Spalte */}
          <div className="relative w-2/3 mx-auto">
            <div
              className="hidden md:block absolute left-0 right-0 h-[2px] bg-[#111827]"
              style={{ top: '3.5rem' }}
            ></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              {TIMELINE.map((item, index) => {
                const isActive = selectedPhase === index;
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedPhase(index)}
                    className={`relative flex flex-col items-center text-center pt-1 pb-6 px-6 corner-cut border-2 transition-colors duration-200 cursor-pointer ${
                      isActive ? 'bg-[#F07E26] border-[#F07E26]' : 'border-transparent'
                    }`}
                  >
                    <div className={`font-condensed font-bold leading-none text-h4 ${isActive ? 'text-white' : 'text-[#111827]'}`}>
                      Phase {String(index + 1).padStart(2, '0')}
                    </div>

                    <span
                      className={`hidden md:block absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full z-10 transition-colors duration-200 ${
                        isActive ? 'bg-white' : 'bg-[#111827]'
                      }`}
                      style={{ top: '3.5rem' }}
                    ></span>

                    <div className="mt-6 md:mt-8 space-y-2 w-full min-w-0">
                      <div className={`${tagClass} ${isActive ? 'text-white' : 'text-[#111827]'}`}>
                        {item.date}
                      </div>
                      <h3 className={`text-h3 ${isActive ? 'text-white' : 'text-[#111827]'}`}>{item.title}</h3>
                      <p className={`text-body ${isActive ? 'text-white' : 'text-[#111827]'}`}>{item.description}</p>

                      {item.location && (
                        <div className={`text-label font-condensed pt-2 flex items-center justify-center gap-1 ${isActive ? 'text-white' : 'text-[#111827]'}`}>
                          <MapPin className={`w-3 h-3 ${isActive ? 'text-white' : 'text-[#F07E26]'}`} />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — Fläche: weiß-creme Verlauf — letzte Sektion vor dem Footer */}
      <section
        id="faq"
        className="w-full py-14 sm:py-20 px-4 sm:px-6"
        style={{ background: 'linear-gradient(105deg, #FFFFFF 0%, #FFFFFF 66%, #EFEDE6 100%)' }}
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <span className={`${tagClass} text-[#F07E26]`}>FAQ</span>
          <h2 className="uppercase text-[#111827] text-h2 mb-8">Häufige Fragen</h2>

          <div className="space-y-6 text-center w-full">
            {FAQ_ITEMS.map((faq) => (
              <div key={faq.question} className="border-b border-[#111827]/10 pb-6">
                <h3 className="text-[#111827] text-h5 mb-2">{faq.question}</h3>
                <p className="text-gray-700 text-body leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
