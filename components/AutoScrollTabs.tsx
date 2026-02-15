'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const services = [
    {
        id: 'vehicle-branding',
        name: 'Vehicle Branding',
        description: 'Transform your vehicles into powerful mobile billboards. Our expert team designs, prints, and installs high-quality vehicle wraps that turn heads and build brand awareness wherever you drive.',
        features: [
            'Full and partial wraps',
            'Premium 3M and Avery materials',
            'Professional installation',
            '5-year warranty',
            'Fleet programmes available'
        ],
        image: '/images/services/vehicle-branding.jpg?v=2'
    },
    {
        id: 'building-signage',
        name: 'Building Signage',
        // ... (truncated for brevity in diff, but replace entire block if needed or verify context)
        description: 'Make your building work for your brand with professional illuminated and non-illuminated signage. We create eye-catching building signs that establish your presence and attract customers.',
        features: [
            'Illuminated channel letters',
            'Fascia signage',
            'Pylon signs',
            'Professional installation',
            'Maintenance services'
        ],
        image: '/images/services/building-signage.jpg?v=2'
    },
    {
        id: 'shopfronts',
        name: 'Shopfronts',
        description: 'First impressions matter. Our shopfront solutions combine stunning design with durable materials to create an inviting entrance that converts foot traffic into customers.',
        features: [
            'Window graphics',
            'Storefront signage',
            'A-frames and pavement signs',
            'Custom designs',
            'Weather-resistant materials'
        ],
        image: '/images/services/shopfronts.jpg?v=2'
    },
    {
        id: 'wayfinding-interior',
        name: 'Wayfinding & Interior',
        description: 'Guide your visitors with style. Our wayfinding and interior signage solutions help people navigate your space while reinforcing your brand identity.',
        features: [
            'Directional signage',
            'Room identification',
            'Floor graphics',
            'Wall murals',
            'ADA compliant options'
        ],
        image: '/images/services/wayfinding.jpg'
    },
    {
        id: 'billboards-outdoor',
        name: 'Billboards & Outdoor',
        description: 'Maximum visibility, maximum impact. Our large-scale outdoor advertising solutions put your message in front of thousands of potential customers every day.',
        features: [
            'Billboard design and installation',
            'Outdoor banners',
            'Mesh banners',
            'Site surveys',
            'Nationwide coverage'
        ],
        image: '/images/services/billboards.jpg'
    },
    {
        id: 'large-format-print',
        name: 'Large Format Print',
        description: 'Big ideas need big prints. From construction wraps to event banners, our large format printing capabilities ensure your message stands out at any scale.',
        features: [
            'Building wraps',
            'Construction mesh',
            'Event branding',
            'Wallpapers',
            'High-resolution printing'
        ],
        image: '/images/services/large-format.jpg'
    },
    {
        id: 'screen-printing',
        name: 'Screen Printing',
        description: 'High-quality custom printing for promotional products, apparel, and more. Perfect for events, corporate branding, and merchandise.',
        features: [
            'T-shirts and apparel',
            'Promotional products',
            'Bulk orders',
            'Custom designs',
            'Fast turnaround'
        ],
        image: '/images/services/screen-printing.jpg'
    },
    {
        id: 'set-building',
        name: 'Set Building',
        description: 'Bringing your vision to life. Our experienced team creates custom sets and displays for events, exhibitions, and productions.',
        features: [
            'Custom set design',
            'Exhibition stands',
            'Event displays',
            'Props and backdrops',
            'Installation and breakdown'
        ],
        image: '/images/services/set-building.jpg'
    }
];

export default function AutoScrollTabs() {
    const [activeTab, setActiveTab] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const AUTO_SCROLL_DURATION = 7000; // 7 seconds

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    setActiveTab((current) => (current + 1) % services.length);
                    return 0;
                }
                return prev + (100 / (AUTO_SCROLL_DURATION / 100));
            });
        }, 100);

        return () => clearInterval(interval);
    }, [isPaused]);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
        setProgress(0);
        setIsPaused(true);

        // Resume auto-scroll after 3 seconds of inactivity
        setTimeout(() => setIsPaused(false), 3000);
    };

    const activeService = services[activeTab];

    return (
        <section className="py-12 bg-white">
            <div className="max-w-[1400px] mx-auto px-6">
                <h2 className="text-3xl font-bold text-charcoal text-center mb-8">
                    Our Services
                </h2>

                {/* Tab Navigation */}
                <div
                    className="flex overflow-x-auto gap-1 mb-6 pb-2 scrollbar-hide"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {services.map((service, index) => (
                        <button
                            key={service.id}
                            onClick={() => handleTabClick(index)}
                            className={`relative px-4 py-2 whitespace-nowrap text-sm font-medium transition-colors ${activeTab === index
                                ? 'text-charcoal'
                                : 'text-medium-grey hover:text-charcoal'
                                }`}
                        >
                            {service.name}

                            {/* Active indicator */}
                            {activeTab === index && (
                                <>
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-aloe-green" />
                                    <div
                                        className="absolute bottom-0 left-0 h-0.5 bg-aloe-green opacity-50 transition-all duration-100"
                                        style={{ width: `${progress}%` }}
                                    />
                                </>
                            )}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="grid lg:grid-cols-[60%_40%] gap-6 items-start">
                    {/* Left: Image */}
                    <div className="relative aspect-[4/3] bg-bg-grey rounded overflow-hidden">
                        <Image
                            src={activeService.image}
                            alt={activeService.name}
                            fill
                            className="object-cover transition-opacity duration-500"
                            priority
                        />
                    </div>

                    {/* Right: Content */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-charcoal">
                            {activeService.name}
                        </h3>

                        <p className="text-medium-grey text-sm leading-relaxed">
                            {activeService.description}
                        </p>

                        {/* Features List */}
                        <ul className="space-y-2">
                            {activeService.features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <svg
                                        className="w-5 h-5 text-aloe-green flex-shrink-0 mt-0.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-charcoal text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-2">
                            <a
                                href={`/services/${activeService.id}`}
                                className="px-5 py-2.5 bg-aloe-green text-charcoal text-sm font-medium rounded hover:bg-green-hover transition-colors"
                            >
                                Learn More
                            </a>
                            <a
                                href="/get-quote"
                                className="px-5 py-2.5 border border-charcoal text-charcoal text-sm font-medium rounded hover:bg-charcoal hover:text-white transition-colors"
                            >
                                Get a Quote
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
