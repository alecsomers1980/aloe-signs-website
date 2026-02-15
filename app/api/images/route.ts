import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const folder = searchParams.get('folder') || 'gallery';

        // Prevent directory traversal
        if (folder.includes('..') || folder.includes('/') || folder.includes('\\')) {
            return NextResponse.json({ error: 'Invalid folder' }, { status: 400 });
        }

        const galleryDir = path.join(process.cwd(), 'public', 'images', folder);

        if (!fs.existsSync(galleryDir)) {
            // For portfolio, maybe we want to scan recursively? 
            // For now, let's just return empty if not found, or try to handle subdirectories if it's meant to be recursive
            // Actually, for portfolio page, we might want 'portfolio' folder which has subfolders.
            // But the script outputs to public/images/portfolio as a flat list? 
            // My script: path.join(outputBase, 'portfolio', `${slug}-1.jpg`) -> This is flat!
            // So flat is fine.
            return NextResponse.json({ images: [] });
        }

        const files = fs.readdirSync(galleryDir);

        // Filter for images
        const images = files
            .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
            .map(file => `/images/${folder}/${file}`)
            // Sort by filename
            .sort();

        return NextResponse.json({ images });
    } catch (error) {
        console.error('Error listing images:', error);
        return NextResponse.json({ error: 'Failed to list images' }, { status: 500 });
    }
}
