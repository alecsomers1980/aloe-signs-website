import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StatsSection from '@/components/StatsSection';
import { Building2, Users, Award, MapPin, CheckCircle } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen">
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
                                <span className="text-white">About Us</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                                About Aloe Signs
                            </h1>

                            <p className="text-2xl md:text-3xl text-aloe-green font-semibold mb-6">
                                Products that builds businesses
                            </p>

                            <p className="text-lg md:text-xl text-light-grey">
                                For over 25 years, we&apos;ve been helping South African businesses stand out with
                                professional signage and branding solutions.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Our Story Section */}
                <section className="py-16 md:py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
                                    Our Story
                                </h2>
                                <div className="space-y-4 text-medium-grey">
                                    <p>
                                        Based in Randfontein, Gauteng, we&apos;ve grown from a small signage shop to a
                                        full-service design, manufacturing, and installation company serving clients
                                        across South Africa.
                                    </p>
                                    <p>
                                        What sets us apart is simple: we do everything in-house. From the first design
                                        concept to the final installation, your project stays with our team. No
                                        outsourcing, no delays, no quality compromises.
                                    </p>
                                    <p>
                                        Whether you need a single vehicle wrap or a complete building signage programme,
                                        we handle it end-to-end with the same attention to detail and commitment to quality.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-bg-grey p-8 rounded-lg">
                                <h3 className="text-2xl font-bold text-charcoal mb-6">What We Do</h3>
                                <div className="space-y-3">
                                    {[
                                        'Vehicle Branding',
                                        'Building Signage',
                                        'Shopfronts',
                                        'Wayfinding & Interior',
                                        'Billboards & Outdoor',
                                        'Large Format Print',
                                        'Screen Printing',
                                        'Set Building',
                                    ].map((service, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-aloe-green flex-shrink-0" />
                                            <span className="text-medium-grey">{service}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <StatsSection />

                {/* What Makes Us Different */}
                <section className="py-16 md:py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                                What Makes Us Different
                            </h2>
                            <p className="text-lg text-medium-grey max-w-2xl mx-auto">
                                End-to-end service with in-house capabilities
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                {
                                    icon: Building2,
                                    title: 'In-House Manufacturing',
                                    description: 'Our own production facility means quality control and faster turnaround times.',
                                },
                                {
                                    icon: Users,
                                    title: 'Own Installation Team',
                                    description: 'Certified installers who understand our products and your expectations.',
                                },
                                {
                                    icon: Award,
                                    title: 'End-to-End Service',
                                    description: 'From design to installation, your project stays with our team.',
                                },
                                {
                                    icon: MapPin,
                                    title: 'Nationwide Coverage',
                                    description: 'Based in Gauteng, serving businesses across South Africa.',
                                },
                            ].map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div key={index} className="bg-bg-grey p-6 rounded-lg">
                                        <div className="w-12 h-12 bg-aloe-green rounded-lg flex items-center justify-center mb-4">
                                            <Icon className="w-6 h-6 text-charcoal" />
                                        </div>
                                        <h3 className="text-xl font-bold text-charcoal mb-2">{item.title}</h3>
                                        <p className="text-medium-grey">{item.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Location & Coverage */}
                <section className="py-16 md:py-20 bg-bg-grey">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
                                    Location & Coverage
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-bold text-charcoal mb-2">Our Workshop</h3>
                                        <p className="text-medium-grey">
                                            42 Homestead Ave, Randfontein, Gauteng
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-charcoal mb-2">Service Area</h3>
                                        <p className="text-medium-grey">
                                            Based in Gauteng, we serve businesses across all of South Africa with
                                            nationwide installation services.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-charcoal mb-2">Business Hours</h3>
                                        <p className="text-medium-grey">
                                            Monday - Friday: 8:00 AM - 5:00 PM<br />
                                            Saturday: 8:00 AM - 1:00 PM<br />
                                            Sunday: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-lg">
                                <h3 className="text-2xl font-bold text-charcoal mb-4">
                                    Ready to work with us?
                                </h3>
                                <p className="text-medium-grey mb-6">
                                    Get in touch to discuss your signage project. We&apos;ll provide a free consultation
                                    and detailed quote.
                                </p>
                                <div className="space-y-4">
                                    <Link
                                        href="/contact"
                                        className="block w-full px-6 py-4 bg-aloe-green text-charcoal font-bold rounded-lg hover:bg-green-hover transition-colors text-center"
                                    >
                                        Get a Quote
                                    </Link>
                                    <Link
                                        href="tel:0116932600"
                                        className="block w-full px-6 py-4 border-2 border-charcoal text-charcoal font-bold rounded-lg hover:bg-charcoal hover:text-white transition-colors text-center"
                                    >
                                        Call 011 693 2600
                                    </Link>
                                </div>
                                <div className="mt-6 pt-6 border-t border-border-grey">
                                    <p className="text-sm text-medium-grey">
                                        <strong>Email:</strong> team@aloesigns.co.za
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
