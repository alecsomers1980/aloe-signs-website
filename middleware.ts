import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Check if accessing admin routes (except login page)
    if (request.nextUrl.pathname.startsWith('/admin') &&
        !request.nextUrl.pathname.startsWith('/admin/login')) {

        // Check for authentication cookie
        const authCookie = request.cookies.get('admin_auth');

        if (!authCookie || authCookie.value !== 'authenticated') {
            // Redirect to login page
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
