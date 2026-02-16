'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getProductById, products } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
    const params = useParams();
    const product = getProductById(params.id as string);
    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(6);
    const [sides, setSides] = useState<'single' | 'double'>('single');
    const [artwork, setArtwork] = useState(false);

    // Calculate dynamic price
    const currentPrice = useMemo(() => {
        if (!product || !product.pricingTiers) return product?.price || 0;

        const tier = product.pricingTiers.find(t => t.quantity === quantity);
        let price = 0;

        if (tier) {
            price = sides === 'single' ? tier.singlePrice : tier.doublePrice;
        }

        if (artwork && product.artworkFee) {
            price += product.artworkFee;
        }

        return price;
    }, [product, quantity, sides, artwork]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-charcoal mb-4">Product Not Found</h1>
                    <Link href="/shop" className="text-aloe-green hover:underline">
                        Back to Shop
                    </Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        if (product.pricingTiers) {
            addToCart(product, { quantity, sides, artwork });
        } else {
            addToCart(product);
        }
        alert(`${product.name} added to cart!`);
    };

    return (
        <div className="min-h-screen">
            <Header />

            <main>
                {/* Breadcrumb */}
                <section className="bg-bg-grey py-6">
                    <div className="max-w-[1400px] mx-auto px-6">
                        <nav className="text-sm text-medium-grey">
                            <Link href="/" className="hover:text-aloe-green">Home</Link>
                            <span className="mx-2">»</span>
                            <Link href="/shop" className="hover:text-aloe-green">Shop</Link>
                            <span className="mx-2">»</span>
                            <span className="text-charcoal">{product.name}</span>
                        </nav>
                    </div>
                </section>

                {/* Product Detail */}
                <section className="py-12">
                    <div className="max-w-[1400px] mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Product Image */}
                            <div className="relative aspect-square bg-bg-grey rounded overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                                {/* Discount icon removed as requested */}
                            </div>

                            {/* Product Info */}
                            <div className="space-y-6">
                                <div>
                                    <h1 className="text-4xl font-bold text-charcoal mb-2">
                                        {product.name}
                                    </h1>
                                    <p className="text-lg text-medium-grey">{product.size}</p>
                                </div>

                                {/* Pricing */}
                                <div className="space-y-2">
                                    {product.originalPrice && !product.pricingTiers && (
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl text-light-grey line-through">
                                                R{formatPrice(product.originalPrice)}
                                            </span>
                                            <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">
                                                Limited Time Offer
                                            </span>
                                        </div>
                                    )}
                                    <div className="text-5xl font-bold text-aloe-green">
                                        R{formatPrice(currentPrice)}
                                    </div>
                                    {product.pricingTiers && (
                                        <div className="space-y-1">
                                            <p className="text-xl font-bold text-charcoal">
                                                (R{formatPrice(currentPrice / quantity)} per board)
                                            </p>
                                            <p className="text-lg text-medium-grey">
                                                Total price for {quantity} units
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Description */}
                                <div>
                                    <h2 className="text-xl font-bold text-charcoal mb-3">Description</h2>
                                    <p className="text-medium-grey leading-relaxed whitespace-pre-wrap">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Product Options (For Matrix Pricing) */}
                                {product.pricingTiers && (
                                    <div className="space-y-6 bg-bg-grey p-6 rounded-lg border border-border-grey">
                                        <h3 className="font-bold text-charcoal text-lg">Configuration</h3>

                                        {/* Quantity */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-charcoal">Quantity</label>
                                            <div className="grid grid-cols-4 gap-2">
                                                {[6, 12, 24, 48].map((qty) => (
                                                    <button
                                                        key={qty}
                                                        onClick={() => setQuantity(qty)}
                                                        className={`py-2 px-4 rounded border text-center transition-colors ${quantity === qty
                                                            ? 'bg-aloe-green text-charcoal border-aloe-green font-bold'
                                                            : 'bg-white text-medium-grey border-border-grey hover:border-aloe-green'
                                                            }`}
                                                    >
                                                        {qty}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Sides */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-charcoal">Printing</label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <button
                                                    onClick={() => setSides('single')}
                                                    className={`py-3 px-4 rounded border text-center transition-colors ${sides === 'single'
                                                        ? 'bg-aloe-green text-charcoal border-aloe-green font-bold'
                                                        : 'bg-white text-medium-grey border-border-grey hover:border-aloe-green'
                                                        }`}
                                                >
                                                    Single Sided
                                                </button>
                                                <button
                                                    onClick={() => setSides('double')}
                                                    className={`py-3 px-4 rounded border text-center transition-colors ${sides === 'double'
                                                        ? 'bg-aloe-green text-charcoal border-aloe-green font-bold'
                                                        : 'bg-white text-medium-grey border-border-grey hover:border-aloe-green'
                                                        }`}
                                                >
                                                    Double Sided
                                                </button>
                                            </div>
                                        </div>

                                        {/* Artwork */}
                                        {product.artworkFee && (
                                            <div className="flex items-center gap-4 p-4 bg-white rounded border border-border-grey">
                                                <input
                                                    type="checkbox"
                                                    id="artwork"
                                                    checked={artwork}
                                                    onChange={(e) => setArtwork(e.target.checked)}
                                                    className="w-5 h-5 text-aloe-green rounded border-border-grey focus:ring-aloe-green"
                                                />
                                                <label htmlFor="artwork" className="flex-1 cursor-pointer select-none">
                                                    <span className="block font-medium text-charcoal">Design / Artwork Required?</span>
                                                    <span className="text-sm text-medium-grey">Add professional design for R{product.artworkFee}</span>
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Features */}
                                <div>
                                    <h2 className="text-xl font-bold text-charcoal mb-3">Features</h2>
                                    <ul className="space-y-2">
                                        {product.features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <svg
                                                    className="w-6 h-6 text-aloe-green flex-shrink-0 mt-0.5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-charcoal">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Stock Status */}
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                                    <span className="text-medium-grey">
                                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>

                                {/* Add to Cart */}
                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={!product.inStock}
                                        className="flex-1 px-8 py-4 bg-aloe-green text-charcoal font-bold text-lg rounded hover:bg-green-hover transition-colors disabled:bg-light-grey disabled:cursor-not-allowed"
                                    >
                                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                    </button>
                                    <Link
                                        href="/shop/cart"
                                        className="px-8 py-4 border-2 border-charcoal text-charcoal font-bold text-lg rounded hover:bg-charcoal hover:text-white transition-colors"
                                    >
                                        View Cart
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Similar Products */}
                <section className="py-12 bg-bg-grey">
                    <div className="max-w-[1400px] mx-auto px-6">
                        <h2 className="text-2xl font-bold text-charcoal mb-6">Similar Products</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products
                                .filter(p => p.category === product.category && p.id !== product.id)
                                .slice(0, 4)
                                .map(similarProduct => (
                                    <ProductCard key={similarProduct.id} product={similarProduct} />
                                ))
                            }
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
