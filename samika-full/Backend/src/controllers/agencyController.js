import Agency from '../models/Agency.js';

const memoryAgencies = [
  {
    _id: 'agency_1',
    name: 'Samika Holidays',
    location: 'Dehradun, Uttarakhand',
    country: 'India',
    specialty: 'Himalayan holidays and destination weddings',
    description: 'Local travel specialists creating comfortable mountain escapes, celebrations, and wellness journeys.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80',
    rating: '4.9',
    reviewsCount: 186,
    verified: true,
    destinations: ['Rishikesh', 'Mussoorie', 'Kedarnath', 'Jim Corbett']
  },
  {
    _id: 'agency_2',
    name: 'Alpine Route Co.',
    location: 'Interlaken',
    country: 'Switzerland',
    specialty: 'Alps expeditions and scenic rail journeys',
    description: 'Guided alpine adventures paired with boutique stays and panoramic train routes across Switzerland.',
    image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&auto=format&fit=crop&q=80',
    rating: '4.8',
    reviewsCount: 142,
    verified: true,
    destinations: ['Interlaken', 'Zermatt', 'Lucerne', 'St. Moritz']
  },
  {
    _id: 'agency_3',
    name: 'Lotus Lantern Travels',
    location: 'Kyoto',
    country: 'Japan',
    specialty: 'Cultural immersion and private Japan tours',
    description: 'Slow, thoughtful itineraries centered on heritage neighborhoods, local cuisine, and seasonal festivals.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80',
    rating: '4.9',
    reviewsCount: 219,
    verified: true,
    destinations: ['Kyoto', 'Tokyo', 'Nara', 'Hakone']
  },
  {
    _id: 'agency_4',
    name: 'Azure Coast Escapes',
    location: 'Athens',
    country: 'Greece',
    specialty: 'Island hopping and luxury cruises',
    description: 'Curated Aegean getaways with private transfers, sunset sailing, and handpicked island villas.',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&auto=format&fit=crop&q=80',
    rating: '4.7',
    reviewsCount: 98,
    verified: true,
    destinations: ['Santorini', 'Mykonos', 'Crete', 'Paros']
  },
  {
    _id: 'agency_5',
    name: 'Andes Heritage Journeys',
    location: 'Cusco',
    country: 'Peru',
    specialty: 'Heritage treks and archaeological journeys',
    description: 'Expert-led journeys through ancient sites, highland villages, and the landscapes of the Sacred Valley.',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&auto=format&fit=crop&q=80',
    rating: '4.8',
    reviewsCount: 127,
    verified: true,
    destinations: ['Cusco', 'Machu Picchu', 'Arequipa', 'Lake Titicaca']
  },
  {
    _id: 'agency_6',
    name: 'Savanna Signature Safaris',
    location: 'Arusha',
    country: 'Tanzania',
    specialty: 'Wildlife safaris and conservation travel',
    description: 'Responsible safari planning with experienced guides, intimate camps, and carefully timed wildlife viewing.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=80',
    rating: '4.9',
    reviewsCount: 164,
    verified: true,
    destinations: ['Serengeti', 'Ngorongoro', 'Tarangire', 'Zanzibar']
  }
];

export const getAgencies = async (req, res) => {
  try {
    try {
      const agencies = await Agency.find().sort({ createdAt: -1 });
      if (agencies.length > 0) {
        return res.status(200).json({ success: true, count: agencies.length, agencies });
      }
    } catch (error) {}

    return res.status(200).json({ success: true, count: memoryAgencies.length, agencies: memoryAgencies });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
