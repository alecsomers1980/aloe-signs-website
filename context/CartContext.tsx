'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product } from '@/lib/data';

interface CartItem extends Product {
    quantity: number;
    cartId: string; // Unique ID for cart item (productId + options)
    selectedOptions?: {
        quantity: number; // For matrix pricing, this is the batch size
        sides: 'single' | 'double';
        artwork: boolean;
    };
    price: number; // Override price to be the calculated price per unit/batch
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, options?: { quantity: number; sides: 'single' | 'double'; artwork: boolean }) => void;
    removeFromCart: (cartId: string) => void;
    updateQuantity: (cartId: string, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('aloe-cart');
        if (savedCart) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('aloe-cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = useCallback((product: Product, options?: { quantity: number; sides: 'single' | 'double'; artwork: boolean }) => {
        setCart(prevCart => {
            // Generate unique ID based on options
            const optionsString = options ? JSON.stringify(options) : '';
            const cartId = `${product.id}-${optionsString}`;

            const existingItem = prevCart.find(item => item.cartId === cartId);

            if (existingItem) {
                // For matrix products (fixed batches), adding again adds another batch?
                // Or prevents adding if already there? 
                // Let's assume standard behavior: increment quantity (number of batches)
                return prevCart.map(item =>
                    item.cartId === cartId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            // Calculate price based on options
            let finalPrice = product.price;

            if (product.pricingTiers && options) {
                const tier = product.pricingTiers.find(t => t.quantity === options.quantity);
                if (tier) {
                    finalPrice = options.sides === 'single' ? tier.singlePrice : tier.doublePrice;
                }
                if (options.artwork && product.artworkFee) {
                    finalPrice += product.artworkFee;
                }
            }

            return [...prevCart, {
                ...product,
                price: finalPrice,
                quantity: 1,
                cartId,
                selectedOptions: options
            }];
        });
    }, []);

    const removeFromCart = useCallback((cartId: string) => {
        setCart(prevCart => prevCart.filter(item => item.cartId !== cartId));
    }, []);

    const updateQuantity = useCallback((cartId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(cartId);
            return;
        }

        setCart(prevCart =>
            prevCart.map(item =>
                item.cartId === cartId ? { ...item, quantity } : item
            )
        );
    }, [removeFromCart]);

    const clearCart = useCallback(() => {
        setCart([]);
    }, []);

    const getCartTotal = useCallback(() => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }, [cart]);

    const getCartCount = useCallback(() => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    }, [cart]);

    const value = React.useMemo(() => ({
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount
    }), [cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
}
