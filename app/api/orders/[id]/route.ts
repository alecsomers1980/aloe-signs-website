import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { Order } from '@/lib/orders';

export async function GET(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const searchQuery = decodeURIComponent(params.id);
        const isEmail = searchQuery.includes('@');

        let order: Order | undefined;

        try {
            if (isEmail) {
                // Search by email - return the most recent order
                const result = await sql`
                    SELECT data FROM orders 
                    WHERE LOWER(customer_email) = LOWER(${searchQuery})
                    ORDER BY created_at DESC 
                    LIMIT 1
                `;
                if (result.rows.length > 0) {
                    order = result.rows[0].data as Order;
                }
            } else {
                // Search by order ID or order number
                const result = await sql`
                    SELECT data FROM orders 
                    WHERE id = ${searchQuery} OR order_number = ${searchQuery}
                    LIMIT 1
                `;
                if (result.rows.length > 0) {
                    order = result.rows[0].data as Order;
                }
            }

            if (!order) {
                return NextResponse.json(
                    { error: 'Order not found' },
                    { status: 404 }
                );
            }

            return NextResponse.json({ order });

        } catch (dbError) {
            console.error('Database error:', dbError);
            // Fallback for 404 if table doesn't exist yet
            return NextResponse.json(
                { error: 'Order not found (DB Error)' },
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

