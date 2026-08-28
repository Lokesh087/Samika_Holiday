import { useState } from 'react';
import { Search, MapPin, Star, Heart, ArrowRight, Mountain, Waves, Landmark, Compass, PawPrint, Sparkles, HeartHandshake, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';

const allDestinations = [
  { id: 'd1', title: 'Nainital', tagline: 'Lake Paradise', tag: 'Best Seller', category: 'Lakes', rating: '4.7', reviews: '324', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=700&auto=format&fit=crop&q=80' },
  { id: 'd2', title: 'Auli', tagline: 'Snow & Adventure', tag: 'Adventure', category: 'Adventure', rating: '4.8', reviews: '256', image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=700&auto=format&fit=crop&q=80' },
  { id: 'd3', title: 'Rishikesh', tagline: 'Yoga Capital', tag: 'Popular', category: 'Spiritual', rating: '4.6', reviews: '189', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&auto=format&fit=crop&q=80' },
  { id: 'd4', title: 'Mussoorie', tagline: 'Queen of Hills', tag: 'Peaceful', category: 'Mountains', rating: '4.5', reviews: '312', image: '/images/mountains_hero.png' },
  { id: 'd5', title: 'Kedarnath', tagline: 'Spiritual Journey', tag: 'Spiritual', category: 'Spiritual', rating: '4.9', reviews: '278', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=700&auto=format&fit=crop&q=80' },
  { id: 'd6', title: 'Jim Corbett', tagline: 'Wildlife Adventure', tag: 'Wildlife', category: 'Wildlife', rating: '4.6', reviews: '210', image: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=700&auto=format&fit=crop&q=80' },
  { id: 'd7', title: 'Chopta', tagline: 'Mini Switzerland', tag: 'Mountains', category: 'Mountains', rating: '4.7', reviews: '164', image: 'https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=700&auto=format&fit=crop&q=80' },
  { id: 'd8', title: 'Haridwar', tagline: 'Gateway to the Gods', tag: 'Spiritual', category: 'Spiritual', rating: '4.6', reviews: '298', image: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=700&auto=format&fit=crop&q=80' },
  { id: 'd9', title: 'Ranikhet', tagline: 'Queen\u2019s Meadow', tag: 'Honeymoon', category: 'Honeymoon', rating: '4.5', reviews: '132', image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=700&auto=format&fit=crop&q=80' },
  { id: 'd10', title: 'Valley of Flowers', tagline: 'Trekker\u2019s Delight', tag: 'Adventure', category: 'Adventure', rating: '4.8', reviews: '146', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=700&auto=format&fit=crop&q=80' },
  { id: 'd11', title: 'Dehradun', tagline: 'City of Litchis', tag: 'Popular', category: 'Mountains', rating: '4.4', reviews: '201', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=700&auto=format&fit=crop&q=80' },
  { id: 'd12', title: 'Lansdowne', tagline: 'Quiet Cantonment Charm', tag: 'Honeymoon', category: 'Honeymoon', rating: '4.6', reviews: '118', image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=700&auto=format&fit=crop&q=80' }
];

const categories = [
  { label: 'All', icon: LayoutGrid },
  { label: 'Mountains', icon: Mountain },
  { label: 'Lakes', icon: Waves },
  { label: 'Spiritual', icon: Landmark },
  { label: 'Adventure', icon: Compass },
  { label: 'Wildlife', icon: PawPrint },
  { label: 'Honeymoon', icon: HeartHandshake }
];

export default function Destinations() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedIds, setLikedIds] = useState([]);

  const toggleLike = (id) => {
    setLikedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const filtered = allDestinations.filter((d) => {
    const matchesCategory = activeCategory === 'All' || d.category === activeCategory;
    const matchesSearch = `${d.title} ${d.tagline}`.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-[#F8FAFC] text-[#1a0f24] text-left pt-20">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FDEEF6] via-[#FBF3E7] to-[#F3EAFB]">
        <div className="absolute -top-10 right-0 w-72 h-72 rounded-full bg-[#D9A441]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#5B1F70]/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 md:pt-14 md:pb-10">
          <p className="text-xs font-bold text-slate-500 mb-3 flex items-center gap-1.5">
            <Link to="/" className="hover:text-[#D6266B] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#5B1F70] font-extrabold">Destinations</span>
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#1a0f24]">
            Explore <span className="sh-text-gradient-gold">Dream Destinations</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
            From serene mountains to sacred rivers, discover handpicked Uttarakhand destinations that inspire, delight, and create memories for a lifetime.
          </p>

          {/* Search Bar */}
          <div className="mt-7 max-w-2xl bg-white rounded-2xl shadow-[0_15px_40px_rgba(42,10,61,0.12)] border border-slate-100 p-2 flex items-center gap-2">
            <div className="flex items-center flex-1 px-3">
              <Search className="w-4 h-4 text-[#5B1F70] mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destinations, places, or experiences..."
                className="w-full bg-transparent border-none py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <button className="sh-gradient-cta text-white text-xs font-bold uppercase tracking-wide px-6 py-3 rounded-xl shrink-0 cursor-pointer">
              Search
            </button>
          </div>

          {/* Category Pills */}
          <div className="mt-6 flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer border ${
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
        </div>
      </section>

      {/* DESTINATION GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex justify-between items-end mb-7">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#D6266B]">Handpicked Destinations</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a0f24] tracking-tight mt-1">
              {activeCategory === 'All' ? 'Top Destinations' : `${activeCategory} Destinations`}
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-500 shrink-0">{filtered.length} places found</span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-500 text-sm font-medium">
            No destinations match your search. Try a different category or keyword.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((dest) => {
              const isLiked = likedIds.includes(dest.id);
              return (
                <div key={dest.id} className="group cursor-pointer">
                  <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-3 soft-shadow-hover border border-slate-200/80">
                    <img
                      src={dest.image}
                      alt={dest.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                    <span className="absolute top-3 left-3 sh-gradient-cta text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider">
                      {dest.tag}
                    </span>

                    <button
                      onClick={() => toggleLike(dest.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all cursor-pointer"
                      aria-label="Save destination"
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#D6266B] text-[#D6266B]' : 'text-slate-500'}`} />
                    </button>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="font-extrabold text-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#D9A441] shrink-0" />
                        {dest.title}
                      </h3>
                      <p className="text-[11px] text-slate-200 font-medium mt-0.5">{dest.tagline}</p>
                      <div className="flex items-center gap-1 mt-1.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-[11px] font-bold">{dest.rating}</span>
                        <span className="text-[10px] text-slate-300">({dest.reviews})</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="sh-gradient-newsletter rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-[#F0C878]" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold">Not sure where to go?</h3>
              <p className="text-xs sm:text-sm text-slate-200 mt-1">Tell us what you love and we'll suggest the perfect destinations for you.</p>
            </div>
          </div>
          <Link
            to="/ai-architect"
            className="bg-white text-[#5B1F70] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all shrink-0 flex items-center gap-2"
          >
            Get Recommendations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
