import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
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

        // Fetch current order from DB
        const result = await sql`SELECT data FROM orders WHERE id = ${orderId}`;

        if (result.rows.length === 0) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }

        const currentOrder = result.rows[0].data as Order;
        const previousStatus = currentOrder.status;

        // Update the order status
        const updatedOrder = updateOrderStatus(currentOrder, status);

        // Update DB
        await sql`
            UPDATE orders 
            SET 
                status = ${updatedOrder.status}, 
                payment_status = ${updatedOrder.paymentStatus}, 
                updated_at = ${updatedOrder.updatedAt}, 
                data = ${JSON.stringify(updatedOrder)}
            WHERE id = ${orderId}
        `;

        // Send status update email to customer
        try {
            await sendOrderStatusUpdateEmail(updatedOrder, previousStatus);
            console.log(`Status update email sent for order ${updatedOrder.orderNumber}`);
        } catch (emailError) {
            console.error('Failed to send status update email:', emailError);
        }

        return NextResponse.json({
            success: true,
            order: updatedOrder
        });

    } catch (error) {
        console.error('Update order status error:', error);
        return NextResponse.json(
            { error: 'Failed to update order status' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const orderId = params.id;

        // Verify admin auth (cookie check)
        const authCookie = request.cookies.get('admin_auth');
        if (authCookie?.value !== 'true') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Delete from DB
        const result = await sql`DELETE FROM orders WHERE id = ${orderId}`;

        if (result.rowCount === 0) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Delete order error:', error);
        return NextResponse.json(
            { error: 'Failed to delete order' },
            { status: 500 }
        );
    }
}
