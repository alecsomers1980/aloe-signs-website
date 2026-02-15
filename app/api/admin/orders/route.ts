import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Order } from '@/lib/orders';

export async function GET(request: NextRequest) {
    try {
        // Load orders
        const ordersPath = path.join(process.cwd(), 'data', 'orders.json');

        try {
            const ordersData = await fs.readFile(ordersPath, 'utf-8');
            const orders: Order[] = JSON.parse(ordersData);

            return NextResponse.json({ orders });

        } catch (error) {
            // If file doesn't exist, return empty array
            return NextResponse.json({ orders: [] });
        }

    } catch (error) {
        console.error('Get orders error:', error);
        return NextResponse.json(
            { error: 'Failed to get orders' },
            { status: 500 }
        );
    }
}
