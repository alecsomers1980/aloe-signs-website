'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product, getLowestUnitPrice } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
        // We could use a toast here, but simple alert for now matches existing
        alert(`${product.name} added to cart!`);
    };

    return (
        <div className="bg-white border border-border-grey rounded overflow-hidden hover:shadow-lg transition-shadow group flex flex-col h-full">
            {/* Product Image */}
            <Link href={`/shop/${product.id}`} className="block relative aspect-square bg-bg-grey">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.discount && (
                    <div className="absolute top-4 left-4 bg-aloe-green text-charcoal px-3 py-1 rounded font-bold text-sm">
                        {product.category === 'estate-boards' ? 'Limited Stock Offer' : `SAVE ${product.discount}%`}
                    </div>
                )}
            </Link>

            {/* Product Info */}
            <div className="p-4 space-y-3 flex flex-col flex-1">
                <div className="flex-1">
                    <Link href={`/shop/${product.id}`}>
                        <h3 className="font-bold text-charcoal hover:text-aloe-green transition-colors text-lg">
                            {product.name}
                        </h3>
                    </Link>
                    <p className="text-sm text-medium-grey mt-1">{product.size}</p>
                </div>

                {/* Pricing */}
                <div className="space-y-1">
                    {product.originalPrice && !product.pricingTiers && (
                        <div className="flex items-center gap-2">
                            <span className="text-light-grey line-through">
                                R{formatPrice(product.originalPrice)}
                            </span>
                            <span className="text-red-500 text-xs font-semibold">
                                Limited Time
                            </span>
                        </div>
                    )}

                    {product.pricingTiers ? (
                        <div className="flex flex-col">
                            <span className="text-xs text-medium-grey uppercase tracking-wide">From</span>
                            <span className="text-2xl font-bold text-aloe-green">
                                R{formatPrice(Math.round(getLowestUnitPrice(product) || product.price))}
                                <span className="text-sm font-normal text-medium-grey ml-1">per board</span>
                            </span>
                        </div>
                    ) : (
                        <div className="text-2xl font-bold text-aloe-green">
                            R{formatPrice(product.price)}
                        </div>
                    )}
                </div>

                {/* Add to Cart / Select Options Button */}
                {product.pricingTiers ? (
                    <Link
                        href={`/shop/${product.id}`}
                        className="block w-full px-4 py-3 bg-charcoal text-white text-center font-bold rounded hover:bg-black transition-colors"
                    >
                        Select Options
                    </Link>
                ) : (
                    <button
                        onClick={handleAddToCart}
                        className="w-full px-4 py-3 bg-aloe-green text-charcoal font-bold rounded hover:bg-green-hover transition-colors"
                    >
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
}
