import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tour_travel';
    const conn = await mongoose.connect(mongoUri);
    console.log(`[MongoDB Connected]: ${conn.connection.host}`);
    await seedInitialData();
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    console.log('[Notice]: Server will run with memory fallback handlers if DB unavailable.');
  }
};

async function seedInitialData() {
  try {
    const Tour = (await import('../models/Tour.js')).default;
    const Package = (await import('../models/Package.js')).default;
    const Agency = (await import('../models/Agency.js')).default;

    // 1. Seed Initial Tours if empty
    const toursCount = await Tour.countDocuments();
    if (toursCount === 0) {
      await Tour.insertMany([
        {
          title: 'Island Fun Tour',
          location: 'Vietnam',
          price: '$1,200',
          duration: '5 Days',
          rating: '4.8',
          image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&auto=format&fit=crop&q=80',
          category: 'Island Getaway',
          description: 'Explore tropical palm beaches, limestone islands, and crystal blue waters.'
        },
        {
          title: 'Cliffs & Caves Hiking',
          location: 'New Zealand',
          price: '$1,400',
          duration: '6 Days',
          rating: '4.9',
          image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=600&auto=format&fit=crop&q=80',
          category: 'Mountain Trekking',
          description: 'Climb dramatic fjord cliffs and venture through prehistoric limestone caves.'
        },
        {
          title: 'Swiss Alps Expedition',
          location: 'Switzerland',
          price: '$1,850',
          duration: '7 Days',
          rating: '5.0',
          image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80',
          category: 'Mountain Trekking',
          description: 'Panoramic mountain passes, luxury chalets, and guided high-altitude snow treks.'
        },
        {
          title: 'Machu Picchu Highlands',
          location: 'Peru',
          price: '$1,350',
          duration: '5 Days',
          rating: '4.8',
          image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&auto=format&fit=crop&q=80',
          category: 'Cultural Heritage',
          description: 'Hike the historic Inca Trail and discover ancient mountain citadel wonders.'
        }
      ]);
      console.log('[Seeder]: Initial Tour locations seeded successfully.');
    }

    // 2. Seed Initial Pricing Packages if empty
    const packagesCount = await Package.countDocuments();
    if (packagesCount === 0) {
      await Package.insertMany([
        {
          name: 'Explorer',
          price: '$499',
          desc: 'Perfect for backpackers looking for essential tours.',
          features: ['2 Destinations included', 'Shared group transfers', 'Local guide support', 'Standard hotel stays'],
          isPopular: false
        },
        {
          name: 'Adventurer',
          price: '$899',
          desc: 'Highly recommended for custom family experiences.',
          features: ['5 Destinations included', 'Private premium transfers', 'Expert bilingual guide', '4-Star hotel bookings', 'Multi-city sightseeing passes'],
          isPopular: true
        },
        {
          name: 'Luxury',
          price: '$1,499',
          desc: 'Indulge in premium VIP luxury treatment.',
          features: ['Unlimited destinations', 'Private luxury SUV transfers', 'Personal guide & translator', '5-Star luxury resort stays', 'VIP fast-track passes'],
          isPopular: false
        }
      ]);
      console.log('[Seeder]: Initial Pricing packages seeded successfully.');
    }

    // 3. Seed Initial Hotels if empty
    const Hotel = (await import('../models/Hotel.js')).default;
    const hotelsCount = await Hotel.countDocuments();
    if (hotelsCount === 0) {
      await Hotel.insertMany([
        {
          name: 'Grand Alpine Palace & Spa',
          location: 'Zermatt, Switzerland',
          price: '$240',
          rating: '4.9',
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
          amenities: ['Free High-Speed WiFi', 'Heated Infinity Pool', 'Luxury Spa Center', 'Buffet Breakfast Included', 'Mountain View Balcony'],
          description: 'Experience 5-star luxury surrounded by Swiss snow peaks with VIP spa facilities and fine dining.',
          roomsAvailable: 15
        },
        {
          name: 'Azure Beach Resort & Villas',
          location: 'Phuket, Thailand',
          price: '$180',
          rating: '4.8',
          image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&auto=format&fit=crop&q=80',
          amenities: ['Private Beach Access', 'Outdoor Swimming Pool', 'Free WiFi', 'Air Conditioning', 'Seafood Restaurant'],
          description: 'Beachfront tropical paradise featuring ocean-facing private balconies, crystal waters, and sunset views.',
          roomsAvailable: 20
        },
        {
          name: 'Inca Heritage Citadel Lodge',
          location: 'Cusco, Peru',
          price: '$160',
          rating: '4.7',
          image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80',
          amenities: ['Free WiFi', 'Airport Shuttles', 'Organic Breakfast', 'Local Tour Desk', 'Oxygen-Enriched Rooms'],
          description: 'Historic boutique lodge located minutes from ancient ruins with authentic local Peruvian hospitality.',
          roomsAvailable: 8
        }
      ]);
      console.log('[Seeder]: Initial Luxury Hotels seeded successfully.');
    }

    // 4. Seed sample travel agencies if empty
    const agenciesCount = await Agency.countDocuments();
    if (agenciesCount === 0) {
      await Agency.insertMany([
        {
          name: 'Samika Holidays',
          location: 'Dehradun, Uttarakhand',
          country: 'India',
          specialty: 'Himalayan holidays and destination weddings',
          description: 'Local travel specialists creating comfortable mountain escapes, celebrations, and wellness journeys.',
          image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80',
          rating: '4.9',
          reviewsCount: 186,
          destinations: ['Rishikesh', 'Mussoorie', 'Kedarnath', 'Jim Corbett']
        },
        {
          name: 'Alpine Route Co.',
          location: 'Interlaken',
          country: 'Switzerland',
          specialty: 'Alps expeditions and scenic rail journeys',
          description: 'Guided alpine adventures paired with boutique stays and panoramic train routes across Switzerland.',
          image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&auto=format&fit=crop&q=80',
          rating: '4.8',
          reviewsCount: 142,
          destinations: ['Interlaken', 'Zermatt', 'Lucerne', 'St. Moritz']
        },
        {
          name: 'Lotus Lantern Travels',
          location: 'Kyoto',
          country: 'Japan',
          specialty: 'Cultural immersion and private Japan tours',
          description: 'Thoughtful itineraries centered on heritage neighborhoods, local cuisine, and seasonal festivals.',
          image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80',
          rating: '4.9',
          reviewsCount: 219,
          destinations: ['Kyoto', 'Tokyo', 'Nara', 'Hakone']
        },
        {
          name: 'Azure Coast Escapes',
          location: 'Athens',
          country: 'Greece',
          specialty: 'Island hopping and luxury cruises',
          description: 'Curated Aegean getaways with private transfers, sunset sailing, and handpicked island villas.',
          image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&auto=format&fit=crop&q=80',
          rating: '4.7',
          reviewsCount: 98,
          destinations: ['Santorini', 'Mykonos', 'Crete', 'Paros']
        },
        {
          name: 'Andes Heritage Journeys',
          location: 'Cusco',
          country: 'Peru',
          specialty: 'Heritage treks and archaeological journeys',
          description: 'Expert-led journeys through ancient sites, highland villages, and the Sacred Valley.',
          image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&auto=format&fit=crop&q=80',
          rating: '4.8',
          reviewsCount: 127,
          destinations: ['Cusco', 'Machu Picchu', 'Arequipa', 'Lake Titicaca']
        },
        {
          name: 'Savanna Signature Safaris',
          location: 'Arusha',
          country: 'Tanzania',
          specialty: 'Wildlife safaris and conservation travel',
          description: 'Responsible safari planning with experienced guides, intimate camps, and carefully timed wildlife viewing.',
          image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=80',
          rating: '4.9',
          reviewsCount: 164,
          destinations: ['Serengeti', 'Ngorongoro', 'Tarangire', 'Zanzibar']
        }
      ]);
      console.log('[Seeder]: Sample travel agencies seeded successfully.');
    }
  } catch (err) {
    console.error('[Seeder Error]:', err.message);
  }
}
