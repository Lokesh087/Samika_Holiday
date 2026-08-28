import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  country: { type: String, default: 'Italy' },
  price: { type: String, required: true },
  duration: { type: String, required: true },
  rating: { type: String, default: '4.9' },
  weatherTemp: { type: String, default: '72°F' },
  image: { type: String, required: true },
  category: { type: String, default: 'Popular Destinations' },
  description: { type: String, default: '' },
  isPopular: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Tour || mongoose.model('Tour', tourSchema);
