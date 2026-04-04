import admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// Load env variables manually since we might be running this isolated
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

async function migrate() {
    try {
        const dataPath = path.join(process.cwd(), 'src', 'data', 'blogs.json');

        if (!fs.existsSync(dataPath)) {
            console.log("No existing blogs.json found. Skipping migration.");
            return;
        }

        const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

        console.log(`Found ${data.length} blogs to migrate...`);

        for (const blog of data) {
            const blogId = blog.id || require('crypto').randomUUID();

            // Format dates or add missing standard fields if needed
            const blogData = {
                ...blog,
                id: blogId,
                createdAt: blog.createdAt || new Date().toISOString()
            };

            await db.collection('blogs').doc(blogId).set(blogData);
            console.log(`Migrated: ${blogData.title}`);
        }

        console.log("\nMigration complete! 🎉");

        // Let's rename the old file to show it's deprecated but keep it as a backup
        fs.renameSync(dataPath, dataPath + '.backup');
        console.log("Renamed src/data/blogs.json to src/data/blogs.json.backup");

    } catch (err) {
        console.error("Migration failed:", err);
    }
}

migrate();
