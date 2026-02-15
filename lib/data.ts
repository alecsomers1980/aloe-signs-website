// Product data for the shop
export interface PricingTier {
    quantity: 6 | 12 | 24 | 48;
    singlePrice: number;
    doublePrice: number;
}

export interface Product {
    id: string;
    name: string;
    category: string;
    description: string;
    size: string;
    price: number; // Base price (displayed as starting from)
    originalPrice?: number;
    discount?: number;
    image: string;
    features: string[];
    inStock: boolean;
    pricingTiers?: PricingTier[];
    artworkFee?: number;
}

export const productsList: Product[] = [
    // Estate Agent Boards
    {
        id: 'estate-board-small',
        name: 'Estate Agent Board - Small',
        category: 'estate-boards',
        description: 'Professional correx estate agent board. Perfect for residential properties. Weatherproof and durable.\n\nPRICE INCLUDE SHIPPING TO YOUR NEAREST POSTNET OR PUDO',
        size: '600 x 400mm',
        price: 450,
        originalPrice: 3565,
        discount: 87,
        image: '/images/products/estate-agent-main.jpg',
        features: [
            '5mm correx material',
            'Full color printing',
            'Weatherproof',
            'Lightweight and durable',
            'Easy to install'
        ],
        inStock: true,
        artworkFee: 250,
        pricingTiers: [
            { quantity: 6, singlePrice: 450, doublePrice: 700 },
            { quantity: 12, singlePrice: 750, doublePrice: 1250 },
            { quantity: 24, singlePrice: 1250, doublePrice: 2050 },
            { quantity: 48, singlePrice: 2075, doublePrice: 3314 }
        ]
    },
    {
        id: 'estate-board-medium',
        name: 'Estate Agent Board - Medium',
        category: 'estate-boards',
        description: 'Medium-sized estate agent board for maximum visibility. High-quality correx construction.\n\nPRICE INCLUDE SHIPPING TO YOUR NEAREST POSTNET OR PUDO',
        size: '800 x 600mm',
        price: 950,
        originalPrice: 5190,
        discount: 85,
        image: '/images/products/estate-agent-main.jpg',
        features: [
            '5mm correx material',
            'Full color printing',
            'Weatherproof',
            'Lightweight and durable',
            'Easy to install'
        ],
        inStock: true,
        artworkFee: 250,
        pricingTiers: [
            { quantity: 6, singlePrice: 950, doublePrice: 980 },
            { quantity: 12, singlePrice: 1580, doublePrice: 1795 },
            { quantity: 24, singlePrice: 2825, doublePrice: 3100 },
            { quantity: 48, singlePrice: 4790, doublePrice: 4940 }
        ]
    },
    {
        id: 'estate-board-large',
        name: 'Estate Agent Board - Large',
        category: 'estate-boards',
        description: 'Large estate agent board for commercial and luxury properties. Premium quality.\n\nPRICE INCLUDE SHIPPING TO YOUR NEAREST POSTNET OR PUDO',
        size: '1200 x 800mm',
        price: 2130,
        originalPrice: 12710,
        discount: 87,
        image: '/images/products/estate-agent-main.jpg',
        features: [
            '5mm correx material',
            'Full color printing',
            'Weatherproof',
            'Lightweight and durable',
            'Easy to install'
        ],
        inStock: true,
        artworkFee: 250,
        pricingTiers: [
            { quantity: 6, singlePrice: 2130, doublePrice: 2590 },
            { quantity: 12, singlePrice: 3438, doublePrice: 4385 },
            { quantity: 24, singlePrice: 5763, doublePrice: 7425 },
            { quantity: 48, singlePrice: 9470, doublePrice: 12710 }
        ]
    }
];

export const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'estate-boards', name: 'Estate Agent Boards' },
    { id: 'safety-signs', name: 'Safety Signs' },
    { id: 'parking-signs', name: 'Parking Signs' },
    { id: 'property-signs', name: 'Property Signs' }
];

export function getProductById(id: string): Product | undefined {
    return productsList.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
    if (category === 'all') return productsList;
    return productsList.filter(p => p.category === category);
}

export function getLowestUnitPrice(product: Product): number | null {
    if (!product.pricingTiers || product.pricingTiers.length === 0) return null;

    // Calculate per-unit price for each tier (using single sided as it's the base price)
    // We want the lowest price per board
    const unitPrices = product.pricingTiers.map(tier => tier.singlePrice / tier.quantity);

    return Math.min(...unitPrices);
}


export const products = productsList;
export default productsList;

// End of file
