'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products, categories, Product, getLowestUnitPrice } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

export default function ShopPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState([0, 15000]);
    const { addToCart } = useCart();

    const filteredProducts = products.filter(product => {
        const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
        const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
        return categoryMatch && priceMatch;
    });

    const handleAddToCart = (product: Product) => {
        addToCart(product);
        // Show toast notification (optional)
        alert(`${product.name} added to cart!`);
    };

    return (
        <div className="min-h-screen">
            <Header />

            <main>
                {/* Page Header (Rich Hero) */}
                <div className="relative bg-charcoal text-white py-20 md:py-32">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '40px 40px'
                        }}></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-2 text-sm text-light-grey mb-6">
                                <Link href="/" className="hover:text-aloe-green transition-colors">
                                    Home
                                </Link>
                                <span>/</span>
                                <span className="text-white">Shop</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                                Shop
                            </h1>
                            <p className="text-lg md:text-xl text-light-grey">
                                Professional signage products delivered fast
                            </p>
                        </div>
                    </div>
                </div>

                {/* Shop Content */}
                <section className="py-12">
                    <div className="max-w-[1400px] mx-auto px-6">
                        <div className="grid lg:grid-cols-[250px_1fr] gap-8">
                            {/* Sidebar Filters */}
                            <aside className="space-y-6">
                                {/* Categories */}
                                <div>
                                    <h3 className="font-bold text-charcoal mb-4">Categories</h3>
                                    <ul className="space-y-2">
                                        {categories.map(category => (
                                            <li key={category.id}>
                                                <button
                                                    onClick={() => setSelectedCategory(category.id)}
                                                    className={`w-full text-left px-3 py-2 rounded transition-colors ${selectedCategory === category.id
                                                        ? 'bg-aloe-green text-charcoal font-medium'
                                                        : 'text-medium-grey hover:bg-bg-grey'
                                                        }`}
                                                >
                                                    {category.name}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Price Range */}
                                <div>
                                    <h3 className="font-bold text-charcoal mb-4">Price Range</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm text-medium-grey">
                                            <span>R{priceRange[0]}</span>
                                            <span>R{priceRange[1]}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="15000"
                                            step="100"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                            className="w-full"
                                        />
                                        <button
                                            onClick={() => setPriceRange([0, 15000])}
                                            className="text-sm text-aloe-green hover:underline"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            </aside>

                            {/* Product Grid */}
                            <div>
                                {/* Results Header */}
                                <div className="flex justify-between items-center mb-6">
                                    <p className="text-medium-grey">
                                        Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
                                    </p>
                                    <select className="px-4 py-2 border border-border-grey rounded">
                                        <option>Default sorting</option>
                                        <option>Price: Low to High</option>
                                        <option>Price: High to Low</option>
                                        <option>Newest</option>
                                    </select>
                                </div>

                                {/* Products */}
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredProducts.map(product => (
                                        <div key={product.id} className="h-full">
                                            <ProductCard product={product} />
                                        </div>
                                    ))}
                                </div>

                                {/* No Results */}
                                {filteredProducts.length === 0 && (
                                    <div className="text-center py-12">
                                        <p className="text-medium-grey text-lg">No products found matching your criteria.</p>
                                        <button
                                            onClick={() => {
                                                setSelectedCategory('all');
                                                setPriceRange([0, 15000]);
                                            }}
                                            className="mt-4 text-aloe-green hover:underline"
                                        >
                                            Clear all filters
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
