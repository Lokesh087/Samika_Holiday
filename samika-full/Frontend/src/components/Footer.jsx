import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Share2, Camera, MessageCircle, Video } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#10061B] text-white w-full pt-8 pb-4 border-t border-white/5 text-left relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#5B1F70]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D9A441]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/images/samika-holidays-logo.png"
                alt="Shamika Holidays"
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Shamika Holidays is your trusted travel partner for unforgettable journeys across Uttarakhand and beyond.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#5B1F70] flex items-center justify-center transition-colors"><Share2 className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#5B1F70] flex items-center justify-center transition-colors"><Camera className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#5B1F70] flex items-center justify-center transition-colors"><MessageCircle className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#5B1F70] flex items-center justify-center transition-colors"><Video className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase text-[#F0C878] tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-1.5 text-xs font-medium text-slate-300">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Tours & Travel</Link></li>
              <li><Link to="/hotels" className="hover:text-white transition-colors">Hotel Booking</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Top Destinations */}
          <div>
            <h4 className="text-xs font-black uppercase text-[#F0C878] tracking-widest mb-4">Top Destinations</h4>
            <ul className="space-y-1.5 text-xs font-medium text-slate-300">
              <li><Link to="/services" className="hover:text-white transition-colors">Nainital</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Mussoorie</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Rishikesh</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Auli</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Kedarnath</Link></li>
            </ul>
          </div>

          {/* Travel Services */}
          <div>
            <h4 className="text-xs font-black uppercase text-[#F0C878] tracking-widest mb-4">Travel Services</h4>
            <ul className="space-y-1.5 text-xs font-medium text-slate-300">
              <li><Link to="/hotels" className="hover:text-white transition-colors">Hotel Booking</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Tour Packages</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Safari Tours</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Corporate Tours</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Wedding Tours</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Visa Assistance</Link></li>
            </ul>
          </div>

        </div>

        {/* Contact Us row */}
        <div className="border-t border-white/10 pt-4 mb-4">
          <h4 className="text-xs font-black uppercase text-[#F0C878] tracking-widest mb-4">Contact Us</h4>
          <div className="flex flex-col sm:flex-row flex-wrap gap-x-10 gap-y-3 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#F0C878] shrink-0" />
              123 Travel Street, Dehradun, Uttarakhand, India - 248001
            </span>
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#F0C878] shrink-0" />
              +91 98765 43210
            </span>
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#F0C878] shrink-0" />
              info@shamikaholidays.com
            </span>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT & PAYMENT BAR */}
        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} Shamika Holidays. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-[11px] font-semibold">We Accept:</span>
            <span className="bg-white text-[#1a1f71] text-[10px] font-black px-2 py-1 rounded">VISA</span>
            <span className="bg-white text-[#eb001b] text-[10px] font-black px-2 py-1 rounded">Mastercard</span>
            <span className="bg-white text-[#0b4f6c] text-[10px] font-black px-2 py-1 rounded">RuPay</span>
            <span className="bg-white text-[#5f259f] text-[10px] font-black px-2 py-1 rounded">UPI</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
