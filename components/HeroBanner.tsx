'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
    {
        id: 1,
        title: 'Signage that builds businesses',
        description: 'We design, manufacture, and install everything in-house. From a single vehicle wrap to a complete building signage programme—we handle it end-to-end.',
        primaryCTA: { text: 'Get a Quote', href: '/get-quote' },
        secondaryCTA: { text: 'Shop Signs', href: '/shop' },
        location: 'Based in Gauteng, serving all of South Africa'
    },
    {
        id: 2,
        title: 'Professional Signage Services',
        description: 'From vehicle branding to building signage, shopfronts to large format printing—we offer comprehensive signage solutions for businesses of all sizes.',
        primaryCTA: { text: 'View Services', href: '/services/vehicle-branding' },
        secondaryCTA: { text: 'Contact Us', href: '/contact' },
        location: 'End-to-end service with in-house capabilities'
    },
    {
        id: 3,
        title: 'Shop Ready-Made Signs Online',
        description: 'Browse our online shop for estate agent boards, safety signs, parking signs, and more. Quality signage delivered to your door with special offers available.',
        primaryCTA: { text: 'Shop Now', href: '/shop' },
        secondaryCTA: { text: 'View Specials', href: '/shop' },
        location: 'Fast delivery nationwide'
    }
];

export default function HeroBanner() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        fetch('/api/images?folder=banner')
            .then(res => res.json())
            .then(data => {
                if (data.images && data.images.length > 0) {
                    setImages(data.images);
                }
            })
            .catch(err => console.error(err));
    }, []);

    // Auto-advance slides every 6 seconds
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        // Resume auto-play after 10 seconds
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const activeSlide = slides[currentSlide];

    // Get a random image for the slide if available, otherwise fallback
    // Use modulo to cycle through images based on slide ID to keep it consistent per session?
    // Or just random? Consistent is better.
    const bgImage = images.length > 0
        ? images[currentSlide % images.length]
        : '/images/hero-banner.jpg';

    return (
        <section className="relative h-[600px] bg-charcoal">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    opacity: 0.4
                }}
            />

            {/* Dark Overlay - Reduced opacity as requested */}
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 to-charcoal/50" />

            {/* Content */}
            <div className="relative h-full max-w-[1400px] mx-auto px-6 flex flex-col justify-center">
                <div className="max-w-3xl">
                    {/* Animated slide content */}
                    <div
                        key={activeSlide.id}
                        className="animate-fadeIn"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            {activeSlide.title}
                        </h1>

                        <p className="text-xl text-white/90 mb-8 leading-relaxed">
                            {activeSlide.description}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 mb-8">
                            <Link
                                href={activeSlide.primaryCTA.href}
                                className="px-8 py-4 bg-aloe-green text-charcoal font-semibold rounded hover:bg-green-hover transition-colors text-lg"
                            >
                                {activeSlide.primaryCTA.text}
                            </Link>
                            <Link
                                href={activeSlide.secondaryCTA.href}
                                className="px-8 py-4 border-2 border-white text-white font-semibold rounded hover:bg-white hover:text-charcoal transition-colors text-lg"
                            >
                                {activeSlide.secondaryCTA.text}
                            </Link>
                        </div>

                        <p className="text-white/80 text-sm">
                            {activeSlide.location}
                        </p>
                    </div>
                </div>

                {/* Dot Navigation */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
                    {slides.map((slide, index) => (
                        <button
                            key={slide.id}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                ? 'bg-aloe-green w-8'
                                : 'bg-white/40 hover:bg-white/60'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
