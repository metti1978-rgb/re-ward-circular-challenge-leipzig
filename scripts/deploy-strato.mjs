// Baut die Seite und lädt den dist/-Ordner per SFTP zu Strato hoch.
// Zugangsdaten kommen aus .env.local (nie committen):
//   STRATO_FTP_HOST=5159127.ssh.w1.strato.hosting
//   STRATO_FTP_USER=dein-ftp-benutzername
//   STRATO_FTP_PASSWORD=dein-ftp-passwort
//   STRATO_FTP_REMOTE_DIR=/ReWard (Zielordner im Webspace)
//   STRATO_FTP_PORT=22 (optional, Standard ist 22)
//
// Aufruf: npm run deploy:strato

import { config as loadEnv } from 'dotenv';
import SftpClient from 'ssh2-sftp-client';
import path from 'path';
import { existsSync } from 'fs';

loadEnv({ quiet: true });
loadEnv({ path: '.env.local', override: true, quiet: true });

const {
  STRATO_FTP_HOST,
  STRATO_FTP_USER,
  STRATO_FTP_PASSWORD,
  STRATO_FTP_REMOTE_DIR,
  STRATO_FTP_PORT,
} = process.env;

if (!STRATO_FTP_HOST || !STRATO_FTP_USER || !STRATO_FTP_PASSWORD) {
  console.error(
    'Fehlende Zugangsdaten. Bitte in .env.local setzen: STRATO_FTP_HOST, STRATO_FTP_USER, STRATO_FTP_PASSWORD.'
  );
  process.exit(1);
}

const localDir = path.resolve('dist');
if (!existsSync(localDir)) {
  console.error('dist/ nicht gefunden. Bitte zuerst "npm run build" ausführen (macht "npm run deploy:strato" automatisch).');
  process.exit(1);
}

const remoteDir = STRATO_FTP_REMOTE_DIR && STRATO_FTP_REMOTE_DIR.trim() !== '' ? STRATO_FTP_REMOTE_DIR : '/';
const port = STRATO_FTP_PORT ? Number(STRATO_FTP_PORT) : 22;

const sftp = new SftpClient();

try {
  console.log(`Verbinde per SFTP mit ${STRATO_FTP_HOST}:${port} ...`);
  await sftp.connect({
    host: STRATO_FTP_HOST,
    port,
    username: STRATO_FTP_USER,
    password: STRATO_FTP_PASSWORD,
  });

  console.log(`Lade dist/ nach ${remoteDir} hoch ...`);
  await sftp.mkdir(remoteDir, true);
  await sftp.uploadDir(localDir, remoteDir, {
    filter: (itemPath) => path.basename(itemPath) !== '.DS_Store',
  });

  console.log('Deploy abgeschlossen.');
} catch (err) {
  console.error('Deploy fehlgeschlagen:', err.message || err);
  process.exitCode = 1;
} finally {
  await sftp.end();
}
