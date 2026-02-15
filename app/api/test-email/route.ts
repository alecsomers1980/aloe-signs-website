import { NextRequest, NextResponse } from 'next/server';
import { sendOrderConfirmationEmail, sendAdminOrderNotification } from '@/lib/email';

import fs from 'fs/promises';
import path from 'path';

/**
 * Test Email Endpoint
 * Use this to test email sending functionality
 * GET /api/test-email?orderId=some-order-id
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const orderId = searchParams.get('orderId');

        if (!orderId) {
            return NextResponse.json(
                { error: 'orderId parameter is required' },
                { status: 400 }
            );
        }

        // Load orders
        const ordersPath = path.join(process.cwd(), 'data', 'orders.json');
        const ordersData = await fs.readFile(ordersPath, 'utf-8');
        const orders = JSON.parse(ordersData);

        // Find the order
        const order = orders.find((o: any) => o.id === orderId);

        if (!order) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }

        // Send test emails
        const results = {
            orderConfirmation: false,
            adminNotification: false,
        };

        try {
            results.orderConfirmation = await sendOrderConfirmationEmail(order);
        } catch (error) {
            console.error('Order confirmation email failed:', error);
        }

        try {
            results.adminNotification = await sendAdminOrderNotification(order);
        } catch (error) {
            console.error('Admin notification email failed:', error);
        }

        return NextResponse.json({
            success: true,
            message: 'Test emails sent',
            results,
            order: {
                id: order.id,
                orderNumber: order.orderNumber,
                customerEmail: order.customerEmail,
            },
        });

    } catch (error) {
        console.error('Test email error:', error);
        return NextResponse.json(
            { error: 'Failed to send test emails', details: String(error) },
            { status: 500 }
        );
    }
}
