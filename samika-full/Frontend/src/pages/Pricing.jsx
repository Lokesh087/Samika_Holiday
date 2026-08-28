import { useState, useEffect } from 'react';
import {
  Search, MapPin, Calendar, IndianRupee, Users, Star, ArrowRight,
  LayoutGrid, Home as HomeIcon, Globe2, HeartHandshake, Mountain, Crown,
  ShieldCheck, Headset, CheckCircle2, Gift
} from 'lucide-react';
import { Link } from 'react-router-dom';

const API_BASE = 'http://localhost:5000';

const defaultPackages = [
  {
    _id: 'p1',
    name: 'Kashmir Paradise',
    route: 'Srinagar • Gulmarg • Pahalgam',
    duration: '5 Nights / 6 Days',
    travellers: '2-6 People',
    price: '18,999',
    rating: '4.8',
    reviews: '324',
    tag: 'Best Seller',
    category: 'Domestic',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=700&auto=format&fit=crop&q=80'
  },
  {
    _id: 'p2',
    name: 'Char Dham Yatra VIP',
    route: 'Yamunotri • Gangotri • Kedarnath • Badrinath',
    duration: '9 Nights / 10 Days',
    travellers: '2-8 People',
    price: '28,999',
    rating: '4.9',
    reviews: '198',
    tag: 'Spiritual',
    category: 'Family',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=700&auto=format&fit=crop&q=80'
  },
  {
    _id: 'p3',
    name: 'Auli Skiing & Safari',
    route: 'Auli • Joshimath • Corbett',
    duration: '3 Nights / 4 Days',
    travellers: '2-6 People',
    price: '11,999',
    rating: '4.7',
    reviews: '256',
    tag: 'Adventure',
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=700&auto=format&fit=crop&q=80'
  },
  {
    _id: 'p4',
    name: 'Nainital Getaway',
    route: 'Nainital • Bhimtal • Sattal',
    duration: '2 Nights / 3 Days',
    travellers: '2-4 People',
    price: '6,999',
    rating: '4.6',
    reviews: '142',
    tag: 'Family',
    category: 'Family',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=700&auto=format&fit=crop&q=80'
  },
  {
    _id: 'p5',
    name: 'Rishikesh Honeymoon Bliss',
    route: 'Rishikesh • Mussoorie',
    duration: '4 Nights / 5 Days',
    travellers: '2 People',
    price: '15,499',
    rating: '4.9',
    reviews: '178',
    tag: 'Honeymoon',
    category: 'Honeymoon',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&auto=format&fit=crop&q=80'
  },
  {
    _id: 'p6',
    name: 'Himalayan Luxury Escape',
    route: 'Mussoorie • Dhanaulti • Chopta',
    duration: '6 Nights / 7 Days',
    travellers: '2-4 People',
    price: '49,999',
    rating: '4.9',
    reviews: '96',
    tag: 'Luxury',
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=700&auto=format&fit=crop&q=80'
  }
];

const categories = [
  { label: 'All Packages', icon: LayoutGrid },
  { label: 'Domestic', icon: HomeIcon },
  { label: 'International', icon: Globe2 },
  { label: 'Family', icon: Users },
  { label: 'Honeymoon', icon: HeartHandshake },
  { label: 'Adventure', icon: Mountain },
  { label: 'Luxury', icon: Crown }
];

const perks = [
  { icon: ShieldCheck, title: 'Best Price Guarantee', desc: 'We ensure you get the best price for every package.' },
  { icon: Headset, title: '24/7 Customer Support', desc: "We're here to help you anytime, anywhere." },
  { icon: CheckCircle2, title: 'Safe & Secure Travel', desc: 'Your safety is our top priority on every trip.' },
  { icon: Gift, title: 'Customizable Packages', desc: 'Tailor-made packages just for you.' },
  { icon: IndianRupee, title: 'Easy Booking', desc: 'Book quickly with our simple & secure process.' }
];

