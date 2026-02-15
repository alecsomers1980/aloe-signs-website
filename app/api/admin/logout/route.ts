import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    // Create response
    const response = NextResponse.json({ success: true });

    // Clear authentication cookie
    response.cookies.delete('admin_auth');

    return response;
}
