// data.ts

export type Property = {
    id: number;
    title: string;
    price: string;
    rating: number;
    image: string;
};

export const puneProperties: Property[] = [
    { id: 1, title: "Flat in Gahunie", price: "₹5,697", rating: 4.9, image: "/placeholder.svg?height=300&width=400" },
    { id: 2, title: "Flat in Pune", price: "₹4,108", rating: 5.0, image: "/placeholder.svg?height=300&width=400" },
    { id: 3, title: "Flat in Pune", price: "₹4,953", rating: 4.89, image: "/placeholder.svg?height=300&width=400" },
    { id: 4, title: "Guest suite in Pune", price: "₹4,451", rating: 4.82, image: "/placeholder.svg?height=300&width=400" },
    { id: 5, title: "Apartment in Pune", price: "₹6,391", rating: 4.83, image: "/placeholder.svg?height=300&width=400" },
    { id: 6, title: "Room in Pune", price: "₹2,693", rating: 4.89, image: "/placeholder.svg?height=300&width=400" },
    { id: 7, title: "Flat in Gahunie", price: "₹5,236", rating: 4.83, image: "/placeholder.svg?height=300&width=400" },
];

export const goaProperties: Property[] = [
    { id: 8, title: "Villa in South Goa", price: "₹8,500", rating: 4.95, image: "/placeholder.svg?height=300&width=400" },
    { id: 9, title: "Beach House in Goa", price: "₹12,000", rating: 4.88, image: "/placeholder.svg?height=300&width=400" },
    { id: 10, title: "Resort in South Goa", price: "₹15,600", rating: 4.92, image: "/placeholder.svg?height=300&width=400" },
    { id: 11, title: "Villa with Pool", price: "₹18,900", rating: 4.87, image: "/placeholder.svg?height=300&width=400" },
    { id: 12, title: "Luxury Villa", price: "₹22,400", rating: 4.94, image: "/placeholder.svg?height=300&width=400" },
    { id: 13, title: "Game Room Villa", price: "₹16,800", rating: 4.91, image: "/placeholder.svg?height=300&width=400" },
    { id: 14, title: "Modern Apartment", price: "₹9,200", rating: 4.86, image: "/placeholder.svg?height=300&width=400" },
    { id: 15, title: "Cozy Studio", price: "₹7,500", rating: 4.89, image: "/placeholder.svg?height=300&width=400" },
];
