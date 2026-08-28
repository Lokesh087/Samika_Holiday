import { useState, useEffect } from 'react';
import { Search, Calendar, Clock, ChevronRight, ArrowRight, Bookmark, TrendingUp, MapPin, Lightbulb, Mountain, Landmark, Utensils, Megaphone, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_BASE = 'http://localhost:5000';

const categories = [
  { label: 'All Posts', icon: LayoutGrid },
  { label: 'Destination Guides', icon: MapPin },
  { label: 'Travel Tips', icon: Lightbulb },
  { label: 'Mountain Expeditions', icon: Mountain },
  { label: 'Food & Culture', icon: Utensils },
  { label: 'News & Updates', icon: Megaphone }
];

const popularTopics = [
  { name: 'Himalayan Destinations', count: 12, image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=100&auto=format&fit=crop&q=80' },
  { name: 'Char Dham Yatra', count: 10, image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=100&auto=format&fit=crop&q=80' },
  { name: 'Travel Tips & Hacks', count: 15, image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=100&auto=format&fit=crop&q=80' },
  { name: 'Local Culture', count: 9, image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=100&auto=format&fit=crop&q=80' },
  { name: 'Wildlife & Safaris', count: 8, image: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=100&auto=format&fit=crop&q=80' }
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All Posts');
  const [searchQuery, setSearchQuery] = useState('');
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 2,
      title: '10 Most Beautiful Lakes in Uttarakhand You Must Visit',
      category: 'Destination Guides',
      date: 'July 18, 2026',
      author: 'Ananya Sharma',
      authorRole: 'Travel Writer',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&auto=format&fit=crop&q=80',
      excerpt: 'From serene mountain lakes to tranquil backwaters, explore Uttarakhand\u2019s most breathtaking lakes.'
    },
    {
      id: 3,
      title: 'Essential Packing Tips for Your Next Himalayan Adventure',
      category: 'Travel Tips',
      date: 'July 15, 2026',
      author: 'Rahul Verma',
      authorRole: 'Travel Expert',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=600&auto=format&fit=crop&q=80',
      excerpt: 'Pack smart and travel light! Check out our top packing tips for a hassle-free mountain adventure.'
    },
    {
      id: 4,
      title: 'A Complete Guide to the Char Dham Yatra',
      category: 'Mountain Expeditions',
      date: 'July 12, 2026',
      author: 'Meera Iyer',
      authorRole: 'Explorer & Blogger',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&auto=format&fit=crop&q=80',
      excerpt: 'Everything you need to know before embarking on the sacred Char Dham pilgrimage circuit.'
    }
  ]);

  useEffect(() => {
    fetch(`${API_BASE}/api/blogs`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.blogs && data.blogs.length > 0) {
          setBlogPosts(data.blogs);
        }
      })
      .catch(err => console.error('Error fetching blogs:', err));
  }, []);

  const featuredPost = {
    id: 1,
    title: 'The Ultimate Guide to Trekking the Himalayas in 2026',
    category: 'Mountain Expeditions',
    date: 'July 20, 2026',
    author: 'Alexander Wright',
    authorRole: 'Senior Expedition Leader',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=80',
    excerpt: 'Embarking on a Himalayan trek is a life-changing adventure. From gear preparation and altitude acclimatization to choosing the right local guides, here is everything you need to know before stepping onto the mountain trails.'
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All Posts' || post.category === activeCategory;
    const matchesSearch = (post.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (post.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-[#F8FAFC] text-left pt-20">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FDEEF6] via-[#FBF3E7] to-[#F3EAFB]">
        <div className="absolute -top-10 right-0 w-72 h-72 rounded-full bg-[#D9A441]/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10 md:pt-14 md:pb-14 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#D6266B]">Our Travel Blog</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1a0f24] mt-2">
              Travel <span className="sh-text-gradient-gold">Stories</span>, Tips & Inspiration
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed max-w-lg">
              Discover inspiring travel stories, expert tips, destination guides and everything you need to plan your next unforgettable journey.
            </p>

            <div className="mt-6 max-w-md bg-white rounded-2xl shadow-[0_15px_40px_rgba(42,10,61,0.12)] border border-slate-100 p-2 flex items-center gap-2">
              <div className="flex items-center flex-1 px-3">
                <Search className="w-4 h-4 text-[#5B1F70] mr-2 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for blogs, destinations, topics..."
                  className="w-full bg-transparent border-none py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
              <button className="sh-gradient-cta text-white text-xs font-bold uppercase tracking-wide px-6 py-3 rounded-xl shrink-0 cursor-pointer">
                Search
              </button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] soft-shadow-hover border border-slate-200/60">
              <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80" alt="Uttarakhand travel" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex items-center gap-2.5 overflow-x-auto scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.label;
            return (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer border ${
                  isActive
                    ? 'sh-gradient-cta text-white border-transparent shadow-md'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#D6266B]/40 hover:text-[#D6266B]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">

        <div className="lg:col-span-2">
          {/* Featured Post */}
          <div className="mb-10 bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200/90 grid grid-cols-1 sm:grid-cols-12 group soft-shadow-hover">
            <div className="sm:col-span-6 relative h-64 sm:h-auto overflow-hidden">
              <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-4 sh-gradient-cta text-white font-bold px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-wider shadow-md">
                Featured Story
              </div>
            </div>
            <div className="sm:col-span-6 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500 mb-2.5">
                  <span className="text-[#D6266B] uppercase tracking-wider font-extrabold">{featuredPost.category}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-[#D6266B] transition-colors leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-500 text-xs mt-3 leading-relaxed line-clamp-3">{featuredPost.excerpt}</p>
              </div>
              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img src={featuredPost.authorAvatar} alt={featuredPost.author} className="w-8 h-8 rounded-full object-cover border border-[#5B1F70]/30" />
                  <span className="text-xs font-bold text-slate-800">{featuredPost.author}</span>
                </div>
                <button className="text-xs font-bold text-[#5B1F70] hover:text-[#D6266B] flex items-center gap-1 transition-colors cursor-pointer">
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-extrabold text-slate-900 mb-5">Latest Blog Posts</h3>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredPosts.map(post => (
              <article key={post.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 flex flex-col soft-shadow-hover">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 left-3 sh-gradient-cta text-white font-black px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider">
                    {post.category}
                  </div>
                  <button className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 hover:bg-white flex items-center justify-center cursor-pointer" aria-label="Save post">
                    <Bookmark className="w-3.5 h-3.5 text-slate-600" />
                  </button>
                </div>

                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 text-[10px] text-slate-400 font-semibold mb-2">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-[#D6266B] transition-colors leading-snug mb-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 text-[11px] leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-700">By {post.author}</span>
                    <button className="text-[11px] font-bold text-[#5B1F70] group-hover:text-[#D6266B] flex items-center gap-1 transition-colors cursor-pointer">
                      Read More <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16 text-slate-500 text-sm font-medium">
              No articles match your search. Try a different category or keyword.
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 soft-shadow-hover">
            <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-[#D6266B]" /> Popular Topics
            </h4>
            <div className="space-y-3.5">
              {popularTopics.map((topic) => (
                <div key={topic.name} className="flex items-center gap-3">
                  <img src={topic.image} alt={topic.name} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-800">{topic.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{topic.count} Posts</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sh-gradient-purple rounded-2xl p-6 text-white">
            <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center mb-4">
              <Landmark className="w-5 h-5 text-[#F0C878]" />
            </div>
            <h4 className="text-base font-extrabold">Subscribe to Our Newsletter</h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">Get the latest travel stories, tips and exclusive offers straight to your inbox.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex flex-col gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs font-medium text-white placeholder:text-slate-300 focus:outline-none"
              />
              <button type="submit" className="sh-gradient-cta text-white text-xs font-bold uppercase tracking-wide py-2.5 rounded-xl cursor-pointer">
                Subscribe
              </button>
            </form>
          </div>
        </aside>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="sh-gradient-newsletter rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold">Ready to Plan Your Next Trip?</h3>
            <p className="text-xs sm:text-sm text-slate-200 mt-1">Explore our amazing packages and start your journey today!</p>
          </div>
          <Link
            to="/pricing"
            className="bg-white text-[#5B1F70] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all shrink-0 flex items-center gap-2"
          >
            Explore Packages <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
