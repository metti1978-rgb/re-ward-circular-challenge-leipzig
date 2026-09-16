import React from 'react';

interface RewardLogoProps {
  variant?: 'horizontal' | 'stacked' | 'symbol-only';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  inverted?: boolean;
  subtitle?: React.ReactNode;
  subtitleClassName?: string;
}

export const RewardLogo: React.FC<RewardLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  inverted = false,
  subtitle = 'Circular Challenge Leipzig',
  subtitleClassName,
}) => {
  // Wordmark-Breiten je Größe (responsive), Höhe ergibt sich aus dem Seitenverhältnis der Datei.
  const sizeMap = {
    sm: { wordmarkClass: 'w-24', subScale: 'text-[11px]' },
    md: { wordmarkClass: 'w-32', subScale: 'text-[14px]' },
    lg: { wordmarkClass: 'w-44', subScale: 'text-[16px]' },
    xl: { wordmarkClass: 'w-56 sm:w-64 md:w-72', subScale: 'text-[20px]' },
    '2xl': { wordmarkClass: 'w-64 sm:w-80 md:w-[26rem] lg:w-[30rem]', subScale: 'text-[22px] sm:text-[28px] md:text-[32px]' },
  };

  const currentSize = sizeMap[size];

  // Re:Ward-Wordmark (Logo 10, public/assets/LO10.svg) — als Inline-SVG mit currentColor,
  // damit Farbe über className gesteuert werden kann (schwarz Standard, weiß bei inverted).
  const wordmark = (
    <svg
      viewBox="0 0 133.86 46.9"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${currentSize.wordmarkClass} ${inverted ? 'text-white' : 'text-[#111827]'}`}
      role="img"
      aria-label="Re:Ward"
    >
      <g fill="currentColor">
        <path d="M12.64,33.85c-.25,0-.41-.11-.5-.34l-3.93-8.37h-3.06c-.13,0-.2.07-.2.2v8.17c0,.22-.11.34-.34.34H.34c-.22,0-.34-.11-.34-.34V11.33c0-.22.11-.34.34-.34h9.11c1.16,0,2.22.17,3.18.52.95.35,1.77.83,2.45,1.46.68.63,1.21,1.38,1.58,2.25s.55,1.83.55,2.86c0,1.48-.36,2.77-1.08,3.87-.72,1.1-1.71,1.93-2.99,2.49l4.5,9.01c.04.11.04.21,0,.29-.05.08-.12.12-.24.12h-4.77ZM11.43,20.17c.56-.52.84-1.21.84-2.08s-.28-1.54-.84-2.05c-.56-.52-1.31-.77-2.25-.77h-4.03c-.13,0-.2.07-.2.2v5.28c0,.13.07.2.2.2h4.03c.94,0,1.69-.26,2.25-.77Z" />
        <path d="M41.16,33.51l-1.04-3.92c-3.01,0-4.94-.01-4.99-.01h-9.85c-.13,0-.2-.07-.2-.2v-4.74c0-.13.07-.2.2-.2h8.2c.14,0,.24-.04,5.22-.13l-1.09-4.1c-1.33,0-2.69,0-4.13,0h-8.2c-.13,0-.2-.07-.2-.2v-4.54c0-.13.07-.2.2-.2h9.85c.09,0,.16-.02,1.15-.05l-1.03-3.88s-.05-.15-.11-.34c0,0,0,0,0,0h-14.66c-.22,0-.34.11-.34.34v22.18c0,.22.11.34.34.34h14.66s2.51-.01,6.35-.03c-.15-.03-.27-.12-.32-.31Z" />
        <path d="M65.26,33.85c-.22,0-.37-.11-.44-.34l-3.97-14.22h-.07l-4,14.22c-.07.22-.21.34-.44.34h-3.36c-.2,0-.34-.11-.4-.34l-5.92-22.18c-.05-.22.04-.34.27-.34h4.34c.22,0,.36.11.4.34l3.29,14.35h.07l3.9-14.35c.07-.22.21-.34.44-.34h2.92c.2,0,.34.11.4.34l4.03,14.35h.07l3.16-14.35c.02-.22.16-.34.4-.34h4.3c.22,0,.31.11.27.34l-5.88,22.18c-.05.22-.19.34-.44.34h-3.36Z" />
        <path d="M81.73,11.33c.07-.22.21-.34.44-.34h4.24c.22,0,.37.11.44.34l7.73,22.18c.07.22-.01.34-.24.34h-4.37c-.22,0-.37-.11-.44-.34l-1.31-4h-8l-1.28,4c-.07.22-.21.34-.44.34h-4.4c-.22,0-.3-.11-.24-.34l7.87-22.18ZM86.87,25.31l-2.59-8h-.1l-2.59,8h5.28Z" />
        <path d="M109.02,33.85c-.25,0-.41-.11-.5-.34l-3.93-8.37h-3.06c-.13,0-.2.07-.2.2v8.17c0,.22-.11.34-.34.34h-4.27c-.22,0-.34-.11-.34-.34V11.33c0-.22.11-.34.34-.34h9.11c1.16,0,2.22.17,3.18.52.95.35,1.77.83,2.45,1.46.68.63,1.21,1.38,1.58,2.25.37.87.55,1.83.55,2.86,0,1.48-.36,2.77-1.08,3.87-.72,1.1-1.71,1.93-2.99,2.49l4.5,9.01c.04.11.04.21,0,.29-.05.08-.12.12-.24.12h-4.77ZM107.81,20.17c.56-.52.84-1.21.84-2.08s-.28-1.54-.84-2.05c-.56-.52-1.31-.77-2.25-.77h-4.03c-.13,0-.2.07-.2.2v5.28c0,.13.07.2.2.2h4.03c.94,0,1.69-.26,2.25-.77Z" />
        <path d="M116.52,11.33c0-.22.11-.34.34-.34h8.5c2.02,0,3.7.43,5.04,1.28s2.3,2.14,2.86,3.87c.09.31.17.64.25.99.08.35.15.76.2,1.23.06.47.1,1.03.12,1.68.02.65.03,1.45.03,2.39s-.01,1.74-.03,2.39c-.02.65-.06,1.21-.12,1.68-.06.47-.12.88-.2,1.23-.08.35-.16.68-.25.99-.56,1.73-1.51,3.01-2.86,3.87-1.34.85-3.03,1.28-5.04,1.28h-8.5c-.22,0-.34-.11-.34-.34V11.33ZM121.66,29.44h2.59c1.14,0,2.06-.19,2.76-.55.69-.37,1.19-1.03,1.48-1.97.07-.16.12-.34.17-.55.04-.21.08-.49.12-.82s.06-.76.07-1.26c.01-.5.02-1.13.02-1.87s0-1.36-.02-1.85c-.01-.49-.03-.91-.07-1.24-.03-.34-.07-.61-.12-.82-.05-.21-.1-.41-.17-.59-.29-.94-.78-1.6-1.48-1.97-.69-.37-1.61-.55-2.76-.55h-2.59c-.13,0-.2.07-.2.2v13.65c0,.13.07.2.2.2Z" />
        <polygon points="50.68 46.58 49.36 46.9 37.69 .31 39.02 0 50.68 46.58" />
      </g>
    </svg>
  );

  if (variant === 'symbol-only') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {wordmark}
      </div>
    );
  }

  return (
    <div
      className={`group inline-flex ${
        variant === 'stacked' ? 'flex-col items-start gap-2' : 'items-center gap-3.5'
      } ${className}`}
    >
      {wordmark}

      {/* Descriptor (Standard: "Circular Challenge Leipzig", überschreibbar via subtitle/subtitleClassName) */}
      <span
        className={
          subtitleClassName ??
          `font-condensed font-bold tracking-[0.03em] ${currentSize.subScale} ${
            inverted ? 'text-white/90' : 'text-[#F07E26]'
          }`
        }
      >
        {subtitle}
      </span>
    </div>
  );
};
