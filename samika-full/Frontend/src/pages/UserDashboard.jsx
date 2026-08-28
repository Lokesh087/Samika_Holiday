import { useState } from 'react';
import { 
  Sparkles, MapPin, Calendar, CheckSquare, Plus, ArrowRight, ShieldCheck, DollarSign,
  TrendingDown, CheckCircle2, User, LogOut, Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const { user, logout } = useAuth();

  const [itineraryDays, setItineraryDays] = useState([
    {
      id: 1,
      title: 'Day 1: Arrival & Welcome',
      badge: 'Arrival',
      events: [
        { time: '14:00', title: 'Check-in at Aman Kyoto Luxury Sanctuary' },
        { time: '16:30', title: 'Private Kinkaku-ji Temple Evening Tour' }
      ]
    },
    {
      id: 2,
      title: 'Day 2: Heritage & Culinary',
      badge: 'Heritage',
      events: [
        { time: '09:00', title: 'Arashiyama Bamboo Grove Private Walk' },
        { time: '13:00', title: 'Omakase Chef Tasting Experience at Gion' }
      ]
    }
  ]);

  const [readinessChecklist, setReadinessChecklist] = useState([
    { id: 'c1', label: 'Passport Validity & Visa Check', checked: true },
    { id: 'c2', label: 'Book Chauffeur Airport Transfer', checked: false },
    { id: 'c3', label: 'Reserve Michelin Dining (Day 2 Omakase)', checked: false }
  ]);

  const handleToggleCheck = (id) => {
    setReadinessChecklist(readinessChecklist.map(c => c.id === id ? { ...c, checked: !c.checked } : c));
  };

  const handleAddDay = () => {
    const nextDayNum = itineraryDays.length + 1;
    setItineraryDays([
      ...itineraryDays,
      {
        id: nextDayNum,
        title: `Day ${nextDayNum}: Exploration`,
        badge: 'Exploration',
        events: [
          { time: '10:00', title: 'Custom Sightseeing & Artisan Shopping' },
          { time: '18:00', title: 'Sunset Cocktail Cruise & VIP Pass' }
        ]
      }
    ]);
  };

  return (
    <div className="w-full bg-[#F8FAFC] text-[#131b2e] text-left pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200/80">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#006591] bg-sky-50 px-3 py-1 rounded-full border border-sky-100">Smart Travel Engine</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-2 flex items-center gap-3">
              <span>AI Trip Architect</span>
              <Sparkles className="w-6 h-6 text-sky-500 animate-pulse" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Intelligent itinerary planning, real-time cost calculation, and luxury booking optimization.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('AI Engine: Optimizing flight routes, boutique hotels, and bundle promotions...')}
              className="bg-[#006591] hover:bg-[#004c6e] text-white font-bold text-xs uppercase px-7 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95 tracking-wide"
            >
              <Sparkles className="w-4 h-4 text-sky-300" />
              <span>Auto-Generate</span>
            </button>
            {user && (
              <button
                onClick={logout}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-5 py-3.5 rounded-full transition-colors flex items-center gap-2 cursor-pointer border border-slate-200/80"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>

        {/* TOP SECTION: JOURNEY OVERVIEW + BUDGET INTEL & READINESS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* JOURNEY OVERVIEW MAP CONTAINER (LEFT) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#006591] flex items-center justify-center font-black border border-sky-100">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Workspace</span>
                  <h3 className="text-xl font-extrabold text-slate-900">Journey Overview & Route</h3>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="bg-sky-50 text-[#006591] text-[11px] font-bold px-3.5 py-1 rounded-full border border-sky-100">Kyoto, Japan</span>
                <span className="bg-slate-100 text-slate-700 text-[11px] font-bold px-3.5 py-1 rounded-full">7 Days</span>
              </div>
            </div>

            {/* Map Rendering Container */}
            <div className="w-full h-80 sm:h-96 bg-slate-100 rounded-2xl relative overflow-hidden border border-slate-200/80 flex items-center justify-center shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1000&auto=format&fit=crop&q=80"
                alt="Kyoto Itinerary Map"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-sky-900/15" />

              {/* Waypoints Pin Animation */}
              <div className="absolute top-1/3 left-1/3 w-6 h-6 rounded-full bg-[#006591] border-2 border-white shadow-xl animate-ping" />
              <div className="absolute top-1/3 left-1/3 w-6 h-6 rounded-full bg-[#006591] border-2 border-white shadow-xl flex items-center justify-center text-white text-[10px] font-black">1</div>
              
              <div className="absolute bottom-1/3 right-1/3 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white shadow-xl flex items-center justify-center text-white text-[10px] font-black">
                2
              </div>

              <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md text-xs font-bold text-slate-800 px-4 py-2 rounded-full shadow-md border border-slate-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>AI Route & Waypoints Optimized</span>
              </span>
            </div>
          </div>

          {/* RIGHT SIDEBAR: BUDGET INTEL & READINESS */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* BUDGET INTEL CARD */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-emerald-600" />
                  <span>Budget Intel</span>
                </h4>
                <span className="text-[10px] text-emerald-700 font-extrabold bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">AI Optimized</span>
              </div>

              <div className="pt-1">
                <span className="text-4xl font-black text-[#006591]">$1,240</span>
                <span className="text-xs font-bold text-slate-500 ml-2">Total Savings</span>
              </div>

              <div className="space-y-2.5 text-xs pt-1">
                <div className="bg-slate-50 p-3.5 rounded-2xl flex items-center justify-between border border-slate-100">
                  <span className="font-bold text-slate-700">✈️ Flight Bundle Discount</span>
                  <span className="font-black text-emerald-600">-$450</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-2xl flex items-center justify-between border border-slate-100">
                  <span className="font-bold text-slate-700">🏨 Hotel Promo Savings</span>
                  <span className="font-black text-emerald-600">-$600</span>
                </div>
              </div>
            </div>

            {/* READINESS CHECKLIST */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-[#006591]" />
                <span>Readiness Checklist</span>
              </h4>

              <div className="space-y-2.5">
                {readinessChecklist.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => handleToggleCheck(c.id)}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/90 transition-colors cursor-pointer border border-slate-100"
                  >
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all ${
                      c.checked ? 'bg-[#006591] border-[#006591] text-white shadow-2xs' : 'border-slate-300 bg-white'
                    }`}>
                      {c.checked && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <span className={`text-xs font-bold ${c.checked ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      {c.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* DAILY ITINERARY BUILDER SECTION */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#006591]">Timeline Control</span>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">Daily Itinerary Plan</h3>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3.5 py-1.5 rounded-full">Day 1 to {itineraryDays.length}</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {itineraryDays.map((day) => (
              <div key={day.id} className="bg-slate-50/80 rounded-3xl p-6 border border-slate-200/80 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-sky-100 text-[#006591] text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
                      {day.title}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {day.events.map((ev, evIdx) => (
                      <div key={evIdx} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1 hover:border-sky-300 transition-colors">
                        <span className="text-[10px] font-bold text-slate-400 block flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#006591]" />
                          <span>{ev.time}</span>
                        </span>
                        <p className="text-xs font-bold text-slate-800">{ev.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Add Day Button */}
            <button
              onClick={handleAddDay}
              className="bg-slate-50/50 hover:bg-sky-50 border-2 border-dashed border-slate-300 hover:border-[#006591] rounded-3xl p-6 flex flex-col items-center justify-center gap-3 text-slate-500 hover:text-[#006591] transition-all cursor-pointer min-h-[220px]"
            >
              <div className="w-12 h-12 rounded-full bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center text-[#006591]">
                <Plus className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">Add Day to Plan</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
