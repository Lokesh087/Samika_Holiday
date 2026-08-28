import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'Luxury Escape' },
  duration: { type: String, default: '7 Days' },
  price: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String, default: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGltSKR4wZTk44TyPGUEHgP1nJ-1kDJzENiiLlmFZfDewQ6odR2Sk_kKRZ4fZOnOsj5dKT-RBkuGEzCZpXgKrqjyxOAWcq5lhA3ERw-kU5Pkbn7lXRpo9gEL0TkKT2s8RPs9V7SJX8NgNsL01wHYRnUQ3R6PEeBMkKZMQXicd9CY7yowDG1z_rF4Vq9mx4MhMov_L633tT5dLyuBn562AXLjt04NazC8h1iSZPc8MjGHK040HSqBftUJZihmwkC9apje4zdk5E31Q' },
  rating: { type: String, default: '4.9' },
  reviewsCount: { type: String, default: '96' },
  features: [{ type: String }],
  isPopular: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Package || mongoose.model('Package', packageSchema);
