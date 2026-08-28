import { useState, useEffect } from 'react';
import { 
  Search, Calendar, Users, Star, MapPin, SlidersHorizontal, Check, X, 
  Plane, BedDouble, CheckCircle2, ShieldCheck, ArrowRight,
  Waves, Mountain, Building2, TreePalm, Gem, Hotel, Heart,
  Utensils, Sparkles, Clock, Phone, Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_BASE = 'http://localhost:5000';

const fallbackHotels = [
  {
    _id: 'hotel_1',
    name: 'Villa Firenze Retreat',
    location: 'Ravello, Amalfi Coast',
    price: '$450',
    rating: '4.9',
    reviewsCount: '128',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
    description: 'Experience unparalleled cliffside luxury with panoramic Mediterranean views and private infinity pool.',
    freeCancellation: true,
    hasPool: true,
    mapLat: 40.65,
    mapLng: 14.61
  },
  {
    _id: 'hotel_2',
    name: 'The Cliffside Azul',
    location: 'Positano, Amalfi Coast',
    price: '$320',
    rating: '4.8',
    reviewsCount: '94',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=80',
    description: 'Boutique coastal resort featuring open-air lounge, Mediterranean seafood dining, and private beach access.',
    hasBreakfast: true,
    mapLat: 40.62,
    mapLng: 14.48
  },
  {
    _id: 'hotel_3',
    name: 'Alpine Peak Mountain Retreat',
    location: 'Zermatt, Swiss Alps',
    price: '$520',
    rating: '4.95',
    reviewsCount: '162',
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=800&auto=format&fit=crop&q=80',
    description: 'Luxury mountain lodge featuring heated outdoor infinity pool, private spa suites, and panoramic Matterhorn alpine views.',
    freeCancellation: true,
    hasPool: true,
    hasBreakfast: true,
    mapLat: 45.97,
    mapLng: 7.74
  }
];

const flightsList = [
  {
    id: 'fl_1',
    airline: 'LuxeAir Airways',
    route: 'JFK to NAP',
    schedule: '18:30 - 09:15',
    type: 'Non-stop • 8h 45m',
    badge: 'Eco-friendly',
    price: '$850'
  },
  {
    id: 'fl_2',
    airline: 'Global Sky',
    route: 'JFK to NAP',
    schedule: '14:00 - 07:20',
    type: '1 Stop • 11h 20m',
    badge: 'Saver Rate',
    price: '$620'
  }
];

const stayCategories = [
  {
    title: 'Beachfront Escapes',
    subtitle: 'Sun, sand & serenity',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&auto=format&fit=crop&q=80'
  },
  {
    title: 'Mountain Retreats',
    subtitle: 'Elevated luxury',
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=800&auto=format&fit=crop&q=85'
  },
  {
    title: 'Private Villas',
    subtitle: 'Exclusive privacy',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&auto=format&fit=crop&q=80'
  },
  {
    title: 'Urban Luxury',
    subtitle: 'City sophistication',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&auto=format&fit=crop&q=80'
  }
];

export default function Hotels() {
  const { user } = useAuth();

  const [hotels, setHotels] = useState(fallbackHotels);
  const [searchQuery, setSearchQuery] = useState("Amalfi Coast");
  const [datesQuery, setDatesQuery] = useState("Aug 15 - Aug 22");
  const [guestsQuery, setGuestsQuery] = useState("2 Guests, 1 Room");

  // Filters State
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [toastMsg, setToastMsg] = useState('');

  // Booking Modal State
  const [bookingHotel, setBookingHotel] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    checkIn: '2026-08-15',
    checkOut: '2026-08-22',
    guests: '2 Guests',
    roomType: 'Luxury Villa Suite'
  });

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  useEffect(() => {
    fetch(`${API_BASE}/api/hotels`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.hotels && data.hotels.length > 0) {
          setHotels(data.hotels);
        }
      })
      .catch(() => {});
  }, []);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    showToast(`Room reserved successfully at ${bookingHotel.name}! Check your User Dashboard.`);
    setBookingHotel(null);
  };

  const scrollToSearch = () => {
    document.getElementById('hotel-search-panel')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const scrollToListings = () => {
    document.getElementById('hotel-listings')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filterCategories = [
    { label: 'All', icon: Hotel },
    { label: 'Beachfront Resort', icon: Waves },
    { label: 'Mountain Retreat', icon: Mountain },
    { label: 'Private Villa', icon: TreePalm },
    { label: 'Boutique', icon: Gem },
    { label: 'City Luxury', icon: Building2 },
  ];

  return (
    <div className="hotel-page-bg" style={{ color: 'var(--hotel-navy)' }}>
      
      {/* Toast Alert */}
      {toastMsg && (
        <div style={{
          position: 'fixed', top: '96px', right: '24px', zIndex: 50,
          background: 'var(--hotel-samika-blue)', color: 'white',
          padding: '16px 24px', borderRadius: '16px',
          boxShadow: '0 12px 32px rgba(0, 101, 145, 0.3)',
          fontSize: '13px', fontWeight: 600, display: 'flex',
          alignItems: 'center', gap: '10px', fontFamily: "'Inter', sans-serif",
          animation: 'hotelFadeInUp 0.3s ease-out forwards'
        }}>
          <CheckCircle2 style={{ width: 18, height: 18, flexShrink: 0 }} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ============================================
          HERO SECTION (MATCHING REFERENCE UI)
          ============================================ */}
      <section className="hotel-hero" style={{ paddingTop: '72px' }}>
        {/* Decorative Top-Left Gold Corner Flourish SVG (from reference UI) */}
        <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.85 }}>
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 20C40 20 80 40 100 80C115 110 120 150 120 180" stroke="#C49A45" strokeWidth="1" strokeOpacity="0.4" />
            <path d="M0 40C60 40 110 70 140 130C150 150 155 170 160 180" stroke="#C49A45" strokeWidth="1" strokeOpacity="0.3" />
            <circle cx="24" cy="24" r="3" fill="#C49A45" fillOpacity="0.5" />
            <circle cx="48" cy="12" r="1.5" fill="#C49A45" fillOpacity="0.4" />
          </svg>
        </div>

        {/* Left: Editorial Text */}
        <div className="hotel-hero-content">
          <span className="hotel-eyebrow" style={{ marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>PREMIUM HOSPITALITY</span>
            <span style={{ color: 'var(--hotel-gold)', fontSize: '10px' }}>•</span>
            <span>WORLD-CLASS EXPERIENCES</span>
          </span>

          <h1 className="hotel-serif" style={{
            fontSize: 'clamp(40px, 5.2vw, 64px)',
            fontWeight: 700,
            lineHeight: 1.05,
            color: 'var(--hotel-navy)',
            margin: 0,
            letterSpacing: '-0.02em'
          }}>
            Luxury Stays,
          </h1>
          <h1 className="hotel-serif" style={{
            fontSize: 'clamp(40px, 5.2vw, 64px)',
            fontWeight: 600,
            fontStyle: 'italic',
            lineHeight: 1.1,
            color: 'var(--hotel-gold)',
            margin: 0,
            marginBottom: '14px'
          }}>
            Reimagined
          </h1>

          {/* Gold Headline Accent Line (matching reference) */}
          <div style={{
            width: '48px',
            height: '2px',
            background: 'var(--hotel-gold)',
            borderRadius: '2px',
            marginBottom: '22px'
          }} />

          <p style={{
            fontSize: '15px',
            lineHeight: 1.65,
            color: 'var(--hotel-text-secondary)',
            maxWidth: '440px',
            margin: 0,
            marginBottom: '32px',
            fontFamily: "'Inter', sans-serif"
          }}>
            Discover exceptional accommodations, curated experiences, and exclusive amenities designed for the modern luxury traveler.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <button
              className="hotel-btn-primary"
              onClick={scrollToSearch}
              style={{
                background: 'var(--hotel-gold)',
                color: 'white',
                padding: '14px 28px',
                borderRadius: '12px',
                fontWeight: 600,
                boxShadow: '0 8px 20px rgba(196, 154, 69, 0.25)'
              }}
            >
              <Calendar style={{ width: 16, height: 16 }} />
              <span>Book Your Stay</span>
            </button>
            <button
              className="hotel-btn-secondary"
              onClick={scrollToListings}
              style={{
                borderColor: 'var(--hotel-border)',
                borderRadius: '12px',
                padding: '14px 28px',
                background: '#FFFFFF'
              }}
            >
              <Building2 style={{ width: 16, height: 16 }} />
              <span>Explore Suites</span>
            </button>
          </div>

          {/* In-Hero Feature Items (matching reference layout) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px 20px',
            paddingTop: '24px',
            borderTop: '1px solid var(--hotel-border-light)'
          }}>
            {[
              {
                icon: <Award style={{ width: 18, height: 18 }} />,
                title: 'WORLD-CLASS SERVICE',
                sub: 'Personalized for you'
              },
              {
                icon: <Waves style={{ width: 18, height: 18 }} />,
                title: 'PRIVATE ESCAPES',
                sub: 'Pool villas & suites'
              },
              {
                icon: <Utensils style={{ width: 18, height: 18 }} />,
                title: 'GOURMET DINING',
                sub: 'Exceptional culinary'
              },
              {
                icon: <Sparkles style={{ width: 18, height: 18 }} />,
                title: 'WELLNESS & RELAXATION',
                sub: 'Rejuvenate in paradise'
              }
            ].map((feat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: 'var(--hotel-gold-muted)',
                  color: 'var(--hotel-gold)',
                  display: 'flex', alignItems: 'center', justifyCenter: 'center',
                  flexShrink: 0
                }}>
                  <div style={{ margin: 'auto' }}>{feat.icon}</div>
                </div>
                <div>
                  <div style={{
                    fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em',
                    color: 'var(--hotel-navy)', textTransform: 'uppercase',
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    {feat.title}
                  </div>
                  <div style={{
                    fontSize: '11px', color: 'var(--hotel-text-secondary)',
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    {feat.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Hero Image */}
        <div className="hotel-hero-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1400&auto=format&fit=crop&q=90"
            alt="Luxury resort with oceanfront infinity pool"
          />

          {/* Award Laurel Wreath Badge (exact match to reference UI) */}
          <div className="hotel-hero-badge">
            <span style={{
              fontSize: '8px', fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--hotel-gold)',
              fontFamily: "'Inter', sans-serif", display: 'block', marginBottom: '4px'
            }}>
              AWARD WINNING
            </span>
            <span className="hotel-serif" style={{
              fontSize: '16px', fontWeight: 600, color: 'var(--hotel-navy)',
              display: 'block', lineHeight: 1.25, marginBottom: '8px'
            }}>
              Luxury Experience
            </span>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '3px', marginBottom: '8px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} style={{ width: 13, height: 13, fill: '#C49A45', color: '#C49A45' }} />
              ))}
            </div>
            <div style={{
              height: '1px', background: 'var(--hotel-border)', margin: '8px 0'
            }} />
            <span style={{
              fontSize: '8px', fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'var(--hotel-text-secondary)',
              fontFamily: "'Inter', sans-serif", display: 'block'
            }}>
              TRUSTED BY 25,000+<br />HAPPY GUESTS
            </span>
          </div>
        </div>
      </section>

      {/* ============================================
          FLOATING SEARCH PANEL
          ============================================ */}
      <div id="hotel-search-panel" className="hotel-search-floating" style={{ maxWidth: '1200px', margin: '-32px auto 48px', padding: '0 24px' }}>
        <div className="hotel-search-card">
          {/* Destination Field */}
          <div className="hotel-search-field">
            <Search style={{ width: 20, height: 20, color: 'var(--hotel-samika-blue)', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--hotel-text-secondary)',
                fontFamily: "'Inter', sans-serif", marginBottom: '4px'
              }}>
                Destination / Property
              </div>
              <input
                type="text"
                placeholder="Where to next? Try 'Amalfi Coast'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Dates Field */}
          <div className="hotel-search-field" style={{ flex: '0 0 auto', minWidth: '200px' }}>
            <Calendar style={{ width: 20, height: 20, color: 'var(--hotel-samika-blue)', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--hotel-text-secondary)',
                fontFamily: "'Inter', sans-serif", marginBottom: '4px'
              }}>
                Check In — Out
              </div>
              <input
                type="text"
                placeholder="Aug 15 - Aug 22"
                value={datesQuery}
                onChange={(e) => setDatesQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Guests Field */}
          <div className="hotel-search-field" style={{ flex: '0 0 auto', minWidth: '180px', borderRight: 'none' }}>
            <Users style={{ width: 20, height: 20, color: 'var(--hotel-samika-blue)', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--hotel-text-secondary)',
                fontFamily: "'Inter', sans-serif", marginBottom: '4px'
              }}>
                Guests & Rooms
              </div>
              <input
                type="text"
                placeholder="2 Guests, 1 Room"
                value={guestsQuery}
                onChange={(e) => setGuestsQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={() => showToast('Smart Hotel Search updated!')}
            className="hotel-btn-primary"
            style={{
              padding: '16px 32px', borderRadius: '14px', flexShrink: 0,
              fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase'
            }}
          >
            Search Stays
          </button>
        </div>
      </div>

      {/* ============================================
          CATEGORY / FILTER NAVIGATION
          ============================================ */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 40px', padding: '0 24px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          overflowX: 'auto', paddingBottom: '8px'
        }} className="scrollbar-none">
          <button
            className={`hotel-category-pill ${selectedFilter === 'All' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('All')}
            style={{ gap: '6px' }}
          >
            <SlidersHorizontal style={{ width: 15, height: 15 }} />
            <span>All Hotels</span>
          </button>
          {filterCategories.slice(1).map((cat) => {
            const IconComp = cat.icon;
            return (
              <button
                key={cat.label}
                className={`hotel-category-pill ${selectedFilter === cat.label ? 'active' : ''}`}
                onClick={() => setSelectedFilter(cat.label)}
              >
                <IconComp style={{ width: 15, height: 15 }} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================
          MAIN DISCOVERY: MAP + 2 LUXURY STAYS (EXACT LINE ALIGNMENT)
          ============================================ */}
      <div id="hotel-listings" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Discovery Section Main Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: '28px', borderBottom: '1px solid var(--hotel-border-light)',
          paddingBottom: '20px'
        }}>
          <div>
            <span className="hotel-eyebrow" style={{ display: 'block', marginBottom: '6px' }}>
              LUXURY ACCOMMODATIONS
            </span>
            <h2 className="hotel-section-heading" style={{ fontSize: '32px' }}>
              Handpicked Luxury Stays
            </h2>
            <p className="hotel-section-subtext" style={{ fontSize: '14px', marginTop: '4px' }}>
              Exceptional properties in the world's most desirable destinations.
            </p>
          </div>
          <span style={{
            fontSize: '13px', fontWeight: 600, color: 'var(--hotel-samika-blue)',
            cursor: 'pointer', fontFamily: "'Inter', sans-serif",
            whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            View all hotels <ArrowRight style={{ width: 14, height: 14 }} />
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 5fr) minmax(0, 7fr)',
          gap: '32px',
          alignItems: 'stretch'
        }} className="hotel-discovery-grid">

          {/* MAP PANEL (HEIGHT-STRETCHED TO ALIGN IN EXACT SAME LINE AS THE 2 HOTEL CARDS) */}
          <div className="hotel-map-card" style={{
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            height: '100%'
          }}>
            <div style={{ padding: '20px 24px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 className="hotel-serif" style={{
                  fontSize: '20px', fontWeight: 600, color: 'var(--hotel-navy)', margin: 0
                }}>
                  Interactive Map View
                </h3>
                <span className="hotel-eyebrow" style={{
                  fontSize: '9px',
                  background: 'var(--hotel-gold-muted)',
                  padding: '4px 12px',
                  borderRadius: '100px'
                }}>
                  LIVE MAP
                </span>
              </div>
              <p style={{
                fontSize: '12px', color: 'var(--hotel-text-secondary)',
                margin: '4px 0 0 0', fontFamily: "'Inter', sans-serif"
              }}>
                Showing {hotels.length} luxury properties with real-time price rates
              </p>
            </div>

            {/* Map Visual (Fills remaining height so bottom aligns with the 2 stay cards) */}
            <div style={{ position: 'relative', flex: 1, minHeight: '380px', overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80"
                alt="Amalfi Coast Map Rendering"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(0, 101, 145, 0.08) 0%, rgba(15, 27, 45, 0.12) 100%)'
              }} />

              {/* Price Pin 1 */}
              <div className="hotel-map-pin animate-bounce-slow" style={{ top: '32%', left: '35%' }}>
                <Star style={{ width: 12, height: 12, fill: '#C49A45', color: '#C49A45' }} />
                <span>$450</span>
              </div>

              {/* Price Pin 2 */}
              <div className="hotel-map-pin" style={{ bottom: '35%', right: '28%' }}>
                <Star style={{ width: 12, height: 12, fill: '#C49A45', color: '#C49A45' }} />
                <span>$320</span>
              </div>

              <span style={{
                position: 'absolute', bottom: '16px', left: '16px', right: '16px',
                background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)',
                fontSize: '11px', fontWeight: 600, color: 'var(--hotel-navy)',
                padding: '8px 16px', borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                border: '1px solid var(--hotel-border)',
                fontFamily: "'Inter', sans-serif", textAlign: 'center', display: 'block'
              }}>
                📍 Map pins synced with property selection
              </span>
            </div>
          </div>

          {/* HOTEL LISTINGS (THE 2 LUXURY STAY CARDS) */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {hotels.map((h) => (
                <div key={h._id} className="hotel-card" style={{
                  display: 'flex', flexDirection: 'row'
                }}>
                  {/* Card Image */}
                  <div className="hotel-card-image" style={{
                    width: '42%', flexShrink: 0, minHeight: '240px'
                  }}>
                    <img src={h.image} alt={h.name} />

                    {/* Rating Badge */}
                    <div style={{
                      position: 'absolute', top: '14px', left: '14px',
                      background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)',
                      padding: '6px 12px', borderRadius: '10px',
                      display: 'flex', alignItems: 'center', gap: '5px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      border: '1px solid var(--hotel-border-light)'
                    }}>
                      <Star className="hotel-gold-star" style={{ width: 13, height: 13 }} />
                      <span style={{
                        fontSize: '12px', fontWeight: 700, color: 'var(--hotel-navy)',
                        fontFamily: "'Inter', sans-serif"
                      }}>
                        {h.rating || '4.9'}
                      </span>
                      <span style={{
                        fontSize: '11px', color: 'var(--hotel-text-secondary)',
                        fontFamily: "'Inter', sans-serif"
                      }}>
                        ({h.reviewsCount || '128'})
                      </span>
                    </div>

                    {/* Wishlist */}
                    <button style={{
                      position: 'absolute', top: '14px', right: '14px',
                      background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
                      border: '1px solid var(--hotel-border-light)',
                      borderRadius: '50%', width: '36px', height: '36px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', transition: 'all 0.2s ease'
                    }}>
                      <Heart style={{ width: 16, height: 16, color: 'var(--hotel-text-secondary)' }} />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div style={{
                    flex: 1, padding: '24px 28px',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                  }}>
                    <div>
                      {/* Stars row */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '8px' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="hotel-gold-star" style={{ width: 12, height: 12 }} />
                        ))}
                        <span style={{
                          fontSize: '12px', fontWeight: 600, color: 'var(--hotel-gold)',
                          marginLeft: '6px', fontFamily: "'Inter', sans-serif"
                        }}>
                          {h.rating || '4.9'}
                        </span>
                      </div>

                      <h3 className="hotel-serif" style={{
                        fontSize: '22px', fontWeight: 600, color: 'var(--hotel-navy)',
                        margin: 0, marginBottom: '4px', lineHeight: 1.2
                      }}>
                        {h.name}
                      </h3>

                      <p style={{
                        fontSize: '13px', color: 'var(--hotel-text-secondary)',
                        display: 'flex', alignItems: 'center', gap: '4px',
                        margin: 0, marginBottom: '12px',
                        fontFamily: "'Inter', sans-serif", fontWeight: 500
                      }}>
                        <MapPin style={{ width: 14, height: 14, color: 'var(--hotel-samika-blue)' }} />
                        {h.location}
                      </p>

                      <p style={{
                        fontSize: '14px', lineHeight: 1.6,
                        color: 'var(--hotel-text-secondary)',
                        margin: 0, marginBottom: '14px',
                        fontFamily: "'Inter', sans-serif",
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {h.description}
                      </p>

                      {/* Amenity Tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {h.freeCancellation && (
                          <span className="hotel-amenity-tag">
                            <Check style={{ width: 12, height: 12, color: 'var(--hotel-samika-blue)' }} />
                            Free Cancellation
                          </span>
                        )}
                        {h.hasPool && (
                          <span className="hotel-amenity-tag">
                            <Waves style={{ width: 12, height: 12, color: 'var(--hotel-samika-blue)' }} />
                            Pool Access
                          </span>
                        )}
                        {h.hasBreakfast && (
                          <span className="hotel-amenity-tag">
                            <Utensils style={{ width: 12, height: 12, color: 'var(--hotel-samika-blue)' }} />
                            Breakfast Included
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price + Book */}
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      marginTop: '16px', paddingTop: '16px',
                      borderTop: '1px solid var(--hotel-border-light)'
                    }}>
                      <div>
                        <span style={{
                          fontSize: '24px', fontWeight: 700, color: 'var(--hotel-navy)',
                          fontFamily: "'Playfair Display', serif"
                        }}>
                          {h.price}
                        </span>
                        <span style={{
                          fontSize: '12px', color: 'var(--hotel-text-secondary)',
                          display: 'block', fontFamily: "'Inter', sans-serif"
                        }}>
                          per night
                        </span>
                      </div>

                      <button
                        onClick={() => setBookingHotel(h)}
                        className="hotel-btn-primary"
                        style={{ padding: '12px 24px', fontSize: '12px', letterSpacing: '0.04em' }}
                      >
                        BOOK YOUR STAY
                        <ArrowRight style={{ width: 14, height: 14 }} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================
          FLIGHT OPTIONS SECTION (FULL WIDTH CENTERED IN MIDDLE)
          ============================================ */}
      <section style={{ maxWidth: '1200px', margin: '56px auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="hotel-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
            FLIGHT & TRAVEL ADD-ONS
          </span>
          <h2 className="hotel-section-heading" style={{ fontSize: '32px' }}>
            Flight Options & Add-ons
          </h2>
          <p className="hotel-section-subtext" style={{ maxWidth: '480px', margin: '8px auto 0' }}>
            Seamless flight connections paired with your luxury stay reservation.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px'
        }} className="hotel-flight-grid">
          {flightsList.map((fl) => (
            <div key={fl.id} className="hotel-flight-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '46px', height: '46px', borderRadius: '14px',
                  background: 'var(--hotel-ivory)',
                  border: '1px solid var(--hotel-border-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px', flexShrink: 0
                }}>
                  ✈️
                </div>
                <div>
                  <h4 style={{
                    fontSize: '15px', fontWeight: 700, color: 'var(--hotel-navy)',
                    margin: 0, fontFamily: "'Inter', sans-serif"
                  }}>
                    {fl.airline}
                  </h4>
                  <p style={{
                    fontSize: '12px', color: 'var(--hotel-text-secondary)',
                    margin: 0, fontFamily: "'Inter', sans-serif"
                  }}>
                    {fl.type} • {fl.route}
                  </p>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <span style={{
                  fontSize: '13px', fontWeight: 700, color: 'var(--hotel-navy)',
                  fontFamily: "'Inter', sans-serif", display: 'block'
                }}>
                  {fl.schedule}
                </span>
                <span style={{
                  fontSize: '10px', fontWeight: 700, color: 'var(--hotel-samika-blue)',
                  background: 'rgba(0, 101, 145, 0.08)',
                  padding: '3px 12px', borderRadius: '100px',
                  fontFamily: "'Inter', sans-serif", marginTop: '4px',
                  display: 'inline-block'
                }}>
                  {fl.badge}
                </span>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className="hotel-serif" style={{
                  fontSize: '22px', fontWeight: 700, color: 'var(--hotel-navy)',
                  display: 'block'
                }}>
                  {fl.price}
                </span>
                <button
                  onClick={() => showToast(`Flight ${fl.airline} selected!`)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '12px', fontWeight: 600, color: 'var(--hotel-samika-blue)',
                    fontFamily: "'Inter', sans-serif", padding: 0, marginTop: '2px'
                  }}
                >
                  Select Flight →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================
          GOLD DIVIDER
          ============================================ */}
      <div className="hotel-divider" style={{ maxWidth: '1200px', margin: '56px auto' }} />

      {/* ============================================
          STAY YOUR WAY
          ============================================ */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 64px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="hotel-eyebrow" style={{ marginBottom: '12px', display: 'block' }}>
            CURATED COLLECTIONS
          </span>
          <h2 className="hotel-section-heading" style={{ fontSize: '36px' }}>
            Stay Your Way
          </h2>
          <p className="hotel-section-subtext" style={{ maxWidth: '480px', margin: '8px auto 0' }}>
            Choose the setting that matches your journey.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px'
        }} className="hotel-stay-grid">
          {stayCategories.map((cat, idx) => (
            <div key={idx} className="hotel-stay-card">
              <img src={cat.image} alt={cat.title} />
              <div className="hotel-stay-card-overlay">
                <h3 style={{
                  fontSize: '18px', fontWeight: 600, color: 'white',
                  margin: 0, marginBottom: '4px',
                  fontFamily: "'Playfair Display', serif"
                }}>
                  {cat.title}
                </h3>
                <p style={{
                  fontSize: '12px', color: 'rgba(255,255,255,0.8)',
                  margin: 0, fontFamily: "'Inter', sans-serif"
                }}>
                  {cat.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================
          FEATURED LUXURY STAYS
          ============================================ */}
      <section style={{
        maxWidth: '1200px', margin: '0 auto 64px', padding: '0 24px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="hotel-eyebrow" style={{ marginBottom: '12px', display: 'block' }}>
            EDITOR'S CHOICE
          </span>
          <h2 className="hotel-section-heading" style={{ fontSize: '36px' }}>
            Featured Luxury Stays
          </h2>
          <p className="hotel-section-subtext" style={{ maxWidth: '480px', margin: '8px auto 0' }}>
            Our most sought-after properties, handpicked for extraordinary experiences.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px'
        }} className="hotel-featured-grid">
          {[
            ...hotels.slice(0, 2),
            {
              _id: 'featured_3',
              name: 'Azure Palazzo Resort',
              location: 'Santorini, Greece',
              price: '$580',
              rating: '4.9',
              image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600&auto=format&fit=crop&q=80',
            }
          ].map((h, idx) => (
            <div key={h._id || idx} className="hotel-featured-card">
              <img src={h.image} alt={h.name} />
              <div className="hotel-featured-overlay">
                <span style={{
                  fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.75)',
                  fontFamily: "'Inter', sans-serif", display: 'flex',
                  alignItems: 'center', gap: '4px', marginBottom: '6px'
                }}>
                  <MapPin style={{ width: 12, height: 12 }} />
                  {h.location}
                </span>
                <h3 style={{
                  fontSize: '20px', fontWeight: 600, color: 'white',
                  margin: 0, marginBottom: '8px',
                  fontFamily: "'Playfair Display', serif", lineHeight: 1.2
                }}>
                  {h.name}
                </h3>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} style={{ width: 11, height: 11, fill: '#C9A96E', color: '#C9A96E' }} />
                      ))}
                    </div>
                    <span style={{
                      fontSize: '12px', fontWeight: 600, color: 'white',
                      fontFamily: "'Inter', sans-serif"
                    }}>
                      {h.rating || '4.9'}
                    </span>
                  </div>
                  <span style={{
                    fontSize: '16px', fontWeight: 700, color: 'white',
                    fontFamily: "'Playfair Display', serif"
                  }}>
                    From {h.price}
                  </span>
                </div>
                <button
                  onClick={() => setBookingHotel(h)}
                  style={{
                    width: '100%', marginTop: '14px',
                    padding: '10px 16px', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: 'white', fontSize: '12px', fontWeight: 600,
                    cursor: 'pointer', fontFamily: "'Inter', sans-serif",
                    transition: 'all 0.2s ease', letterSpacing: '0.04em'
                  }}
                  onMouseEnter={(e) => { e.target.style.background = 'rgba(255,255,255,0.35)'; }}
                  onMouseLeave={(e) => { e.target.style.background = 'rgba(255,255,255,0.2)'; }}
                >
                  View Hotel →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================
          TRUST / SERVICE SECTION
          ============================================ */}
      <section style={{
        maxWidth: '1200px', margin: '0 auto 64px', padding: '0 24px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="hotel-eyebrow" style={{ marginBottom: '12px', display: 'block' }}>
            WHY SAMIKA HOLIDAYS
          </span>
          <h2 className="hotel-section-heading" style={{ fontSize: '36px' }}>
            Every Stay, Thoughtfully Curated
          </h2>
          <p className="hotel-section-subtext" style={{ maxWidth: '500px', margin: '8px auto 0' }}>
            We go beyond booking to deliver journeys that exceed expectations.
          </p>
        </div>

        <div className="hotel-trust-grid">
          {[
            {
              icon: <ShieldCheck style={{ width: 28, height: 28, color: 'var(--hotel-gold)' }} />,
              title: 'Verified Luxury Properties',
              desc: 'Every property is personally inspected and verified for quality.'
            },
            {
              icon: <Phone style={{ width: 28, height: 28, color: 'var(--hotel-gold)' }} />,
              title: '24/7 Travel Assistance',
              desc: 'Dedicated concierge support available around the clock.'
            },
            {
              icon: <Clock style={{ width: 28, height: 28, color: 'var(--hotel-gold)' }} />,
              title: 'Flexible Booking',
              desc: 'Free cancellation and date changes on most properties.'
            },
            {
              icon: <Sparkles style={{ width: 28, height: 28, color: 'var(--hotel-gold)' }} />,
              title: 'Personalized Experiences',
              desc: 'Tailored itineraries crafted to match your preferences.'
            }
          ].map((item, idx) => (
            <div key={idx} className="hotel-trust-item">
              <div style={{
                width: '56px', height: '56px', borderRadius: '16px',
                background: 'var(--hotel-gold-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                {item.icon}
              </div>
              <h4 style={{
                fontSize: '15px', fontWeight: 700, color: 'var(--hotel-navy)',
                margin: 0, marginBottom: '8px', fontFamily: "'Inter', sans-serif"
              }}>
                {item.title}
              </h4>
              <p style={{
                fontSize: '13px', lineHeight: 1.6, color: 'var(--hotel-text-secondary)',
                margin: 0, fontFamily: "'Inter', sans-serif"
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom padding before footer */}
      <div style={{ height: '40px' }} />

      {/* ============================================
          BOOKING MODAL
          ============================================ */}
      {bookingHotel && (
        <div className="hotel-modal-overlay">
          <div className="hotel-modal-card">
            <button
              onClick={() => setBookingHotel(null)}
              style={{
                position: 'absolute', top: '20px', right: '20px',
                width: '40px', height: '40px', borderRadius: '12px',
                background: 'var(--hotel-ivory)', border: '1px solid var(--hotel-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.2s ease'
              }}
            >
              <X style={{ width: 18, height: 18, color: 'var(--hotel-text-secondary)' }} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px',
                background: 'var(--hotel-gold-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <BedDouble style={{ width: 24, height: 24, color: 'var(--hotel-gold)' }} />
              </div>
              <div>
                <span className="hotel-eyebrow" style={{ fontSize: '10px', display: 'block', marginBottom: '2px' }}>
                  STAY RESERVATION
                </span>
                <h3 className="hotel-serif" style={{
                  fontSize: '22px', fontWeight: 600, color: 'var(--hotel-navy)',
                  margin: 0
                }}>
                  {bookingHotel.name}
                </h3>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{
                    display: 'block', fontSize: '11px', fontWeight: 700,
                    color: 'var(--hotel-navy)', marginBottom: '6px',
                    fontFamily: "'Inter', sans-serif", letterSpacing: '0.04em',
                    textTransform: 'uppercase'
                  }}>
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingForm.checkIn}
                    onChange={e => setBookingForm({ ...bookingForm, checkIn: e.target.value })}
                    style={{
                      width: '100%', background: 'var(--hotel-ivory)',
                      border: '1px solid var(--hotel-border)', borderRadius: '12px',
                      padding: '12px 14px', fontSize: '13px', fontWeight: 600,
                      color: 'var(--hotel-navy)', fontFamily: "'Inter', sans-serif",
                      outline: 'none', boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block', fontSize: '11px', fontWeight: 700,
                    color: 'var(--hotel-navy)', marginBottom: '6px',
                    fontFamily: "'Inter', sans-serif", letterSpacing: '0.04em',
                    textTransform: 'uppercase'
                  }}>
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingForm.checkOut}
                    onChange={e => setBookingForm({ ...bookingForm, checkOut: e.target.value })}
                    style={{
                      width: '100%', background: 'var(--hotel-ivory)',
                      border: '1px solid var(--hotel-border)', borderRadius: '12px',
                      padding: '12px 14px', fontSize: '13px', fontWeight: 600,
                      color: 'var(--hotel-navy)', fontFamily: "'Inter', sans-serif",
                      outline: 'none', boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{
                    display: 'block', fontSize: '11px', fontWeight: 700,
                    color: 'var(--hotel-navy)', marginBottom: '6px',
                    fontFamily: "'Inter', sans-serif", letterSpacing: '0.04em',
                    textTransform: 'uppercase'
                  }}>
                    Guests Count
                  </label>
                  <select
                    value={bookingForm.guests}
                    onChange={e => setBookingForm({ ...bookingForm, guests: e.target.value })}
                    style={{
                      width: '100%', background: 'var(--hotel-ivory)',
                      border: '1px solid var(--hotel-border)', borderRadius: '12px',
                      padding: '12px 14px', fontSize: '13px', fontWeight: 600,
                      color: 'var(--hotel-navy)', fontFamily: "'Inter', sans-serif",
                      cursor: 'pointer', outline: 'none', boxSizing: 'border-box'
                    }}
                  >
                    <option value="1 Guest">1 Adult Guest</option>
                    <option value="2 Guests">2 Adult Guests</option>
                    <option value="3 Guests">3 Guests / Family</option>
                  </select>
                </div>
                <div>
                  <label style={{
                    display: 'block', fontSize: '11px', fontWeight: 700,
                    color: 'var(--hotel-navy)', marginBottom: '6px',
                    fontFamily: "'Inter', sans-serif", letterSpacing: '0.04em',
                    textTransform: 'uppercase'
                  }}>
                    Room Suite
                  </label>
                  <select
                    value={bookingForm.roomType}
                    onChange={e => setBookingForm({ ...bookingForm, roomType: e.target.value })}
                    style={{
                      width: '100%', background: 'var(--hotel-ivory)',
                      border: '1px solid var(--hotel-border)', borderRadius: '12px',
                      padding: '12px 14px', fontSize: '13px', fontWeight: 600,
                      color: 'var(--hotel-navy)', fontFamily: "'Inter', sans-serif",
                      cursor: 'pointer', outline: 'none', boxSizing: 'border-box'
                    }}
                  >
                    <option value="Luxury Villa Suite">Luxury Villa Suite</option>
                    <option value="Ocean View Balcony">Ocean View Balcony</option>
                    <option value="Presidential Suite">Presidential Suite</option>
                  </select>
                </div>
              </div>

              {/* Estimated Rate */}
              <div style={{
                padding: '16px 20px', borderRadius: '14px',
                background: 'var(--hotel-gold-muted)',
                border: '1px solid rgba(201, 169, 110, 0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <span style={{
                  fontSize: '13px', fontWeight: 600, color: 'var(--hotel-navy)',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  Estimated Rate:
                </span>
                <span className="hotel-serif" style={{
                  fontSize: '22px', fontWeight: 700, color: 'var(--hotel-gold)'
                }}>
                  {bookingHotel.price} / night
                </span>
              </div>

              <button
                type="submit"
                className="hotel-btn-primary"
                style={{
                  width: '100%', justifyContent: 'center',
                  padding: '16px 24px', fontSize: '12px',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  borderRadius: '14px', marginTop: '4px'
                }}
              >
                <span>Confirm Reservation</span>
                <ArrowRight style={{ width: 16, height: 16 }} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Responsive inline styles for grids that CSS can't handle alone */}
      <style>{`
        @media (max-width: 1024px) {
          .hotel-discovery-grid {
            grid-template-columns: 1fr !important;
          }
          .hotel-stay-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .hotel-featured-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .hotel-card {
            flex-direction: column !important;
          }
          .hotel-card .hotel-card-image {
            width: 100% !important;
            min-height: 200px !important;
          }
          .hotel-featured-grid {
            grid-template-columns: 1fr !important;
          }
          .hotel-stay-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .hotel-flight-card {
            flex-direction: column !important;
            text-align: center !important;
          }
          .hotel-flight-card > div {
            justify-content: center !important;
          }
        }
        @media (max-width: 480px) {
          .hotel-stay-grid {
            grid-template-columns: 1fr !important;
          }
          .hotel-modal-card {
            padding: 24px !important;
          }
          .hotel-modal-card div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
}
