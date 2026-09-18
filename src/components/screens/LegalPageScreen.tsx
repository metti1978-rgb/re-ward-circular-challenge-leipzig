import React from 'react';
import { ScreenId } from '../../types';
import { ArrowUpRight } from 'lucide-react';

interface LegalPageScreenProps {
  onNavigate: (screen: ScreenId) => void;
  eyebrow: string;
  title: string;
}

const tagClass =
  'font-condensed text-label font-semibold uppercase tracking-wide corner-cut';

const BLINDTEXT_PARAGRAPHS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.',
];

export const LegalPageScreen: React.FC<LegalPageScreenProps> = ({ onNavigate, eyebrow, title }) => {
  return (
    <section
      className="w-full py-14 sm:py-20 px-3 sm:px-6"
      style={{ background: 'linear-gradient(105deg, #FFFFFF 0%, #FFFFFF 66%, #EFEDE6 100%)' }}
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        <span className={`${tagClass} text-[#F07E26]`}>{eyebrow}</span>
        <h2 className="uppercase text-[#111827] text-h2 mb-8">{title}</h2>

        <div className="space-y-4 text-left w-full">
          {BLINDTEXT_PARAGRAPHS.map((paragraph, i) => (
            <p key={i} className="text-gray-700 text-body leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <button
          onClick={() => onNavigate('overview')}
          className="btn-editorial-link mt-10 cursor-pointer"
        >
          <span>Zurück zur Startseite</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
