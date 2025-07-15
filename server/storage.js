// CommonJS version for Vercel deployment
const samplePackages = [
  {
    id: 1,
    title: "Golden Triangle Explorer",
    description: "Discover India's most iconic destinations: Delhi, Agra, and Jaipur. Experience the rich heritage, magnificent architecture, and vibrant culture of North India.",
    price: 25000,
    duration: "6 Days / 5 Nights",
    location: "Delhi - Agra - Jaipur",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500",
    category: "Cultural",
    highlights: ["Taj Mahal visit", "Red Fort exploration", "Amber Palace tour", "Local market shopping"],
    rating: 4.8,
    reviews: 145
  },
  {
    id: 2,
    title: "Kerala Backwaters Bliss",
    description: "Cruise through the serene backwaters of Alleppey and Kumarakom. Experience traditional houseboats, lush landscapes, and authentic Kerala cuisine.",
    price: 18000,
    duration: "4 Days / 3 Nights",
    location: "Alleppey - Kumarakom",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500",
    category: "Beach",
    highlights: ["Houseboat stay", "Backwater cruise", "Ayurvedic spa", "Traditional Kerala meals"],
    rating: 4.7,
    reviews: 98
  },
  {
    id: 3,
    title: "Himalayan Adventure Trek",
    description: "Challenge yourself with a thrilling trek through the majestic Himalayas. Perfect for adventure enthusiasts seeking breathtaking mountain views.",
    price: 35000,
    duration: "8 Days / 7 Nights",
    location: "Manali - Rohtang Pass",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
    category: "Adventure",
    highlights: ["Mountain trekking", "Camping under stars", "River rafting", "Local village visits"],
    rating: 4.9,
    reviews: 67
  },
  {
    id: 4,
    title: "Rajasthan Royal Heritage",
    description: "Step into the royal history of Rajasthan. Visit magnificent palaces, desert landscapes, and experience the rich cultural traditions.",
    price: 32000,
    duration: "7 Days / 6 Nights",
    location: "Udaipur - Jodhpur - Jaisalmer",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=500",
    category: "Cultural",
    highlights: ["Palace tours", "Desert safari", "Cultural performances", "Heritage hotels"],
    rating: 4.6,
    reviews: 123
  },
  {
    id: 5,
    title: "Goa Beach Paradise",
    description: "Relax on pristine beaches, enjoy water sports, and experience the vibrant nightlife of Goa. Perfect for a tropical getaway.",
    price: 15000,
    duration: "5 Days / 4 Nights",
    location: "North & South Goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500",
    category: "Beach",
    highlights: ["Beach activities", "Water sports", "Sunset cruises", "Local seafood"],
    rating: 4.5,
    reviews: 201
  },
  {
    id: 6,
    title: "Ladakh High Altitude Adventure",
    description: "Explore the mystical land of Ladakh with its stunning landscapes, ancient monasteries, and unique high-altitude desert terrain.",
    price: 42000,
    duration: "9 Days / 8 Nights",
    location: "Leh - Nubra Valley - Pangong Lake",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
    category: "Adventure",
    highlights: ["Monastery visits", "High-altitude lakes", "Desert safari", "Mountain passes"],
    rating: 4.8,
    reviews: 89
  },
  {
    id: 7,
    title: "South India Temple Trail",
    description: "Embark on a spiritual journey through South India's most sacred temples and experience rich cultural traditions.",
    price: 28000,
    duration: "8 Days / 7 Nights",
    location: "Chennai - Madurai - Thanjavur",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500",
    category: "Cultural",
    highlights: ["Ancient temples", "Classical music", "Traditional crafts", "Sacred rituals"],
    rating: 4.7,
    reviews: 76
  },
  {
    id: 8,
    title: "Kashmir Valley Escape",
    description: "Experience the paradise on earth with stunning valleys, pristine lakes, and snow-capped mountains in beautiful Kashmir.",
    price: 38000,
    duration: "6 Days / 5 Nights",
    location: "Srinagar - Gulmarg - Pahalgam",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
    category: "Mountain",
    highlights: ["Shikara rides", "Skiing in Gulmarg", "Valley treks", "Mughal gardens"],
    rating: 4.9,
    reviews: 112
  }
];

class MemStorage {
  constructor() {
    this.packages = [...samplePackages];
    this.inquiries = [];
    this.nextPackageId = 9;
    this.nextInquiryId = 1;
  }

  async getPackages(params = {}) {
    let filteredPackages = [...this.packages];
    
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filteredPackages = filteredPackages.filter(pkg =>
        pkg.title.toLowerCase().includes(searchTerm) ||
        pkg.description.toLowerCase().includes(searchTerm) ||
        pkg.location.toLowerCase().includes(searchTerm)
      );
    }
    
    if (params.category && params.category !== 'All') {
      filteredPackages = filteredPackages.filter(pkg => pkg.category === params.category);
    }
    
    if (params.minPrice) {
      filteredPackages = filteredPackages.filter(pkg => pkg.price >= parseInt(params.minPrice));
    }
    
    if (params.maxPrice) {
      filteredPackages = filteredPackages.filter(pkg => pkg.price <= parseInt(params.maxPrice));
    }
    
    return filteredPackages;
  }

  async getPackage(id) {
    return this.packages.find(pkg => pkg.id === id);
  }

  async createPackage(pkg) {
    const newPackage = {
      id: this.nextPackageId++,
      ...pkg,
      rating: 0,
      reviews: 0
    };
    this.packages.push(newPackage);
    return newPackage;
  }

  async getInquiries() {
    return this.inquiries;
  }

  async createInquiry(inquiry) {
    const newInquiry = {
      id: this.nextInquiryId++,
      ...inquiry,
      createdAt: new Date().toISOString()
    };
    this.inquiries.push(newInquiry);
    return newInquiry;
  }
}

const storage = new MemStorage();

module.exports = { storage };