import { Package } from './schema';

// Define the package data with explicit typing and required fields
// Updated image URLs - July 2025
export const packageData: Array<Omit<Package, 'rating' | 'reviews' | 'location' | 'image'> & {
  rating?: number | null;
  reviews?: number | null;
  location?: string | null;
  image?: string | null;
}> = [
  // Domestic Packages
  {
    id: 1,
    title: "Himachal Adventure Package",
    description: "Himachal Pradesh is a stunning hill state in North India, known for its snow-capped mountains, serene valleys, and charming hill stations. Whether it's the colonial vibes of Shimla, the adventure-filled Manali, the spiritual calm of Dharamshala, or the untouched beauty of Spiti – Himachal offers a perfect mix of nature, culture, and thrill.",
    destination: "Himachal Pradesh",
    price: 17000,
    duration: 5,
    category: "domestic",
    subCategory: "mountain",
    imageUrl: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
    highlights: ["Explore Mall Road & Ridge in Shimla", "Visit Kufri – snow views, horse rides & fun park", "Scenic drive through Kullu Valley", "Enjoy adventure in Solang Valley – paragliding, ATV, ropeway", "Optional visit to Atal Tunnel or Rohtang Pass", "Discover Hidimba Temple, Vashisht Hot Springs, & Tibetan Monastery"],
    itinerary: ["Arrival in Shimla - Pick-up from Chandigarh/Delhi, drive to Shimla, explore Mall Road & Ridge", "Shimla – Kufri & Local Sightseeing - Visit Kufri, Jakhoo Temple, shopping", "Shimla to Manali via Kullu Valley - Scenic drive, Pandoh Dam, Beas River, Kullu Shawl Factory", "Manali – Solang Valley & Adventure - Visit Solang Valley, snow activities, optional Atal Tunnel", "Manali Local Sightseeing – Departure - Hidimba Temple, Vashisht Hot Springs, drop at Chandigarh/Delhi"]
  },
  {
    id: 2,
    title: "Uttrakhand Divine Journey",
    description: "Uttarakhand, nestled in the Himalayas, is known for its spiritual charm, natural beauty, adventure and serene hill stations. It's home to the Ganges River, sacred temples, dense forests, snow-capped peaks, and tranquil lakes. Whether you're seeking spirituality, trekking, or just a relaxing escape – Uttarakhand has it all.",
    destination: "Uttrakhand",
    price: 18000,
    duration: 6,
    category: "domestic",
    subCategory: "spiritual",
    imageUrl: "https://plus.unsplash.com/premium_photo-1697730398251-40cd8dc57e0b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800&q=80",
    highlights: ["Haridwar Ganga Aarti", "Temples & Ashrams in Rishikesh", "Adventure Like-Rafting, Bungee Jumping in Rishikesh", "Mussoorie Hill Station Charm", "Kempty Falls, Gun Hill, Lal Tibba", "Visit Dehradun attractions & markets"],
    itinerary: ["Delhi to Haridwar - Drive to Haridwar, evening Ganga Aarti at Har Ki Pauri", "Haridwar to Rishikesh - Visit Ram Jhula, Laxman Jhula, Beatles Ashram, optional rafting/bungee", "Rishikesh to Mussoorie - Drive to Mussoorie via Dehradun, explore Mall Road", "Mussoorie Local Sightseeing - Kempty Falls, Gun Hill, Camel's Back Road, Lal Tibba", "Mussoorie to Dehradun - Visit Forest Research Institute, Buddha Temple, Clock Tower", "Dehradun to Delhi - Drive back to Delhi with drop-off"]
  },
  {
    id: 3,
    title: "Andaman Island Paradise",
    description: "The Andaman Islands, located in the Bay of Bengal, are a tropical paradise famous for crystal-clear waters, white sandy beaches, coral reefs, and historic landmarks. Ideal for couples, families, and adventure lovers, it offers a perfect blend of relaxation and thrill – all under stunning island skies.",
    destination: "Andaman Islands",
    price: 21000,
    duration: 5,
    category: "domestic",
    subCategory: "beach",
    imageUrl: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80",
    highlights: ["Radhanagar Beach – Asia's top-ranked beach (Havelock)", "Snorkeling & Scuba Diving – at Elephant Beach, North Bay", "Cellular Jail Light & Sound Show – historical experience", "Glass-bottom boat rides, kayaking, and coral reef walks", "Neil Island – serene, scenic, and peaceful beaches", "Port Blair – museums, Ross Island, and seafood cafés"],
    itinerary: ["Arrival in Port Blair – Cellular Jail - Visit Cellular Jail and Light & Sound Show", "Port Blair to Havelock Island - Ferry to Havelock, visit Radhanagar Beach", "Havelock – Water Adventures - Scuba diving/snorkeling at Elephant Beach, water sports", "Havelock to Port Blair - Ferry back, visit Chidiya Tapu or Aberdeen Bazaar", "Departure - Transfer to airport with island memories"]
  },

  {
    "id": 4,
    "title": "Royal Rajasthan Tour",
    "description": "Rajasthan – the Land of Kings – is India's royal gem, filled with palaces, forts, desert landscapes, colorful bazaars, and vibrant culture. From the pink streets of Jaipur to the golden sands of Jaisalmer, every city tells a tale of grandeur, tradition, and heritage. Perfect for culture lovers, architecture admirers, history enthusiasts, and luxury travelers.",
    "destination": "Rajasthan",
    "price": 24500,
    "duration": 7,
    "category": "domestic",
    "subCategory": "heritage",
    "imageUrl": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
    "highlights": [
      "Explore the royal palaces & forts of Jaipur, Udaipur & Jodhpur",
      "Ride a camel in the Thar Desert (Jaisalmer) and enjoy desert camping",
      "Boat ride on Lake Pichola in Udaipur – the Venice of the East",
      "Visit UNESCO World Heritage Sites like Amer Fort & Jantar Mantar",
      "Shop vibrant handicrafts, textiles, and jewelry in local markets",
      "Enjoy traditional folk dance & Rajasthani cuisine"
    ],
    "itinerary": [
      "Arrival in Jaipur – Pink City Tour - City Palace, Jantar Mantar, Hawa Mahal",
      "Jaipur – Amer Fort & Local Experience - Amer Fort, Jal Mahal, cultural show",
      "Jaipur to Jodhpur - Visit Mehrangarh Fort, blue city lanes",
      "Jodhpur to Jaisalmer - Jaisalmer Fort, Patwon Ki Haveli",
      "Jaisalmer – Desert Safari & Camping - Camel ride, cultural dance at desert camp",
      "Jaisalmer to Udaipur - Lake Pichola boat ride",
      "Udaipur Sightseeing – Departure - City Palace, Jagdish Temple"
    ]
  },
  {
    "id": 5,
    "title": "Golden Triangle Classic",
    "description": "The Golden Triangle is India's most famous tourist circuit connecting Delhi, Agra, and Jaipur. It beautifully blends Mughal grandeur, Rajputana royalty, and modern charm. This route is perfect for first-time visitors who want to experience India's rich history, heritage, architecture, and food in a short trip.",
    "destination": "Delhi-Agra-Jaipur",
    "price": 17500,
    "duration": 5,
    "category": "domestic",
    "subCategory": "heritage",
    "imageUrl": "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80",
    "highlights": [
      "Explore UNESCO sites like the Taj Mahal, Qutub Minar, and Amer Fort",
      "Visit India Gate, Lotus Temple, and Red Fort in Delhi",
      "Discover the pink-walled city of Jaipur and shop for traditional handicrafts",
      "Enjoy Mughal cuisine in Agra and royal Rajasthani thalis in Jaipur",
      "A perfect mix of history, culture, shopping, and architecture"
    ],
    "itinerary": [
      "Arrival in Delhi – Local Sightseeing - India Gate, Qutub Minar, Lotus Temple",
      "Delhi to Agra - Visit Taj Mahal, Agra Fort, Mehtab Bagh",
      "Agra to Jaipur via Fatehpur Sikri - Explore the Mughal ghost town",
      "Jaipur Sightseeing – Royal Heritage Tour - Amer Fort, City Palace, Hawa Mahal",
      "Jaipur to Delhi – Departure - Return with heritage memories"
    ]
  },
  {
    "id": 6,
    "title": "Ladakh Adventure Trek",
    "description": "Experience one of the most beautiful places on earth, often called the Land of High Passes. Ladakh offers breathtaking landscapes, Buddhist culture, and thrilling high-altitude adventures. With its moon-like terrain, crystal-clear lakes, and ancient monasteries, Ladakh is a paradise for adventure seekers and spiritual travelers alike.",
    "destination": "Ladakh",
    "price": 32000,
    "duration": 7,
    "category": "domestic",
    "subCategory": "adventure",
    "imageUrl": "https://images.pexels.com/photos/3392154/pexels-photo-3392154.jpeg?w=800&q=80",
    "highlights": [
      "Visit the stunning Pangong Tso Lake featured in Bollywood movies",
      "Explore ancient Buddhist monasteries like Hemis, Thiksey, and Diskit",
      "Experience the world's highest motorable pass at Khardung La (18,380 ft)",
      "Witness the confluence of Indus and Zanskar rivers",
      "Adventure activities like river rafting, trekking, and camel safari in Nubra Valley"
    ],
    "itinerary": [
      "Arrival in Leh - Acclimatization and Local Market Visit",
      "Leh to Nubra Valley via Khardung La - Camel Safari in Hunder",
      "Nubra Valley to Pangong Tso - Overnight at World's Most Beautiful Lake",
      "Pangong Tso to Leh via Chang La Pass - Scenic Mountain Drive",
      "Leh Local Sightseeing - Monasteries and Cultural Sites",
      "Adventure Day - River Rafting and Trekking Options",
      "Departure from Leh - Return with High Altitude Memories"
    ]
  },
  {
    "id": 7,
    "title": "Sikkim-Darjeeling Expedition",
    "description": "Sikkim and Darjeeling together offer one of India's most scenic mountain experiences. From the toy train rides through tea gardens to breathtaking Himalayan views, Buddhist monasteries, and alpine landscapes, this region combines colonial charm with natural beauty and spiritual tranquility.",
    "destination": "Sikkim-Darjeeling",
    "price": 24000,
    "duration": 6,
    "category": "domestic",
    "subCategory": "nature",
    "imageUrl": "https://images.pexels.com/photos/953497/pexels-photo-953497.jpeg?w=800&q=80",
    "highlights": [
      "Experience the UNESCO World Heritage Darjeeling Himalayan Railway (Toy Train)",
      "Witness the spectacular sunrise over Mount Kanchenjunga from Tiger Hill",
      "Explore Buddhist monasteries and learn about Tibetan culture",
      "Walk through lush tea gardens and visit tea factories",
      "Enjoy panoramic Himalayan views and alpine adventures",
      "Discover the charm of Gangtok and local Sikkimese culture"
    ],
    "itinerary": [
      "Arrival in Darjeeling - Toy Train Ride and Local Sightseeing",
      "Tiger Hill Sunrise and Tea Garden Tours - Visit tea factories and Japanese Peace Pagoda",
      "Darjeeling to Pelling - Drive through scenic mountain roads, visit Pemayangtse Monastery",
      "Pelling to Gangtok - Visit Khecheopalri Lake, drive to Gangtok",
      "Gangtok Local Sightseeing - Enchey Monastery, Flower Exhibition Center, local markets",
      "Departure - Transfer to Bagdogra Airport with mountain memories"
    ]
  },
  {
    "id": 8,
    "title": "Meghalaya Nature Tour",
    "description": "Meghalaya, meaning 'The Abode of Clouds', is a spectacular state in Northeast India famous for its living root bridges, stunning waterfalls, crystal-clear rivers, and unique Khasi culture. It's one of the wettest places on earth and offers incredible natural wonders that you won't find anywhere else.",
    "destination": "Meghalaya",
    "price": 22500,
    "duration": 5,
    "category": "domestic",
    "subCategory": "nature",
    "imageUrl": "https://images.pexels.com/photos/1403036/pexels-photo-1403036.jpeg?w=800&q=80",
    "highlights": [
      "Walk across the famous Double Decker Living Root Bridge in Cherrapunji",
      "Experience the crystal-clear waters of Dawki River with boating",
      "Visit Asia's cleanest village – Mawlynnong with its living root bridge",
      "Explore the magnificent Nohkalikai Falls and Seven Sisters Falls",
      "Discover mysterious caves like Mawsmai Cave and limestone formations",
      "Enjoy the Scotland-like landscapes of Shillong with its rolling hills and lakes"
    ],
    "itinerary": [
      "Arrival in Shillong - City tour, Ward's Lake, Shillong Peak",
      "Shillong to Cherrapunji - Nohkalikai Falls, Seven Sisters Falls, Mawsmai Cave",
      "Cherrapunji Living Root Bridge Trek - Trek to Double Decker Living Root Bridge",
      "Cherrapunji to Dawki and Mawlynnong - Crystal clear river boating, cleanest village tour",
      "Return to Shillong - Departure with nature's memories"
    ]
  },
  {
    "id": 9,
    "title": "Kashmir Paradise Package",
    "description": "Kashmir, rightfully called 'Paradise on Earth', is a breathtaking valley surrounded by snow-capped mountains, pristine lakes, and lush meadows. With its houseboats, Mughal gardens, skiing opportunities, and warm hospitality, Kashmir offers an unforgettable experience of natural beauty and cultural richness.",
    "destination": "Kashmir",
    "price": 28000,
    "duration": 6,
    "category": "domestic",
    "subCategory": "nature",
    "imageUrl": "https://images.pexels.com/photos/2907578/pexels-photo-2907578.jpeg?w=800&q=80",
    "highlights": [
      "Stay in traditional houseboats on the famous Dal Lake",
      "Experience the 'Meadow of Flowers' at Gulmarg with cable car rides",
      "Explore the 'Valley of Shepherds' – Pahalgam with its pine forests",
      "Visit the beautiful Mughal Gardens – Shalimar Bagh, Nishat Bagh",
      "Enjoy Shikara rides on Dal Lake with floating markets",
      "Experience snow activities and possible skiing in Gulmarg (season dependent)"
    ],
    "itinerary": [
      "Arrival in Srinagar - Houseboat check-in, Shikara ride on Dal Lake",
      "Srinagar Local Sightseeing - Mughal Gardens, Jamia Masjid, local markets",
      "Srinagar to Gulmarg - Cable car ride, snow activities, alpine meadows",
      "Gulmarg to Pahalgam via Srinagar - Valley of shepherds, Betaab Valley",
      "Pahalgam Local Sightseeing - Aru Valley, Chandanwari, nature walks",
      "Pahalgam to Srinagar - Departure with paradise memories"
    ]
  },
  {
    "id": 10,
    "title": "Arunachal Explorer",
    "description": "Arunachal Pradesh, the 'Land of Rising Sun', is India's easternmost state known for its pristine landscapes, Buddhist monasteries, diverse tribal culture, and untouched natural beauty. It offers a unique blend of adventure, spirituality, and cultural exploration in the Eastern Himalayas.",
    "destination": "Arunachal Pradesh",
    "price": 32000,
    "duration": 7,
    "category": "domestic",
    "subCategory": "adventure",
    "imageUrl": "https://images.pexels.com/photos/15386580/pexels-photo-15386580.jpeg?w=800&q=80",
    "highlights": [
      "Visit the largest Buddhist monastery in India – Tawang Monastery",
      "Experience the birth place of 6th Dalai Lama at Tawang",
      "Cross the stunning Sela Pass (13,700 ft) with frozen lake views",
      "Discover diverse tribal cultures and traditional villages",
      "Explore pristine valleys, waterfalls, and alpine lakes",
      "Experience authentic Tibetan-Buddhist culture and cuisine"
    ],
    "itinerary": [
      "Arrival in Guwahati - Transfer to Bomdila via Tezpur",
      "Bomdila to Tawang - Cross Sela Pass, visit Jaswantgarh War Memorial",
      "Tawang Local Sightseeing - Tawang Monastery, Urgelling Monastery, Ani Gompa",
      "Tawang to Dirang - Visit local villages and hot springs",
      "Dirang to Ziro Valley - Apple orchards, Apatani tribal villages",
      "Ziro Valley Exploration - Cultural immersion, local markets",
      "Ziro to Guwahati - Departure with Himalayan memories"
    ]
  },
  {
    "id": 11,
    "title": "Goa Beach Holiday",
    "description": "Goa, India's smallest state, is famous for its stunning beaches, vibrant nightlife, Portuguese colonial heritage, and laid-back coastal culture. Whether you're seeking party vibes, peaceful relaxation, historical exploration, or water adventures, Goa offers the perfect tropical escape with its unique blend of Indian and Portuguese influences.",
    "destination": "Goa",
    "price": 16500,
    "duration": 4,
    "category": "domestic",
    "subCategory": "beach",
    "imageUrl": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
    "highlights": [
      "Explore famous beaches – Baga, Calangute, Anjuna, and peaceful Palolem",
      "Experience thrilling water sports – parasailing, jet skiing, scuba diving",
      "Discover UNESCO World Heritage churches in Old Goa",
      "Enjoy vibrant nightlife and beach shacks with live music",
      "Taste authentic Goan cuisine – seafood, vindaloo, bebinca",
      "Visit spice plantations and experience Portuguese colonial architecture"
    ],
    "itinerary": [
      "Arrival in Goa - North Goa beaches, Calangute and Baga Beach",
      "North Goa Water Sports and Nightlife - Anjuna Beach, flea market, Fort Aguada",
      "Old Goa Heritage Tour - Basilica of Bom Jesus, Se Cathedral, spice plantation",
      "South Goa Relaxation - Palolem Beach, Colva Beach, departure"
    ]
  },
  {
    "id": 12,
    "title": "Kerala Backwaters",
    "description": "Kerala, 'God's Own Country', is a tropical paradise famous for its serene backwaters, lush hill stations, pristine beaches, Ayurvedic treatments, and rich cultural heritage. From houseboat cruises through palm-fringed canals to tea plantation walks in misty mountains, Kerala offers a perfect blend of relaxation and natural beauty.",
    "destination": "Kerala",
    "price": 19500,
    "duration": 5,
    "category": "domestic",
    "subCategory": "nature",
    "imageUrl": "https://images.pexels.com/photos/30778230/pexels-photo-30778230.jpeg?w=800&q=80",
    "highlights": [
      "Stay in traditional houseboats on Alleppey backwaters",
      "Explore spice plantations and tea gardens in Munnar",
      "Experience authentic Ayurvedic treatments and wellness",
      "Visit historic Chinese fishing nets and colonial architecture in Kochi",
      "Enjoy Kathakali performances and traditional Kerala cuisine",
      "Relax on pristine beaches and witness beautiful sunsets"
    ],
    "itinerary": [
      "Arrival in Kochi - Explore Fort Kochi, Chinese fishing nets, spice markets",
      "Kochi to Munnar - Tea plantation tours, Eravikulam National Park",
      "Munnar Hill Station - Mattupetty Dam, Echo Point, spice garden visits",
      "Munnar to Alleppey - Check into traditional houseboat, backwater cruise",
      "Alleppey to Kochi - Departure with tropical memories"
    ]
  },
  {
    "id": 13,
    "title": "Karnataka Heritage",
    "description": "Karnataka is a treasure trove of ancient history, architectural marvels, and diverse landscapes. From the magnificent ruins of Hampi to the royal splendor of Mysore Palace, coffee plantations of Coorg, and wildlife sanctuaries, Karnataka offers a perfect blend of heritage, nature, and adventure.",
    "destination": "Karnataka",
    "price": 21000,
    "duration": 6,
    "category": "domestic",
    "subCategory": "heritage",
    "imageUrl": "https://images.pexels.com/photos/739987/pexels-photo-739987.jpeg?w=800&q=80",
    "highlights": [
      "Explore the UNESCO World Heritage site of Hampi with its ancient ruins",
      "Visit the magnificent Mysore Palace and witness the royal grandeur",
      "Experience coffee plantation tours and stay in Coorg's scenic hills",
      "Discover Vijayanagara Empire history through stone temples and monuments",
      "Enjoy wildlife safaris and bird watching in natural sanctuaries",
      "Taste authentic Karnataka cuisine and local coffee"
    ],
    "itinerary": [
      "Arrival in Bangalore - City tour, Lalbagh Botanical Garden",
      "Bangalore to Mysore - Mysore Palace, Chamundi Hill, local markets",
      "Mysore to Coorg - Coffee plantation tours, scenic hill station",
      "Coorg Local Sightseeing - Abbey Falls, Raja's Seat, spice gardens",
      "Coorg to Hampi - Ancient ruins exploration, Virupaksha Temple",
      "Hampi to Bangalore - Departure with heritage memories"
    ]
  },
  {
    "id": 14,
    "title": "Tamil Nadu Temple Tour",
    "description": "Tamil Nadu is the heartland of South Indian culture, famous for its magnificent temples, classical arts, rich heritage, and diverse landscapes. From ancient Dravidian architecture to serene hill stations, beautiful beaches, and vibrant festivals, Tamil Nadu offers a deep dive into India's cultural soul.",
    "destination": "Tamil Nadu",
    "price": 18500,
    "duration": 5,
    "category": "domestic",
    "subCategory": "spiritual",
    "imageUrl": "https://images.pexels.com/photos/774282/pexels-photo-774282.jpeg?w=800&q=80",
    "highlights": [
      "Visit the magnificent Meenakshi Temple and experience its architectural grandeur",
      "Explore UNESCO World Heritage sites in Mahabalipuram",
      "Witness classical Bharatanatyam dance performances",
      "Discover ancient Tamil culture and traditions",
      "Visit historic temples showcasing Dravidian architecture",
      "Experience authentic South Indian cuisine and temple festivals"
    ],
    "itinerary": [
      "Arrival in Chennai - Marina Beach, Kapaleeshwarar Temple, local culture",
      "Chennai to Mahabalipuram - Shore Temple, Five Rathas, UNESCO heritage sites",
      "Mahabalipuram to Madurai - Journey to the temple city",
      "Madurai Temple Tour - Meenakshi Amman Temple, Thirumalai Nayakkar Palace",
      "Madurai to Chennai - Departure with spiritual memories"
    ]
  },
  {
    "id": 15,
    "title": "Bali Paradise",
    "description": "Bali, the Island of Gods, is Indonesia's most popular destination known for its stunning beaches, lush rice terraces, ancient temples, vibrant culture, and warm hospitality. From spiritual experiences in Ubud to beach life in Seminyak and luxury resorts in Nusa Dua, Bali offers the perfect tropical getaway.",
    "destination": "Bali",
    "price": 65000,
    "duration": 5,
    "category": "international",
    "subCategory": "beach",
    "imageUrl": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    "highlights": [
      "Explore the cultural heart of Bali in Ubud with its monkey forests and art villages",
      "Visit ancient temples like Tanah Lot, Uluwatu, and Besakih",
      "Experience world-class beaches and beach clubs in Seminyak and Kuta",
      "Witness spectacular rice terraces in Jatiluwih and Tegallalang",
      "Enjoy traditional Balinese spa treatments and yoga sessions",
      "Adventure activities like volcano trekking, white water rafting, and snorkeling"
    ],
    "itinerary": [
      "Arrival in Bali - Seminyak Beach, sunset at Tanah Lot Temple",
      "Ubud Cultural Tour - Monkey Forest, rice terraces, traditional villages",
      "Adventure Day - Mount Batur sunrise trek or water sports",
      "Beach and Temples - Uluwatu Temple, Kecak dance, beach relaxation",
      "Departure - Last-minute shopping, transfer to airport"
    ]
  },
  {
    "id": 16,
    "title": "Dubai Extravaganza",
    "description": "Dubai, the jewel of the Middle East, is a futuristic city that seamlessly blends modern marvels with traditional Arabian culture. From towering skyscrapers and luxury shopping to desert adventures and world-class entertainment, Dubai offers an unforgettable experience of opulence and innovation.",
    "destination": "Dubai",
    "price": 75000,
    "duration": 4,
    "category": "international",
    "subCategory": "luxury",
    "imageUrl": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    "highlights": [
      "Visit the world's tallest building – Burj Khalifa and Dubai Fountain",
      "Experience thrilling desert safari with dune bashing and camel rides",
      "Explore traditional souks – Gold Souk, Spice Souk, and modern Dubai Mall",
      "Relax at luxury beaches and visit iconic Palm Jumeirah",
      "Enjoy world-class dining, luxury shopping, and entertainment",
      "Take a traditional dhow cruise along Dubai Creek"
    ],
    "itinerary": [
      "Arrival in Dubai - Burj Khalifa, Dubai Mall, Dubai Fountain show",
      "Desert Safari Adventure - Dune bashing, camel ride, BBQ dinner under stars",
      "Cultural Dubai - Gold Souk, Spice Souk, dhow cruise, traditional markets",
      "Modern Dubai and Departure - Palm Jumeirah, luxury shopping, airport transfer"
    ]
  },
  {
    "id": 17,
    "title": "Singapore Highlights",
    "description": "Explore the modern city-state of Singapore.",
    "destination": "Singapore",
    "price": 70000,
    "duration": 5,
    "category": "international",
    "subCategory": "city",
    "imageUrl": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
    "highlights": [
      "Gardens by the Bay",
      "Universal Studios",
      "Marina Bay Sands",
      "Sentosa"
    ],
    "itinerary": [
      "City exploration",
      "City exploration",
      "Sentosa Island",
      "Shopping and leisure",
      "Shopping and leisure"
    ]
  },
  {
    "id": 18,
    "title": "Vietnam Discovery",
    "description": "Experience the natural wonders and rich history of Vietnam.",
    "destination": "Vietnam",
    "price": 65000,
    "duration": 7,
    "category": "international",
    "subCategory": "culture",
    "imageUrl": "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80",
    "highlights": [
      "Ha Long Bay",
      "Cu Chi Tunnels",
      "Hoi An",
      "Mekong Delta"
    ],
    "itinerary": [
      "Hanoi",
      "Hanoi",
      "Ha Long Bay",
      "Ha Long Bay",
      "Ho Chi Minh City",
      "Ho Chi Minh City",
      "Ho Chi Minh City"
    ]
  },
  {
    "id": 19,
    "title": "Thailand Adventure",
    "description": "Discover the beaches, temples, and cuisine of Thailand.",
    "destination": "Thailand",
    "price": 60000,
    "duration": 7,
    "category": "international",
    "subCategory": "beach",
    "imageUrl": "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80",
    "highlights": [
      "Bangkok temples",
      "Phi Phi Islands",
      "Night markets",
      "Thai massage"
    ],
    "itinerary": [
      "Bangkok",
      "Bangkok",
      "Chiang Mai",
      "Chiang Mai",
      "Phuket",
      "Phuket",
      "Phuket"
    ]
  },
  {
    "id": 20,
    "title": "Maldives Paradise",
    "description": "Relax in luxury overwater villas in the Maldives.",
    "destination": "Maldives",
    "price": 120000,
    "duration": 5,
    "category": "international",
    "subCategory": "luxury",
    "imageUrl": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    "highlights": [
      "Overwater villa",
      "Snorkeling",
      "Spa treatments",
      "Water sports"
    ],
    "itinerary": [
      "Resort activities and water sports",
      "Resort activities and water sports",
      "Resort activities and water sports",
      "Resort activities and water sports",
      "Resort activities and water sports"
    ]
  },
  {
    "id": 21,
    "title": "Malaysia Explorer",
    "description": "Experience the diverse attractions of Malaysia.",
    "destination": "Malaysia",
    "price": 55000,
    "duration": 6,
    "category": "international",
    "subCategory": "city",
    "imageUrl": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
    "highlights": [
      "Petronas Towers",
      "Batu Caves",
      "Langkawi",
      "Food tour"
    ],
    "itinerary": [
      "Kuala Lumpur",
      "Kuala Lumpur",
      "Penang",
      "Penang",
      "Langkawi",
      "Langkawi"
    ]
  },
  {
    "id": 22,
    "title": "Sri Lanka Heritage",
    "description": "Discover the cultural and natural wonders of Sri Lanka.",
    "destination": "Sri Lanka",
    "price": 45000,
    "duration": 7,
    "category": "international",
    "subCategory": "culture",
    "imageUrl": "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80",
    "highlights": [
      "Sigiriya Rock",
      "Tea plantations",
      "Temple of Tooth",
      "Wildlife safari"
    ],
    "itinerary": [
      "Colombo",
      "Colombo",
      "Kandy",
      "Kandy",
      "Nuwara Eliya",
      "Nuwara Eliya",
      "Nuwara Eliya"
    ]
  }
];
