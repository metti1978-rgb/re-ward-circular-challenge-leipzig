import React from 'react';

const PHOTOS = [
  'SRL_TNC_240517_20.JPG',
  'SRL_TNC_240517_21.JPG',
  'SRL_TNC_240517_22.JPG',
  'SRL_TNC_240517_23.JPG',
  'SRL_TNC_240517_24.JPG',
  'SRL_TNC_240517_25.JPG',
  'SRL_TNC_240517_26.JPG',
  'SRL_TNC_240517_27.JPG',
  'SRL_TNC_240517_28.JPG',
  'SRL_TNC_240517_29.JPG',
  'SRL_TNC_240517_37.JPG',
  'SRL_TNC_240517_44.JPG',
  'SRL_TNC_240517_46.JPG',
  'SRL_TNC_240517_50.JPG',
  'SRL_TNC_240517_51.JPG',
  'SRL_TNC_240517_57.JPG',
];

export const PhotoStrip: React.FC = () => {
  // Liste verdoppeln, damit die Marquee-Animation nahtlos in sich loopt.
  const loopPhotos = [...PHOTOS, ...PHOTOS];

  return (
    <div className="w-full overflow-hidden bg-[#111827]">
      <div className="flex w-max animate-[photo-strip-scroll_80s_linear_infinite] hover:[animation-play-state:paused]">
        {loopPhotos.map((file, i) => (
          <img
            key={`${file}-${i}`}
            src={`/assets/fotos ws/${file}`}
            alt="Wiederschön — Impressionen aus dem Concept Store"
            className="h-32 sm:h-44 md:h-52 w-auto shrink-0 object-cover"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
};
