import { type Package, type InsertPackage, type Inquiry, type InsertInquiry, type SearchParams } from "@shared/schema";
import { packageData } from "../shared/packageData.js";

export interface IStorage {
  // Package operations
  getPackages(params?: SearchParams): Promise<Package[]>;
  getPackage(id: number): Promise<Package | undefined>;
  getPackageByDestination(destination: string): Promise<Package | undefined>;
  createPackage(pkg: InsertPackage): Promise<Package>;

  // Inquiry operations
  getInquiries(): Promise<Inquiry[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
}

// Convert imported package data to match Package type
const basePackages: Package[] = packageData.map(p => ({
  ...p,
  rating: 0,
  reviews: 0,
  location: "",
  image: ""
}));

// Additional package data
const additionalPackages: Package[] = [
  {
    id: packageData.length + 1,
    rating: 0,
    reviews: 0,
    location: "",
    image: "",
    title: "Rajasthan Royal Heritage",
    description: "Journey through the royal state of Rajasthan, visiting majestic palaces, historic forts, and experiencing royal hospitality.",
    destination: "Udaipur - Jodhpur - Jaisalmer",
    price: 32000,
    duration: 8,
    category: "domestic",
    subCategory: "heritage",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    highlights: ["Lake Palace visit", "Mehrangarh Fort", "Camel safari", "Royal dining experience"],
    itinerary: [
      "Day 1-3: Udaipur - City Palace, Lake Pichola boat ride",
      "Day 4-5: Jodhpur - Mehrangarh Fort, blue city exploration",
      "Day 6-8: Jaisalmer - Golden Fort, camel safari in Thar desert"
    ]
  },
  {
    id: 4,
    rating: 0,
    reviews: 0,
    location: "",
    image: "",
    title: "Himalayan Adventure Trek",
    description: "Embark on an unforgettable trekking adventure in the majestic Himalayas with stunning mountain views and spiritual experiences.",
    destination: "Rishikesh - Valley of Flowers - Hemkund Sahib",
    price: 28000,
    duration: 10,
    category: "domestic",
    subCategory: "adventure",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    highlights: ["Valley of Flowers trek", "Hemkund Sahib pilgrimage", "River rafting", "Yoga sessions"],
    itinerary: [
      "Day 1-2: Rishikesh - River rafting, yoga ashram visit",
      "Day 3-7: Valley of Flowers trek with camping",
      "Day 8-10: Hemkund Sahib pilgrimage and return journey"
    ]
  },
  {
    id: 5,
    rating: 0,
    reviews: 0,
    location: "",
    image: "",
    title: "Goa Beach Paradise",
    description: "Relax on pristine beaches, enjoy water sports, and experience the vibrant nightlife of Goa's coastal paradise.",
    destination: "North Goa - South Goa",
    price: 15000,
    duration: 4,
    category: "domestic",
    subCategory: "beach",
    imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
    highlights: ["Beach hopping", "Water sports", "Portuguese heritage", "Sunset cruises"],
    itinerary: [
      "Day 1-2: North Goa - Baga, Calangute, Anjuna beaches",
      "Day 3-4: South Goa - Palolem, Agonda beaches, spice plantation"
    ]
  },
  {
    id: 6,
    rating: 0,
    reviews: 0,
    location: "",
    image: "",
    title: "Thailand Cultural Journey",
    description: "Explore the temples, floating markets, and vibrant street life of Thailand while experiencing authentic Thai culture and cuisine.",
    destination: "Bangkok - Chiang Mai - Phuket",
    price: 65000,
    duration: 7,
    category: "international",
    subCategory: "culture",
    imageUrl: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80",
    highlights: ["Grand Palace visit", "Floating markets", "Thai cooking class", "Island hopping"],
    itinerary: [
      "Day 1-3: Bangkok - Grand Palace, floating markets, street food tours",
      "Day 4-5: Chiang Mai - Temple visits, elephant sanctuary",
      "Day 6-7: Phuket - Beach relaxation, island hopping"
    ]
  },
  {
    id: 7,
    rating: 0,
    reviews: 0,
    location: "",
    image: "",
    title: "Dubai Luxury Experience",
    description: "Experience the opulence of Dubai with luxury shopping, desert safaris, and iconic landmark visits in this modern desert metropolis.",
    destination: "Dubai - Abu Dhabi",
    price: 55000,
    duration: 5,
    category: "international",
    subCategory: "luxury",
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    highlights: ["Burj Khalifa visit", "Desert safari", "Luxury shopping", "Marina cruise"],
    itinerary: [
      "Day 1-3: Dubai - Burj Khalifa, Dubai Mall, desert safari",
      "Day 4-5: Abu Dhabi - Sheikh Zayed Mosque, Ferrari World"
    ]
  },
  {
    id: 8,
    rating: 0,
    reviews: 0,
    location: "",
    image: "",
    title: "Singapore Modern Marvels",
    description: "Discover the futuristic cityscape of Singapore with its gardens, food culture, and architectural wonders.",
    destination: "Singapore",
    price: 48000,
    duration: 4,
    category: "international",
    subCategory: "city",
    imageUrl: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
    highlights: ["Gardens by the Bay", "Marina Bay Sands", "Hawker centers", "Universal Studios"],
    itinerary: [
      "Day 1-2: Marina Bay area, Gardens by the Bay, Singapore Flyer",
      "Day 3-4: Sentosa Island, Universal Studios, food tours"
    ]
  }
];

export class MemStorage implements IStorage {
  private packages: Package[] = [
    ...packageData.map(p => ({
      ...p,
      rating: 0,
      reviews: 0,
      location: "",
      image: ""
    })),
    ...additionalPackages
  ];
  private inquiries: Inquiry[] = [];
  private nextPackageId = packageData.length + additionalPackages.length + 1;
  private nextInquiryId = 1;

