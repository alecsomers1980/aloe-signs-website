import ServiceHero from '@/components/ServiceHero';
import FeatureGrid from '@/components/FeatureGrid';
import ProcessSteps from '@/components/ProcessSteps';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ServiceData } from '@/lib/services';
import { CheckCircle } from 'lucide-react';

interface ServicePageTemplateProps {
    service: ServiceData;
}

export default function ServicePageTemplate({ service }: ServicePageTemplateProps) {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                {/* Hero Section */}
                <ServiceHero
                    title={service.title}
                    tagline={service.tagline}
                    description={service.description}
                />

                {/* Features Section */}
                <FeatureGrid
                    title="What We Offer"
                    subtitle={`Comprehensive ${service.title.toLowerCase()} solutions for businesses of all sizes`}
                    features={service.features}
                />

                {/* Process Section */}
                <ProcessSteps
                    title="Our Process"
                    subtitle="From consultation to installation, we handle everything"
                    steps={service.process}
                />

                {/* Benefits Section */}
                <section className="py-16 md:py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Left Column - Benefits */}
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
                                    Why Choose Aloe Signs?
                                </h2>
                                <div className="space-y-4">
                                    {service.benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle className="w-6 h-6 text-aloe-green flex-shrink-0 mt-0.5" />
                                            <span className="text-medium-grey">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column - CTA */}
                            <div className="bg-bg-grey p-8 rounded-lg">
                                <h3 className="text-2xl font-bold text-charcoal mb-4">
                                    Ready to get started?
                                </h3>
                                <p className="text-medium-grey mb-6">
                                    Get a free quote for your {service.title.toLowerCase()} project. We&apos;ll visit your site,
                                    take measurements, and provide a detailed proposal within 48 hours.
                                </p>
                                <div className="space-y-4">
                                    <Link
                                        href="/contact"
                                        className="block w-full px-6 py-4 bg-aloe-green text-charcoal font-bold rounded-lg hover:bg-green-hover transition-colors text-center"
                                    >
                                        Get a Free Quote
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
                                        <strong>Email:</strong> team@aloesigns.co.za<br />
                                        <strong>Location:</strong> Randfontein, Gauteng<br />
                                        <strong>Coverage:</strong> Nationwide
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
