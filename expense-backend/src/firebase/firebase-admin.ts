import * as admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { join } from 'path';
if (admin.getApps().length === 0) {
  const key = JSON.parse(
    readFileSync(join(process.cwd(), 'serviceAccountKey.json'), 'utf8'),
  );
  admin.initializeApp({ credential: admin.cert(key) });
}
export default admin;
