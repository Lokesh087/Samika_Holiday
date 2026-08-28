import Tour from '../models/Tour.js';
import mongoose from 'mongoose';

// Fallback memory state if MongoDB is unavailable
let memoryTours = [
  {
    _id: 'tour_1',
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
    _id: 'tour_2',
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
    _id: 'tour_3',
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
    _id: 'tour_4',
    title: 'Machu Picchu Highlands',
    location: 'Peru',
    price: '$1,350',
    duration: '5 Days',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&auto=format&fit=crop&q=80',
    category: 'Cultural Heritage',
    description: 'Hike the historic Inca Trail and discover ancient mountain citadel wonders.'
  }
];

export const getAllTours = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(200).json({ success: true, count: memoryTours.length, tours: memoryTours });
  }

  try {
    const tours = await Tour.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: tours.length, tours });
  } catch (error) {
    return res.status(200).json({ success: true, count: memoryTours.length, tours: memoryTours });
  }
};

export const createTour = async (req, res) => {
  try {
    const { title, location, price, duration, rating, image, category, description } = req.body;
    if (!title || !location || !price) {
      return res.status(400).json({ success: false, message: 'Please provide Title, Location, and Price.' });
    }

    try {
      const newTour = await Tour.create({
        title,
        location,
        price,
        duration: duration || '5 Days',
        rating: rating || '4.8',
        image: image || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80',
        category: category || 'Mountain Trekking',
        description: description || ''
      });
      return res.status(201).json({ success: true, message: 'Tour created successfully!', tour: newTour });
    } catch (dbErr) {
      const memTour = {
        _id: 'tour_' + Date.now(),
        title,
        location,
        price,
        duration: duration || '5 Days',
        rating: rating || '4.8',
        image: image || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80',
        category: category || 'Mountain Trekking',
        description: description || ''
      };
      memoryTours.unshift(memTour);
      return res.status(201).json({ success: true, message: 'Tour created successfully!', tour: memTour });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    try {
      const updatedTour = await Tour.findByIdAndUpdate(id, req.body, { new: true });
      if (updatedTour) {
        return res.status(200).json({ success: true, message: 'Tour updated successfully!', tour: updatedTour });
      }
    } catch (e) {}

    const index = memoryTours.findIndex(t => t._id === id);
    if (index !== -1) {
      memoryTours[index] = { ...memoryTours[index], ...req.body };
      return res.status(200).json({ success: true, message: 'Tour updated successfully!', tour: memoryTours[index] });
    }

    return res.status(404).json({ success: false, message: 'Tour not found.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    try {
      await Tour.findByIdAndDelete(id);
    } catch (e) {}

    memoryTours = memoryTours.filter(t => t._id !== id);
    return res.status(200).json({ success: true, message: 'Tour deleted successfully!' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
