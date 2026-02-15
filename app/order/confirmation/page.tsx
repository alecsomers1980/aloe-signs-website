/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

interface Order {
    id: string;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    total: number;
    status: string;
    paymentStatus: string;
    items: Array<{
        name: string;
        quantity: number;
        price: number;
    }>;
}

function OrderConfirmationContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const { clearCart } = useCart();

    useEffect(() => {
        if (orderId) {
            // Fetch order details
            fetch(`/api/orders/${orderId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.order) {
                        setOrder(data.order);
                        // Clear cart after successful order
                        clearCart();
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching order:', error);
                    setLoading(false);
                });
        } else {
            if (loading) setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderId, clearCart]);

    if (loading) {
        return (
            <div className="min-h-screen">
                <Header />
                <main className="py-20">
                    <div className="max-w-[800px] mx-auto px-6 text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-aloe-green mx-auto mb-4"></div>
                        <p className="text-medium-grey">Loading order details...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen">
                <Header />
                <main className="py-20">
                    <div className="max-w-[800px] mx-auto px-6 text-center">
                        <h1 className="text-3xl font-bold text-charcoal mb-4">Order Not Found</h1>
                        <p className="text-medium-grey mb-8">We couldn't find your order. Please check your email for order details.</p>
                        <Link
                            href="/shop"
                            className="inline-block px-8 py-3 bg-aloe-green text-charcoal font-semibold rounded hover:bg-green-hover transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Header />

            <main className="py-20">
                <div className="max-w-[800px] mx-auto px-6">
                    {/* Success Icon */}
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-bold text-charcoal mb-2">Thank You!</h1>
                        <p className="text-lg text-medium-grey">Your order has been received</p>
                    </div>

                    {/* Order Details Card */}
                    <div className="bg-bg-grey rounded-lg p-8 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6 pb-6 border-b border-border-grey">
                            <div>
                                <p className="text-sm text-medium-grey mb-1">Order Number</p>
                                <p className="text-xl font-bold text-charcoal">{order.orderNumber}</p>
                            </div>
                            <div>
                                <p className="text-sm text-medium-grey mb-1">Payment Status</p>
                                <p className={`text-lg font-semibold ${order.paymentStatus === 'completed' ? 'text-green-500' : 'text-yellow-500'
                                    }`}>
                                    {order.paymentStatus === 'completed' ? 'Paid' : 'Pending'}
                                </p>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div>
                            <h2 className="text-xl font-bold text-charcoal mb-4">Order Items</h2>
                            <div className="space-y-3">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex justify-between">
                                        <span className="text-medium-grey">
                                            {item.name} × {item.quantity}
                                        </span>
                                        <span className="font-medium text-charcoal">
                                            R{formatPrice(item.price * item.quantity)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Total */}
                        <div className="border-t border-border-grey pt-4">
                            <div className="flex justify-between text-2xl font-bold text-charcoal">
                                <span>Total</span>
                                <span>R{formatPrice(order.total)}</span>
                            </div>
                        </div>

                        {/* Customer Info */}
                        <div className="border-t border-border-grey pt-6">
                            <h3 className="font-bold text-charcoal mb-3">Customer Details</h3>
                            <p className="text-medium-grey">{order.customerName}</p>
                            <p className="text-medium-grey">{order.customerEmail}</p>
                        </div>

                        {/* Next Steps */}
                        <div className="bg-white rounded p-4 text-sm">
                            <p className="font-medium text-charcoal mb-2">What happens next?</p>
                            <ul className="space-y-2 text-medium-grey">
                                <li>✓ You'll receive an order confirmation email shortly</li>
                                <li>✓ Our team will review your order</li>
                                <li>✓ We'll contact you to confirm details and delivery</li>
                                <li>✓ Your order will be processed and shipped</li>
                            </ul>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={`/order/track?q=${order.orderNumber}`}
                            className="px-8 py-3 bg-aloe-green text-charcoal font-semibold rounded hover:bg-green-hover transition-colors text-center"
                        >
                            Track Your Order
                        </Link>
                        <Link
                            href="/shop"
                            className="px-8 py-3 border-2 border-aloe-green text-aloe-green font-semibold rounded hover:bg-aloe-green hover:text-charcoal transition-colors text-center"
                        >
                            Continue Shopping
                        </Link>
                        <Link
                            href="/"
                            className="px-8 py-3 border-2 border-charcoal text-charcoal font-semibold rounded hover:bg-charcoal hover:text-white transition-colors text-center"
                        >
                            Back to Home
                        </Link>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-12 text-center text-sm text-medium-grey">
                        <p>Questions about your order?</p>
                        <p className="mt-2">
                            Contact us at{' '}
                            <a href="mailto:team@aloesigns.co.za" className="text-aloe-green hover:underline">
                                team@aloesigns.co.za
                            </a>
                            {' '}or call{' '}
                            <a href="tel:0116932600" className="text-aloe-green hover:underline">
                                011 693 2600
                            </a>
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function OrderConfirmationPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-aloe-green"></div>
            </div>
        }>
            <OrderConfirmationContent />
        </Suspense>
    );
}
