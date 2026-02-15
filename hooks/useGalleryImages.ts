import { useState, useEffect } from 'react';

export function useGalleryImages() {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch('/api/images');
                const data = await res.json();
                if (data.images) {
                    setImages(data.images);
                }
            } catch (error) {
                console.error('Failed to fetch gallery images:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    return { images, loading };
}
