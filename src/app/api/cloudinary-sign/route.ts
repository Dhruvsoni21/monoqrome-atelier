import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { paramsToSign } = body;
        const timestamp = Math.round(new Date().getTime() / 1000);

        const signature = cloudinary.utils.api_sign_request(
            { ...paramsToSign, timestamp },
            process.env.CLOUDINARY_API_SECRET as string
        );

        return NextResponse.json({ 
            signature,
            timestamp,
            apiKey: process.env.CLOUDINARY_API_KEY,
            cloudName: process.env.CLOUDINARY_CLOUD_NAME
        });
    } catch (error) {
        console.error('Error generating signature', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
