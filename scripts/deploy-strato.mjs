// Baut die Seite und lädt den dist/-Ordner per FTP(S) zu Strato hoch.
// Zugangsdaten kommen aus .env.local (nie committen):
//   STRATO_FTP_HOST=ftp.deinedomain.de
//   STRATO_FTP_USER=dein-ftp-benutzername
//   STRATO_FTP_PASSWORD=dein-ftp-passwort
//   STRATO_FTP_REMOTE_DIR=/ (Zielordner im Webspace, meist "/" oder "/htdocs")
//   STRATO_FTP_SECURE=true (auf "false" setzen, falls Strato kein FTPS anbietet)
//
// Aufruf: npm run deploy:strato

import { config as loadEnv } from 'dotenv';
import * as ftp from 'basic-ftp';
import path from 'path';
import { existsSync } from 'fs';

loadEnv({ quiet: true });
loadEnv({ path: '.env.local', override: true, quiet: true });

const {
  STRATO_FTP_HOST,
  STRATO_FTP_USER,
  STRATO_FTP_PASSWORD,
  STRATO_FTP_REMOTE_DIR,
  STRATO_FTP_SECURE,
} = process.env;

if (!STRATO_FTP_HOST || !STRATO_FTP_USER || !STRATO_FTP_PASSWORD) {
  console.error(
    'Fehlende FTP-Zugangsdaten. Bitte in .env.local setzen: STRATO_FTP_HOST, STRATO_FTP_USER, STRATO_FTP_PASSWORD.'
  );
  process.exit(1);
}

const localDir = path.resolve('dist');
if (!existsSync(localDir)) {
  console.error('dist/ nicht gefunden. Bitte zuerst "npm run build" ausführen (macht "npm run deploy:strato" automatisch).');
  process.exit(1);
}

const remoteDir = STRATO_FTP_REMOTE_DIR && STRATO_FTP_REMOTE_DIR.trim() !== '' ? STRATO_FTP_REMOTE_DIR : '/';
const secure = STRATO_FTP_SECURE !== 'false';

const client = new ftp.Client();
client.ftp.verbose = true;

try {
  console.log(`Verbinde mit ${STRATO_FTP_HOST} (FTPS: ${secure}) ...`);
  await client.access({
    host: STRATO_FTP_HOST,
    user: STRATO_FTP_USER,
    password: STRATO_FTP_PASSWORD,
    secure,
  });

  console.log(`Lade dist/ nach ${remoteDir} hoch ...`);
  await client.ensureDir(remoteDir);
  await client.uploadFromDir(localDir);

  console.log('Deploy abgeschlossen.');
} catch (err) {
  console.error('Deploy fehlgeschlagen:', err);
  process.exitCode = 1;
} finally {
  client.close();
}
