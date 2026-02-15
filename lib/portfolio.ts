export interface Project {
    id: string;
    title: string;
    category: string;
    image: string;
    images?: string[];
    description: string;
    content?: string;
    challenge?: string;
    solution?: string;
    client?: string;
    location?: string;
    date?: string;
}

export const constructionProjects: Project[] = [
    {
        "id": "billboards",
        "title": "Billboards",
        "category": "Billboards",
        "image": "/images/portfolio/billboards-main.jpg",
        "images": [
            "/images/portfolio/billboards-1.jpg",
            "/images/portfolio/billboards-2.jpg"
        ],
        "description": "Project showcase for Billboards",
        "client": "Client Name",
        "location": "South Africa"
    },
    {
        "id": "building-signage",
        "title": "Building Signage",
        "category": "Building Signage",
        "image": "/images/portfolio/building-signage-main.jpg",
        "images": [
            "/images/portfolio/building-signage-1.jpg",
            "/images/portfolio/building-signage-2.jpg",
            "/images/portfolio/building-signage-3.jpg",
            "/images/portfolio/building-signage-4.jpg",
            "/images/portfolio/building-signage-5.jpg",
            "/images/portfolio/building-signage-6.jpg",
            "/images/portfolio/building-signage-7.jpg",
            "/images/portfolio/building-signage-8.jpg",
            "/images/portfolio/building-signage-9.jpg",
            "/images/portfolio/building-signage-10.jpg",
            "/images/portfolio/building-signage-11.jpg",
            "/images/portfolio/building-signage-12.jpg"
        ],
        "description": "Project showcase for Building Signage",
        "client": "Client Name",
        "location": "South Africa"
    },
    {
        "id": "large-format-print",
        "title": "Large Format Print",
        "category": "Large Format Print",
        "image": "/images/portfolio/large-format-print-main.jpg",
        "images": [
            "/images/portfolio/large-format-print-1.jpg",
            "/images/portfolio/large-format-print-2.jpg"
        ],
        "description": "Project showcase for Large Format Print",
        "client": "Client Name",
        "location": "South Africa"
    },
    {
        "id": "set-building",
        "title": "Set Building",
        "category": "Set Building",
        "image": "/images/portfolio/set-building-main.jpg",
        "images": [
            "/images/portfolio/set-building-1.jpg",
            "/images/portfolio/set-building-2.jpg",
            "/images/portfolio/set-building-3.jpg",
            "/images/portfolio/set-building-4.jpg",
            "/images/portfolio/set-building-5.jpg",
            "/images/portfolio/set-building-6.jpg",
            "/images/portfolio/set-building-7.jpg",
            "/images/portfolio/set-building-8.jpg",
            "/images/portfolio/set-building-9.jpg",
            "/images/portfolio/set-building-10.jpg",
            "/images/portfolio/set-building-11.jpg",
            "/images/portfolio/set-building-12.jpg",
            "/images/portfolio/set-building-13.jpg",
            "/images/portfolio/set-building-14.jpg",
            "/images/portfolio/set-building-15.jpg",
            "/images/portfolio/set-building-16.jpg",
            "/images/portfolio/set-building-17.jpg",
            "/images/portfolio/set-building-18.jpg",
            "/images/portfolio/set-building-19.jpg",
            "/images/portfolio/set-building-20.jpg"
        ],
        "description": "Project showcase for Set Building",
        "client": "Client Name",
        "location": "South Africa"
    },
    {
        "id": "shop-front",
        "title": "Shop Front",
        "category": "Shop Front",
        "image": "/images/portfolio/shop-front-main.jpg",
        "images": [
            "/images/portfolio/shop-front-1.jpg",
            "/images/portfolio/shop-front-2.jpg",
            "/images/portfolio/shop-front-3.jpg",
            "/images/portfolio/shop-front-4.jpg",
            "/images/portfolio/shop-front-5.jpg",
            "/images/portfolio/shop-front-6.jpg",
            "/images/portfolio/shop-front-7.jpg",
            "/images/portfolio/shop-front-8.jpg",
            "/images/portfolio/shop-front-9.jpg",
            "/images/portfolio/shop-front-10.jpg",
            "/images/portfolio/shop-front-11.jpg",
            "/images/portfolio/shop-front-12.jpg",
            "/images/portfolio/shop-front-13.jpg",
            "/images/portfolio/shop-front-14.jpg",
            "/images/portfolio/shop-front-15.jpg",
            "/images/portfolio/shop-front-16.jpg",
            "/images/portfolio/shop-front-17.jpg",
            "/images/portfolio/shop-front-18.jpg",
            "/images/portfolio/shop-front-19.jpg"
        ],
        "description": "Project showcase for Shop Front",
        "client": "Client Name",
        "location": "South Africa"
    },
    {
        "id": "vehicle-rapping",
        "title": "Vehicle Rapping",
        "category": "Vehicle Rapping",
        "image": "/images/portfolio/vehicle-rapping-main.jpg",
        "images": [
            "/images/portfolio/vehicle-rapping-1.jpg",
            "/images/portfolio/vehicle-rapping-2.jpg",
            "/images/portfolio/vehicle-rapping-3.jpg",
            "/images/portfolio/vehicle-rapping-4.jpg"
        ],
        "description": "Project showcase for Vehicle Rapping",
        "client": "Client Name",
        "location": "South Africa"
    },
    {
        "id": "wayfinder",
        "title": "Wayfinder",
        "category": "Wayfinder",
        "image": "/images/portfolio/wayfinder-main.jpg",
        "images": [
            "/images/portfolio/wayfinder-1.jpg",
            "/images/portfolio/wayfinder-2.jpg",
            "/images/portfolio/wayfinder-3.jpg",
            "/images/portfolio/wayfinder-4.jpg",
            "/images/portfolio/wayfinder-5.jpg",
            "/images/portfolio/wayfinder-6.jpg",
            "/images/portfolio/wayfinder-7.jpg",
            "/images/portfolio/wayfinder-8.jpg",
            "/images/portfolio/wayfinder-9.jpg",
            "/images/portfolio/wayfinder-10.jpg",
            "/images/portfolio/wayfinder-11.jpg",
            "/images/portfolio/wayfinder-12.jpg",
            "/images/portfolio/wayfinder-13.jpg",
            "/images/portfolio/wayfinder-14.jpg",
            "/images/portfolio/wayfinder-15.jpg",
            "/images/portfolio/wayfinder-16.jpg",
            "/images/portfolio/wayfinder-17.jpg",
            "/images/portfolio/wayfinder-18.jpg",
            "/images/portfolio/wayfinder-19.jpg",
            "/images/portfolio/wayfinder-20.jpg"
        ],
        "description": "Project showcase for Wayfinder",
        "client": "Client Name",
        "location": "South Africa"
    }
];

export const portfolioCategories = [
    'All',
    'Billboards',
    'Building Signage',
    'Large Format Print',
    'Set Building',
    'Shop Front',
    'Vehicle Rapping',
    'Wayfinder'
];