export default function Pricing() {
  const [packages, setPackages] = useState(defaultPackages);
  const [activeCategory, setActiveCategory] = useState('All Packages');
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

  const filtered = packages.filter((p) => {
    const matchesCategory = activeCategory === 'All Packages' || p.category === activeCategory;
    const matchesSearch = `${p.name} ${p.route || ''}`.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full text-left bg-[#F8FAFC] pt-20">

      {/* HERO */}
      <section className="relative overflow-hidden sh-gradient-purple">
        <div className="absolute inset-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=1920&auto=format&fit=crop&q=80"
            alt="Holiday Packages"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 md:pt-12 md:pb-20">
          <p className="text-xs font-bold sh-text-gradient-gold uppercase tracking-widest mb-3">Curated Journeys, Unforgettable Memories</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            Holiday <span className="sh-text-gradient-gold">Packages</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mt-3 leading-relaxed">
            Handpicked holiday packages for every kind of traveler. Explore breathtaking destinations with the best experiences and unbeatable value.
          </p>
        </div>
      </section>

      {/* Floating Search + Categories Card */}
      <div className="relative z-20 -mt-10 md:-mt-12 mb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(42,10,61,0.18)] border border-slate-100 p-4 sm:p-5">
            <div className="flex flex-col md:flex-row items-stretch gap-2.5 mb-4">
              <div className="flex-1 w-full flex items-center px-4 py-3 bg-slate-50 rounded-2xl border border-slate-200/70">
                <MapPin className="w-4 h-4 text-[#5B1F70] mr-3 shrink-0" />
                <div className="w-full">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Destination</div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Where do you want to go?"
                    className="bg-transparent border-none p-0 focus:outline-none text-slate-900 font-bold text-sm placeholder:text-slate-400 placeholder:font-medium w-full"
                  />
                </div>
              </div>

              <div className="flex-1 w-full flex items-center px-4 py-3 bg-slate-50 rounded-2xl border border-slate-200/70">
                <Calendar className="w-4 h-4 text-[#5B1F70] mr-3 shrink-0" />
                <div className="w-full">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Duration</div>
                  <div className="text-slate-900 font-bold text-sm">Select Duration</div>
                </div>
              </div>

              <div className="flex-1 w-full flex items-center px-4 py-3 bg-slate-50 rounded-2xl border border-slate-200/70">
                <IndianRupee className="w-4 h-4 text-[#5B1F70] mr-3 shrink-0" />
                <div className="w-full">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Budget</div>
                  <div className="text-slate-900 font-bold text-sm">Select Budget</div>
                </div>
              </div>

              <button className="sh-gradient-cta text-white rounded-2xl px-8 py-4 font-bold text-xs uppercase tracking-wider transition-all w-full md:w-auto flex items-center justify-center gap-2 cursor-pointer shadow-md shrink-0 active:scale-95">
                <Search className="w-4 h-4" />
                Search Packages
              </button>
            </div>

            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none border-t border-slate-100 pt-4">
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
        </div>
      </div>

      {/* PACKAGES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-end mb-6">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#D6266B]">Handpicked For You</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a0f24] tracking-tight mt-1">Popular Holiday Packages</h2>
          </div>
          <span className="text-xs font-bold text-slate-500 shrink-0">{filtered.length} packages found</span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-500 text-sm font-medium">
            No packages match your search. Try a different category or destination.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((pkg) => (
              <div key={pkg._id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 soft-shadow-hover flex flex-col justify-between group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  {pkg.tag && (
                    <span className="absolute top-3 left-3 sh-gradient-cta text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider">
                      {pkg.tag}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {pkg.rating} <span className="text-slate-400 font-medium">({pkg.reviews})</span>
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#D6266B] transition-colors">{pkg.name}</h3>
                  {pkg.route && <p className="text-[11px] text-slate-500 font-medium mt-0.5">{pkg.route}</p>}

                  <div className="flex items-center gap-4 mt-3 text-[11px] text-slate-500 font-semibold">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {pkg.duration}</span>
                    {pkg.travellers && <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {pkg.travellers}</span>}
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-black text-slate-900">₹{pkg.price}</span>
                      <span className="text-[10px] text-slate-400 font-bold block">/ person</span>
                    </div>
                    <button
                      onClick={() => alert(`Booking initiated for ${pkg.name}`)}
                      className="border-2 border-[#5B1F70] text-[#5B1F70] hover:bg-[#5B1F70] hover:text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      View Details <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* VALUE PROPS STRIP */}
      <section className="bg-white border-t border-slate-100 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {perks.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-11 h-11 rounded-full bg-[#5B1F70]/10 flex items-center justify-center mb-3">
                <item.icon className="w-5 h-5 text-[#5B1F70]" />
              </div>
              <h4 className="text-xs font-extrabold text-slate-900">{item.title}</h4>
              <p className="text-[10px] text-slate-500 font-medium mt-1 max-w-[150px]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
