import { useState } from 'react';
import { Check, Star, ChevronLeft, ChevronRight, Compass, Shield, Heart, Mountain } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const stats = [
    { title: 'Happy Travellers', count: '12,000+' },
    { title: 'Verified Stays', count: '350+' },
    { title: 'Tour Packages', count: '85+' },
    { title: 'Years Experience', count: '10+' }
  ];

  return (
    <div className="w-full text-left bg-[#F8FAFC]">
      {/* Header Banner */}
      <section className="relative bg-[#0B1329] py-28 text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&auto=format&fit=crop&q=80"
            alt="About Samika Holidays"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-[#0B1329]/80 to-[#F8FAFC]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-10">
          <span className="text-xs font-black uppercase tracking-widest text-sky-400 block mb-2">
            Who We Are
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
            About Samika Holidays
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm font-semibold uppercase tracking-wider mt-3">
            <Link to="/" className="hover:text-sky-400 transition-colors">Home</Link> — About Us
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80">
              <img
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80"
                alt="Samika Holidays luxury travel experience"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#006591] text-white p-6 rounded-3xl shadow-xl hidden sm:block border border-sky-400/30">
              <span className="text-3xl font-black block">10+ Years</span>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-100">Bespoke Travel Experience</span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-black text-[#006591] uppercase tracking-widest">Our Mission</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Crafting Memorable Journeys Across Incredible Worldwide Destinations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Samika Holidays creates thoughtful luxury travel experiences, from 5-star hotel bookings and handpicked oceanfront resorts to memorable cultural escapes and adventurous mountain expeditions.
            </p>

            <ul className="space-y-4 pt-2">
              {[
                { title: 'Verified Luxury Stays & Hotels', desc: 'Handpicked luxury resorts, cliffside chalets, and heritage boutique hotels.' },
                { title: 'Local Expert Escorts & Guides', desc: 'Certified local drivers, spiritual guides, and experienced safari escorts.' },
                { title: 'Transparent Pricing Guarantee', desc: 'No hidden fees with 100% price match promise and 24/7 VIP customer desk.' }
              ].map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <div className="w-7 h-7 rounded-full bg-sky-50 text-[#006591] flex items-center justify-center shrink-0 font-black text-xs border border-sky-100">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{bullet.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{bullet.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-20 bg-[#0B1329] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-2 bg-slate-900/60 p-6 rounded-3xl border border-slate-800 backdrop-blur-sm">
                <span className="text-4xl sm:text-5xl font-black text-[#0ea5e9] block">{stat.count}</span>
                <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">{stat.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
