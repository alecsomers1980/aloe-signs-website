import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Order } from '@/lib/orders';

export async function GET(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const searchQuery = params.id;

        // Load orders
        const ordersPath = path.join(process.cwd(), 'data', 'orders.json');

        try {
            const ordersData = await fs.readFile(ordersPath, 'utf-8');
            const orders: Order[] = JSON.parse(ordersData);

            // Check if search query is an email
            const isEmail = searchQuery.includes('@');

            let order: Order | undefined;

            if (isEmail) {
                // Search by email - return the most recent order
                const emailOrders = orders.filter(o =>
                    o.customerEmail.toLowerCase() === searchQuery.toLowerCase()
                );

                if (emailOrders.length > 0) {
                    // Sort by creation date and return most recent
                    order = emailOrders.sort((a, b) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    )[0];
                }
            } else {
                // Search by order ID or order number
                order = orders.find(o =>
                    o.id === searchQuery || o.orderNumber === searchQuery
                );
            }

            if (!order) {
                return NextResponse.json(
                    { error: 'Order not found' },
                    { status: 404 }
                );
            }

            return NextResponse.json({ order });

        } catch (error) {
            return NextResponse.json(
                { error: 'Orders file not found' },
                { status: 404 }
            );
        }

    } catch (error) {
        console.error('Get order error:', error);
        return NextResponse.json(
            { error: 'Failed to get order' },
            { status: 500 }
        );
    }
}
