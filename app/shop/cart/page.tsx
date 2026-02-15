'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen">
                <Header />
                <main className="py-20">
                    <div className="max-w-[800px] mx-auto px-6 text-center">
                        <svg className="w-24 h-24 mx-auto text-light-grey mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h1 className="text-3xl font-bold text-charcoal mb-4">Your cart is empty</h1>
                        <p className="text-medium-grey mb-8">Add some products to get started!</p>
                        <Link
                            href="/shop"
                            className="inline-block px-8 py-3 bg-aloe-green text-charcoal font-semibold rounded hover:bg-green-hover transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Header />

            <main>
                {/* Page Header */}
                <section className="bg-bg-grey py-12">
                    <div className="max-w-[1400px] mx-auto px-6">
                        <h1 className="text-4xl font-bold text-charcoal mb-2">Shopping Cart</h1>
                        <p className="text-medium-grey">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
                    </div>
                </section>

                {/* Cart Content */}
                <section className="py-12">
                    <div className="max-w-[1400px] mx-auto px-6">
                        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
                            {/* Cart Items */}
                            <div className="space-y-4">
                                {cart.map(item => (
                                    <div
                                        key={item.cartId}
                                        className="bg-white border border-border-grey rounded p-6 flex gap-6"
                                    >
                                        {/* Product Image */}
                                        <div className="relative w-32 h-32 bg-bg-grey rounded flex-shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover rounded"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 space-y-3">
                                            <div>
                                                <Link href={`/shop/${item.id}`}>
                                                    <h3 className="font-bold text-charcoal hover:text-aloe-green transition-colors">
                                                        {item.name}
                                                    </h3>
                                                </Link>
                                                <p className="text-sm text-medium-grey">{item.size}</p>
                                                {item.selectedOptions && (
                                                    <div className="text-sm text-charcoal mt-1 space-y-0.5">
                                                        <p>• {item.selectedOptions.sides === 'single' ? 'Single Sided' : 'Double Sided'}</p>
                                                        <p>• Batch of {item.selectedOptions.quantity}</p>
                                                        {item.selectedOptions.artwork && <p>• Design / Artwork Included</p>}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="text-2xl font-bold text-aloe-green">
                                                R{formatPrice(item.price)}
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-4">
                                                {!item.selectedOptions ? (
                                                    <div className="flex items-center border border-border-grey rounded">
                                                        <button
                                                            onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                                                            className="px-4 py-2 hover:bg-bg-grey transition-colors"
                                                        >
                                                            −
                                                        </button>
                                                        <span className="px-6 py-2 border-x border-border-grey font-medium">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                                            className="px-4 py-2 hover:bg-bg-grey transition-colors"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="text-sm text-medium-grey italic">
                                                        Cannot change quantity of batch
                                                    </div>
                                                )}

                                                <button
                                                    onClick={() => removeFromCart(item.cartId)}
                                                    className="text-red-500 hover:underline text-sm"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>

                                        {/* Item Total */}
                                        <div className="text-right">
                                            <p className="text-sm text-medium-grey mb-1">Subtotal</p>
                                            <p className="text-2xl font-bold text-charcoal">
                                                R{formatPrice(item.price * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                {/* Clear Cart */}
                                <button
                                    onClick={clearCart}
                                    className="text-red-500 hover:underline text-sm"
                                >
                                    Clear entire cart
                                </button>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:sticky lg:top-24 h-fit">
                                <div className="bg-bg-grey rounded p-6 space-y-6">
                                    <h2 className="text-2xl font-bold text-charcoal">Order Summary</h2>

                                    <div className="space-y-3">
                                        <div className="flex justify-between text-medium-grey">
                                            <span>Subtotal</span>
                                            <span>R{formatPrice(getCartTotal())}</span>
                                        </div>
                                        <div className="flex justify-between text-medium-grey">
                                            <span>Shipping</span>
                                            <span className="text-aloe-green font-bold">FREE</span>
                                        </div>
                                        <div className="border-t border-border-grey pt-3 flex justify-between text-xl font-bold text-charcoal">
                                            <span>Total</span>
                                            <span>R{formatPrice(getCartTotal())}</span>
                                        </div>
                                    </div>

                                    <Link
                                        href="/shop/checkout"
                                        className="block w-full px-6 py-4 bg-aloe-green text-charcoal font-bold text-center rounded hover:bg-green-hover transition-colors"
                                    >
                                        Proceed to Checkout
                                    </Link>

                                    <Link
                                        href="/shop"
                                        className="block text-center text-aloe-green hover:underline"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
