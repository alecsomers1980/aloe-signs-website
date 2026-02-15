import { NextRequest, NextResponse } from 'next/server';
import { createOrder, Order } from '@/lib/orders';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        const {
            customerName,
            customerEmail,
            customerPhone,
            customerAddress,
            items,
            subtotal,
            shipping,
            total
        } = body;

        if (!customerName || !customerEmail || !customerPhone || !customerAddress || !items || items.length === 0) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create the order
        const order = createOrder({
            customerName,
            customerEmail,
            customerPhone,
            customerAddress,
            items,
            subtotal,
            shipping,
            total
        });

        // Ensure data directory exists
        const dataDir = path.join(process.cwd(), 'data');
        try {
            await fs.mkdir(dataDir, { recursive: true });
        } catch (error) {
            // Directory might already exist
        }

        // Load existing orders
        const ordersPath = path.join(dataDir, 'orders.json');
        let orders: Order[] = [];

        try {
            const ordersData = await fs.readFile(ordersPath, 'utf-8');
            orders = JSON.parse(ordersData);
        } catch (error) {
            // File doesn't exist yet, start with empty array
            orders = [];
        }

        // Add new order
        orders.push(order);

        // Save orders
        await fs.writeFile(ordersPath, JSON.stringify(orders, null, 2));

        console.log('Order created:', order.orderNumber);

        return NextResponse.json({
            success: true,
            order: {
                id: order.id,
                orderNumber: order.orderNumber,
                total: order.total
            }
        });

    } catch (error) {
        console.error('Create order error:', error);
        return NextResponse.json(
            { error: 'Failed to create order' },
            { status: 500 }
        );
    }
}
