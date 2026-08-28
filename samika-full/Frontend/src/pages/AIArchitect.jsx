import { useState } from 'react';
import { ArrowRight, Sparkles, Mountain, Wallet, CalendarRange, Users, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  { icon: Mountain, title: 'Pick a vibe', desc: 'Adventure, spiritual, wildlife, or a quiet mountain escape — tell us what excites you.' },
  { icon: CalendarRange, title: 'Share your dates', desc: 'Let us know how many days you have and when you\u2019d like to travel.' },
  { icon: Wallet, title: 'Set your budget', desc: 'We\u2019ll tailor hotels, transport and experiences to fit comfortably within it.' },
  { icon: Users, title: 'Get your itinerary', desc: 'Our travel experts turn your answers into a considered, day-by-day plan.' }
];

export default function AIArchitect() {
  const [interest, setInterest] = useState('Adventure & Trekking');
  const [budget, setBudget] = useState('₹15,000 - ₹30,000');
  const [days, setDays] = useState('4-5 Days');

  return (
    <div className="w-full bg-[#F8FAFC] text-left pt-20">

      {/* HERO */}
      <section className="relative overflow-hidden sh-gradient-purple">
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-[#D9A441]/10 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <span className="inline-flex items-center gap-2 border border-[#D9A441]/60 text-[#F0C878] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            <Sparkles className="w-3.5 h-3.5" /> AI Trip Architect
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-2xl">
            Your intelligent <span className="sh-text-gradient-gold">trip architect</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mt-4 leading-relaxed">
            Tell us what kind of journey you want, and our travel team will turn the idea into a considered, ready-to-book itinerary across Uttarakhand.
          </p>
        </div>
      </section>

      {/* Preference Builder Card */}
      <div className="relative z-20 -mt-10 md:-mt-12 mb-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(42,10,61,0.18)] border border-slate-100 p-6 sm:p-8">
            <h2 className="text-lg font-extrabold text-slate-900 mb-1">Tell us about your dream trip</h2>
            <p className="text-xs text-slate-500 mb-6">Answer a few quick questions and we'll suggest the perfect plan for you.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">What interests you?</label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs font-bold text-slate-800 cursor-pointer focus:outline-none focus:border-[#5B1F70]"
                >
                  <option>Adventure & Trekking</option>
                  <option>Spiritual & Pilgrimage</option>
                  <option>Wildlife & Nature</option>
                  <option>Honeymoon & Romance</option>
                  <option>Family & Leisure</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">How many days?</label>
                <select
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs font-bold text-slate-800 cursor-pointer focus:outline-none focus:border-[#5B1F70]"
                >
                  <option>2-3 Days</option>
                  <option>4-5 Days</option>
                  <option>6-8 Days</option>
                  <option>9+ Days</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Budget per person</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs font-bold text-slate-800 cursor-pointer focus:outline-none focus:border-[#5B1F70]"
                >
                  <option>Under ₹10,000</option>
                  <option>₹15,000 - ₹30,000</option>
                  <option>₹30,000 - ₹50,000</option>
                  <option>₹50,000+</option>
                </select>
              </div>
            </div>

            <Link
              to="/contact"
              className="w-full sh-gradient-cta text-white font-bold py-4 rounded-2xl shadow-md text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <Wand2 className="w-4 h-4" />
              Build My Itinerary
            </Link>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#D6266B]">How It Works</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a0f24] tracking-tight mt-1">Plan My Trip In 4 Simple Steps</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={step.title} className="bg-white rounded-2xl p-6 border border-slate-200/90 soft-shadow-hover relative">
              <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full sh-gradient-cta text-white text-xs font-black flex items-center justify-center shadow-md">
                {idx + 1}
              </span>
              <div className="w-11 h-11 rounded-xl bg-[#5B1F70]/10 flex items-center justify-center mb-4">
                <step.icon className="w-5 h-5 text-[#5B1F70]" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">{step.title}</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="sh-gradient-newsletter rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold">Prefer to talk to a human?</h3>
            <p className="text-xs sm:text-sm text-slate-200 mt-1">Our travel experts are just a call away and happy to help plan your trip.</p>
          </div>
          <Link
            to="/contact"
            className="bg-white text-[#5B1F70] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all shrink-0 flex items-center gap-2"
          >
            Talk To Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
