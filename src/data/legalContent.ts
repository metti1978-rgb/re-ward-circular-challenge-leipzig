export type LegalBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] };

export const IMPRESSUM_CONTENT: LegalBlock[] = [
  { type: 'paragraph', text: 'Angaben gemäß § 5 DDG' },
  {
    type: 'paragraph',
    text: 'RE/WARD – Die Circular Challenge\nein Projekt von Wiederschön Leipzig\nStadtreinigung Leipzig\nEigenbetrieb der Stadt Leipzig\nGeithainer Straße 60\n04328 Leipzig'
  },
  { type: 'heading', text: 'Vertreten durch' },
  {
    type: 'paragraph',
    text: 'Thomas Kretzschmar (Erster Betriebsleiter)\nElke Bröcker (Kaufmännische Betriebsleiterin)'
  },
  { type: 'heading', text: 'Kontakt' },
  { type: 'paragraph', text: 'Telefon: (0341) 6571–111\nE-Mail: wiederschoen@srleipzig.de' },
  { type: 'heading', text: 'Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG' },
  { type: 'paragraph', text: 'DE 14 15 10 203' },
  { type: 'paragraph', text: 'Handelsregister: HRA 13737, Registergericht Leipzig' },
  { type: 'heading', text: 'Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV' },
  {
    type: 'paragraph',
    text: 'Claudia Ballhause, Pressesprecherin\nStadtreinigung Leipzig, Geithainer Straße 60, 04328 Leipzig'
  },
  { type: 'heading', text: 'Konzeption, Gestaltung & Umsetzung' },
  { type: 'paragraph', text: 'TNC Production GmbH\nWaldstraße 27\n04105 Leipzig' },
  { type: 'heading', text: 'EU-Streitschlichtung' },
  {
    type: 'paragraph',
    text: 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/'
  },
  {
    type: 'paragraph',
    text: 'Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.'
  }
];

export const DATENSCHUTZ_CONTENT: LegalBlock[] = [
  { type: 'heading', text: '1. Verantwortlicher' },
  { type: 'paragraph', text: 'Stadtreinigung Leipzig, Eigenbetrieb der Stadt Leipzig\nGeithainer Straße 60, 04328 Leipzig' },
  {
    type: 'paragraph',
    text: 'Vertreten durch: Thomas Kretzschmar (Erster Betriebsleiter), Elke Bröcker (Kaufmännische Betriebsleiterin)'
  },
  { type: 'paragraph', text: 'Telefon: (0341) 6571–111\nE-Mail: wiederschoen@srleipzig.de' },
  { type: 'heading', text: '2. Datenschutzbeauftragter' },
  { type: 'paragraph', text: 'Stadt Leipzig, Datenschutzbeauftragter\n04092 Leipzig' },
  { type: 'paragraph', text: 'Telefon: (0341) 123–2247\nE-Mail: datenschutzbeauftragter@leipzig.de' },
  { type: 'heading', text: '3. Allgemeines zur Datenverarbeitung' },
  {
    type: 'paragraph',
    text: 'Diese Website verwendet keine Cookies, kein Tracking und keine Analyse- oder Marketing-Tools von Drittanbietern. Beim Aufruf der Seite werden lediglich technisch notwendige Server-Logdaten (z. B. IP-Adresse, Datum/Uhrzeit, aufgerufene Seite) verarbeitet, um den Betrieb der Website sicherzustellen (Art. 6 Abs. 1 lit. f DSGVO). Diese Logdaten werden nicht mit anderen Datenquellen zusammengeführt.'
  },
  { type: 'heading', text: '4. Teilnahme am Wettbewerb „RE/WARD – Die Circular Challenge"' },
  { type: 'paragraph', text: 'Im Rahmen der Bewerbung über das Formular auf dieser Website erheben wir folgende Daten:' },
  {
    type: 'list',
    items: [
      'Name und Kontaktdaten (E-Mail, ggf. Telefon)',
      'Unternehmens- bzw. Projektdaten (z. B. Firmenname, Konzeptbeschreibung)',
      'Datei-Uploads (z. B. Pitch-Deck, Bewerbungsunterlagen)'
    ]
  },
  {
    type: 'paragraph',
    text: 'Zweck: Durchführung des Auswahlverfahrens für den Wettbewerb, Kontaktaufnahme im Zusammenhang mit der Bewerbung, Bewertung durch die Jury und Preisvergabe.'
  },
  {
    type: 'paragraph',
    text: 'Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher Maßnahmen bzw. Erfüllung der Teilnahmebedingungen, denen Sie mit Ihrer Bewerbung zustimmen).'
  },
  {
    type: 'paragraph',
    text: 'Empfänger: Ihre Bewerbungsdaten werden zur Durchführung des Wettbewerbs an folgende Stellen weitergegeben: TNC Production GmbH (technischer Dienstleister/Auftragsverarbeiter), Wiederschön Leipzig / Stadtreinigung Leipzig (Veranstalter), die Jury-Mitglieder (zur Bewertung der Einreichungen) sowie die Stadt Leipzig (im Rahmen der städtischen Trägerschaft des Wettbewerbs). Eine Weitergabe an sonstige Dritte erfolgt nicht.'
  },
  {
    type: 'paragraph',
    text: 'Speicherdauer: Ihre Daten werden bis zum 31.12.2026 gespeichert und anschließend gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.'
  },
  { type: 'heading', text: '5. Hosting/Auftragsverarbeitung' },
  {
    type: 'paragraph',
    text: 'Diese Website sowie das Bewerbungsformular werden auf Servern der TNC Production GmbH, Waldstraße 27, 04105 Leipzig, betrieben. TNC verarbeitet die Daten in unserem Auftrag als Auftragsverarbeiter gemäß Art. 28 DSGVO auf Grundlage eines entsprechenden Auftragsverarbeitungsvertrags.'
  },
  { type: 'heading', text: '6. Ihre Rechte' },
  {
    type: 'paragraph',
    text: 'Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) sowie Widerspruch gegen die Verarbeitung (Art. 21 DSGVO). Zur Ausübung wenden Sie sich an die unter Ziffer 1 genannte Stelle.'
  },
  { type: 'paragraph', text: 'Sie haben zudem das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren:' },
  {
    type: 'paragraph',
    text: 'Sächsische Datenschutz- und Transparenzbeauftragte\nPostfach 11 01 32, 01330 Dresden\nTelefon: (0351) 85471–101\nE-Mail: post@sdtb.sachsen.de'
  },
  { type: 'heading', text: '7. Aktualität und Änderung dieser Datenschutzerklärung' },
  {
    type: 'paragraph',
    text: 'Diese Datenschutzerklärung ist aktuell gültig (Stand: September 2026). Durch die Weiterentwicklung der Website können Anpassungen erforderlich werden.'
  }
];
