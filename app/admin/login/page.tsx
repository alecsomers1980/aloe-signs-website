'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Redirect to admin dashboard
                router.push('/admin');
            } else {
                setError(data.error || 'Invalid credentials');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg-grey flex items-center justify-center px-6">
            <div className="max-w-md w-full">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-charcoal mb-2">Aloe Signs</h1>
                    <p className="text-medium-grey">Admin Login</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-charcoal mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full px-4 py-3 border-2 border-border-grey rounded-lg focus:outline-none focus:border-aloe-green"
                                placeholder="Enter username"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border-2 border-border-grey rounded-lg focus:outline-none focus:border-aloe-green"
                                placeholder="Enter password"
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-3 bg-aloe-green text-charcoal font-bold rounded-lg hover:bg-green-hover transition-colors disabled:bg-light-grey disabled:cursor-not-allowed"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    {/* Back to Website */}
                    <div className="mt-6 text-center">
                        <Link href="/" className="text-aloe-green hover:underline text-sm">
                            ← Back to Website
                        </Link>
                    </div>
                </div>

                {/* Security Notice */}
                <div className="mt-6 text-center text-sm text-medium-grey">
                    <p>🔒 Secure admin access</p>
                </div>
            </div>
        </div>
    );
}
