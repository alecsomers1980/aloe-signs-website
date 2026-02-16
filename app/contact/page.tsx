import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
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
                                <span className="text-white">Contact Us</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                                Get in Touch
                            </h1>

                            <p className="text-2xl md:text-3xl text-aloe-green font-semibold mb-6">
                                We&apos;re here to help
                            </p>

                            <p className="text-lg md:text-xl text-light-grey">
                                Have a question or ready to start your project? Get in touch and we&apos;ll respond
                                within 24 hours.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <section className="py-16 md:py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-12">
                            {/* Contact Form */}
                            <div>
                                <ContactForm
                                    title="Send us a message"
                                    subtitle="Fill out the form and we&apos;ll get back to you within 24 hours"
                                />
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-8">
                                {/* Contact Details */}
                                <div>
                                    <h3 className="text-2xl font-bold text-charcoal mb-6">
                                        Contact Information
                                    </h3>
                                    <div className="space-y-4">
                                        {/* Phone */}
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-aloe-green rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Phone className="w-6 h-6 text-charcoal" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-charcoal mb-1">Phone / WhatsApp</h4>
                                                <div className="flex flex-col gap-1">
                                                    <a
                                                        href="tel:0116932600"
                                                        className="text-medium-grey hover:text-aloe-green transition-colors"
                                                    >
                                                        011 693 2600
                                                    </a>
                                                    <a
                                                        href="tel:0688838049"
                                                        className="text-medium-grey hover:text-aloe-green transition-colors"
                                                    >
                                                        068 883 8049
                                                    </a>
                                                    <a
                                                        href="https://wa.me/27688838049"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm font-bold text-aloe-green hover:underline flex items-center gap-1 mt-1"
                                                    >
                                                        Chat on WhatsApp
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-aloe-green rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Mail className="w-6 h-6 text-charcoal" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-charcoal mb-1">Email</h4>
                                                <a
                                                    href="mailto:team@aloesigns.co.za"
                                                    className="text-medium-grey hover:text-aloe-green transition-colors"
                                                >
                                                    team@aloesigns.co.za
                                                </a>
                                            </div>
                                        </div>

                                        {/* Address */}
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-aloe-green rounded-lg flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-6 h-6 text-charcoal" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-charcoal mb-1">Address</h4>
                                                <p className="text-medium-grey mb-2">
                                                    42 Homestead Ave<br />
                                                    Randfontein, Gauteng
                                                </p>
                                            </div>
                                        </div>

                                        {/* Business Hours */}
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-aloe-green rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Clock className="w-6 h-6 text-charcoal" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-charcoal mb-1">Business Hours</h4>
                                                <p className="text-medium-grey">
                                                    Monday - Friday: 8:00 AM - 5:00 PM<br />
                                                    Saturday: 8:00 AM - 1:00 PM<br />
                                                    Sunday: Closed
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Links */}
                                <div className="bg-bg-grey p-6 rounded-lg">
                                    <h3 className="text-xl font-bold text-charcoal mb-4">
                                        Looking for something specific?
                                    </h3>
                                    <div className="space-y-3">
                                        <Link
                                            href="/shop"
                                            className="block text-medium-grey hover:text-aloe-green transition-colors"
                                        >
                                            → Shop ready-made signs
                                        </Link>
                                        <Link
                                            href="/services/vehicle-branding"
                                            className="block text-medium-grey hover:text-aloe-green transition-colors"
                                        >
                                            → View our services
                                        </Link>
                                        <Link
                                            href="/order/track"
                                            className="block text-medium-grey hover:text-aloe-green transition-colors"
                                        >
                                            → Track your order
                                        </Link>
                                        <Link
                                            href="/about"
                                            className="block text-medium-grey hover:text-aloe-green transition-colors"
                                        >
                                            → Learn more about us
                                        </Link>
                                    </div>
                                </div>

                                {/* Service Area */}
                                <div className="bg-aloe-green p-6 rounded-lg">
                                    <h3 className="text-xl font-bold text-charcoal mb-2">
                                        Nationwide Service
                                    </h3>
                                    <p className="text-charcoal">
                                        Based in Gauteng, we serve businesses across all of South Africa with
                                        professional installation services.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Map Section */}
                <section className="h-[400px] w-full">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.524795995872!2d27.6975619!3d-26.1798319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95c1c08c407dcd%3A0xe549557a66b5b5c7!2s42%20Homestead%20Ave%2C%20Homelake%2C%20Randfontein%2C%201759!5e0!3m2!1sen!2sza!4v1707736427000!5m2!1sen!2sza"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </section>
            </main>
            <Footer />
        </div>
    );
}
