import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: 'Destination Guides' },
  date: { type: String, default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
  author: { type: String, required: true },
  authorRole: { type: String, default: 'Travel Writer' },
  authorAvatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
  readTime: { type: String, default: '5 min read' },
  comments: { type: Number, default: 0 },
  image: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);
