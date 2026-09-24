# RE\WARD — Die Circular Challenge Leipzig

Landing page + Bewerbungsformular für den RE\WARD-Wettbewerb der Stadt Leipzig / Wiederschön Leipzig (Stadtreinigung Leipzig). Bewerbungsschluss 23.10.2026, Pitch-Event im November 2026.

## Stack

React 19 + TypeScript + Vite 6 + Tailwind CSS v4 (`@import "tailwindcss"`, Design-Tokens als `@theme`-Block in `src/index.css`, real CSS custom properties). Kein Router — Navigation läuft über internen State (`ScreenId`) in `src/App.tsx`.

- `src/data/awardData.ts` — Preise, Timeline, Zielgruppen, FAQ-Inhalte
- `src/data/legalContent.ts` — Impressum/Datenschutz/Teilnahmebedingungen als strukturierte Blöcke (`LegalBlock[]`)
- `src/components/screens/OverviewScreen.tsx` — Hauptlandingpage, größte Datei
- `src/components/screens/SubmissionPortalScreen.tsx` — 4-Schritt-Bewerbungsformular

## Deploy — zwei parallele Ziele

**Netlify** (`tnc-reward.netlify.app`, produktiv aktuell nicht mehr primär): Auto-Deploy bei jedem `git push` auf `main`. Env-Variablen im Netlify-Dashboard unter Site configuration → Environment variables.

**Strato** (`www.reward-leipzig.de`, aktuell live): Kein eigener Build-Server — lokal bauen und per SFTP hochladen.
```bash
npm run deploy:strato
```
Baut (`vite build`) und lädt `dist/` per SFTP nach `/ReWard` hoch (`scripts/deploy-strato.mjs`). Zugangsdaten kommen aus `.env.local` (`STRATO_FTP_*`, siehe `.env.example`). Domain-Startverzeichnis bei Strato ist auf `/ReWard` gesetzt — das ist ein Unterordner im Webspace, kein separates Docroot; falls `dist/` in Zukunft mal unter einem anderen Pfad läge, müsste ggf. `base` in `vite.config.ts` gesetzt werden.

Beide Ziele lesen `VITE_GAS_ENDPOINT` / `VITE_GAS_TOKEN` zur Build-Zeit (Vite bindet sie fest in den JS-Bundle ein, kein Runtime-Env).

## Formular-Backend: Google Apps Script

Das Bewerbungsformular (`SubmissionPortalScreen.tsx`) postet bei Absenden an ein Google Apps Script Web App (`google-apps-script/Code.gs`) — Code dort 1:1 in ein Apps-Script-Projekt unter script.google.com eingefügt, als Web App deployed. Legt pro Einreichung einen Ordner (`0001_Datum_Projekttitel`) mit PDF + Formulardaten-Sheet in Google Drive an, plus eine Zeile in einem zentralen Master-Sheet. Absicherung über einen Shared-Secret-Token (`SECRET_TOKEN` in `Code.gs` == `VITE_GAS_TOKEN` im Frontend).

Das Google-Konto, das dieses Skript hostet, ist unabhängig vom Hosting der Website (Netlify/Strato) — bei einem Hosting-Wechsel muss dort nichts angepasst werden.

## Bekannte offene Punkte (Stand zuletzt geprüft)

- **Inhaltlicher Widerspruch:** Die Startseite sagt inzwischen "auch reine Gründungsideen ohne Prototyp willkommen", aber § 3 der Teilnahmebedingungen (`legalContent.ts`) verlangt weiterhin zwingend einen Prototyp. Ebenso: Startseite sagt "Mietfläche im Wiederschön für alle 3 Plätze", § 8 der Teilnahmebedingungen nennt die Mietfläche nur beim 1. Platz. Muss mit der verantwortlichen Stelle geklärt werden, welche Version gilt.
- **Datenschutztext vs. tatsächliche Datenverarbeitung:** `legalContent.ts` (Datenschutz, Abschnitt 4/5) nennt als Empfänger/Auftragsverarbeiter nur TNC Production GmbH — Google (Apps Script/Drive/Sheets) taucht dort nicht auf, obwohl Bewerbungsdaten tatsächlich dorthin fließen. Sollte ergänzt werden.
- Vor jeder inhaltlichen Änderung an Preisen/Teilnahmebedingungen: beide Stellen (Startseite + `legalContent.ts`) synchron halten.

## Konventionen

- Mobile-first-Reduktion: `px-3 sm:px-6` statt `px-4 sm:px-6` für Seitenränder (durchgängig so gemacht).
- Ecken: `.corner-cut`-Klasse (20px border-radius) statt einzelner `rounded-*`-Utilities.
- Kleine Uppercase-Tags/Labels: `tagClass`-Konstante (`font-condensed text-label font-semibold uppercase tracking-wide corner-cut`) — wird für Eyebrow-Labels, Preis-/Timeline-Nummern etc. wiederverwendet.
- Externe Partner-Logo-Links: `<a target="_blank" rel="noopener noreferrer" aria-label="... (öffnet in neuem Fenster)" className="transition-transform duration-200 hover:scale-95">` — Standardmuster, siehe `Footer.tsx` oder Preise-Sektion in `OverviewScreen.tsx`.
- Nach jeder Änderung: `npx tsc --noEmit` (kein separater Test-Runner vorhanden).
- Secrets (`VITE_GAS_TOKEN`, `STRATO_FTP_PASSWORD` etc.) nur in `.env.local`, niemals committen — `.env.example` zeigt, welche Variablen gebraucht werden.
