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
    let orderId = searchParams.get('m_payment_id') || searchParams.get('orderId');

    // Fallback: Check cookie if URL params are stripped
    if (!orderId) {
        orderId = request.cookies.get('pending_order_id')?.value || null;
        if (orderId) {
            console.log('Recovered OrderID from Cookie:', orderId);
        }
    }

    console.log('PayFast Return Hit');
    console.log('Search Params:', Object.fromEntries(searchParams.entries()));
    console.log('Derived OrderID:', orderId);

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
