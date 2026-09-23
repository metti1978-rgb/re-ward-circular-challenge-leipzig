import { PrizeTier, TimelineMilestone } from '../types';

export const AWARD_METRICS = {
  totalPrizePool: 9000,
  currency: '€',
  deadline: '2026-10-23T23:59:59',
  edition: '2026',
  partners: [
    'Stadt Leipzig — Referat für Wirtschaftsförderung',
    'Amt für Umweltschutz Leipzig',
    'Fraunhofer-Zentrum für Internationales Management (IMW)',
    'SpinLab — The HHL Accelerator Leipzig'
  ]
};

export const PRIZES: PrizeTier[] = [
  {
    place: 'Erster Preis',
    amount: '5.000 €',
    description:
      'plus eine Mietfläche im Wiederschön, Leipzigs Second Life Concept Store, sowie Zugang zur SpinLab-Academy.'
  },
  {
    place: 'Zweiter Preis',
    amount: '3.000 €',
    description: 'plus eine Mietfläche im Wiederschön, Leipzigs Second Life Concept Store.'
  },
  {
    place: 'Dritter Preis',
    amount: '1.000 €',
    description: 'plus eine Mietfläche im Wiederschön, Leipzigs Second Life Concept Store.'
  }
];

export const FINALIST_BENEFITS: string[] = [
  'Kontakt zu potenziellen Erstkunden',
  'Vermittlung an Umsetzungspartner',
  'Sichtbarkeit auf der Pitch-Bühne und in der Berichterstattung'
];

export const SOLUTIONS_WE_SEEK: string[] = [
  'Reparaturservices',
  'Wiederverwendungsplattformen',
  'Refurbishment',
  'Upcycling-Produkte',
  'neue Sekundärmaterialprodukte',
  'Sortier- und Recyclingtechnologien',
  'Rücknahmesysteme',
  'digitale Produktpässe',
  'Materialtracking',
  'Nachweis- und Compliance-Tools'
];

export const MATERIAL_STREAMS: string[] = [
  'Textilien',
  'Elektrogeräte',
  'Kunststoffe',
  'Möbel',
  'Bauprodukte',
  'Verpackungen',
  'Metalle',
  'biogene Reststoffe'
];

export const NOT_FITTING: string[] = [
  'Einzelstücke aus Restmaterial',
  'Studien ohne Marktperspektive'
];

export const TARGET_GROUPS: string[] = [
  'Gründungsideen',
  'Startups',
  'Kleine und mittlere Unternehmen',
  'Handwerksbetriebe',
  'Sozialunternehmen',
  'Entsorger',
  'Recyclingunternehmen',
  'Hersteller',
  'Händler',
  'Forschungsteams mit Praxispartner',
  'Konsortien aus mehreren Partnern'
];

export const LEIPZIG_CONNECTION_EXAMPLES: string[] = [
  'Umsetzung vor Ort',
  'Projektpartner aus der Stadt',
  'Nutzung Leipziger Stoffströme oder Testumgebungen',
  'Forschungsbezug',
  'ein konkretes Leipziger Problem, das gelöst wird'
];

export const TIMELINE: TimelineMilestone[] = [
  {
    step: 'PHASE 01',
    date: 'bis 23. Oktober 2026',
    title: 'Bewerbung',
    status: 'active',
    description:
      'Offener Call für marktfähige Repair-, Reuse-, Repurpose-, Recycling- und Rethink-Lösungen. Einreichung über das RE\\WARD Bewerbungsformular, rund 10 Minuten.',
    location: 'Digitales Bewerbungsformular'
  },
  {
    step: 'SCHRITT 1 DER AUSWAHL',
    date: 'bis 30. Oktober 2026',
    title: 'Jury-Auswahl: Shortlist',
    status: 'upcoming',
    description: 'Die Jury sichtet alle Bewerbungen und wählt die Shortlist-Teams aus, die im zweiten Schritt live pitchen.',
  },
  {
    step: 'SCHRITT 2 DER AUSWAHL',
    date: 'November 2026 · Leipzig',
    title: 'Finale: Pitch vor Publikum',
    status: 'upcoming',
    description:
      'Die Shortlist-Teams präsentieren live vor Jury, Fachpublikum, potenziellen Partnern und Presse. Danach werden die Preise verliehen.',
    location: 'Leipzig'
  }
];
