import Blog from '../models/Blog.js';

// Memory fallback state if DB is offline
let memoryBlogs = [
  {
    _id: 'blog_1',
    title: 'The Ultimate Guide to Trekking the Himalayas in 2026',
    category: 'Mountain Expeditions',
    date: 'July 20, 2026',
    author: 'Alexander Wright',
    authorRole: 'Senior Expedition Leader',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    readTime: '8 min read',
    comments: 24,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=80',
    excerpt: 'Embarking on a Himalayan trek is a life-changing adventure. From gear preparation to altitude acclimatization.',
    content: 'Trekking through the mighty Himalayas requires meticulous planning, physical preparation, and local guidance...'
  },
  {
    _id: 'blog_2',
    title: '10 Hidden Gem Beaches in Southeast Asia You Must Visit',
    category: 'Destination Guides',
    date: 'July 18, 2026',
    author: 'Sophia Chen',
    authorRole: 'Island Specialist',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    readTime: '5 min read',
    comments: 18,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    excerpt: 'Escape tourist crowds and discover pristine turquoise waters across Thailand, Vietnam, and Indonesia.',
    content: 'Beyond crowded resort beaches lie tranquil coves and secret lagoons surrounded by lush tropical cliffs...'
  },
  {
    _id: 'blog_3',
    title: 'How to Pack Light for a 2-Week Alpine Adventure',
    category: 'Travel Tips',
    date: 'July 15, 2026',
    author: 'Marcus Aurel',
    authorRole: 'Gear Specialist',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    readTime: '6 min read',
    comments: 12,
    image: 'https://images.unsplash.com/photo-1486916856992-e4db22c8df33?w=600&auto=format&fit=crop&q=80',
    excerpt: 'Mastering lightweight layering, multi-purpose outdoor gear, and minimizing your backpack weight.',
    content: 'Packing for a two-week mountain trek does not mean dragging a 60-liter backpack full of extra clothing...'
  }
];

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: blogs.length, blogs });
  } catch (error) {
    return res.status(200).json({ success: true, count: memoryBlogs.length, blogs: memoryBlogs });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, category, author, readTime, image, excerpt, content } = req.body;
    if (!title || !author || !image || !excerpt) {
      return res.status(400).json({ success: false, message: 'Please provide Title, Author, Cover Image, and Excerpt.' });
    }

    try {
      const newBlog = await Blog.create({
        title,
        category: category || 'Destination Guides',
        author,
        readTime: readTime || '5 min read',
        image,
        excerpt,
        content: content || excerpt
      });
      return res.status(201).json({ success: true, message: 'Blog created successfully!', blog: newBlog });
    } catch (dbErr) {
      const fallbackBlog = {
        _id: 'blog_' + Date.now(),
        title,
        category: category || 'Destination Guides',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        author,
        readTime: readTime || '5 min read',
        comments: 0,
        image,
        excerpt,
        content: content || excerpt
      };
      memoryBlogs.unshift(fallbackBlog);
      return res.status(201).json({ success: true, message: 'Blog created successfully!', blog: fallbackBlog });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error creating blog.' });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    try {
      const updated = await Blog.findByIdAndUpdate(id, updateData, { new: true });
      if (updated) return res.status(200).json({ success: true, message: 'Blog updated successfully!', blog: updated });
    } catch (dbErr) {}

    const index = memoryBlogs.findIndex(b => b._id === id);
    if (index !== -1) {
      memoryBlogs[index] = { ...memoryBlogs[index], ...updateData };
      return res.status(200).json({ success: true, message: 'Blog updated successfully!', blog: memoryBlogs[index] });
    }

    return res.status(404).json({ success: false, message: 'Blog post not found.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error updating blog.' });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    try {
      await Blog.findByIdAndDelete(id);
    } catch (dbErr) {}

    memoryBlogs = memoryBlogs.filter(b => b._id !== id);
    return res.status(200).json({ success: true, message: 'Blog deleted successfully!' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error deleting blog.' });
  }
};
