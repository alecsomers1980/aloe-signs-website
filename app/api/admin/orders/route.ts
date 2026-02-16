import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { Order } from '@/lib/orders';

export async function GET(request: NextRequest) {
    try {
        // Load orders from Database
        try {
            const result = await sql`
                SELECT data FROM orders 
                ORDER BY created_at DESC
            `;

            const orders = result.rows.map(row => row.data as Order);

            return NextResponse.json({ orders });
        } catch (dbError) {
            // Handle table not existing yet or other DB errors
            console.error('Database connection failed:', dbError);
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

