'use client';

import { products, getLowestUnitPrice } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

// Filter for featured/special products (using IDs as before)
const featuredProductIds = ['estate-board-small', 'estate-board-medium', 'estate-board-large'];
const featuredProducts = products.filter(p => featuredProductIds.includes(p.id));

export default function ShopSpecials() {
    return (
        <section className="py-20 bg-charcoal">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Featured Specials
                    </h2>
                    <p className="text-light-grey text-lg">
                        Save big on our most popular products
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {featuredProducts.map((product) => (
                        <div key={product.id} className="h-full">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {/* View All Link */}
                <div className="text-center mt-12">
                    <Link
                        href="/shop"
                        className="inline-block px-8 py-3 border-2 border-white text-white font-semibold rounded hover:bg-white hover:text-charcoal transition-colors"
                    >
                        View All Products
                    </Link>
                </div>
            </div>
        </section>
    );
}
