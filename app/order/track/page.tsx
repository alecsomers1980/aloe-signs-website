'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { formatPrice } from '@/lib/utils';

interface Order {
    id: string;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: {
        street: string;
        city: string;
        province: string;
        postalCode: string;
    };
    items: Array<{
        name: string;
        size: string;
        quantity: number;
        price: number;
    }>;
    subtotal: number;
    shipping: number;
    total: number;
    status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    paymentStatus: 'pending' | 'completed' | 'failed';
    paymentId?: string;
    createdAt: string;
    updatedAt: string;
}

function OrderTrackingContent() {
    const searchParams = useSearchParams();
    const queryParam = searchParams.get('q');

    const [searchQuery, setSearchQuery] = useState(queryParam || '');
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Auto-search if query parameter is present
    useEffect(() => {
        if (queryParam && !order) {
            performSearch(queryParam);
        }
    }, [queryParam]);

    const performSearch = async (query: string) => {
        if (!query.trim()) {
            setError('Please enter an order number or email address');
            return;
        }

        setLoading(true);
        setError('');
        setOrder(null);

        try {
            const response = await fetch(`/api/orders/${encodeURIComponent(query)}`);
            const data = await response.json();

            if (response.ok && data.order) {
                setOrder(data.order);
            } else {
                setError('Order not found. Please check your order number or email address.');
            }
        } catch (err) {
            setError('Failed to search for order. Please try again.');
            console.error('Search error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        performSearch(searchQuery);
    };

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'paid':
                return 'bg-blue-100 text-blue-800';
            case 'processing':
                return 'bg-purple-100 text-purple-800';
            case 'shipped':
                return 'bg-indigo-100 text-indigo-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusSteps = (currentStatus: Order['status']) => {
        const steps = [
            { name: 'Order Placed', status: 'pending', completed: true },
            { name: 'Payment Confirmed', status: 'paid', completed: false },
            { name: 'Processing', status: 'processing', completed: false },
            { name: 'Shipped', status: 'shipped', completed: false }
        ];

        const statusOrder = ['pending', 'paid', 'processing', 'shipped'];
        const currentIndex = statusOrder.indexOf(currentStatus);

        return steps.map((step, index) => ({
            ...step,
            completed: index <= currentIndex
        }));
    };

    return (
        <div className="min-h-screen">
            <Header />

            <main>
                {/* Page Header (Rich Hero) */}
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
                                <span className="text-white">Track Order</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                                Track Your Order
                            </h1>
                            <p className="text-lg md:text-xl text-light-grey">
                                Enter your order number or email to view order status
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search Section */}
                <section className="py-12">
                    <div className="max-w-[800px] mx-auto px-6">
                        <form onSubmit={handleSearch} className="mb-8">
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Order number (e.g., ALO1770807879392) or email address"
                                    className="flex-1 px-6 py-4 border-2 border-border-grey rounded-lg focus:outline-none focus:border-aloe-green text-lg"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-8 py-4 bg-aloe-green text-charcoal font-bold rounded-lg hover:bg-green-hover transition-colors disabled:bg-light-grey disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Searching...' : 'Track Order'}
                                </button>
                            </div>
                            {error && (
                                <p className="mt-4 text-red-500 text-sm">{error}</p>
                            )}
                        </form>

                        {/* Order Details */}
                        {order && (
                            <div className="space-y-6">
                                {/* Order Header */}
                                <div className="bg-bg-grey rounded-lg p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h2 className="text-2xl font-bold text-charcoal mb-1">
                                                Order {order.orderNumber}
                                            </h2>
                                            <p className="text-medium-grey">
                                                Placed on {new Date(order.createdAt).toLocaleDateString('en-ZA', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`inline-block px-4 py-2 rounded-full font-semibold ${getStatusColor(order.status)}`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border-grey">
                                        <div>
                                            <p className="text-sm text-medium-grey mb-1">Customer</p>
                                            <p className="font-medium text-charcoal">{order.customerName}</p>
                                            <p className="text-sm text-medium-grey">{order.customerEmail}</p>
                                            <p className="text-sm text-medium-grey">{order.customerPhone}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-medium-grey mb-1">Delivery Address</p>
                                            <p className="text-sm text-charcoal">
                                                {order.customerAddress.street}<br />
                                                {order.customerAddress.city}, {order.customerAddress.province}<br />
                                                {order.customerAddress.postalCode}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Status Timeline */}
                                {order.status !== 'cancelled' && (
                                    <div className="bg-white border border-border-grey rounded-lg p-6">
                                        <h3 className="font-bold text-charcoal mb-6">Order Progress</h3>
                                        <div className="relative">
                                            {/* Progress Line */}
                                            <div className="absolute top-5 left-0 right-0 h-1 bg-border-grey">
                                                <div
                                                    className="h-full bg-aloe-green transition-all duration-500"
                                                    style={{
                                                        width: `${(getStatusSteps(order.status).filter(s => s.completed).length - 1) * 33.33}%`
                                                    }}
                                                />
                                            </div>

                                            {/* Steps */}
                                            <div className="relative flex justify-between">
                                                {getStatusSteps(order.status).map((step, index) => (
                                                    <div key={index} className="flex flex-col items-center" style={{ width: '25%' }}>
                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step.completed
                                                            ? 'bg-aloe-green text-charcoal'
                                                            : 'bg-border-grey text-medium-grey'
                                                            }`}>
                                                            {step.completed ? (
                                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            ) : (
                                                                <span className="text-sm font-bold">{index + 1}</span>
                                                            )}
                                                        </div>
                                                        <p className={`text-xs text-center ${step.completed ? 'text-charcoal font-medium' : 'text-medium-grey'
                                                            }`}>
                                                            {step.name}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Order Items */}
                                <div className="bg-white border border-border-grey rounded-lg p-6">
                                    <h3 className="font-bold text-charcoal mb-4">Order Items</h3>
                                    <div className="space-y-3">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex justify-between py-3 border-b border-border-grey last:border-0">
                                                <div>
                                                    <p className="font-medium text-charcoal">{item.name}</p>
                                                    <p className="text-sm text-medium-grey">{item.size}</p>
                                                    <p className="text-sm text-medium-grey">Quantity: {item.quantity}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-charcoal">R{formatPrice(item.price * item.quantity)}</p>
                                                    <p className="text-sm text-medium-grey">R{formatPrice(item.price)} each</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-border-grey space-y-2">
                                        <div className="flex justify-between text-medium-grey">
                                            <span>Subtotal</span>
                                            <span>R{formatPrice(order.subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between text-medium-grey">
                                            <span>Shipping</span>
                                            <span>{order.shipping === 0 ? 'FREE' : `R${formatPrice(order.shipping)}`}</span>
                                        </div>
                                        <div className="flex justify-between text-xl font-bold text-charcoal pt-2 border-t border-border-grey">
                                            <span>Total</span>
                                            <span>R{formatPrice(order.total)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Information */}
                                <div className="bg-white border border-border-grey rounded-lg p-6">
                                    <h3 className="font-bold text-charcoal mb-4">Payment Information</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-medium-grey">Payment Status</span>
                                            <span className={`font-semibold ${order.paymentStatus === 'completed' ? 'text-green-500' :
                                                order.paymentStatus === 'failed' ? 'text-red-500' :
                                                    'text-yellow-500'
                                                }`}>
                                                {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                                            </span>
                                        </div>
                                        {order.paymentId && (
                                            <div className="flex justify-between">
                                                <span className="text-medium-grey">Payment ID</span>
                                                <span className="text-charcoal font-mono text-sm">{order.paymentId}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-4">
                                    <Link
                                        href="/shop"
                                        className="flex-1 px-6 py-3 bg-aloe-green text-charcoal font-semibold text-center rounded-lg hover:bg-green-hover transition-colors"
                                    >
                                        Continue Shopping
                                    </Link>
                                    <Link
                                        href="/"
                                        className="flex-1 px-6 py-3 border-2 border-charcoal text-charcoal font-semibold text-center rounded-lg hover:bg-charcoal hover:text-white transition-colors"
                                    >
                                        Back to Home
                                    </Link>
                                </div>

                                {/* Contact Support */}
                                <div className="text-center text-sm text-medium-grey">
                                    <p>Need help with your order?</p>
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
                        )}

                        {/* Help Text */}
                        {!order && !loading && (
                            <div className="bg-bg-grey rounded-lg p-6 text-center">
                                <h3 className="font-bold text-charcoal mb-3">How to track your order</h3>
                                <ul className="text-left text-medium-grey space-y-2 max-w-md mx-auto">
                                    <li>• Enter your order number (found in your confirmation email)</li>
                                    <li>• Or enter the email address used when placing the order</li>
                                    <li>• Click "Track Order" to view your order status</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default function OrderTrackingPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-aloe-green"></div>
            </div>
        }>
            <OrderTrackingContent />
        </Suspense>
    );
}
