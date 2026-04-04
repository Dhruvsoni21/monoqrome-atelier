import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { JSDOM } from 'jsdom';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
    try {
        const blogsSnapshot = await db.collection('blogs').orderBy('createdAt', 'desc').get();
        const blogs = blogsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return NextResponse.json(blogs);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const newData = await req.json();

        // 1. Process Content to Auto-Generate Table of Contents
        let processedContent = newData.content || "";
        const tableOfContents: { id: string, title: string }[] = [];

        if (processedContent) {
            const dom = new JSDOM(processedContent);
            const document = dom.window.document;
            const h2Tags = document.querySelectorAll('h2');

            h2Tags.forEach((h2Node: any) => {
                const h2 = h2Node;
                const title = h2.textContent?.trim() || "Section";
                // Generate a reliable ID slug
                const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

                // Set the ID on the actual element in the HTML
                h2.setAttribute('id', id);

                // Add to our TOC tracking array
                tableOfContents.push({ id, title });
            });

            // Re-serialize the modified HTML back to a string
            processedContent = document.body.innerHTML;
        }

        // 2. Ensure id exists
        const blogId = newData.id || uuidv4();

        // 3. Assemble final data object
        const blogData = {
            ...newData,
            content: processedContent, // use the version with the injected IDs
            tableOfContents: tableOfContents,
            id: blogId,
            createdAt: new Date().toISOString()
        };

        // 4. Save to Firestore
        await db.collection('blogs').doc(blogId).set(blogData);

        return NextResponse.json(blogData, { status: 201 });
    } catch (error) {
        console.error("DEBUG - API POST ERROR:", error);
        const errorMessage = (error as Error).message || "Unknown error";
        return NextResponse.json({ error: `Server error: ${errorMessage}` }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const updatedData = await req.json();
        
        if (!updatedData.id) {
            return NextResponse.json({ error: 'Missing blog id' }, { status: 400 });
        }

        let processedContent = updatedData.content || "";
        const tableOfContents: { id: string, title: string }[] = [];

        if (processedContent) {
            const dom = new JSDOM(processedContent);
            const document = dom.window.document;
            const h2Tags = document.querySelectorAll('h2');

            h2Tags.forEach((h2Node: any) => {
                const h2 = h2Node;
                const title = h2.textContent?.trim() || "Section";
                const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                h2.setAttribute('id', id);
                tableOfContents.push({ id, title });
            });

            processedContent = document.body.innerHTML;
        }

        const blogData = {
            ...updatedData,
            content: processedContent,
            tableOfContents: tableOfContents,
            updatedAt: new Date().toISOString()
        };

        await db.collection('blogs').doc(updatedData.id).update(blogData);
        return NextResponse.json(blogData, { status: 200 });
    } catch (error) {
        console.error("DEBUG - API PUT ERROR:", error);
        const errorMessage = (error as Error).message || "Unknown error";
        return NextResponse.json({ error: `Server update error: ${errorMessage}` }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ error: 'Missing blog id' }, { status: 400 });
        }

        await db.collection('blogs').doc(id).delete();
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error deleting blog:", error);
        return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
    }
}
