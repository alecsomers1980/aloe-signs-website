import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Order, updateOrderStatus } from '@/lib/orders';
import { sendOrderStatusUpdateEmail } from '@/lib/email';

export async function PATCH(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const orderId = params.id;
        const body = await request.json();
        const { status } = body;

        if (!status) {
            return NextResponse.json(
                { error: 'Status is required' },
                { status: 400 }
            );
        }

        // Validate status
        const validStatuses = ['pending', 'paid', 'processing', 'shipped', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { error: 'Invalid status' },
                { status: 400 }
            );
        }

        // Load orders
        const ordersPath = path.join(process.cwd(), 'data', 'orders.json');

        try {
            const ordersData = await fs.readFile(ordersPath, 'utf-8');
            let orders: Order[] = JSON.parse(ordersData);

            // Find the order
            const orderIndex = orders.findIndex(o => o.id === orderId);

            if (orderIndex === -1) {
                return NextResponse.json(
                    { error: 'Order not found' },
                    { status: 404 }
                );
            }

            // Store previous status for email
            const previousStatus = orders[orderIndex].status;

            // Update the order status
            orders[orderIndex] = updateOrderStatus(orders[orderIndex], status);

            // Save updated orders
            await fs.writeFile(ordersPath, JSON.stringify(orders, null, 2));

            // Send status update email to customer
            try {
                await sendOrderStatusUpdateEmail(orders[orderIndex], previousStatus);
                console.log(`Status update email sent for order ${orders[orderIndex].orderNumber}`);
            } catch (emailError) {
                console.error('Failed to send status update email:', emailError);
                // Don't fail the request if email fails
            }

            return NextResponse.json({
                success: true,
                order: orders[orderIndex]
            });

        } catch (error) {
            return NextResponse.json(
                { error: 'Orders file not found' },
                { status: 404 }
            );
        }

    } catch (error) {
        console.error('Update order status error:', error);
        return NextResponse.json(
            { error: 'Failed to update order status' },
            { status: 500 }
        );
    }
}
