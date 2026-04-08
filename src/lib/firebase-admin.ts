import admin from 'firebase-admin';

// Make sure we haven't already initialized an app
if (!admin.apps.length) {
    try {
        let pk = process.env.FIREBASE_PRIVATE_KEY || '';
        // Strip quotes if vercel added them
        pk = pk.replace(/^"|"$/g, '');
        // Replace literal \n and \r
        pk = pk.replace(/\\n/g, '\n').replace(/\\r/g, '\r');

        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: pk,
            }),
        });
    } catch (error) {
        console.error('Firebase admin initialization error:', error);
    }
}

// Safely export db, this avoids an instant module-level crash if env vars are wrong
const db = admin.apps.length ? admin.firestore() : null;

// Helper to throw a descriptive error if accessed incorrectly
export const getDb = () => {
    if (!db) {
        throw new Error("Firebase Admin is not initialized. Please check your Vercel Environment Variables: FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL, and FIREBASE_PROJECT_ID (ensure the key is formatted correctly with newlines).");
    }
    return db;
};

export { db, admin };

