import Link from 'next/link';

interface ServiceHeroProps {
    title: string;
    tagline: string;
    description: string;
    backgroundImage?: string;
}

export default function ServiceHero({ title, tagline, description, backgroundImage }: ServiceHeroProps) {
    return (
        <div className="relative bg-charcoal text-white py-20 md:py-32">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="max-w-3xl">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-light-grey mb-6">
                        <Link href="/" className="hover:text-aloe-green transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href="/services" className="hover:text-aloe-green transition-colors">
                            Services
                        </Link>
                        <span>/</span>
                        <span className="text-white">{title}</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        {title}
                    </h1>

                    {/* Tagline */}
                    <p className="text-2xl md:text-3xl text-aloe-green font-semibold mb-6">
                        {tagline}
                    </p>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-light-grey mb-8">
                        {description}
                    </p>

                    {/* CTA Button */}
                    <Link
                        href="/contact"
                        className="inline-block px-8 py-4 bg-aloe-green text-charcoal font-bold rounded-lg hover:bg-green-hover transition-colors"
                    >
                        Get a Quote
                    </Link>
                </div>
            </div>
        </div>
    );
}
