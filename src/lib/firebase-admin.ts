import admin from 'firebase-admin';

// Make sure we haven't already initialized an app
if (!admin.apps.length) {
    try {
        let pk = process.env.FIREBASE_PRIVATE_KEY || '';
        // If Vercel wrapped the key in quotes, strip them
        pk = pk.replace(/^"|"$/g, '');
        // Convert literal \n strings to actual newlines
        pk = pk.replace(/\\n/g, '\n');

        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: pk,
            }),
        });
    } catch (error) {
        console.error('Firebase admin initialization error', error);
    }
}

// We will use Firestore as our database
const db = admin.firestore();

export { db, admin };
