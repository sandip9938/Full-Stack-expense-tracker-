import * as admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { join } from 'path';

// Firebase Admin SDK ko Node process mein sirf ek baar initialize karte hain.
if (admin.getApps().length === 0) {
  // Project root se Firebase service-account credentials load hote hain.
  const key = JSON.parse(
    readFileSync(join(process.cwd(), 'serviceAccountKey.json'), 'utf8'),
  );
  // Admin SDK is credential se Firebase ID tokens verify kar sakta hai.
  admin.initializeApp({ credential: admin.cert(key) });
}

// Initialized SDK export hota hai; auth guard ise token verification mein use karta hai.
export default admin;
