import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'projects.json');

async function ensureDir() {
    const dir = path.dirname(dataFilePath);
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }
}

async function readData() {
    try {
        await ensureDir();
        const data = await fs.readFile(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist or is invalid, return empty array
        return [];
    }
}

export async function GET() {
    try {
        const data = await readData();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const newData = await req.json();
        const existingData = await readData();

        // Ensure id exists
        if (!newData.id) {
            newData.id = crypto.randomUUID();
        }

        const updatedData = [...existingData, newData];
        await fs.writeFile(dataFilePath, JSON.stringify(updatedData, null, 4), 'utf8');

        return NextResponse.json(newData, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const newData = await req.json();
        const existingData = await readData();

        if (!newData.id) {
            return NextResponse.json({ error: 'Missing id for update' }, { status: 400 });
        }

        const index = existingData.findIndex((p: any) => p.id === newData.id);
        if (index === -1) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        existingData[index] = { ...existingData[index], ...newData };
        await fs.writeFile(dataFilePath, JSON.stringify(existingData, null, 4), 'utf8');

        return NextResponse.json(existingData[index], { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ error: 'Missing id for delete' }, { status: 400 });
        }
        
        const existingData = await readData();
        const updatedData = existingData.filter((p: any) => p.id !== id);

        await fs.writeFile(dataFilePath, JSON.stringify(updatedData, null, 4), 'utf8');
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
    }
}
