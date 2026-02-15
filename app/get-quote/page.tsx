'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function GetQuotePage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: 'Vehicle Branding',
        description: '',
        location: ''
    });

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            // Combine project details into a single message for the API
            const fullMessage = `
PROJECT DETAILS:
Service: ${formData.service}
Company: ${formData.company || 'N/A'}
Location: ${formData.location || 'Not specified'}

DESCRIPTION:
${formData.description}
            `.trim();

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    service: `Quote Request: ${formData.service}`,
                    message: fullMessage
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit quote request');
            }

            setStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                service: 'Vehicle Branding',
                description: '',
                location: ''
            });
        } catch (error) {
            console.error('Quote submission error:', error);
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
        }
    };

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
                                <span className="text-white">Get a Quote</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                                Request a Quote
                            </h1>

                            <p className="text-lg md:text-xl text-light-grey">
                                Tell us about your project, and we&apos;ll get back to you with a detailed proposal and pricing.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <section className="py-16 md:py-20">
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
                            {status === 'success' ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h2 className="text-3xl font-bold text-charcoal mb-4">Request Received!</h2>
                                    <p className="text-lg text-medium-grey mb-8">
                                        Thank you for your interest. We&apos;ve received your project details and will be in touch shortly.
                                    </p>
                                    <Link
                                        href="/"
                                        className="inline-block px-8 py-3 bg-aloe-green text-charcoal font-bold rounded hover:bg-green-hover transition-colors"
                                    >
                                        Return Home
                                    </Link>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Contact Details */}
                                    <div>
                                        <h3 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
                                            <span className="w-8 h-8 rounded-full bg-aloe-green text-charcoal flex items-center justify-center text-sm">1</span>
                                            Contact Information
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label htmlFor="name" className="block text-sm font-medium text-charcoal">Full Name *</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-bg-grey border border-border-grey rounded focus:ring-2 focus:ring-aloe-green focus:border-transparent outline-none transition-all"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="email" className="block text-sm font-medium text-charcoal">Email Address *</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-bg-grey border border-border-grey rounded focus:ring-2 focus:ring-aloe-green focus:border-transparent outline-none transition-all"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="phone" className="block text-sm font-medium text-charcoal">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-bg-grey border border-border-grey rounded focus:ring-2 focus:ring-aloe-green focus:border-transparent outline-none transition-all"
                                                    placeholder="+27 00 000 0000"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="company" className="block text-sm font-medium text-charcoal">Company Name</label>
                                                <input
                                                    type="text"
                                                    id="company"
                                                    name="company"
                                                    value={formData.company}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-bg-grey border border-border-grey rounded focus:ring-2 focus:ring-aloe-green focus:border-transparent outline-none transition-all"
                                                    placeholder="Company Ltd"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Project Details */}
                                    <div>
                                        <h3 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
                                            <span className="w-8 h-8 rounded-full bg-aloe-green text-charcoal flex items-center justify-center text-sm">2</span>
                                            Project Details
                                        </h3>
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label htmlFor="service" className="block text-sm font-medium text-charcoal">Service Required *</label>
                                                <select
                                                    id="service"
                                                    name="service"
                                                    required
                                                    value={formData.service}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-bg-grey border border-border-grey rounded focus:ring-2 focus:ring-aloe-green focus:border-transparent outline-none transition-all cursor-pointer"
                                                >
                                                    <option value="Vehicle Branding">Vehicle Branding</option>
                                                    <option value="Building Signage">Building Signage</option>
                                                    <option value="Shopfronts">Shopfronts</option>
                                                    <option value="Wayfinding & Interior">Wayfinding & Interior</option>
                                                    <option value="Billboards & Outdoor">Billboards & Outdoor</option>
                                                    <option value="Large Format Print">Large Format Print</option>
                                                    <option value="Screen Printing">Screen Printing</option>
                                                    <option value="Set Building">Set Building & Props</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="location" className="block text-sm font-medium text-charcoal">Installation Location</label>
                                                <input
                                                    type="text"
                                                    id="location"
                                                    name="location"
                                                    value={formData.location}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-bg-grey border border-border-grey rounded focus:ring-2 focus:ring-aloe-green focus:border-transparent outline-none transition-all"
                                                    placeholder="City, Suburb, or Area"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="description" className="block text-sm font-medium text-charcoal">Project Description *</label>
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    required
                                                    rows={5}
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-bg-grey border border-border-grey rounded focus:ring-2 focus:ring-aloe-green focus:border-transparent outline-none transition-all resize-none"
                                                    placeholder="Please describe your requirements (size, quantity, materials, etc.)..."
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    {status === 'error' && (
                                        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                                            {errorMessage}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="w-full py-4 bg-charcoal text-white font-bold text-lg rounded hover:bg-black transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {status === 'submitting' ? 'Submitting Request...' : 'Submit Quote Request'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
