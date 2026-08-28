import { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, Star, ArrowRight, ShieldCheck, Compass, Mountain, Landmark, Utensils, Sparkles, Tent } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const fallbackPackages = [
  {
    _id: 'exp_1',
    name: 'Ganga River Rafting',
    category: 'Adventure',
    duration: '3-4 Hours',
    price: '₹1,499',
    rating: '4.8',
    reviewsCount: '412',
    image: 'https://images.unsplash.com/photo-1530866495561-507c9faab86b?w=800&auto=format&fit=crop&q=80',
    desc: 'Ride the rapids of the holy Ganga through scenic Himalayan gorges with certified expert guides.',
    features: ['All Ages', 'Safety Gear Included', 'Expert Guide']
  },
  {
    _id: 'exp_2',
    name: 'Kedarnath Temple Visit',
    category: 'Spiritual',
    duration: '2 Days',
    price: '₹4,999',
    rating: '4.9',
    reviewsCount: '268',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&auto=format&fit=crop&q=80',
    desc: 'A guided pilgrimage to one of the holiest Jyotirlingas, nestled amid the Garhwal Himalayas.',
    features: ['Guided Darshan', 'Pony/Palki Assistance', 'Meals Included']
  },
  {
    _id: 'exp_3',
    name: 'Garhwali Cultural Evening',
    category: 'Cultural',
    duration: '3 Hours',
    price: '₹999',
    rating: '4.7',
    reviewsCount: '134',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800&auto=format&fit=crop&q=80',
    desc: 'Folk music, traditional dance and local cuisine celebrating the vibrant Garhwali heritage.',
    features: ['All Ages', 'Local Cuisine', 'Live Performance']
  },
  {
    _id: 'exp_4',
    name: 'Camping in Chopta',
    category: 'Nature & Wildlife',
    duration: '1 Night',
    price: '₹2,499',
    rating: '4.6',
    reviewsCount: '176',
    image: 'https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=800&auto=format&fit=crop&q=80',
    desc: 'Stargazing and bonfire nights beneath the pines of the "Mini Switzerland of India".',
    features: ['Age 10+', 'Tent & Bonfire', 'Breakfast Included']
  },
  {
    _id: 'exp_5',
    name: 'Valley of Flowers Trek',
    category: 'Adventure',
    duration: '2 Days',
    price: '₹3,499',
    rating: '4.8',
    reviewsCount: '158',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&auto=format&fit=crop&q=80',
    desc: 'Trek through a UNESCO World Heritage meadow blooming with rare Himalayan alpine flowers.',
    features: ['Age 12+', 'Trekking Guide', 'Permit Included']
  },
  {
    _id: 'exp_6',
    name: 'Yoga & Wellness Retreat',
    category: 'Wellness',
    duration: '2 Days',
    price: '₹5,499',
    rating: '4.9',
    reviewsCount: '221',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80',
    desc: 'Rejuvenate with sunrise yoga and meditation sessions on the banks of the Ganga in Rishikesh.',
    features: ['Age 16+', 'Certified Instructor', 'Herbal Meals']
  }
];

const categories = [
  { label: 'All', icon: Compass },
  { label: 'Adventure', icon: Mountain },
  { label: 'Spiritual', icon: Landmark },
  { label: 'Cultural', icon: Sparkles },
  { label: 'Nature & Wildlife', icon: Tent },
  { label: 'Wellness', icon: Utensils }
];

