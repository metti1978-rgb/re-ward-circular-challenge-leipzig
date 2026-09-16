import React, { useState, useRef, useEffect } from 'react';
import { ScreenId, UploadedFileItem, SubmissionData } from '../../types';
import {
  UploadCloud, FileText, CheckCircle2, Trash2, ArrowRight, ArrowLeft,
  Save, Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SubmissionPortalScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

const STORAGE_KEY = 'reward_leipzig_submission_draft_v1';

const tagClass =
  'font-condensed text-label font-semibold uppercase tracking-wide corner-cut';

export const SubmissionPortalScreen: React.FC<SubmissionPortalScreenProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submissionId, setSubmissionId] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<SubmissionData>({
    projectName: '',
    organization: '',
    legalForm: 'Startup / UG/GmbH in Gründung',
    contactName: '',
    email: '',
    leipzigConnection: '',
    materialProblem: '',
    customer: '',
    maturity: 'Prototyp',
    files: [],
    agreedToTerms: true,
    agreedToDataPrivacy: true
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // Ignore parsing errors
    }
  }, []);

  const saveDraft = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      alert('Entwurf erfolgreich im lokalen Speicher gesichert.');
    } catch {
      // Ignore
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = (fileList: File[]) => {
    const newFiles: UploadedFileItem[] = fileList.map((file) => ({
      id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: file.name,
      size: file.size,
      type: file.type || 'application/octet-stream',
      uploadedAt: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
    }));

    // Nur eine PDF mit max. 3 Seiten — neue Datei ersetzt die vorherige.
    setFormData((prev) => ({
      ...prev,
      files: newFiles.slice(0, 1)
    }));
  };

  const removeFile = (fileId: string) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((f) => f.id !== fileId)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `REWARD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmissionId(generatedId);
    setIsSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F07E26', '#FED27A', '#111827', '#984800']
    });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white border border-[#111827] corner-cut p-8 sm:p-12 space-y-6">
          <div className={`${tagClass} inline-flex items-center gap-2 bg-[#FED27A] text-[#111827] px-3 py-1 border border-[#111827]`}>
            <CheckCircle2 className="w-4 h-4 text-[#984800]" />
            BEWERBUNG ERFOLGREICH ÜBERMITTELT
          </div>

          <h1 className="uppercase text-[#111827] text-h1 leading-tight">
            VIELEN DANK FÜR DEINE BEWERBUNG!
          </h1>

          <p className="text-gray-700 text-body leading-relaxed">
            Dein Projekt <strong>„{formData.projectName || 'RE:WARD Einreichung'}“</strong> wurde
            registriert.
          </p>

          <div className="bg-[#F8F9FA] border border-[#111827] corner-cut p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-3">
              <span className={`${tagClass} text-gray-500`}>
                Einreichungs-ID:
              </span>
              <span className="font-condensed font-semibold text-h3 text-[#F07E26] bg-[#111827] px-3 py-1 corner-cut">
                {submissionId}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-label font-condensed">
              <div>
                <span className="text-gray-500 uppercase font-bold">Organisation / Team:</span>
                <div className="font-bold text-[#111827]">{formData.organization || formData.contactName}</div>
              </div>
              <div>
                <span className="text-gray-500 uppercase font-bold">Kontakt-E-Mail:</span>
                <div className="font-bold text-[#111827]">{formData.email}</div>
              </div>
              <div>
                <span className="text-gray-500 uppercase font-bold">Anhang:</span>
                <div className="font-bold text-[#111827]">
                  {formData.files.length > 0 ? formData.files[0].name : 'Kein PDF hochgeladen'}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#FFF6A6]/30 border border-[#111827] corner-cut text-label space-y-1">
            <div className="font-bold text-[#111827] uppercase font-condensed">Nächste Schritte:</div>
            <p className="text-gray-700 leading-relaxed">
              Wir melden uns bis zum 30. Oktober 2026 bei dir. Wer in die Shortlist kommt, pitcht im
              November persönlich in Leipzig.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setStep(1);
              }}
              className="btn-editorial-secondary"
            >
              <span>Weiteres Projekt einreichen</span>
            </button>
            <button
              onClick={() => onNavigate('overview')}
              className="btn-editorial-primary"
            >
              <span>Zurück zur Startseite</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="border-b border-[#111827] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className={`${tagClass} bg-[#FED27A] text-[#111827] px-2 py-0.5 border border-[#111827]`}>
              Offener Call
            </span>
            <span className={`${tagClass} text-gray-500`}>
              Bewerbungsschluss: Freitag, 23. Oktober 2026
            </span>
          </div>
          <h1 className="uppercase text-[#111827] text-h1 tracking-tight mt-1">
            BEWIRB DICH
          </h1>
        </div>

        <button
          onClick={saveDraft}
          type="button"
          className="btn-editorial-secondary self-start sm:self-auto"
        >
          <Save className="w-3.5 h-3.5 text-[#F07E26]" />
          <span>Entwurf speichern</span>
        </button>
      </div>

      {/* Step Progress Tracker */}
      <div className="grid grid-cols-4 border border-[#111827] corner-cut overflow-hidden bg-white">
        {[
          { num: 1, label: 'Basisdaten' },
          { num: 2, label: 'Dein Vorhaben' },
          { num: 3, label: 'PDF-Upload' },
          { num: 4, label: 'Prüfen & Senden' },
        ].map((s) => {
          const isCurrent = step === s.num;
          const isPassed = step > s.num;
          return (
            <button
              key={s.num}
              type="button"
              onClick={() => setStep(s.num as any)}
              className={`p-3 text-left border-r last:border-r-0 border-[#111827] transition-colors cursor-pointer ${
                isCurrent
                  ? 'bg-[#F07E26] text-white'
                  : isPassed
                  ? 'bg-[#FED27A]/40 text-[#111827]'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              <div className="text-label font-condensed font-bold uppercase tracking-wider">
                SCHRITT 0{s.num}
              </div>
              <div className="text-label font-condensed font-bold uppercase tracking-wide truncate">
                {s.label}
              </div>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-[#111827] corner-cut p-6 sm:p-10 space-y-8">

        {/* STEP 1: BASISDATEN */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-3">
              <h2 className="uppercase text-[#111827] text-h2">
                1. PROJEKTDATEN
              </h2>
              <p className="text-label text-gray-600">
                <strong className="font-bold">RE:WARD</strong> ist deutschlandweit offen — deine Lösung braucht nur einen klaren Bezug zu Leipzig.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="projectName" className="block text-label font-condensed font-bold uppercase tracking-wide text-[#1F2937]">
                Projekttitel / Name der Lösung *
              </label>
              <input
                id="projectName"
                name="projectName"
                type="text"
                required
                placeholder="z. B. Leipziger BauLehm Loop"
                value={formData.projectName}
                onChange={handleInputChange}
                className="w-full bg-white border border-[#111827] corner-cut px-4 py-3 text-body focus:outline-none focus:border-2 focus:border-[#F07E26]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="organization" className="block text-label font-condensed font-bold uppercase tracking-wide text-[#1F2937]">
                  Einreichende Organisation / Team *
                </label>
                <input
                  id="organization"
                  name="organization"
                  type="text"
                  required
                  placeholder="Firma, Institut, Kollektiv oder Verein"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-[#111827] corner-cut px-4 py-3 text-body focus:outline-none focus:border-2 focus:border-[#F07E26]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="legalForm" className="block text-label font-condensed font-bold uppercase tracking-wide text-[#1F2937]">
                  Rechtsform / Organisationsform *
                </label>
                <select
                  id="legalForm"
                  name="legalForm"
                  value={formData.legalForm}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-[#111827] corner-cut px-4 py-3 text-body focus:outline-none focus:border-2 focus:border-[#F07E26]"
                >
                  <option value="Startup / UG/GmbH in Gründung">Startup / UG/GmbH in Gründung</option>
                  <option value="KMU / Gewerbebetrieb / Handwerk">KMU / Gewerbebetrieb / Handwerk</option>
                  <option value="Forschungsinstitut / Universität">Forschungsinstitut / Universität</option>
                  <option value="Eingetragener Verein / e.V. / NGO">Eingetragener Verein / e.V. / NGO</option>
                  <option value="Entsorger / Recyclingunternehmen">Entsorger / Recyclingunternehmen</option>
                  <option value="Konsortium aus mehreren Partnern">Konsortium aus mehreren Partnern</option>
                  <option value="Einzelperson / Freiberufler">Einzelperson / Freiberufler</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="contactName" className="block text-label font-condensed font-bold uppercase tracking-wide text-[#1F2937]">
                  Ansprechpartner:in *
                </label>
                <input
                  id="contactName"
                  name="contactName"
                  type="text"
                  required
                  placeholder="Vorname Nachname"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-[#111827] corner-cut px-4 py-3 text-body focus:outline-none focus:border-2 focus:border-[#F07E26]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-label font-condensed font-bold uppercase tracking-wide text-[#1F2937]">
                  E-Mail-Adresse *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="kontakt@organisation.de"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-[#111827] corner-cut px-4 py-3 text-body focus:outline-none focus:border-2 focus:border-[#F07E26]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="leipzigConnection" className="block text-label font-condensed font-bold uppercase tracking-wide text-[#1F2937]">
                Bezug zu Leipzig *
              </label>
              <textarea
                id="leipzigConnection"
                name="leipzigConnection"
                rows={3}
                required
                placeholder="Umsetzung vor Ort, Projektpartner aus der Stadt, Nutzung Leipziger Stoffströme/Testumgebungen, Forschungsbezug — oder ein konkretes Leipziger Problem, das du löst."
                value={formData.leipzigConnection}
                onChange={handleInputChange}
                className="w-full bg-white border border-[#111827] corner-cut p-3 text-body focus:outline-none focus:border-2 focus:border-[#F07E26]"
              />
            </div>
          </div>
        )}

        {/* STEP 2: DEIN VORHABEN */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-3">
              <h2 className="uppercase text-[#111827] text-h2">
                2. DEIN VORHABEN
              </h2>
              <p className="text-label text-gray-600">
                Welches Materialproblem löst du, wer bezahlt dafür, und wie weit bist du damit heute?
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="materialProblem" className="block text-label font-condensed font-bold uppercase tracking-wide text-[#1F2937]">
                Welches Materialproblem löst du? *
              </label>
              <textarea
                id="materialProblem"
                name="materialProblem"
                rows={4}
                required
                placeholder="Beschreibe den Stoffstrom und das konkrete Problem — von Textilien und Elektrogeräten über Kunststoffe, Möbel und Bauprodukte bis zu Verpackungen, Metallen und biogenen Reststoffen."
                value={formData.materialProblem}
                onChange={handleInputChange}
                className="w-full bg-white border border-[#111827] corner-cut p-3 text-body focus:outline-none focus:border-2 focus:border-[#F07E26]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="customer" className="block text-label font-condensed font-bold uppercase tracking-wide text-[#1F2937]">
                Wer bezahlt dafür? *
              </label>
              <textarea
                id="customer"
                name="customer"
                rows={3}
                required
                placeholder="Wer ist dein Kunde, und wie sieht das Geschäftsmodell aus?"
                value={formData.customer}
                onChange={handleInputChange}
                className="w-full bg-white border border-[#111827] corner-cut p-3 text-body focus:outline-none focus:border-2 focus:border-[#F07E26]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="maturity" className="block text-label font-condensed font-bold uppercase tracking-wide text-[#1F2937]">
                Wie weit bist du heute? *
              </label>
              <select
                id="maturity"
                name="maturity"
                value={formData.maturity}
                onChange={handleInputChange}
                className="w-full bg-white border border-[#111827] corner-cut px-4 py-3 text-body focus:outline-none focus:border-2 focus:border-[#F07E26]"
              >
                <option value="Prototyp">Prototyp vorhanden</option>
                <option value="Pilotfähig">Pilotfähig / erste Tests laufen</option>
                <option value="Markt">Bereits im Markt</option>
              </select>
              <p className="text-label text-gray-500">
                Reine Ideen ohne Prototyp, Einzelstücke aus Restmaterial und Studien ohne
                Marktperspektive passen nicht zu <strong className="font-bold">RE:WARD</strong>.
              </p>
            </div>
          </div>
        )}

        {/* STEP 3: PDF-UPLOAD */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-3">
              <h2 className="uppercase text-[#111827] text-h2">
                3. PDF-UPLOAD
              </h2>
              <p className="text-label text-gray-600">
                Lade eine PDF mit maximal 3 Seiten hoch. Mehr braucht es nicht.
              </p>
            </div>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`corner-cut p-8 sm:p-12 text-center transition-all cursor-pointer select-none ${
                isDragActive
                  ? 'border border-solid border-[#F07E26] bg-[#FFF6A6]/20'
                  : 'border border-dashed border-[#111827] bg-[#F8F9FA] hover:bg-gray-100 hover:border-[#F07E26]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />

              <div className="flex flex-col items-center justify-center space-y-3">
                <div className={`p-4 border corner-cut ${isDragActive ? 'bg-[#F07E26] text-white border-[#111827]' : 'bg-white text-[#111827] border-[#111827]'}`}>
                  <UploadCloud className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <div className="text-h4 font-semibold uppercase text-[#111827]">
                    {isDragActive ? 'Datei jetzt loslassen' : 'PDF hierhin ziehen oder klicken zum Auswählen'}
                  </div>
                  <div className="text-label text-gray-600">
                    Nur <strong>PDF</strong>, maximal 3 Seiten
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-editorial-secondary pointer-events-none mt-2"
                >
                  PDF vom Computer wählen
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-label font-condensed font-bold uppercase tracking-wide text-[#1F2937]">
                Angehängte Datei
              </div>

              {formData.files.length === 0 ? (
                <div className="p-4 border border-dashed border-gray-300 corner-cut text-center text-label text-gray-400">
                  Noch keine PDF hochgeladen.
                </div>
              ) : (
                <div className="space-y-2">
                  {formData.files.map((file) => (
                    <div
                      key={file.id}
                      className="p-3 bg-white border border-[#111827] corner-cut flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <span className={`${tagClass} bg-[#F07E26] text-white px-2 py-0.5 shrink-0`}>
                          ANGEHÄNGT
                        </span>
                        <FileText className="w-4 h-4 text-[#111827] shrink-0" />
                        <div className="truncate">
                          <div className="text-label font-condensed font-bold text-[#111827] truncate">
                            {file.name}
                          </div>
                          <div className="text-label font-condensed text-gray-500">
                            {formatFileSize(file.size)} • {file.uploadedAt}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(file.id);
                        }}
                        className="p-1.5 text-gray-500 hover:text-[#ba1a1a] hover:bg-gray-100 rounded-[20px] cursor-pointer"
                        title="Datei entfernen"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & SUBMIT */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-3">
              <h2 className="uppercase text-[#111827] text-h2">
                4. PRÜFUNG & VERBINDLICHE EINREICHUNG
              </h2>
              <p className="text-label text-gray-600">
                Bitte überprüfe deine Angaben vor dem finalen Absenden.
              </p>
            </div>

            <div className="bg-[#F8F9FA] border border-[#111827] corner-cut p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-label font-condensed">
                <div>
                  <span className="text-gray-500 uppercase font-bold">Projekttitel:</span>
                  <div className="text-h3 font-semibold text-[#111827]">{formData.projectName || '— Noch nicht ausgefüllt —'}</div>
                </div>
                <div>
                  <span className="text-gray-500 uppercase font-bold">Organisation / Team:</span>
                  <div className="font-bold text-[#111827]">{formData.organization || '—'} ({formData.legalForm})</div>
                </div>
                <div>
                  <span className="text-gray-500 uppercase font-bold">Ansprechpartner:in:</span>
                  <div className="font-bold text-[#111827]">{formData.contactName || '—'}</div>
                </div>
                <div>
                  <span className="text-gray-500 uppercase font-bold">Reifegrad:</span>
                  <div className="font-bold text-[#111827]">{formData.maturity}</div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 text-label">
                <span className="text-gray-500 uppercase font-bold font-condensed">Materialproblem:</span>
                <p className="text-gray-800 mt-1 italic">
                  „{formData.materialProblem || 'Keine Angabe hinterlegt'}“
                </p>
              </div>

              <div className="border-t border-gray-200 pt-2 text-label font-condensed flex items-center justify-between">
                <span className="text-gray-500 font-bold uppercase">PDF-Anhang:</span>
                <span className="font-condensed font-bold text-[#111827]">
                  {formData.files.length > 0 ? formData.files[0].name : 'Kein PDF hochgeladen'}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleCheckboxChange}
                  className="mt-1 accent-[#F07E26] w-4 h-4 cursor-pointer"
                />
                <span className="text-label text-gray-700 leading-normal">
                  Ich bestätige, dass die Urheber- und Nutzungsrechte an den eingereichten Unterlagen bei mir
                  bzw. meiner Organisation liegen und dass alle Angaben wahrheitsgemäß sind.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="agreedToDataPrivacy"
                  checked={formData.agreedToDataPrivacy}
                  onChange={handleCheckboxChange}
                  className="mt-1 accent-[#F07E26] w-4 h-4 cursor-pointer"
                />
                <span className="text-label text-gray-700 leading-normal">
                  Ich erkläre mich einverstanden mit der datenschutzkonformen Weitergabe der Unterlagen an
                  die Jury des <strong className="font-bold">RE:WARD</strong> Circular Challenge Leipzig und der Nennung des Projektnamens im
                  Falle einer Nominierung.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="pt-6 border-t border-[#111827] flex items-center justify-between gap-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => (prev - 1) as any)}
              className="btn-editorial-secondary"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Zurück</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => (prev + 1) as any)}
              className="btn-editorial-primary"
            >
              <span>Weiter zu Schritt 0{step + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!formData.agreedToTerms || !formData.agreedToDataPrivacy}
              className="btn-editorial-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4 text-[#FED27A]" />
              <span>Bewerbung jetzt verbindlich absenden</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
