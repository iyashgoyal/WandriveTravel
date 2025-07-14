import { type Package, type InsertPackage, type Inquiry, type InsertInquiry, type SearchParams } from "@shared/schema";

export interface IStorage {
  // Package operations
  getPackages(params?: SearchParams): Promise<Package[]>;
  getPackage(id: number): Promise<Package | undefined>;
  createPackage(pkg: InsertPackage): Promise<Package>;

  // Inquiry operations
  getInquiries(): Promise<Inquiry[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
}

// Sample travel packages for Indian market
const samplePackages: Package[] = [
  {
    id: 1,
    title: "Golden Triangle Explorer",
    description: "Discover India's most iconic destinations - Delhi, Agra, and Jaipur. Experience the rich heritage, magnificent monuments, and vibrant culture of these historic cities.",
    destination: "Delhi - Agra - Jaipur",
    price: 25000,
    duration: 6,
    category: "domestic",
    subCategory: "heritage",
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80",
    highlights: ["Taj Mahal visit", "Red Fort exploration", "Amber Palace tour", "Local cuisine tasting"],
    itinerary: [
      "Day 1-2: Delhi - Red Fort, India Gate, Lotus Temple",
      "Day 3-4: Agra - Taj Mahal, Agra Fort, Mehtab Bagh",
      "Day 5-6: Jaipur - Amber Palace, City Palace, Hawa Mahal"
    ]
  },
  {
    id: 2,
    title: "Kerala Backwaters Bliss",
    description: "Experience the tranquil beauty of Kerala's backwaters with houseboat stays, spice plantations, and pristine beaches.",
    destination: "Kochi - Alleppey - Munnar",
    price: 18000,
    duration: 5,
    category: "domestic",
    subCategory: "nature",
    imageUrl: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
    highlights: ["Houseboat cruise", "Spice plantation visit", "Tea garden tour", "Kathakali performance"],
    itinerary: [
      "Day 1: Kochi - Fort Kochi, Chinese Fishing Nets",
      "Day 2-3: Alleppey - Houseboat backwater cruise",
      "Day 4-5: Munnar - Tea plantations, hill station exploration"
    ]
  },
  {
    id: 3,
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
  private packages: Package[] = [...samplePackages];
  private inquiries: Inquiry[] = [];
  private nextPackageId = 9;
  private nextInquiryId = 1;

  async getPackages(params?: SearchParams): Promise<Package[]> {
    let filteredPackages = [...this.packages];

    // Apply filters
    if (params?.category) {
      filteredPackages = filteredPackages.filter(pkg => pkg.category === params.category);
    }
    if (params?.subCategory) {
      filteredPackages = filteredPackages.filter(pkg => pkg.subCategory === params.subCategory);
    }
    if (params?.destination) {
      filteredPackages = filteredPackages.filter(pkg => 
        pkg.destination.toLowerCase().includes(params.destination!.toLowerCase()) ||
        pkg.title.toLowerCase().includes(params.destination!.toLowerCase())
      );
    }
    if (params?.minPrice !== undefined) {
      filteredPackages = filteredPackages.filter(pkg => pkg.price >= params.minPrice!);
    }
    if (params?.maxPrice !== undefined) {
      filteredPackages = filteredPackages.filter(pkg => pkg.price <= params.maxPrice!);
    }
    if (params?.minDuration !== undefined) {
      filteredPackages = filteredPackages.filter(pkg => pkg.duration >= params.minDuration!);
    }
    if (params?.maxDuration !== undefined) {
      filteredPackages = filteredPackages.filter(pkg => pkg.duration <= params.maxDuration!);
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

  async createPackage(pkg: InsertPackage): Promise<Package> {
    const newPackage: Package = {
      ...pkg,
      id: this.nextPackageId++
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
      id: this.nextInquiryId++
    };
    this.inquiries.push(newInquiry);
    return newInquiry;
  }
}

export const storage = new MemStorage();