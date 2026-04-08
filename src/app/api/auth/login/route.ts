import { NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        // Query Firestore for matching credentials
        const db = getDb();
        const credsSnapshot = await db.collection('credentials')
            .where('ID', '==', username)
            .where('PASSWORD', '==', password)
            .get();

        if (credsSnapshot.empty) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Set secure HTTP-only cookie
        const cookieStore = await cookies();
        cookieStore.set('admin_session', 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
