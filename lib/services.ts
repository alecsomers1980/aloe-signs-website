import {
    Truck,
    Building2,
    Store,
    MapPin,
    Frame,
    FileText,
    Tag,
    PenTool,
    Car,
    Lightbulb,
    Palette,
    Shield,
    CheckCircle,
    Users,
    Clock,
    Award,
    Maximize,
    Image,
    Flag,
    type LucideIcon,
} from 'lucide-react';

export interface ServiceData {
    slug: string;
    title: string;
    tagline: string;
    description: string;
    features: {
        icon: LucideIcon;
        title: string;
        description: string;
    }[];
    process: {
        number: string;
        title: string;
        description: string;
    }[];
    benefits: string[];
}

export const services: ServiceData[] = [
    {
        slug: 'vehicle-branding',
        title: 'Vehicle Branding',
        tagline: 'Turn your fleet into a mobile marketing asset',
        description: 'Full wraps, partial wraps, and fleet programmes designed and installed in-house',
        features: [
            {
                icon: Car,
                title: 'Full Vehicle Wraps',
                description: 'Complete vehicle transformation with high-quality vinyl wraps that protect your paintwork.',
            },
            {
                icon: Palette,
                title: 'Partial Wraps & Decals',
                description: 'Cost-effective branding solutions with strategic placement for maximum impact.',
            },
            {
                icon: Users,
                title: 'Fleet Branding Programmes',
                description: 'Consistent branding across your entire fleet with volume discounts available.',
            },
            {
                icon: Shield,
                title: 'Vehicle Magnets',
                description: 'Removable magnetic signs perfect for temporary branding or multi-use vehicles.',
            },
            {
                icon: Lightbulb,
                title: 'Window Graphics',
                description: 'One-way vision graphics for privacy and advertising without blocking visibility.',
            },
            {
                icon: Award,
                title: 'Reflective & Safety Markings',
                description: 'Compliant safety markings and reflective materials for commercial vehicles.',
            },
        ],
        process: [
            {
                number: '1',
                title: 'Consultation & Measurement',
                description: 'We assess your vehicle and discuss design options. Accurate measurements taken on-site.',
            },
            {
                number: '2',
                title: 'Design & Mockups',
                description: '3D mockups created for your approval. Unlimited revisions until you\'re satisfied.',
            },
            {
                number: '3',
                title: 'Professional Installation',
                description: 'Expert installation by certified applicators in our climate-controlled facility.',
            },
            {
                number: '4',
                title: 'Quality Check & Handover',
                description: 'Thorough inspection and care instructions provided. 5-year warranty included.',
            },
        ],
        benefits: [
            'In-house design and installation team',
            '5-year warranty on all wraps',
            'Premium 3M and Avery vinyl materials',
            'Climate-controlled installation facility',
            'Fleet discounts available',
            'Nationwide installation service',
        ],
    },
    {
        slug: 'building-signage',
        title: 'Building Signage',
        tagline: 'Make your building work for your brand',
        description: 'From fascia signs to 3D lettering—manufactured and installed by our team',
        features: [
            {
                icon: Building2,
                title: 'Fascia Signs',
                description: 'Eye-catching shopfront signs that make your business stand out from the street.',
            },
            {
                icon: Maximize,
                title: 'Pylon Signs',
                description: 'Freestanding signs for maximum visibility from roads and highways.',
            },
            {
                icon: Lightbulb,
                title: '3D Lettering',
                description: 'Dimensional letters and logos that add depth and premium appeal.',
            },
            {
                icon: Lightbulb,
                title: 'Lightboxes & Illuminated Signs',
                description: 'LED-illuminated signs for 24/7 visibility and impact.',
            },
            {
                icon: Palette,
                title: 'Channel Letters',
                description: 'Individual illuminated letters for a sophisticated, modern look.',
            },
            {
                icon: Award,
                title: 'Monument Signs',
                description: 'Ground-level signs that create a strong, permanent presence.',
            },
        ],
        process: [
            {
                number: '1',
                title: 'Site Survey',
                description: 'We visit your location to assess mounting options and local regulations.',
            },
            {
                number: '2',
                title: 'Design & Engineering',
                description: 'Custom designs created with structural engineering for safe installation.',
            },
            {
                number: '3',
                title: 'Manufacturing',
                description: 'Built in-house using premium materials and quality craftsmanship.',
            },
            {
                number: '4',
                title: 'Installation & Certification',
                description: 'Professional installation with all necessary permits and certificates.',
            },
        ],
        benefits: [
            'Full in-house manufacturing',
            'Structural engineering included',
            'Permit application assistance',
            'LED lighting with low energy costs',
            'Maintenance plans available',
            'Nationwide installation',
        ],
    },
    {
        slug: 'shopfronts',
        title: 'Shopfront Signage',
        tagline: 'First impressions that convert',
        description: 'Complete shopfront design, fascias, window graphics, and A-frames',
        features: [
            {
                icon: Store,
                title: 'Shopfront Fascias',
                description: 'Complete fascia design and installation to transform your storefront.',
            },
            {
                icon: Palette,
                title: 'Window Graphics & Vinyl',
                description: 'Promotional graphics, frosted privacy film, and full-color displays.',
            },
            {
                icon: Frame,
                title: 'A-Frames & Pavement Signs',
                description: 'Portable signs to attract foot traffic and promote daily specials.',
            },
            {
                icon: Building2,
                title: 'Blade Signs',
                description: 'Projecting signs that catch attention from both directions.',
            },
            {
                icon: Lightbulb,
                title: 'Door Graphics',
                description: 'Branded entrance graphics including opening hours and contact details.',
            },
            {
                icon: MapPin,
                title: 'Interior Branding',
                description: 'Extend your brand inside with wall graphics and directional signage.',
            },
        ],
        process: [
            {
                number: '1',
                title: 'Shopfront Consultation',
                description: 'We assess your space and discuss your brand vision and customer flow.',
            },
            {
                number: '2',
                title: 'Complete Design Package',
                description: 'Comprehensive design including all signage elements for approval.',
            },
            {
                number: '3',
                title: 'Coordinated Production',
                description: 'All elements manufactured together for consistent quality and timing.',
            },
            {
                number: '4',
                title: 'Installation & Setup',
                description: 'Complete installation with minimal disruption to your business.',
            },
        ],
        benefits: [
            'Complete shopfront packages',
            'Coordinated design across all elements',
            'After-hours installation available',
            'Durable outdoor-rated materials',
            'Maintenance and updates included',
            'Fast turnaround times',
        ],
    },
    {
        slug: 'wayfinding-interior',
        title: 'Wayfinding & Interior Signage',
        tagline: 'Guide your customers with clarity',
        description: 'Directional signage, office branding, and interior graphics',
        features: [
            {
                icon: MapPin,
                title: 'Directional Signage',
                description: 'Clear wayfinding systems that help visitors navigate your space.',
            },
            {
                icon: Building2,
                title: 'Office Door Signs',
                description: 'Professional room identification and department signage.',
            },
            {
                icon: Palette,
                title: 'Wall Graphics & Murals',
                description: 'Transform blank walls into branded spaces with custom graphics.',
            },
            {
                icon: MapPin,
                title: 'Floor Graphics',
                description: 'Durable floor decals for directions, branding, or social distancing.',
            },
            {
                icon: Building2,
                title: 'Reception Signage',
                description: 'Make a strong first impression with premium reception area branding.',
            },
            {
                icon: Shield,
                title: 'Safety & Compliance Signs',
                description: 'SABS-compliant safety signage for fire exits, hazards, and regulations.',
            },
        ],
        process: [
            {
                number: '1',
                title: 'Space Assessment',
                description: 'We map your space and identify key wayfinding and branding opportunities.',
            },
            {
                number: '2',
                title: 'Signage Strategy',
                description: 'Comprehensive plan for consistent signage throughout your facility.',
            },
            {
                number: '3',
                title: 'Design & Approval',
                description: 'Mockups showing how signage will look in your actual space.',
            },
            {
                number: '4',
                title: 'Installation',
                description: 'Professional installation with minimal disruption to operations.',
            },
        ],
        benefits: [
            'Comprehensive wayfinding systems',
            'SABS-compliant safety signage',
            'Durable materials for high-traffic areas',
            'ADA/accessibility compliance available',
            'Modular systems for easy updates',
            'After-hours installation',
        ],
    },
    {
        slug: 'billboards-outdoor',
        title: 'Billboards & Outdoor Advertising',
        tagline: 'Make a big impact',
        description: 'Large-scale outdoor advertising that gets noticed',
        features: [
            {
                icon: Image,
                title: 'Billboard Printing & Installation',
                description: 'Large-format printing for roadside billboards and advertising structures.',
            },
            {
                icon: Image,
                title: 'Outdoor Banners',
                description: 'PVC and mesh banners for outdoor advertising and events.',
            },
            {
                icon: Building2,
                title: 'Mesh Banners',
                description: 'Wind-resistant mesh for large outdoor installations and building wraps.',
            },
            {
                icon: Flag,
                title: 'Event Signage',
                description: 'Temporary signage for festivals, exhibitions, and outdoor events.',
            },
            {
                icon: Building2,
                title: 'Construction Site Signage',
                description: 'Durable site boards and safety signage for construction projects.',
            },
            {
                icon: Shield,
                title: 'Temporary Hoardings',
                description: 'Branded hoarding panels for construction sites and renovations.',
            },
        ],
        process: [
            {
                number: '1',
                title: 'Site Evaluation',
                description: 'We assess the location, size requirements, and mounting options.',
            },
            {
                number: '2',
                title: 'Design for Distance',
                description: 'Graphics optimized for visibility from specific viewing distances.',
            },
            {
                number: '3',
                title: 'Large Format Production',
                description: 'Printed on weather-resistant materials with UV protection.',
            },
            {
                number: '4',
                title: 'Professional Installation',
                description: 'Safe installation by trained teams with proper equipment and permits.',
            },
        ],
        benefits: [
            'Large-format printing up to 5m wide',
            'Weather-resistant materials',
            'UV-protected inks for longevity',
            'Structural engineering for large installations',
            'Permit application assistance',
            'Nationwide installation',
        ],
    },
    {
        slug: 'large-format-print',
        title: 'Large Format Printing',
        tagline: 'Print anything, any size',
        description: 'High-quality large format printing for all applications',
        features: [
            {
                icon: FileText,
                title: 'Banners & PVC',
                description: 'Durable PVC banners for indoor and outdoor use in any size.',
            },
            {
                icon: Palette,
                title: 'Posters & Wallpapers',
                description: 'High-resolution posters and custom wallpaper for any space.',
            },
            {
                icon: Palette,
                title: 'Canvas Prints',
                description: 'Gallery-quality canvas prints for art, photography, and decor.',
            },
            {
                icon: Tag,
                title: 'Fabric Printing',
                description: 'Soft fabric prints for displays, backdrops, and textile applications.',
            },
            {
                icon: Lightbulb,
                title: 'Backlit Graphics',
                description: 'Translucent prints for lightboxes and illuminated displays.',
            },
            {
                icon: Image,
                title: 'Exhibition Graphics',
                description: 'Complete exhibition stand graphics including pop-up displays.',
            },
        ],
        process: [
            {
                number: '1',
                title: 'File Preparation',
                description: 'We check your artwork or create designs to ensure perfect output.',
            },
            {
                number: '2',
                title: 'Material Selection',
                description: 'Choose the right substrate for your application and environment.',
            },
            {
                number: '3',
                title: 'High-Quality Printing',
                description: 'Printed on state-of-the-art equipment with color-matched inks.',
            },
            {
                number: '4',
                title: 'Finishing & Delivery',
                description: 'Hemmed, eyeleted, or mounted as required. Delivered or installed.',
            },
        ],
        benefits: [
            'Print widths up to 5 meters',
            'Same-day printing available',
            'Color matching and proofing',
            'Multiple finishing options',
            'Indoor and outdoor materials',
            'Nationwide delivery',
        ],
    },
    {
        slug: 'screen-printing',
        title: 'Screen Printing',
        tagline: 'Quality printing for apparel & products',
        description: 'Custom screen printing for clothing, promotional items, and more',
        features: [
            {
                icon: Tag,
                title: 'T-Shirt Printing',
                description: 'Custom t-shirts with vibrant, long-lasting prints.',
            },
            {
                icon: Users,
                title: 'Workwear Branding',
                description: 'Professional branding for uniforms, overalls, and corporate wear.',
            },
            {
                icon: Award,
                title: 'Promotional Products',
                description: 'Branded merchandise including bags, caps, and accessories.',
            },
            {
                icon: Palette,
                title: 'Bags & Accessories',
                description: 'Custom printing on tote bags, backpacks, and promotional items.',
            },
            {
                icon: Users,
                title: 'Bulk Orders',
                description: 'Volume discounts for large orders and corporate programs.',
            },
            {
                icon: Palette,
                title: 'Custom Designs',
                description: 'In-house design team to create unique artwork for your brand.',
            },
        ],
        process: [
            {
                number: '1',
                title: 'Design & Artwork',
                description: 'We create or refine your artwork for optimal screen printing results.',
            },
            {
                number: '2',
                title: 'Sample Approval',
                description: 'Physical sample produced for your approval before bulk production.',
            },
            {
                number: '3',
                title: 'Screen Production',
                description: 'Screens prepared with your design for consistent, quality printing.',
            },
            {
                number: '4',
                title: 'Printing & Quality Control',
                description: 'Each item printed and inspected to ensure consistent quality.',
            },
        ],
        benefits: [
            'No minimum order quantities',
            'Fast turnaround times',
            'Eco-friendly water-based inks',
            'Multi-color printing available',
            'Quality garments and products',
            'Volume discounts',
        ],
    },
    {
        slug: 'set-building',
        title: 'Set Building & Props',
        tagline: 'Bring your vision to life',
        description: 'Custom set design and construction for events, film, and exhibitions',
        features: [
            {
                icon: PenTool,
                title: 'Event Sets & Backdrops',
                description: 'Custom-built sets and backdrops for conferences, launches, and events.',
            },
            {
                icon: Building2,
                title: 'Exhibition Stands',
                description: 'Modular and custom exhibition stands that showcase your brand.',
            },
            {
                icon: Store,
                title: 'Retail Displays',
                description: 'Point-of-sale displays and retail fixtures that drive sales.',
            },
            {
                icon: Palette,
                title: 'Props & 3D Elements',
                description: 'Custom fabricated props and dimensional elements for any project.',
            },
            {
                icon: PenTool,
                title: 'Custom Fabrication',
                description: 'Bespoke builds using wood, metal, acrylic, and composite materials.',
            },
            {
                icon: Users,
                title: 'Installation Services',
                description: 'Professional setup and breakdown by our experienced team.',
            },
        ],
        process: [
            {
                number: '1',
                title: 'Concept Development',
                description: 'We work with you to understand your vision and requirements.',
            },
            {
                number: '2',
                title: '3D Visualization',
                description: 'Detailed 3D renders showing exactly how your set will look.',
            },
            {
                number: '3',
                title: 'Fabrication',
                description: 'Built in our workshop using quality materials and craftsmanship.',
            },
            {
                number: '4',
                title: 'Installation & Support',
                description: 'On-site installation with technical support throughout your event.',
            },
        ],
        benefits: [
            'Full in-house fabrication',
            '3D rendering and visualization',
            'Modular designs for reuse',
            'Storage solutions available',
            'Nationwide installation',
            'Technical support on-site',
        ],
    },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
    return services.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
    return services.map((service) => service.slug);
}