export default function Services() {
  const [packages, setPackages] = useState(fallbackPackages);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/api/packages`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.packages && data.packages.length > 0) {
          setPackages(data.packages);
        }
      })
      .catch(() => {});
  }, []);

  const filteredPackages = packages.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = (p.name || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-[#F8FAFC] text-[#1a0f24] text-left pt-20">

      {/* HERO BANNER */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1920&auto=format&fit=crop&q=80"
            alt="Unforgettable Experiences"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:pt-10 md:pb-20">
          <p className="text-xs font-bold text-slate-200 mb-3 flex items-center gap-1.5">
            <Link to="/" className="hover:text-[#F0C878] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#F0C878] font-extrabold">Experiences</span>
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-2xl">
            Unforgettable Experiences
          </h1>
          <p className="text-slate-200 text-sm sm:text-base max-w-xl mt-3 leading-relaxed">
            Explore unique activities and create memories that last a lifetime in Uttarakhand.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-white text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
            <ShieldCheck className="w-4 h-4 text-[#D9A441]" /> Best Price Guarantee — No Hidden Charges
          </div>
        </div>
      </section>

      {/* Floating Search Card */}
      <div className="relative z-20 -mt-10 md:-mt-12 mb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(42,10,61,0.18)] border border-slate-100 p-4 sm:p-5">
            <div className="flex flex-col md:flex-row items-stretch gap-2.5">
              <div className="flex-1 w-full flex items-center px-4 py-3 bg-slate-50 rounded-2xl border border-slate-200/70">
                <Search className="w-4 h-4 text-[#5B1F70] mr-3 shrink-0" />
                <div className="w-full">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Search Experience</div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="What are you looking for?"
                    className="bg-transparent border-none p-0 focus:outline-none text-slate-900 font-bold text-sm placeholder:text-slate-400 placeholder:font-medium w-full"
                  />
                </div>
              </div>

              <div className="flex-1 w-full flex items-center px-4 py-3 bg-slate-50 rounded-2xl border border-slate-200/70">
                <MapPin className="w-4 h-4 text-[#5B1F70] mr-3 shrink-0" />
                <div className="w-full">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Location</div>
                  <div className="text-slate-900 font-bold text-sm">All of Uttarakhand</div>
                </div>
              </div>

              <div className="flex-1 w-full flex items-center px-4 py-3 bg-slate-50 rounded-2xl border border-slate-200/70">
                <Calendar className="w-4 h-4 text-[#5B1F70] mr-3 shrink-0" />
                <div className="w-full">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Date</div>
                  <div className="text-slate-900 font-bold text-sm">Select Date</div>
                </div>
              </div>

              <div className="flex-1 w-full flex items-center px-4 py-3 bg-slate-50 rounded-2xl border border-slate-200/70">
                <Users className="w-4 h-4 text-[#5B1F70] mr-3 shrink-0" />
                <div className="w-full">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Travellers</div>
                  <div className="text-slate-900 font-bold text-sm">1 Traveller</div>
                </div>
              </div>

              <button className="sh-gradient-cta text-white rounded-2xl px-8 py-4 font-bold text-xs uppercase tracking-wider transition-all w-full md:w-auto flex items-center justify-center gap-2 cursor-pointer shadow-md shrink-0 active:scale-95">
                <Search className="w-4 h-4" />
                Search Experiences
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* EXPERIENCES LISTING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#D6266B]">Curated Journeys</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a0f24] tracking-tight mt-1">
              Showing {filteredPackages.length} Experiences
            </h2>
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 border ${
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

        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg._id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 soft-shadow-hover flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 left-3 sh-gradient-cta text-white text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider">
                    {pkg.category || 'Experience'}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{pkg.rating || '4.8'}</span>
                  </div>
                </div>

                <div className="p-5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{pkg.duration}</span>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#D6266B] transition-colors">{pkg.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-2 line-clamp-2">{pkg.desc}</p>

                  {Array.isArray(pkg.features) && pkg.features.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                      {pkg.features.map((feat, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                          {feat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between mt-2">
                <div>
                  <span className="text-lg font-black text-slate-900">{pkg.price}</span>
                  <span className="text-[10px] text-slate-400 font-bold block">/ person</span>
                </div>

                <Link
                  to="/pricing"
                  className="border-2 border-[#5B1F70] text-[#5B1F70] hover:bg-[#5B1F70] hover:text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all flex items-center gap-1.5"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-20 text-slate-500 text-sm font-medium">
            No experiences match your search. Try a different category or keyword.
          </div>
        )}

      </section>

    </div>
  );
}
