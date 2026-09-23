import React from 'react';
import { ScreenId } from '../../types';
import { ArrowUpRight } from 'lucide-react';
import { LegalBlock } from '../../data/legalContent';

interface LegalPageScreenProps {
  onNavigate: (screen: ScreenId) => void;
  eyebrow: string;
  title: string;
  content?: LegalBlock[];
}

const tagClass =
  'font-condensed text-label font-semibold uppercase tracking-wide corner-cut';

const BLINDTEXT_PARAGRAPHS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.',
];

const DEFAULT_CONTENT: LegalBlock[] = BLINDTEXT_PARAGRAPHS.map((text) => ({ type: 'paragraph', text }));

// Verwandelt E-Mail-Adressen und https-Links im Fließtext in klickbare Links.
const linkify = (text: string): React.ReactNode[] =>
  text.split(/(https?:\/\/[^\s]+|[\w.+-]+@[\w-]+\.[\w.-]+)/g).map((part, i) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#F07E26]">
          {part}
        </a>
      );
    }
    if (/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(part)) {
      return (
        <a key={i} href={`mailto:${part}`} className="underline hover:text-[#F07E26]">
          {part}
        </a>
      );
    }
    return part;
  });

const renderMultiline = (text: string) =>
  text.split('\n').map((line, i, arr) => (
    <React.Fragment key={i}>
      {linkify(line)}
      {i < arr.length - 1 && <br />}
    </React.Fragment>
  ));

export const LegalPageScreen: React.FC<LegalPageScreenProps> = ({ onNavigate, eyebrow, title, content }) => {
  const blocks = content ?? DEFAULT_CONTENT;

  return (
    <section
      className="w-full py-14 sm:py-20 px-3 sm:px-6"
      style={{ background: 'linear-gradient(105deg, #FFFFFF 0%, #FFFFFF 66%, #EFEDE6 100%)' }}
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        <span className={`${tagClass} text-[#F07E26]`}>{eyebrow}</span>
        <h2 className="uppercase text-[#111827] text-h2 mb-8">{title}</h2>

        <div className="space-y-4 text-left w-full">
          {blocks.map((block, i) => {
            if (block.type === 'heading') {
              return (
                <h3 key={i} className="text-[#111827] text-h5 font-semibold pt-2 first:pt-0">
                  {block.text}
                </h3>
              );
            }
            if (block.type === 'list') {
              return (
                <ul key={i} className="list-disc pl-5 space-y-1">
                  {block.items.map((item, j) => (
                    <li key={j} className="text-gray-700 text-body leading-relaxed">
                      {linkify(item)}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="text-gray-700 text-body leading-relaxed">
                {renderMultiline(block.text)}
              </p>
            );
          })}
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
