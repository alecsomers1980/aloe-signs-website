'use client';

import { useState } from 'react';

interface ContactFormProps {
    title?: string;
    subtitle?: string;
}

export default function ContactForm({ title = 'Send us a message', subtitle }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    service: '',
                    message: '',
                });
            } else {
                setStatus('error');
                setErrorMessage(data.error || 'Failed to send message');
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage('Failed to send message. Please try again.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg">
            {/* Header */}
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-charcoal mb-2">{title}</h3>
                {subtitle && <p className="text-medium-grey">{subtitle}</p>}
            </div>

            {/* Success Message */}
            {status === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                    Thank you! We&apos;ll be in touch soon.
                </div>
            )}

            {/* Error Message */}
            {status === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    {errorMessage}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                        Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-border-grey rounded-lg focus:outline-none focus:border-aloe-green"
                        placeholder="Your name"
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                        Email *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-border-grey rounded-lg focus:outline-none focus:border-aloe-green"
                        placeholder="your@email.com"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
                        Phone
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-border-grey rounded-lg focus:outline-none focus:border-aloe-green"
                        placeholder="0123456789"
                    />
                </div>

                {/* Service */}
                <div>
                    <label htmlFor="service" className="block text-sm font-medium text-charcoal mb-2">
                        Service Interested In
                    </label>
                    <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-border-grey rounded-lg focus:outline-none focus:border-aloe-green"
                    >
                        <option value="">Select a service</option>
                        <option value="Vehicle Branding">Vehicle Branding</option>
                        <option value="Building Signage">Building Signage</option>
                        <option value="Shopfronts">Shopfronts</option>
                        <option value="Wayfinding & Interior">Wayfinding & Interior</option>
                        <option value="Billboards & Outdoor">Billboards & Outdoor</option>
                        <option value="Large Format Print">Large Format Print</option>
                        <option value="Screen Printing">Screen Printing</option>
                        <option value="Set Building">Set Building</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Message */}
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                        Message *
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border-2 border-border-grey rounded-lg focus:outline-none focus:border-aloe-green resize-none"
                        placeholder="Tell us about your project..."
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full px-6 py-4 bg-aloe-green text-charcoal font-bold rounded-lg hover:bg-green-hover transition-colors disabled:bg-light-grey disabled:cursor-not-allowed"
                >
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </div>
    );
}
