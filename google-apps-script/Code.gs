/**
 * RE\WARD Bewerbungsformular — Google Apps Script Web App
 *
 * Nimmt Einreichungen vom Bewerbungsformular entgegen und legt sie in Google
 * Drive ab: pro Einreichung ein Ordner (fortlaufende Nummer_Datum_Projekttitel)
 * mit der hochgeladenen PDF + einem formatierten Formulardaten-Sheet, sowie
 * eine Zeile in einem zentralen Master-Sheet im Hauptordner.
 *
 * SETUP (siehe Chat für die ausführliche Anleitung):
 * 1. Neues Projekt auf https://script.google.com anlegen, diesen Code einfügen.
 * 2. SECRET_TOKEN unten durch einen eigenen langen Zufallswert ersetzen
 *    (z. B. per Terminal: openssl rand -hex 24) und denselben Wert als
 *    VITE_GAS_TOKEN in der Website-.env.local eintragen.
 * 3. "Bereitstellen" -> "Neue Bereitstellung" -> Typ "Web App".
 *    Ausführen als: "Ich". Zugriff: "Jeder".
 * 4. Die Web-App-URL (endet auf /exec) als VITE_GAS_ENDPOINT in der
 *    Website-.env.local eintragen.
 * 5. Optional: ROOT_FOLDER_ID setzen, um einen bestehenden Drive-Ordner
 *    (z. B. einen geteilten Ordner) statt eines neu angelegten zu nutzen.
 */

const SECRET_TOKEN = 'HIER_EIGENES_LANGES_ZUFALLS_TOKEN_EINTRAGEN';
const ROOT_FOLDER_NAME = 'RE_WARD Bewerbungen';
const ROOT_FOLDER_ID = ''; // optional: bestehende Ordner-ID statt Name-Suche/Neuanlage

const MASTER_SHEET_NAME = 'RE_WARD Master-Übersicht';

const FIELD_LABELS = {
  projectName: 'Projekttitel',
  organization: 'Organisation / Team',
  legalForm: 'Rechtsform / Organisationsform',
  contactName: 'Ansprechpartner:in',
  email: 'E-Mail',
  leipzigConnection: 'Bezug zu Leipzig',
  materialProblem: 'Materialproblem',
  customer: 'Kunde / Geschäftsmodell',
  maturity: 'Reifegrad',
};

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const body = JSON.parse(e.postData.contents);

    if (!SECRET_TOKEN || SECRET_TOKEN.indexOf('HIER_EIGENES') === 0) {
      return jsonOutput({ ok: false, error: 'Skript ist noch nicht konfiguriert (SECRET_TOKEN fehlt).' });
    }
    if (body.token !== SECRET_TOKEN) {
      return jsonOutput({ ok: false, error: 'unauthorized' });
    }

    const data = body.data || {};
    const rootFolder = getOrCreateRootFolder();
    const masterSheet = getOrCreateMasterSheet(rootFolder);

    const seq = getNextSequenceNumber();
    const seqPadded = ('0000' + seq).slice(-4);
    const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
    const safeTitle = sanitizeForName(data.projectName || 'Ohne-Titel');

    const submissionFolder = rootFolder.createFolder(seqPadded + '_' + today + '_' + safeTitle);

    let pdfUrl = '';
    if (body.pdf && body.pdf.base64) {
      const bytes = Utilities.base64Decode(body.pdf.base64);
      const blob = Utilities.newBlob(bytes, body.pdf.type || 'application/pdf', body.pdf.name || 'einreichung.pdf');
      const pdfFile = submissionFolder.createFile(blob);
      pdfUrl = pdfFile.getUrl();
    }

    createSubmissionSheet(submissionFolder, seqPadded, today, data, pdfUrl);
    appendToMasterSheet(masterSheet, seqPadded, today, data, pdfUrl, submissionFolder.getUrl());

    return jsonOutput({ ok: true, id: 'REWARD-2026-' + seqPadded, folderUrl: submissionFolder.getUrl() });
  } catch (err) {
    return jsonOutput({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function getNextSequenceNumber() {
  const props = PropertiesService.getScriptProperties();
  const current = parseInt(props.getProperty('lastSeq') || '0', 10);
  const next = current + 1;
  props.setProperty('lastSeq', String(next));
  return next;
}

function getOrCreateRootFolder() {
  if (ROOT_FOLDER_ID) {
    return DriveApp.getFolderById(ROOT_FOLDER_ID);
  }
  const existing = DriveApp.getFoldersByName(ROOT_FOLDER_NAME);
  if (existing.hasNext()) return existing.next();
  return DriveApp.createFolder(ROOT_FOLDER_NAME);
}

function getOrCreateMasterSheet(rootFolder) {
  const files = rootFolder.getFilesByName(MASTER_SHEET_NAME);
  if (files.hasNext()) {
    return SpreadsheetApp.open(files.next());
  }
  const ss = SpreadsheetApp.create(MASTER_SHEET_NAME);
  moveFileIntoFolder(ss.getId(), rootFolder);
  const sheet = ss.getSheets()[0];
  const headers = ['Nr.', 'Datum'].concat(Object.keys(FIELD_LABELS).map((k) => FIELD_LABELS[k])).concat(['PDF', 'Ordner']);
  sheet.appendRow(headers);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#111827').setFontColor('#ffffff');
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
  return ss;
}

function appendToMasterSheet(ss, seqPadded, date, data, pdfUrl, folderUrl) {
  const sheet = ss.getSheets()[0];
  const row = [seqPadded, date].concat(
    Object.keys(FIELD_LABELS).map((key) => data[key] || '')
  );
  row.push(pdfUrl ? '=HYPERLINK("' + pdfUrl + '";"PDF öffnen")' : '');
  row.push('=HYPERLINK("' + folderUrl + '";"Ordner öffnen")');
  sheet.appendRow(row);
}

function createSubmissionSheet(folder, seqPadded, date, data, pdfUrl) {
  const ss = SpreadsheetApp.create(seqPadded + ' – Formulardaten');
  moveFileIntoFolder(ss.getId(), folder);
  const sheet = ss.getSheets()[0];
  sheet.setName('Formulardaten');

  const rows = [
    ['Einreichungs-Nr.', seqPadded],
    ['Datum', date],
  ];
  Object.keys(FIELD_LABELS).forEach((key) => {
    rows.push([FIELD_LABELS[key], data[key] || '']);
  });
  if (pdfUrl) {
    rows.push(['PDF', pdfUrl]);
  }

  sheet.getRange(1, 1, rows.length, 2).setValues(rows);
  sheet.getRange(1, 1, rows.length, 1).setFontWeight('bold').setBackground('#F8F9FA');
  sheet.setColumnWidth(1, 220);
  sheet.setColumnWidth(2, 520);
  for (let r = 1; r <= rows.length; r++) {
    sheet.getRange(r, 2).setWrap(true);
  }
  sheet.setFrozenColumns(1);
}

function moveFileIntoFolder(fileId, folder) {
  const file = DriveApp.getFileById(fileId);
  folder.addFile(file);
  DriveApp.getRootFolder().removeFile(file);
}

function sanitizeForName(text) {
  const cleaned = String(text)
    .trim()
    .replace(/[\\/:*?"<>|]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60);
  return cleaned || 'Ohne-Titel';
}
