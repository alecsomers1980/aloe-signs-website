import { NextRequest, NextResponse } from 'next/server';

// Admin credentials (in production, use environment variables and hashed passwords)
const ADMIN_USERNAME = 'Aloe';
const ADMIN_PASSWORD = '4l03S1gn@975';

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        // Validate credentials
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            // Create response with success
            const response = NextResponse.json({ success: true });

            // Set authentication cookie (expires in 24 hours)
            response.cookies.set('admin_auth', 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24, // 24 hours
                path: '/',
            });

            return response;
        } else {
            return NextResponse.json(
                { error: 'Invalid username or password' },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Login failed' },
            { status: 500 }
        );
    }
}
