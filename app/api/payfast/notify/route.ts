import { NextRequest, NextResponse } from 'next/server';
import { payfast } from '@/lib/payfast';
import fs from 'fs/promises';
import path from 'path';
import { Order, updateOrderStatus } from '@/lib/orders';
import { sendOrderConfirmationEmail, sendAdminOrderNotification } from '@/lib/email';

/**
 * PayFast IPN (Instant Payment Notification) Handler
 * This endpoint receives payment notifications from PayFast
 */
export async function POST(request: NextRequest) {
    try {
        // Get form data from PayFast
        const formData = await request.formData();
        const data: Record<string, string> = {};

        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        console.log('PayFast IPN received:', data);

        // Extract signature
        const signature = data.signature;
        delete data.signature;

        // Verify signature
        if (!payfast.verifySignature(data, signature)) {
            console.error('Invalid PayFast signature');
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }

        // Get order ID from m_payment_id
        const orderId = data.m_payment_id;

        // Load orders
        const ordersPath = path.join(process.cwd(), 'data', 'orders.json');
        let orders: Order[] = [];

        try {
            const ordersData = await fs.readFile(ordersPath, 'utf-8');
            orders = JSON.parse(ordersData);
        } catch (error) {
            console.error('Error loading orders:', error);
        }

        // Find the order
        const orderIndex = orders.findIndex(o => o.id === orderId);

        if (orderIndex === -1) {
            console.error('Order not found:', orderId);
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        // Update order based on payment status
        const paymentStatus = data.payment_status;
        let updatedOrder = orders[orderIndex];

        if (paymentStatus === 'COMPLETE') {
            updatedOrder = updateOrderStatus(
                updatedOrder,
                'paid',
                'completed',
                data.pf_payment_id,
                data
            );

            console.log('Payment completed for order:', updatedOrder.orderNumber);

            // Send email notifications
            try {
                await Promise.all([
                    sendOrderConfirmationEmail(updatedOrder),
                    sendAdminOrderNotification(updatedOrder)
                ]);
                console.log('Email notifications sent successfully');
            } catch (emailError) {
                console.error('Failed to send email notifications:', emailError);
                // Don't fail the IPN if email fails
            }

        } else if (paymentStatus === 'FAILED' || paymentStatus === 'CANCELLED') {
            updatedOrder = updateOrderStatus(
                updatedOrder,
                'cancelled',
                'failed',
                data.pf_payment_id,
                data
            );

            console.log('Payment failed/cancelled for order:', updatedOrder.orderNumber);
        }

        // Save updated order
        orders[orderIndex] = updatedOrder;
        await fs.writeFile(ordersPath, JSON.stringify(orders, null, 2));

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('PayFast IPN error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