  async getPackages(params?: SearchParams): Promise<Package[]> {
    let filteredPackages = [...this.packages];

    // Apply filters
    if (params?.category && params.category.trim()) {
      const categoryTerm = params.category.toLowerCase();
      filteredPackages = filteredPackages.filter(pkg => pkg.category.toLowerCase() === categoryTerm);
    }
    if (params?.subCategory && params.subCategory.trim()) {
      const subCategoryTerm = params.subCategory.toLowerCase();
      filteredPackages = filteredPackages.filter(pkg => pkg.subCategory.toLowerCase() === subCategoryTerm);
    }
    if (params?.destination && params.destination.trim()) {
      const destinationTerm = params.destination.toLowerCase();
      filteredPackages = filteredPackages.filter(pkg => 
        pkg.destination.toLowerCase().includes(destinationTerm)
      );
    }
    if (params?.search && params.search.trim()) {
      const searchTerm = params.search.toLowerCase();
      filteredPackages = filteredPackages.filter(pkg => 
        pkg.title.toLowerCase().includes(searchTerm) ||
        pkg.description.toLowerCase().includes(searchTerm) ||
        pkg.destination.toLowerCase().includes(searchTerm) ||
        pkg.category.toLowerCase().includes(searchTerm) ||
        pkg.subCategory.toLowerCase().includes(searchTerm)
      );
    }
    if (params?.minPrice !== undefined) {
      filteredPackages = filteredPackages.filter(pkg => pkg.price >= parseInt(params.minPrice!, 10));
    }
    if (params?.maxPrice !== undefined) {
      filteredPackages = filteredPackages.filter(pkg => pkg.price <= parseInt(params.maxPrice!, 10));
    }
    if (params?.minDuration !== undefined) {
      filteredPackages = filteredPackages.filter(pkg => pkg.duration >= parseInt(params.minDuration!, 10));
    }
    if (params?.maxDuration !== undefined) {
      filteredPackages = filteredPackages.filter(pkg => pkg.duration <= parseInt(params.maxDuration!, 10));
    }

    // Apply sorting
    if (params?.sortBy) {
      switch (params.sortBy) {
        case 'price_asc':
          filteredPackages.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          filteredPackages.sort((a, b) => b.price - a.price);
          break;
        case 'duration_asc':
          filteredPackages.sort((a, b) => a.duration - b.duration);
          break;
        case 'duration_desc':
          filteredPackages.sort((a, b) => b.duration - a.duration);
          break;
      }
    }

    return filteredPackages;
  }

  async getPackage(id: number): Promise<Package | undefined> {
    return this.packages.find(pkg => pkg.id === id);
  }

  async getPackageByDestination(destination: string): Promise<Package | undefined> {
    return this.packages.find(pkg => 
      pkg.destination.toLowerCase() === destination.toLowerCase() ||
      pkg.title.toLowerCase().includes(destination.toLowerCase())
    );
  }

  async createPackage(pkg: InsertPackage): Promise<Package> {
    const newPackage: Package = {
      ...pkg,
      id: this.nextPackageId++,
      rating: 0,
      reviews: 0,
      location: "",
      image: ""
    };
    this.packages.push(newPackage);
    return newPackage;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return [...this.inquiries];
  }

  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: this.nextInquiryId++,
      whatsapp: inquiry.whatsapp || null,
      message: inquiry.message || null,
      createdAt: new Date()
    };
    this.inquiries.push(newInquiry);
    return newInquiry;
  }
}

export const storage = new MemStorage();