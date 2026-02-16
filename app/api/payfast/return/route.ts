import { NextRequest, NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

/**
 * PayFast Return URL Handler
 * This endpoint handles the return from PayFast after payment
 */
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    // PayFast doesn't send much data on return, just redirects
    // The actual payment verification happens via IPN

    // Get order ID if available (from m_payment_id or manual orderId param)
    const orderId = searchParams.get('m_payment_id') || searchParams.get('orderId');

    if (orderId) {
        // Redirect to order confirmation page
        return redirect(`/order/confirmation?orderId=${orderId}`);
    }

    // Fallback to shop if no order ID
    return redirect('/shop');
}

export async function POST(request: NextRequest) {
    // Handle POST request the same way
    return GET(request);
}
