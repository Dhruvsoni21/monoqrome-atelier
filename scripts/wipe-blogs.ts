import admin from 'firebase-admin';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
    });
}
const db = admin.firestore();

async function wipe() {
    console.log("Wiping all existing blogs from Firestore...");
    const snapshot = await db.collection('blogs').get();
    let count = 0;
    const batch = db.batch();
    snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
        count++;
    });
    await batch.commit();
    console.log(`Successfully deleted ${count} blogs.`);
}
wipe();
