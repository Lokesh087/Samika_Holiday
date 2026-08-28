import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, ShoppingBag, Bell
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenAuth }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Hotels', path: '/hotels' },
    { name: 'Experiences', path: '/services' },
    { name: 'Packages', path: '/pricing' },
    { name: 'AI Architect', path: '/ai-architect' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Main Nav */}
      <nav
        className={`bg-white border-b border-slate-200/80 transition-all duration-300 ${
          isScrolled ? 'shadow-md py-1.5' : 'py-2'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 sm:h-[72px]">

            <Link to="/" className="flex items-center self-stretch hover:opacity-90 transition-opacity shrink-0">
              <img
                src="/images/samika-holidays-logo.png"
                alt="Shamika Holidays"
                className="h-full w-auto object-contain py-1"
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden xl:flex items-center gap-5 2xl:gap-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-[13px] font-semibold transition-all relative py-1.5 flex items-center gap-1 whitespace-nowrap ${
                      isActive
                        ? 'text-[#D6266B]'
                        : 'text-slate-600 hover:text-[#D6266B]'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D6266B] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Signup and utility actions */}
            <div className="flex items-center gap-3">
              {user ? (
                <Link
                  to={user.role === 'admin' ? '/tour/admin' : '/dashboard'}
                  className="flex items-center gap-2.5 bg-slate-50 hover:bg-slate-100 p-1.5 pr-4 rounded-full border border-slate-200/80 transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-[#5B1F70] text-white flex items-center justify-center text-xs font-black">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-bold text-slate-800 hidden sm:inline">{user.name}</span>
                </Link>
              ) : (
                <button
                  onClick={() => onOpenAuth && onOpenAuth('register')}
                  className="text-[#5B1F70] text-xs font-bold px-2 py-2.5 transition-colors hover:text-[#D6266B] cursor-pointer tracking-wide"
                >
                  Sign Up
                </button>
              )}

              <button type="button" className="p-2 text-slate-700 hover:text-[#5B1F70] transition-colors cursor-pointer" title="Shop">
                <ShoppingBag className="w-5 h-5" />
              </button>
              <button type="button" className="p-2 text-slate-700 hover:text-[#5B1F70] transition-colors cursor-pointer" title="Notifications">
                <Bell className="w-5 h-5" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:text-[#5B1F70] xl:hidden focus:outline-none cursor-pointer"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        <div
          className={`xl:hidden fixed inset-x-0 top-[64px] sm:top-[72px] bg-white/98 backdrop-blur-xl border-b border-slate-200 shadow-xl transition-all duration-300 ${
            isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
          }`}
        >
          <div className="px-6 pt-4 pb-6 space-y-1 text-left max-w-md mx-auto max-h-[70vh] overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-2xl text-xs font-bold text-slate-800 hover:bg-pink-50 hover:text-[#D6266B] transition-colors"
              >
                {link.name}
              </Link>
            ))}
            {!user && (
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => { onOpenAuth && onOpenAuth('register'); setIsOpen(false); }}
                  className="w-full sh-gradient-cta text-white font-bold text-xs uppercase py-3.5 rounded-full text-center shadow-md cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
