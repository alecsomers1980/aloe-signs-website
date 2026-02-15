import { Product } from './data';

export interface Order {
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
    items: OrderItem[];
    subtotal: number;
    shipping: number;
    total: number;
    status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    paymentStatus: 'pending' | 'completed' | 'failed';
    paymentId?: string;
    paymentData?: Record<string, string>;
    createdAt: string;
    updatedAt: string;
}

export interface OrderItem extends Product {
    quantity: number;
}

/**
 * Generate a unique order number
 */
export function generateOrderNumber(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ALO${timestamp}${random}`;
}

/**
 * Generate a unique order ID
 */
export function generateOrderId(): string {
    return `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Create a new order
 */
export function createOrder(params: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: {
        street: string;
        city: string;
        province: string;
        postalCode: string;
    };
    items: OrderItem[];
    subtotal: number;
    shipping: number;
    total: number;
}): Order {
    const now = new Date().toISOString();

    return {
        id: generateOrderId(),
        orderNumber: generateOrderNumber(),
        customerName: params.customerName,
        customerEmail: params.customerEmail,
        customerPhone: params.customerPhone,
        customerAddress: params.customerAddress,
        items: params.items,
        subtotal: params.subtotal,
        shipping: params.shipping,
        total: params.total,
        status: 'pending',
        paymentStatus: 'pending',
        createdAt: now,
        updatedAt: now
    };
}

/**
 * Update order status
 */
export function updateOrderStatus(
    order: Order,
    status: Order['status'],
    paymentStatus?: Order['paymentStatus'],
    paymentId?: string,
    paymentData?: Record<string, string>
): Order {
    return {
        ...order,
        status,
        paymentStatus: paymentStatus || order.paymentStatus,
        paymentId: paymentId || order.paymentId,
        paymentData: paymentData || order.paymentData,
        updatedAt: new Date().toISOString()
    };
}

/**
 * Format order for email
 */
export function formatOrderForEmail(order: Order): string {
    const itemsList = order.items
        .map(item => `- ${item.name} (${item.size}) x ${item.quantity} - R${(item.price * item.quantity).toLocaleString()}`)
        .join('\n');

    return `
Order Number: ${order.orderNumber}
Date: ${new Date(order.createdAt).toLocaleString('en-ZA')}

Customer Details:
- Name: ${order.customerName}
- Email: ${order.customerEmail}
- Phone: ${order.customerPhone}
- Address: ${order.customerAddress.street}, ${order.customerAddress.city}, ${order.customerAddress.province}, ${order.customerAddress.postalCode}

Items:
${itemsList}

Subtotal: R${order.subtotal.toLocaleString()}
Shipping: R${order.shipping.toLocaleString()}
Total: R${order.total.toLocaleString()}

Payment Status: ${order.paymentStatus.toUpperCase()}
${order.paymentId ? `Payment ID: ${order.paymentId}` : ''}
  `.trim();
}
