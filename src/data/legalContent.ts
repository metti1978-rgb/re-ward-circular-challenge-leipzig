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
  { type: 'paragraph', text: 'TNC Production GmbH\nGottschedstraße 12\n04109 Leipzig\nwww.tnc-group.de' },
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
    text: 'Diese Website sowie das Bewerbungsformular werden auf Servern der TNC Production GmbH, Gottschedstraße 12, 04109 Leipzig, betrieben. TNC verarbeitet die Daten in unserem Auftrag als Auftragsverarbeiter gemäß Art. 28 DSGVO auf Grundlage eines entsprechenden Auftragsverarbeitungsvertrags.'
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

export const TEILNAHMEBEDINGUNGEN_CONTENT: LegalBlock[] = [
  { type: 'heading', text: '1. Veranstalter' },
  {
    type: 'paragraph',
    text: 'Wiederschön Leipzig, ein Projekt der Stadtreinigung Leipzig, Eigenbetrieb der Stadt Leipzig, Geithainer Straße 60, 04328 Leipzig (im Folgenden „Veranstalter"). Konzeption und Durchführung erfolgen in Zusammenarbeit mit der TNC Production GmbH. Fragen zum Wettbewerb: kontakt@reward-leipzig.de'
  },
  { type: 'heading', text: '2. Gegenstand des Wettbewerbs' },
  {
    type: 'paragraph',
    text: 'RE\\WARD sucht marktfähige Produkte, Dienstleistungen und Geschäftsmodelle für Repair, Reuse, Repurpose, Recycling und Rethink – offen für jeden Stoffstrom, mit einem klaren Bezug zu Leipzig. Die Bewertung erfolgt anhand des Kriterienpapiers Marktfähigkeit (10 Kriterien, jeweils 0–5 Punkte, max. 50 Punkte).'
  },
  { type: 'heading', text: '3. Teilnahmeberechtigung' },
  {
    type: 'paragraph',
    text: 'Teilnehmen können Startups, kleine und mittlere Unternehmen, Handwerksbetriebe, Sozialunternehmen, Entsorger, Recyclingunternehmen, Hersteller, Händler, Forschungsteams mit Praxispartner sowie Konsortien aus mehreren Partnern – deutschlandweit, sofern ein klarer Bezug zu Leipzig besteht (z. B. Umsetzung vor Ort, Projektpartner aus der Stadt, Nutzung Leipziger Stoffströme/Testumgebungen, Forschungsbezug oder Lösung eines konkreten Leipziger Problems). Die eingereichte Lösung muss mindestens als Prototyp existieren. Reine Ideen ohne Prototyp, Einzelstücke aus Restmaterial und Studien ohne Marktperspektive sind von der Teilnahme ausgeschlossen.'
  },
  { type: 'heading', text: '4. Ausschluss von der Teilnahme' },
  {
    type: 'paragraph',
    text: 'Von der Teilnahme ausgeschlossen sind Mitarbeitende des Veranstalters und der TNC Production GmbH, Mitglieder der Jury sowie deren jeweilige Angehörige.'
  },
  { type: 'heading', text: '5. Bewerbungszeitraum und -verfahren' },
  {
    type: 'paragraph',
    text: 'Bewerbungen können bis Freitag, 23.10.2026, 23:59 Uhr, über das Online-Formular auf reward-leipzig.de eingereicht werden. Erforderlich sind Kontaktdaten, Angaben zum Konzept sowie ein PDF mit maximal 3 Seiten. Nach Ablauf der Frist eingehende Bewerbungen werden nicht berücksichtigt.'
  },
  { type: 'heading', text: '6. Bewertungsverfahren' },
  {
    type: 'paragraph',
    text: 'Die Sichtung erfolgt bis zum 30.10.2026. Die Jury setzt sich aus Entscheider:innen der Stadt Leipzig sowie aus dem Partner- und Expertennetzwerk von RE\\WARD zusammen; die konkrete Zusammensetzung wird zu gegebener Zeit bekanntgegeben. Jury-Entscheidungen sind endgültig.'
  },
  { type: 'heading', text: '7. Pitch-Event' },
  {
    type: 'paragraph',
    text: 'Die auf die Shortlist gewählten Teams pitchen im November 2026 in Leipzig persönlich vor Jury, Fachpublikum, potenziellen Partnern und Presse; der genaue Termin wird noch bekanntgegeben. Teilnehmende verpflichten sich, sich diesen Termin bereits mit der Bewerbung vorzumerken.'
  },
  { type: 'heading', text: '8. Preise' },
  {
    type: 'list',
    items: [
      '1. Platz: 5.000 € sowie eine Mietfläche im Wiederschön Leipzig',
      '2. Platz: 3.000 €',
      '3. Platz: 1.000 €'
    ]
  },
  {
    type: 'paragraph',
    text: 'Alle Teams im Finale erhalten zusätzlich: Kontakt zu potenziellen Erstkunden, Vermittlung an Umsetzungspartner sowie Sichtbarkeit auf der Pitch-Bühne und in der Berichterstattung. Für die Mietfläche als Teil des 1. Preises gilt ein gesonderter Mietvertrag mit dem Betreiber. Etwaige steuerliche Pflichten im Zusammenhang mit dem Preisgeld liegen bei den Gewinner:innen.'
  },
  { type: 'heading', text: '9. Nutzungsrechte an eingereichten Konzepten' },
  {
    type: 'paragraph',
    text: 'Die eingereichten Konzepte werden ausschließlich im Rahmen des Wettbewerbs genutzt (Sichtung, Jury-Bewertung, Präsentation beim Pitch-Event). Eine darüberhinausgehende Nutzung der Konzepte durch den Veranstalter findet nicht statt.'
  },
  { type: 'heading', text: '10. Bild- und Pressefreigaben' },
  {
    type: 'paragraph',
    text: 'Teilnehmende erklären sich damit einverstanden, dass im Rahmen des Wettbewerbs, insbesondere beim Pitch-Event, angefertigte Foto- und Videoaufnahmen durch den Veranstalter für die Öffentlichkeitsarbeit (Website, Social Media, Pressemitteilungen) im Zusammenhang mit RE\\WARD genutzt werden dürfen.'
  },
  { type: 'heading', text: '11. Datenschutz' },
  {
    type: 'paragraph',
    text: 'Informationen zur Verarbeitung personenbezogener Daten finden sich in der Datenschutzerklärung unter reward-leipzig.de/datenschutz.'
  },
  { type: 'heading', text: '12. Haftung' },
  {
    type: 'paragraph',
    text: 'Der Veranstalter übernimmt keine Haftung für verspätete, unvollständige oder aufgrund technischer Störungen nicht zugestellte Bewerbungen. Eine Haftung des Veranstalters ist ausgeschlossen, soweit sie nicht auf Vorsatz oder grober Fahrlässigkeit beruht oder gesetzlich zwingend vorgeschrieben ist.'
  },
  { type: 'heading', text: '13. Änderung, Verschiebung oder Absage des Wettbewerbs' },
  {
    type: 'paragraph',
    text: 'Der Veranstalter behält sich vor, den Wettbewerb aus wichtigem Grund zu ändern, zeitlich zu verschieben oder abzusagen.'
  },
  { type: 'heading', text: '14. Schlussbestimmungen' },
  {
    type: 'paragraph',
    text: 'Der Rechtsweg ist ausgeschlossen. Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig, Leipzig.'
  }
];
