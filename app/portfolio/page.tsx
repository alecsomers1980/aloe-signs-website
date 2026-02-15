'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { constructionProjects, portfolioCategories } from '@/lib/portfolio';

// Since this page is just a gallery, we don't need metadata here if it's a client component?
// But usually page.tsx can export metadata if it's a server component.
// The file I saw was 'use client' at the top.
// I will reproduce the content exactly as I saw it, but clean.

export default function GallerySection() {
    const [images, setImages] = useState<string[]>([]);
    const [visibleCount, setVisibleCount] = useState(12);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch images on mount
    useEffect(() => {
        fetch('/api/images?folder=portfolio')
            .then(res => res.json())
            .then(data => {
                if (data.images) {
                    setImages(data.images);
                }
            })
            .catch(err => console.error(err))
            .finally(() => setIsLoading(false));
    }, []);

    const visibleImages = images.slice(0, visibleCount);

    if (images.length === 0 && !isLoading) return null;

    return (
        <section className="py-20 bg-charcoal text-white">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Construction Gallery</h2>
                    <p className="text-light-grey max-w-2xl mx-auto">
                        A closer look at our recent installations and workshop activities.
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-aloe-green border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                            {visibleImages.map((src, idx) => (
                                <div key={idx} className="break-inside-avoid relative group rounded-lg overflow-hidden bg-gray-800">
                                    <Image
                                        src={src}
                                        alt={`Gallery Image ${idx + 1}`}
                                        width={600}
                                        height={400}
                                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>

                        {visibleCount < images.length && (
                            <div className="text-center mt-12">
                                <button
                                    onClick={() => setVisibleCount(prev => prev + 12)}
                                    className="px-8 py-3 border border-aloe-green text-aloe-green font-semibold rounded hover:bg-aloe-green hover:text-charcoal transition-colors"
                                >
                                    Load More Photos
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
