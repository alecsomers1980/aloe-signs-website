'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function Header() {
    const { getCartCount } = useCart();
    const cartCount = getCartCount();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center" onClick={closeMenu}>
                    <div className="relative h-16 w-48">
                        <Image
                            src="/aloe-logo.png"
                            alt="Aloe Signs Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-8">
                    <Link href="/" className="text-charcoal hover:text-aloe-green transition-colors">
                        Home
                    </Link>
                    <Link href="/about" className="text-charcoal hover:text-aloe-green transition-colors">
                        About
                    </Link>
                    <div className="relative group">
                        <button className="text-charcoal hover:text-aloe-green transition-colors flex items-center gap-1">
                            Services
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        <div className="absolute top-full left-0 pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            <div className="bg-white shadow-lg rounded-lg border border-border-grey overflow-hidden">
                                <div className="py-2">
                                    <Link href="/services/vehicle-branding" className="block px-4 py-2 text-charcoal hover:bg-bg-grey hover:text-aloe-green transition-colors">
                                        Vehicle Branding
                                    </Link>
                                    <Link href="/services/building-signage" className="block px-4 py-2 text-charcoal hover:bg-bg-grey hover:text-aloe-green transition-colors">
                                        Building Signage
                                    </Link>
                                    <Link href="/services/shopfronts" className="block px-4 py-2 text-charcoal hover:bg-bg-grey hover:text-aloe-green transition-colors">
                                        Shopfronts
                                    </Link>
                                    <Link href="/services/wayfinding-interior" className="block px-4 py-2 text-charcoal hover:bg-bg-grey hover:text-aloe-green transition-colors">
                                        Wayfinding & Interior
                                    </Link>
                                    <Link href="/services/billboards-outdoor" className="block px-4 py-2 text-charcoal hover:bg-bg-grey hover:text-aloe-green transition-colors">
                                        Billboards & Outdoor
                                    </Link>
                                    <Link href="/services/large-format-print" className="block px-4 py-2 text-charcoal hover:bg-bg-grey hover:text-aloe-green transition-colors">
                                        Large Format Print
                                    </Link>
                                    <Link href="/services/screen-printing" className="block px-4 py-2 text-charcoal hover:bg-bg-grey hover:text-aloe-green transition-colors">
                                        Screen Printing
                                    </Link>
                                    <Link href="/services/set-building" className="block px-4 py-2 text-charcoal hover:bg-bg-grey hover:text-aloe-green transition-colors">
                                        Set Building & Props
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link href="/portfolio" className="text-charcoal hover:text-aloe-green transition-colors">
                        Portfolio
                    </Link>
                    <Link href="/shop" className="text-charcoal hover:text-aloe-green transition-colors">
                        Shop
                    </Link>
                    <Link href="/order/track" className="text-charcoal hover:text-aloe-green transition-colors">
                        Track Order
                    </Link>
                    <Link href="/contact" className="text-charcoal hover:text-aloe-green transition-colors">
                        Contact
                    </Link>
                </nav>

                {/* Right Side */}
                <div className="hidden lg:flex items-center gap-4">
                    <a href="tel:0116932600" className="text-charcoal font-medium">
                        011 693 2600
                    </a>
                    <Link
                        href="/shop/cart"
                        className="relative p-2 hover:bg-bg-grey rounded transition-colors"
                    >
                        <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-aloe-green text-charcoal text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    <Link
                        href="/get-quote"
                        className="px-6 py-2.5 bg-aloe-green text-charcoal font-medium rounded hover:bg-green-hover transition-colors"
                    >
                        Get a Quote
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden flex items-center gap-4">
                    <Link
                        href="/shop/cart"
                        className="relative p-2 hover:bg-bg-grey rounded transition-colors"
                    >
                        <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-aloe-green text-charcoal text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    <button onClick={toggleMenu} className="p-2">
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 top-[88px] bg-white z-40 lg:hidden overflow-y-auto pb-20">
                    <nav className="flex flex-col p-6 space-y-4">
                        <Link href="/" onClick={closeMenu} className="text-xl font-medium text-charcoal border-b border-border-grey pb-2">
                            Home
                        </Link>
                        <Link href="/about" onClick={closeMenu} className="text-xl font-medium text-charcoal border-b border-border-grey pb-2">
                            About
                        </Link>

                        <div className="space-y-2">
                            <p className="text-xl font-medium text-charcoal pb-2">Services</p>
                            <div className="pl-4 flex flex-col space-y-3 border-l-2 border-aloe-green">
                                <Link href="/services/vehicle-branding" onClick={closeMenu} className="text-medium-grey">Vehicle Branding</Link>
                                <Link href="/services/building-signage" onClick={closeMenu} className="text-medium-grey">Building Signage</Link>
                                <Link href="/services/shopfronts" onClick={closeMenu} className="text-medium-grey">Shopfronts</Link>
                                <Link href="/services/wayfinding-interior" onClick={closeMenu} className="text-medium-grey">Wayfinding</Link>
                                <Link href="/services/billboards-outdoor" onClick={closeMenu} className="text-medium-grey">Billboards</Link>
                                <Link href="/services/large-format-print" onClick={closeMenu} className="text-medium-grey">Large Format</Link>
                                <Link href="/services/screen-printing" onClick={closeMenu} className="text-medium-grey">Screen Printing</Link>
                            </div>
                        </div>

                        <Link href="/portfolio" onClick={closeMenu} className="text-xl font-medium text-charcoal border-b border-border-grey pb-2">
                            Portfolio
                        </Link>
                        <Link href="/shop" onClick={closeMenu} className="text-xl font-medium text-charcoal border-b border-border-grey pb-2">
                            Shop
                        </Link>
                        <Link href="/order/track" onClick={closeMenu} className="text-xl font-medium text-charcoal border-b border-border-grey pb-2">
                            Track Order
                        </Link>
                        <Link href="/contact" onClick={closeMenu} className="text-xl font-medium text-charcoal border-b border-border-grey pb-2">
                            Contact
                        </Link>

                        <div className="pt-4 space-y-4">
                            <Link
                                href="/get-quote"
                                onClick={closeMenu}
                                className="block w-full py-4 bg-aloe-green text-charcoal font-bold text-center rounded text-lg"
                            >
                                Get a Quote
                            </Link>
                            <a
                                href="tel:0116932600"
                                className="block w-full py-4 border-2 border-charcoal text-charcoal font-bold text-center rounded text-lg"
                            >
                                Call 011 693 2600
                            </a>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
