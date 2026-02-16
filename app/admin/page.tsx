'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

interface Order {
    id: string;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    total: number;
    status: 'pending' | 'paid' | 'processing' | 'shipped' | 'cancelled';
    paymentStatus: 'pending' | 'completed' | 'failed';
    createdAt: string;
    items: Array<{
        name: string;
        quantity: number;
        price: number;
    }>;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const response = await fetch('/api/admin/orders');
            const data = await response.json();

            if (data.orders) {
                // Sort by creation date (newest first)
                const sortedOrders = data.orders.sort((a: Order, b: Order) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setOrders(sortedOrders);
            }
        } catch (error) {
            console.error('Failed to load orders:', error);
        } finally {
            setLoading(false);
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

    const handleDeleteOrder = async (orderId: string) => {
        if (!confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/orders/${orderId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Remove from local state
                setOrders(prev => prev.filter(order => order.id !== orderId));
            } else {
                alert('Failed to delete order');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('An error occurred while deleting the order');
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

    const getPaymentStatusColor = (status: Order['paymentStatus']) => {
        switch (status) {
            case 'completed':
                return 'text-green-600';
            case 'failed':
                return 'text-red-600';
            default:
                return 'text-yellow-600';
        }
    };

    const filteredOrders = filter === 'all'
        ? orders
        : orders.filter(order => order.status === filter);

    const stats = {
        total: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        paid: orders.filter(o => o.status === 'paid').length,
        processing: orders.filter(o => o.status === 'processing').length,
        shipped: orders.filter(o => o.status === 'shipped').length,
        cancelled: orders.filter(o => o.status === 'cancelled').length,
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-bg-grey p-8">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-aloe-green mx-auto mb-4"></div>
                        <p className="text-medium-grey">Loading orders...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg-grey">
            {/* Header */}
            <div className="bg-charcoal text-white py-6">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
                            <p className="text-light-grey">Manage orders and view statistics</p>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href="/"
                                className="px-6 py-2 bg-aloe-green text-charcoal font-semibold rounded hover:bg-green-hover transition-colors"
                            >
                                Back to Website
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
                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    <div className="bg-white rounded-lg p-4 shadow">
                        <p className="text-sm text-medium-grey mb-1">Total Orders</p>
                        <p className="text-2xl font-bold text-charcoal">{stats.total}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow">
                        <p className="text-sm text-medium-grey mb-1">Pending</p>
                        <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow">
                        <p className="text-sm text-medium-grey mb-1">Paid</p>
                        <p className="text-2xl font-bold text-blue-600">{stats.paid}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow">
                        <p className="text-sm text-medium-grey mb-1">Processing</p>
                        <p className="text-2xl font-bold text-purple-600">{stats.processing}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow">
                        <p className="text-sm text-medium-grey mb-1">Shipped</p>
                        <p className="text-2xl font-bold text-green-600">{stats.shipped}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow">
                        <p className="text-sm text-medium-grey mb-1">Cancelled</p>
                        <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg p-4 shadow mb-6">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded font-medium transition-colors ${filter === 'all'
                                ? 'bg-aloe-green text-charcoal'
                                : 'bg-bg-grey text-medium-grey hover:bg-border-grey'
                                }`}
                        >
                            All Orders ({stats.total})
                        </button>
                        <button
                            onClick={() => setFilter('pending')}
                            className={`px-4 py-2 rounded font-medium transition-colors ${filter === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-bg-grey text-medium-grey hover:bg-border-grey'
                                }`}
                        >
                            Pending ({stats.pending})
                        </button>
                        <button
                            onClick={() => setFilter('paid')}
                            className={`px-4 py-2 rounded font-medium transition-colors ${filter === 'paid'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-bg-grey text-medium-grey hover:bg-border-grey'
                                }`}
                        >
                            Paid ({stats.paid})
                        </button>
                        <button
                            onClick={() => setFilter('processing')}
                            className={`px-4 py-2 rounded font-medium transition-colors ${filter === 'processing'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-bg-grey text-medium-grey hover:bg-border-grey'
                                }`}
                        >
                            Processing ({stats.processing})
                        </button>
                        <button
                            onClick={() => setFilter('shipped')}
                            className={`px-4 py-2 rounded font-medium transition-colors ${filter === 'shipped'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-bg-grey text-medium-grey hover:bg-border-grey'
                                }`}
                        >
                            Shipped ({stats.shipped})
                        </button>
                        <button
                            onClick={() => setFilter('cancelled')}
                            className={`px-4 py-2 rounded font-medium transition-colors ${filter === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-bg-grey text-medium-grey hover:bg-border-grey'
                                }`}
                        >
                            Cancelled ({stats.cancelled})
                        </button>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-bg-grey">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-medium-grey uppercase tracking-wider">
                                        Order Number
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-medium-grey uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-medium-grey uppercase tracking-wider">
                                        Items
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-medium-grey uppercase tracking-wider">
                                        Total
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-medium-grey uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-medium-grey uppercase tracking-wider">
                                        Payment
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-medium-grey uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-medium-grey uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-grey">
                                {filteredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-8 text-center text-medium-grey">
                                            No orders found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-bg-grey transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-charcoal">{order.orderNumber}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-charcoal">{order.customerName}</div>
                                                <div className="text-xs text-medium-grey">{order.customerEmail}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-charcoal">
                                                    {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-semibold text-charcoal">R{formatPrice(order.total)}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`text-sm font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                                                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-medium-grey">
                                                {new Date(order.createdAt).toLocaleDateString('en-ZA', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <Link
                                                        href={`/admin/orders/${order.id}`}
                                                        className="text-aloe-green hover:text-green-hover font-medium"
                                                    >
                                                        View
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteOrder(order.id)}
                                                        className="text-red-600 hover:text-red-800 font-medium text-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
