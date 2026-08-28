import { useState, useEffect } from 'react';
import {
  Search, Calendar, Users, Star, ArrowRight, MapPin,
  CheckCircle2, ShieldCheck, Headset, BedDouble, Gift,
  Heart, ChevronLeft, ChevronRight, Wifi, Coffee, ParkingCircle,
  Mountain, Waves, Landmark, Compass, PawPrint, LayoutGrid
} from 'lucide-react';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const fallbackDestinations = [
  { _id: 'd1', title: 'Nainital', tagline: 'Lake Paradise', tag: 'Best Seller', category: 'Lakes', rating: '4.7', reviews: '324', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=700&auto=format&fit=crop&q=80' },
  { _id: 'd2', title: 'Mussoorie', tagline: 'Queen of Hills', tag: 'Peaceful', category: 'Mountains', rating: '4.5', reviews: '312', image: '/images/mountains_hero.png' },
  { _id: 'd3', title: 'Rishikesh', tagline: 'Yoga Capital', tag: 'Popular', category: 'Spiritual', rating: '4.6', reviews: '189', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&auto=format&fit=crop&q=80' },
  { _id: 'd4', title: 'Auli', tagline: 'Snow & Adventure', tag: 'Adventure', category: 'Adventure', rating: '4.8', reviews: '256', image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=700&auto=format&fit=crop&q=80' },
  { _id: 'd5', title: 'Jim Corbett', tagline: 'Wildlife Adventure', tag: 'Wildlife', category: 'Wildlife', rating: '4.6', reviews: '210', image: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=700&auto=format&fit=crop&q=80' },
  { _id: 'd6', title: 'Kedarnath', tagline: 'Spiritual Journey', tag: 'Spiritual', category: 'Spiritual', rating: '4.9', reviews: '278', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=700&auto=format&fit=crop&q=80' }
];

const destinationCategories = [
  { label: 'All', icon: LayoutGrid },
  { label: 'Mountains', icon: Mountain },
  { label: 'Lakes', icon: Waves },
  { label: 'Spiritual', icon: Landmark },
  { label: 'Adventure', icon: Compass },
  { label: 'Wildlife', icon: PawPrint }
];

const fallbackHotels = [
  { _id: 'h1', name: 'JW Marriott Mussoorie', location: 'Mussoorie, Uttarakhand', price: '18,999', rating: '4.8', reviews: '234', tag: 'Luxury', amenities: [Wifi, Coffee, ParkingCircle], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&auto=format&fit=crop&q=80' },
  { _id: 'h2', name: 'Taj Theog Resort & Spa', location: 'Shimla, Himachal Pradesh', price: '12,999', rating: '4.7', reviews: '182', tag: 'Best Seller', amenities: [Wifi, Coffee], image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=700&auto=format&fit=crop&q=80' },
  { _id: 'h3', name: 'Aloha on the Ganges', location: 'Rishikesh, Uttarakhand', price: '10,999', rating: '4.6', reviews: '210', tag: 'Popular', amenities: [Wifi, Coffee, ParkingCircle], image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=700&auto=format&fit=crop&q=80' },
  { _id: 'h4', name: 'The Naini Retreat', location: 'Nainital, Uttarakhand', price: '8,499', rating: '4.6', reviews: '98', tag: 'Newly Added', amenities: [Wifi, ParkingCircle], image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=700&auto=format&fit=crop&q=80' }
];

const heroHotelShowcase = [
  { name: 'JW Marriott Mussoorie', location: 'Mussoorie', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&auto=format&fit=crop&q=80' },
  { name: 'Taj Theog Resort & Spa', location: 'Shimla', image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=700&auto=format&fit=crop&q=80' },
  { name: 'Aloha on the Ganges', location: 'Rishikesh', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=700&auto=format&fit=crop&q=80' },
  { name: 'The Naini Retreat', location: 'Nainital', image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=700&auto=format&fit=crop&q=80' },
  { name: 'Alpine Mountain Retreat', location: 'Auli', image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=700&auto=format&fit=crop&q=80' }
];

const safaris = [
  { id: 's1', title: 'Jim Corbett Safari', price: '3,999', image: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=600&auto=format&fit=crop&q=80' },
  { id: 's2', title: 'Rajaji Safari', price: '4,499', image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600&auto=format&fit=crop&q=80' },
  { id: 's3', title: 'Pilibhit Safari', price: '3,499', image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&auto=format&fit=crop&q=80' },
  { id: 's4', title: 'Dhela Safari', price: '2,999', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&auto=format&fit=crop&q=80' },
  { id: 's5', title: 'Phulara Safari', price: '2,499', image: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=600&auto=format&fit=crop&q=80' }
];

const packagesList = [
  { id: 'p1', title: 'Kashmir Paradise', duration: '5 Nights / 6 Days', desc: 'Hotel + Sightseeing + Meals', price: '18,999', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&auto=format&fit=crop&q=80' },
  { id: 'p2', title: 'Uttarakhand Explorer', duration: '4 Nights / 5 Days', desc: 'Hotel + Sightseeing + Meals', price: '12,999', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&auto=format&fit=crop&q=80' },
  { id: 'p3', title: 'Himachal Delight', duration: '5 Nights / 6 Days', desc: 'Hotel + Sightseeing + Meals', price: '14,999', image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=600&auto=format&fit=crop&q=80' },
  { id: 'p4', title: 'Do Dham Yatra Package', duration: '3 Nights / 4 Days', desc: 'Hotel + Transport + Meals', price: '9,999', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&auto=format&fit=crop&q=80' },
  { id: 'p5', title: 'Golden Triangle Tour', duration: '5 Nights / 6 Days', desc: 'Hotel + Sightseeing + Meals', price: '16,999', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&auto=format&fit=crop&q=80' }
];

const searchTabs = ['Tours & Travel', 'Hotel Booking', 'Safaris', 'Packages'];

const heroSlides = [
  { image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1800&auto=format&fit=crop&q=85', alt: 'Nainital lake and mountains' },
  { image: '/images/mountains_hero.png', alt: 'Uttarakhand mountain landscape' },
  { image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=1800&auto=format&fit=crop&q=85', alt: 'Snowy Himalayan peaks' },
  { image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&auto=format&fit=crop&q=85', alt: 'Rishikesh riverside landscape' },
  { image: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=1800&auto=format&fit=crop&q=85', alt: 'Jim Corbett wildlife' },
  { image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1800&auto=format&fit=crop&q=85', alt: 'Kedarnath mountain journey' }
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('Tours & Travel');
  const [fromSearch, setFromSearch] = useState('');
  const [toSearch, setToSearch] = useState('');
  const [departSearch, setDepartSearch] = useState('');
  const [returnSearch, setReturnSearch] = useState('');
  const [guestsSearch, setGuestsSearch] = useState('1 Traveller, Economy');

  const [destinations, setDestinations] = useState(fallbackDestinations);
  const [hotels, setHotels] = useState(fallbackHotels);

  const [activeHotelSlide, setActiveHotelSlide] = useState(0);
  const [activeDestCategory, setActiveDestCategory] = useState('All');
  const [likedDestIds, setLikedDestIds] = useState([]);
  const [likedHotelIds, setLikedHotelIds] = useState([]);

  const toggleLikedDest = (id) => {
    setLikedDestIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };
  const toggleLikedHotel = (id) => {
    setLikedHotelIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const visibleDestinations = activeDestCategory === 'All'
    ? destinations
    : destinations.filter((d) => d.category === activeDestCategory);

  const nextHotelSlide = () => setActiveHotelSlide((i) => (i + 1) % heroHotelShowcase.length);
  const prevHotelSlide = () => setActiveHotelSlide((i) => (i - 1 + heroHotelShowcase.length) % heroHotelShowcase.length);

  useEffect(() => {
    fetch(`${API_BASE}/api/hotels`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.hotels && data.hotels.length > 0) {
          setHotels(data.hotels.slice(0, 4));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(slideTimer);
  }, []);

  useEffect(() => {
    const hotelTimer = window.setInterval(() => {
      setActiveHotelSlide((i) => (i + 1) % heroHotelShowcase.length);
    }, 3500);

    return () => window.clearInterval(hotelTimer);
  }, []);

  return (
    <div className="w-full bg-[#F8FAFC] text-[#1a0f24] text-left">

      {/* 1. HERO SECTION */}
      <section className="pt-[104px] md:pt-[112px] pb-0">
        <div className="w-full mx-auto">
          <div className="relative overflow-hidden">

            <div className="relative min-h-[520px] md:min-h-[620px] overflow-hidden">
              <img
                src={heroSlides[activeSlide].image}
                alt={heroSlides[activeSlide].alt}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

              <div className="relative z-10 h-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 px-6 sm:px-10 py-8 md:py-10">
                <div className="max-w-xl">
                  <span className="inline-flex w-fit items-center gap-2 bg-blue-500/20 backdrop-blur-md border border-blue-300/40 text-blue-50 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 shadow-[0_0_20px_rgba(59,130,246,0.25)]">
                    Discover The Magic Of
                  </span>
                  <h1 className="sh-text-gradient-gold font-serif italic text-5xl sm:text-6xl md:text-7xl font-bold mb-2 leading-none" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    Uttarakhand
                  </h1>
                  <h2 className="text-white text-2xl sm:text-3xl font-extrabold mb-4">Dream. Explore. Discover.</h2>
                  <p className="text-slate-200 text-sm sm:text-base max-w-lg mb-6 leading-relaxed">
                    From serene lakes and majestic mountains to spiritual journeys and thrilling adventures, Uttarakhand has it all.
                  </p>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white">
                    <span className="flex items-center gap-2 text-xs font-semibold">
                      <ShieldCheck className="w-4 h-4 text-[#D9A441]" /> Best Price Guarantee
                    </span>
                    <span className="flex items-center gap-2 text-xs font-semibold">
                      <Headset className="w-4 h-4 text-[#D9A441]" /> 24x7 Support
                    </span>
                    <span className="flex items-center gap-2 text-xs font-semibold">
                      <Star className="w-4 h-4 text-[#D9A441]" /> Handpicked Experiences
                    </span>
                    <span className="flex items-center gap-2 text-xs font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-[#D9A441]" /> Secure Booking
                    </span>
                  </div>

                  <div className="mt-7 flex items-center gap-2" aria-label="Destination slides">
                    {heroSlides.map((slide, index) => (
                      <button
                        key={slide.alt}
                        type="button"
                        onClick={() => setActiveSlide(index)}
                        aria-label={`Show slide ${index + 1}`}
                        className={`h-1.5 rounded-full transition-all ${index === activeSlide ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Right side floating hotel showcase */}
                <div className="hidden lg:block w-[300px] xl:w-[340px] shrink-0">
                  <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-white/15 aspect-[3/4] bg-black/20">
                    {heroHotelShowcase.map((hotel, index) => (
                      <img
                        key={hotel.name}
                        src={hotel.image}
                        alt={hotel.name}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                          index === activeHotelSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/10" />

                    <span className="absolute top-4 left-4 bg-gradient-to-r from-[#D9A441] to-[#F0C878] text-[#2A0A3D] text-[9px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider">
                      Featured Stays
                    </span>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-sm font-extrabold">{heroHotelShowcase[activeHotelSlide].name}</h3>
                      <p className="text-[11px] text-slate-200 font-medium flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#D9A441]" />
                        {heroHotelShowcase[activeHotelSlide].location}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={prevHotelSlide}
                      aria-label="Previous hotel"
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/15 hover:bg-white/35 backdrop-blur-md flex items-center justify-center text-white transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={nextHotelSlide}
                      aria-label="Next hotel"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/15 hover:bg-white/35 backdrop-blur-md flex items-center justify-center text-white transition-all cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Search Card — overlaps the hero bottom edge */}
      <div className="relative z-20 -mt-12 md:-mt-16 mb-10 md:mb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-transparent">
              <div className="w-fit max-w-full bg-white rounded-t-2xl px-3 pt-3 text-xs font-bold">
                <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
                  {searchTabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-full cursor-pointer transition-all shrink-0 flex items-center gap-2 ${
                        activeTab === tab
                          ? 'sh-gradient-cta text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-b-2xl shadow-[0_20px_50px_rgba(42,10,61,0.18)] border border-slate-100 p-3 sm:p-4 flex flex-col md:flex-row items-stretch gap-2.5">
                <div className="flex-1 w-full flex items-center px-4 py-3 bg-slate-50 rounded-2xl border border-slate-200/70">
                  <MapPin className="w-4 h-4 text-[#5B1F70] mr-3 shrink-0" />
                  <div className="w-full">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">From</div>
                    <input
                      type="text"
                      placeholder="Enter Departure"
                      value={fromSearch}
                      onChange={(e) => setFromSearch(e.target.value)}
                      className="bg-transparent border-none p-0 focus:outline-none text-slate-900 font-bold text-sm placeholder:text-slate-400 placeholder:font-medium w-full"
                    />
                  </div>
                </div>

                <div className="flex-1 w-full flex items-center px-4 py-3 bg-slate-50 rounded-2xl border border-slate-200/70">
                  <MapPin className="w-4 h-4 text-[#5B1F70] mr-3 shrink-0" />
                  <div className="w-full">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">To</div>
                    <input
                      type="text"
                      placeholder="Enter Destination"
                      value={toSearch}
                      onChange={(e) => setToSearch(e.target.value)}
                      className="bg-transparent border-none p-0 focus:outline-none text-slate-900 font-bold text-sm placeholder:text-slate-400 placeholder:font-medium w-full"
                    />
                  </div>
                </div>

                <div className="flex-1 w-full flex items-center px-4 py-3 bg-slate-50 rounded-2xl border border-slate-200/70">
                  <Calendar className="w-4 h-4 text-[#5B1F70] mr-3 shrink-0" />
                  <div className="w-full">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Departure</div>
                    <input
                      type="text"
                      placeholder="Select Date"
                      value={departSearch}
                      onChange={(e) => setDepartSearch(e.target.value)}
                      className="bg-transparent border-none p-0 focus:outline-none text-slate-900 font-bold text-sm placeholder:text-slate-400 placeholder:font-medium w-full"
                    />
                  </div>
                </div>

                <div className="flex-1 w-full flex items-center px-4 py-3 bg-slate-50 rounded-2xl border border-slate-200/70">
                  <Calendar className="w-4 h-4 text-[#5B1F70] mr-3 shrink-0" />
                  <div className="w-full">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Return</div>
                    <input
                      type="text"
                      placeholder="Select Date"
                      value={returnSearch}
                      onChange={(e) => setReturnSearch(e.target.value)}
                      className="bg-transparent border-none p-0 focus:outline-none text-slate-900 font-bold text-sm placeholder:text-slate-400 placeholder:font-medium w-full"
                    />
                  </div>
                </div>

                <div className="flex-1 w-full flex items-center px-4 py-3 bg-slate-50 rounded-2xl border border-slate-200/70">
                  <Users className="w-4 h-4 text-[#5B1F70] mr-3 shrink-0" />
                  <div className="w-full">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Travellers & Class</div>
                    <input
                      type="text"
                      value={guestsSearch}
                      onChange={(e) => setGuestsSearch(e.target.value)}
                      className="bg-transparent border-none p-0 focus:outline-none text-slate-900 font-bold text-sm placeholder:text-slate-400 placeholder:font-medium w-full"
                    />
                  </div>
                </div>

                <button
                  onClick={() => alert(`Searching ${activeTab} from ${fromSearch || 'anywhere'} to ${toSearch || 'Uttarakhand'}...`)}
                  className="sh-gradient-cta text-white rounded-2xl px-8 py-4 font-bold text-xs uppercase tracking-wider transition-all w-full md:w-auto flex items-center justify-center gap-2 cursor-pointer shadow-md shrink-0 active:scale-95"
                >
                  <Search className="w-4 h-4" />
                  Search Now
                </button>
              </div>
            </div>
        </div>
      </div>

      {/* 2. VALUE PROPOSITIONS BAR */}
      <section className="bg-[#F8FAFC] pb-8 md:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(42,10,61,0.12)] border border-slate-100 p-5 sm:p-7 grid grid-cols-2 md:grid-cols-5 gap-y-6 gap-x-3 md:gap-x-4 text-center md:divide-x md:divide-slate-100">
            {[
              { icon: ShieldCheck, title: 'Best Price Guarantee', desc: 'We ensure the best prices for your travel needs.', color: '#5B1F70' },
              { icon: Headset, title: '24/7 Customer Support', desc: 'Our travel experts are always here to help you.', color: '#D6266B' },
              { icon: BedDouble, title: 'Handpicked Hotels', desc: 'Stay in handpicked hotels for a comfortable journey.', color: '#F5811F' },
              { icon: ShieldCheck, title: 'Safe & Secure Travel', desc: 'Your safety is our top priority on every trip.', color: '#16A34A' },
              { icon: Gift, title: 'Easy Booking', desc: 'Book easily with our secure & simple process.', color: '#2563EB' }
            ].map((item, idx) => (
              <div key={idx} className="p-2 md:px-3 flex flex-col items-center">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${item.color}1A` }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <h4 className="text-xs font-extrabold text-slate-900">{item.title}</h4>
                <p className="text-[10px] text-slate-500 font-medium mt-1 max-w-[160px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. POPULAR DESTINATIONS GRID */}
      <section id="destinations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-5 md:mb-6 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#D6266B]">Explore Uttarakhand</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a0f24] tracking-tight mt-1">Popular Destinations</h2>
          </div>
          <Link to="/destinations" className="text-[#5B1F70] font-bold text-xs uppercase tracking-wider hover:underline flex items-center gap-1 shrink-0">
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 mb-5 scrollbar-none">
          {destinationCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeDestCategory === cat.label;
            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => setActiveDestCategory(cat.label)}
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {visibleDestinations.map((dest) => {
            const isLiked = likedDestIds.includes(dest._id);
            return (
              <div key={dest._id} className="group cursor-pointer">
                <Link to="/destinations" className="block text-left">
                  <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-2 soft-shadow-hover border border-slate-200/80">
                    <img
                      src={dest.image}
                      alt={dest.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                    {dest.tag && (
                      <span className="absolute top-2.5 left-2.5 sh-gradient-cta text-white text-[8px] font-black uppercase px-2 py-1 rounded-full tracking-wider">
                        {dest.tag}
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); toggleLikedDest(dest._id); }}
                      aria-label="Save destination"
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all cursor-pointer"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#D6266B] text-[#D6266B]' : 'text-slate-500'}`} />
                    </button>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="font-extrabold text-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#D9A441]" />
                        {dest.title}
                      </h3>
                      <p className="text-[10px] text-slate-200 font-medium">{dest.tagline}</p>
                      {dest.rating && (
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="text-[10px] font-bold">{dest.rating}</span>
                          {dest.reviews && <span className="text-[9px] text-slate-300">({dest.reviews})</span>}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {visibleDestinations.length === 0 && (
          <div className="text-center py-14 text-slate-500 text-sm font-medium">
            No destinations found in this category yet.
          </div>
        )}
      </section>

      {/* 4. PREMIUM STAYS / HANDPICKED PREMIUM HOTELS */}
      <section id="hotels" className="scroll-mt-24 sh-gradient-purple py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-5 md:mb-6 gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#F0C878]">Premium Stays</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">Handpicked Premium Hotels</h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-md">Luxury stays, exceptional service and unforgettable experiences.</p>
            </div>
            <Link
              to="/hotels"
              className="bg-gradient-to-r from-[#D9A441] to-[#F0C878] text-[#2A0A3D] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all shrink-0"
            >
              View All Hotels
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotels.map((hotel) => {
              const isLiked = likedHotelIds.includes(hotel._id);
              const amenityIcons = hotel.amenities && hotel.amenities.length > 0 ? hotel.amenities : [Wifi, Coffee, ParkingCircle];
              return (
                <div key={hotel._id} className="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-[#D9A441] to-[#F0C878] text-[#2A0A3D] text-[9px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider">
                      {hotel.tag || 'Premium'}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleLikedHotel(hotel._id)}
                      aria-label="Save hotel"
                      className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all cursor-pointer"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#D6266B] text-[#D6266B]' : 'text-slate-500'}`} />
                    </button>
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{hotel.rating}</span>
                      <span className="text-slate-400 font-medium">({hotel.reviews})</span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-sm font-extrabold text-slate-900">{hotel.name}</h3>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#5B1F70] shrink-0" />
                      {hotel.location}
                    </p>

                    <div className="flex items-center gap-3 mt-2.5 text-slate-400">
                      {amenityIcons.map((Icon, idx) => (
                        <Icon key={idx} className="w-3.5 h-3.5" />
                      ))}
                    </div>

                    <div className="mt-auto pt-3 flex items-center justify-between gap-2">
                      <p className="text-sm font-black text-slate-900">
                        ₹{hotel.price}
                        <span className="text-[10px] font-semibold text-slate-500"> /night</span>
                      </p>
                      <Link
                        to="/hotels"
                        className="border-2 border-[#5B1F70] text-[#5B1F70] hover:bg-[#5B1F70] hover:text-white text-[11px] font-bold px-4 py-2 rounded-full text-center transition-all shrink-0"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. TOP SAFARIS SECTION */}
      <section className="bg-white py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-5 md:mb-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#D6266B]">Wild & Exciting</span>
              <h2 className="text-3xl font-extrabold text-[#1a0f24] tracking-tight mt-1">Top Safaris</h2>
            </div>
            <Link to="/services" className="text-[#5B1F70] text-xs font-bold uppercase tracking-wider hover:underline flex items-center gap-1 shrink-0">
              View All Safaris <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {safaris.map((safari) => (
              <div key={safari.id} className="rounded-2xl overflow-hidden relative aspect-[4/5] group cursor-pointer">
                <img src={safari.image} alt={safari.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-sm font-bold">{safari.title}</h3>
                  <p className="text-[11px] text-[#F0C878] font-bold mt-0.5">From ₹{safari.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BEST TOUR PACKAGES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="flex justify-between items-end mb-5 md:mb-6">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#D6266B]">Best Selling Packages</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a0f24] tracking-tight mt-1">Curated Tour Packages</h2>
          </div>
          <Link to="/pricing" className="text-[#5B1F70] font-bold text-xs uppercase tracking-wider hover:underline flex items-center gap-1 shrink-0">
            View All Packages <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {packagesList.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 soft-shadow-hover flex flex-col justify-between">
              <div>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">{pkg.duration}</p>
                  <h3 className="text-sm font-extrabold text-slate-900 mt-1">{pkg.title}</h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">{pkg.desc}</p>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center justify-between">
                <span className="text-base font-black text-slate-900">₹{pkg.price}</span>
                <Link to="/pricing" className="bg-[#5B1F70] hover:bg-[#4A1560] text-white text-[11px] font-bold px-4 py-2 rounded-full">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. NEWSLETTER CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-12">
        <div className="sh-gradient-newsletter rounded-2xl p-5 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <Gift className="w-8 h-8 text-[#F0C878] shrink-0" />
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold">Get Exclusive Travel Deals</h3>
              <p className="text-xs sm:text-sm text-slate-200 mt-1">Subscribe to our newsletter and get the best offers & updates.</p>
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); alert('Subscribed to Shamika Holidays offers!'); }}
            className="w-full md:w-auto flex items-center gap-2 bg-white rounded-full p-2 shadow-md"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="bg-transparent border-none text-slate-900 text-xs font-bold px-4 focus:outline-none w-full md:w-64"
            />
            <button type="submit" className="sh-gradient-cta text-white font-bold text-xs uppercase px-6 py-3 rounded-full cursor-pointer shrink-0">
              Subscribe Now
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
