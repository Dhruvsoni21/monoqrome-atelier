import admin from 'firebase-admin';

// Make sure we haven't already initialized an app
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                // Netlify and Vercel sometimes escape the newline characters, so we need to handle that safely:
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
        });
    } catch (error) {
        console.error('Firebase admin initialization error', error);
    }
}

// We will use Firestore as our database
const db = admin.firestore();

export { db, admin };
