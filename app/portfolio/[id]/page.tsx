'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { constructionProjects } from '@/lib/portfolio';

export default function ProjectDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    // Find the project data
    const project = constructionProjects.find(p => p.id === id);

    if (!project) {
        notFound();
    }

    // Use images array if available, otherwise just main image
    const galleryImages = project.images || [project.image];

    // Lightbox Navigation
    const showNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setLightboxIndex((prev) =>
            prev === null ? null : (prev + 1) % galleryImages.length
        );
    }, [galleryImages.length]);

    const showPrev = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setLightboxIndex((prev) =>
            prev === null ? null : (prev - 1 + galleryImages.length) % galleryImages.length
        );
    }, [galleryImages.length]);

    // Keyboard support
    useEffect(() => {
        if (lightboxIndex === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLightboxIndex(null);
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex, showNext, showPrev]);

    return (
        <div className="min-h-screen bg-bg-grey">
            <Header />

            <main>
                {/* Hero Section */}
                <div className="relative bg-charcoal text-white py-20 md:py-32">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '40px 40px'
                        }}></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-2 text-sm text-light-grey mb-6">
                                <Link href="/" className="hover:text-aloe-green transition-colors">
                                    Home
                                </Link>
                                <span>/</span>
                                <Link href="/portfolio" className="hover:text-aloe-green transition-colors">
                                    Portfolio
                                </Link>
                                <span>/</span>
                                <span className="text-white line-clamp-1">{project.title}</span>
                            </div>

                            <div className="inline-block bg-aloe-green text-charcoal px-3 py-1 rounded text-sm font-bold mb-4">
                                {project.category}
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                {project.title}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <section className="py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-3 gap-12">

                            {/* Left Column: Gallery */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Main Image (Clickable) */}
                                <div
                                    className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:opacity-95 transition-opacity"
                                    onClick={() => setLightboxIndex(0)}
                                >
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
                                        <span className="bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                                            View Fullscreen
                                        </span>
                                    </div>
                                </div>

                                {/* Thumbnails Grid - Smaller as requested */}
                                {galleryImages.length > 1 && (
                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                        {galleryImages.map((img, index) => {
                                            // Skip if it is the main image (index 0 matches project.image usually, but galleryImages includes all)
                                            // Wait, logic: galleryImages = [main, ...others]. Or just [main] if logic used project.images which might include main.
                                            // Currently `project.images` usually includes main as first element in my generation script?
                                            // Let's check `lib/portfolio.ts`. It seems `images` includes ALL generated files.
                                            // And `image` is the Main file.
                                            // So `galleryImages[0]` is likely same as `project.image`.
                                            // I'll filter out index 0 if it's identical, OR just show all thumbnails including 0.
                                            // Showing all is fine, but duplicate of huge Hero image might be redundant.
                                            // User asked for "smaller images in portfolio section".
                                            // I'll skip index 0 in the thumbnail grid if it's the Hero.
                                            if (img === project.image && index === 0) return null;

                                            return (
                                                <div
                                                    key={index}
                                                    className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border-2 border-transparent hover:border-aloe-green"
                                                    onClick={() => setLightboxIndex(index)}
                                                >
                                                    <Image
                                                        src={img}
                                                        alt={`${project.title} detail ${index + 1}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Right Column: Project Details */}
                            <div className="space-y-8">
                                <div className="bg-white p-8 rounded-lg shadow-sm">
                                    <h3 className="text-xl font-bold text-charcoal mb-4">Project Overview</h3>
                                    <div className="space-y-4 text-medium-grey" dangerouslySetInnerHTML={{ __html: project.content || project.description }} />

                                    <div className="border-t border-border-grey my-6"></div>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-bold text-charcoal text-sm">Client</h4>
                                            <p className="text-medium-grey">{project.client}</p>
                                        </div>
                                        {project.location && (
                                            <div>
                                                <h4 className="font-bold text-charcoal text-sm">Location</h4>
                                                <p className="text-medium-grey">{project.location}</p>
                                            </div>
                                        )}
                                        {project.date && (
                                            <div>
                                                <h4 className="font-bold text-charcoal text-sm">Year</h4>
                                                <p className="text-medium-grey">{project.date}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {(project.challenge || project.solution) && (
                                    <div className="bg-white p-8 rounded-lg shadow-sm space-y-6">
                                        {project.challenge && (
                                            <div>
                                                <h3 className="text-lg font-bold text-charcoal mb-2">The Challenge</h3>
                                                <p className="text-medium-grey text-sm">{project.challenge}</p>
                                            </div>
                                        )}
                                        {project.solution && (
                                            <div>
                                                <h3 className="text-lg font-bold text-charcoal mb-2">Our Solution</h3>
                                                <p className="text-medium-grey text-sm">{project.solution}</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="bg-charcoal text-white p-8 rounded-lg text-center">
                                    <h3 className="text-xl font-bold mb-4">Need something similar?</h3>
                                    <p className="text-light-grey mb-6 text-sm">
                                        Let&apos;s discuss how we can help your business stand out.
                                    </p>
                                    <Link
                                        href="/contact"
                                        className="block w-full py-3 bg-aloe-green text-charcoal font-bold rounded hover:bg-green-hover transition-colors"
                                    >
                                        Get a Quote
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Lightbox Overlay */}
            {lightboxIndex !== null && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setLightboxIndex(null)}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setLightboxIndex(null)}
                        className="absolute top-4 right-4 text-white hover:text-aloe-green p-2 z-50 transition-colors"
                        aria-label="Close lightbox"
                    >
                        <X size={32} />
                    </button>

                    {/* Navigation Buttons */}
                    <button
                        onClick={showPrev}
                        className="absolute left-2 md:left-8 text-white hover:text-aloe-green p-2 z-50 transition-colors bg-black/20 hover:bg-black/40 rounded-full"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={48} />
                    </button>
                    <button
                        onClick={showNext}
                        className="absolute right-2 md:right-8 text-white hover:text-aloe-green p-2 z-50 transition-colors bg-black/20 hover:bg-black/40 rounded-full"
                        aria-label="Next image"
                    >
                        <ChevronRight size={48} />
                    </button>

                    {/* Image Container */}
                    <div
                        className="relative w-full max-w-7xl h-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image area (optional, or allow close)
                    >
                        <div className="relative w-full h-[85vh] md:h-[90vh]">
                            <Image
                                src={galleryImages[lightboxIndex]}
                                alt={`${project.title} - View ${lightboxIndex + 1}`}
                                fill
                                className="object-contain"
                                priority
                                quality={90}
                            />
                        </div>

                        {/* Caption / Counter */}
                        <div className="absolute bottom-4 left-0 right-0 text-center text-white/80 pointer-events-none">
                            <span className="bg-black/50 px-3 py-1 rounded-full text-sm">
                                {lightboxIndex + 1} / {galleryImages.length}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
