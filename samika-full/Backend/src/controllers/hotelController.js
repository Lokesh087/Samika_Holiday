import Hotel from '../models/Hotel.js';

let memoryHotels = [
  {
    _id: 'hotel_1',
    name: 'Villa Firenze Retreat',
    location: 'Ravello, Amalfi Coast',
    price: '$450',
    rating: '4.9',
    reviewsCount: '128',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80'
    ],
    amenities: ['Free Cancellation', 'Private Infinity Pool', 'Spa Included', 'Free WiFi', 'Ocean View Balcony'],
    description: 'Experience unparalleled cliffside luxury with panoramic Mediterranean views and private infinity pool.',
    roomsAvailable: 15,
    isFeatured: true,
    freeCancellation: true,
    hasPool: true,
    hasBreakfast: true
  },
  {
    _id: 'hotel_2',
    name: 'The Cliffside Azul',
    location: 'Positano, Amalfi Coast',
    price: '$320',
    rating: '4.8',
    reviewsCount: '94',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=80'
    ],
    amenities: ['Breakfast Included', 'Free Cancellation', 'Sunset Terrace', 'Sea Access'],
    description: 'Boutique coastal resort featuring open-air lounge, Mediterranean seafood dining, and private beach access.',
    roomsAvailable: 8,
    isFeatured: false,
    freeCancellation: true,
    hasPool: false,
    hasBreakfast: true
  },
  {
    _id: 'hotel_3',
    name: 'Aman Kyoto Sanctuary',
    location: 'Kyoto, Japan',
    price: '$850',
    rating: '4.9',
    reviewsCount: '210',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80'
    ],
    amenities: ['Onsen Hot Springs', 'Traditional Tea Ceremony', 'Organic Dining', 'Garden View'],
    description: 'Nestled in a secret garden at the foot of Kyoto symbolic mountain, a tranquil luxury sanctuary.',
    roomsAvailable: 10,
    isFeatured: true,
    freeCancellation: true,
    hasPool: true,
    hasBreakfast: true
  }
];

export const getHotels = async (req, res) => {
  try {
    try {
      const hotels = await Hotel.find().sort({ createdAt: -1 });
      if (hotels && hotels.length > 0) {
        return res.status(200).json({ success: true, count: hotels.length, hotels });
      }
    } catch (e) {}

    return res.status(200).json({ success: true, count: memoryHotels.length, hotels: memoryHotels });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createHotel = async (req, res) => {
  try {
    const { name, location, price, rating, image, gallery, amenities, description, roomsAvailable, isFeatured } = req.body;
    if (!name || !location || !price || !image) {
      return res.status(400).json({ success: false, message: 'Please provide name, location, price and image.' });
    }

    try {
      const newHotel = await Hotel.create({
        name,
        location,
        price,
        rating: rating || '4.8',
        image,
        gallery: Array.isArray(gallery) ? gallery : (image ? [image] : []),
        amenities: Array.isArray(amenities) ? amenities : (amenities ? amenities.split(',').map(a => a.trim()) : []),
        description: description || 'Luxury stay with modern amenities.',
        roomsAvailable: roomsAvailable ? Number(roomsAvailable) : 10,
        isFeatured: Boolean(isFeatured)
      });

      return res.status(201).json({ success: true, message: 'Hotel created successfully!', hotel: newHotel });
    } catch (dbErr) {
      const memHotel = {
        _id: 'hotel_' + Date.now(),
        name,
        location,
        price,
        rating: rating || '4.8',
        image,
        gallery: Array.isArray(gallery) ? gallery : (image ? [image] : []),
        amenities: Array.isArray(amenities) ? amenities : (amenities ? amenities.split(',').map(a => a.trim()) : []),
        description: description || 'Luxury stay with modern amenities.',
        roomsAvailable: roomsAvailable ? Number(roomsAvailable) : 10,
        isFeatured: Boolean(isFeatured)
      };
      memoryHotels.unshift(memHotel);
      return res.status(201).json({ success: true, message: 'Hotel created successfully!', hotel: memHotel });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    try {
      const updated = await Hotel.findByIdAndUpdate(id, updateData, { new: true });
      if (updated) return res.status(200).json({ success: true, message: 'Hotel updated successfully!', hotel: updated });
    } catch (e) {}

    const index = memoryHotels.findIndex(h => h._id === id);
    if (index !== -1) {
      memoryHotels[index] = { ...memoryHotels[index], ...updateData };
      return res.status(200).json({ success: true, message: 'Hotel updated successfully!', hotel: memoryHotels[index] });
    }

    return res.status(404).json({ success: false, message: 'Hotel not found.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;
    try {
      await Hotel.findByIdAndDelete(id);
    } catch (e) {}

    memoryHotels = memoryHotels.filter(h => h._id !== id);
    return res.status(200).json({ success: true, message: 'Hotel deleted successfully!' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
