'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
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
    status: 'pending' | 'paid' | 'processing' | 'shipped' | 'cancelled';
    paymentStatus: 'pending' | 'completed' | 'failed';
    paymentId?: string;
    paymentData?: Record<string, string>;
    createdAt: string;
    updatedAt: string;
}

export default function AdminOrderDetail() {
    const params = useParams();
    const router = useRouter();
    const orderId = params.id as string;

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        loadOrder();
    }, [orderId]);

    const loadOrder = async () => {
        try {
            const response = await fetch(`/api/orders/${orderId}`);
            const data = await response.json();

            if (data.order) {
                setOrder(data.order);
            } else {
                setError('Order not found');
            }
        } catch (err) {
            setError('Failed to load order');
            console.error('Load order error:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (newStatus: Order['status']) => {
        if (!order) return;

        setUpdating(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch(`/api/admin/orders/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await response.json();

            if (response.ok && data.order) {
                setOrder(data.order);
                setSuccess(`Order status updated to "${newStatus}"`);
                setTimeout(() => setSuccess(''), 3000);
            } else {
                setError(data.error || 'Failed to update status');
            }
        } catch (err) {
            setError('Failed to update status');
            console.error('Update status error:', err);
        } finally {
            setUpdating(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/admin/logout', { method: 'POST' });
            router.push('/admin/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
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
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-bg-grey p-8">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-aloe-green mx-auto mb-4"></div>
                        <p className="text-medium-grey">Loading order...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error && !order) {
        return (
            <div className="min-h-screen bg-bg-grey p-8">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center py-20">
                        <p className="text-red-500 mb-4">{error}</p>
                        <Link href="/admin" className="text-aloe-green hover:underline">
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!order) return null;

    return (
        <div className="min-h-screen bg-bg-grey">
            {/* Header */}
            <div className="bg-charcoal text-white py-6">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold mb-1">Order Details</h1>
                            <p className="text-light-grey">Order {order.orderNumber}</p>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href="/admin"
                                className="px-6 py-2 bg-aloe-green text-charcoal font-semibold rounded hover:bg-green-hover transition-colors"
                            >
                                Back to Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="px-6 py-2 border-2 border-white text-white font-semibold rounded hover:bg-white hover:text-charcoal transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 py-8">
                {/* Success/Error Messages */}
                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                        {success}
                    </div>
                )}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Order Info */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-charcoal mb-2">
                                        Order {order.orderNumber}
                                    </h2>
                                    <p className="text-medium-grey">
                                        Placed on {new Date(order.createdAt).toLocaleDateString('en-ZA', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                    <p className="text-sm text-medium-grey">
                                        Last updated: {new Date(order.updatedAt).toLocaleDateString('en-ZA', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                                <span className={`inline-block px-4 py-2 rounded-full font-semibold ${getStatusColor(order.status)}`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-bold text-charcoal mb-3">Customer Information</h3>
                                    <div className="space-y-1 text-sm">
                                        <p className="font-medium text-charcoal">{order.customerName}</p>
                                        <p className="text-medium-grey">{order.customerEmail}</p>
                                        <p className="text-medium-grey">{order.customerPhone}</p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-charcoal mb-3">Delivery Address</h3>
                                    <div className="text-sm text-medium-grey">
                                        <p>{order.customerAddress.street}</p>
                                        <p>{order.customerAddress.city}, {order.customerAddress.province}</p>
                                        <p>{order.customerAddress.postalCode}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="font-bold text-charcoal mb-4">Order Items</h3>
                            <div className="space-y-4">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex justify-between py-4 border-b border-border-grey last:border-0">
                                        <div>
                                            <p className="font-medium text-charcoal">{item.name}</p>
                                            <p className="text-sm text-medium-grey">{item.size}</p>
                                            <p className="text-sm text-medium-grey">Quantity: {item.quantity}</p>
                                            <p className="text-sm text-medium-grey">Unit Price: R{formatPrice(item.price)}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-charcoal">R{formatPrice(item.price * item.quantity)}</p>
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
                                <div className="flex justify-between text-2xl font-bold text-charcoal pt-2 border-t border-border-grey">
                                    <span>Total</span>
                                    <span>R{formatPrice(order.total)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Information */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="font-bold text-charcoal mb-4">Payment Information</h3>
                            <div className="space-y-3">
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
                                {order.paymentData && Object.keys(order.paymentData).length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-border-grey">
                                        <p className="text-sm font-medium text-charcoal mb-2">Payment Data:</p>
                                        <div className="bg-bg-grey rounded p-3 text-xs font-mono space-y-1">
                                            {Object.entries(order.paymentData).map(([key, value]) => (
                                                <div key={key}>
                                                    <span className="text-medium-grey">{key}:</span>{' '}
                                                    <span className="text-charcoal">{value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Update Status */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="font-bold text-charcoal mb-4">Update Order Status</h3>
                            <div className="space-y-3">
                                <button
                                    onClick={() => updateStatus('pending')}
                                    disabled={updating || order.status === 'pending'}
                                    className="w-full px-4 py-3 bg-yellow-100 text-yellow-800 font-semibold rounded hover:bg-yellow-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Mark as Pending
                                </button>
                                <button
                                    onClick={() => updateStatus('paid')}
                                    disabled={updating || order.status === 'paid'}
                                    className="w-full px-4 py-3 bg-blue-100 text-blue-800 font-semibold rounded hover:bg-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Mark as Paid
                                </button>
                                <button
                                    onClick={() => updateStatus('processing')}
                                    disabled={updating || order.status === 'processing'}
                                    className="w-full px-4 py-3 bg-purple-100 text-purple-800 font-semibold rounded hover:bg-purple-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Mark as Processing
                                </button>
                                <button
                                    onClick={() => updateStatus('shipped')}
                                    disabled={updating || order.status === 'shipped'}
                                    className="w-full px-4 py-3 bg-green-100 text-green-800 font-semibold rounded hover:bg-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Mark as Shipped
                                </button>
                                <button
                                    onClick={() => updateStatus('cancelled')}
                                    disabled={updating || order.status === 'cancelled'}
                                    className="w-full px-4 py-3 bg-red-100 text-red-800 font-semibold rounded hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel Order
                                </button>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="font-bold text-charcoal mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <a
                                    href={`mailto:${order.customerEmail}`}
                                    className="block w-full px-4 py-2 bg-aloe-green text-charcoal font-semibold text-center rounded hover:bg-green-hover transition-colors"
                                >
                                    Email Customer
                                </a>
                                <a
                                    href={`tel:${order.customerPhone}`}
                                    className="block w-full px-4 py-2 border-2 border-charcoal text-charcoal font-semibold text-center rounded hover:bg-charcoal hover:text-white transition-colors"
                                >
                                    Call Customer
                                </a>
                                <Link
                                    href={`/order/track?q=${order.orderNumber}`}
                                    target="_blank"
                                    className="block w-full px-4 py-2 border-2 border-aloe-green text-aloe-green font-semibold text-center rounded hover:bg-aloe-green hover:text-charcoal transition-colors"
                                >
                                    View Customer Tracking
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
