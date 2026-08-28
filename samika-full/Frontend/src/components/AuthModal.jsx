import { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, ShieldCheck, Eye, EyeOff, MapPin, Star, Plane } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_BASE = 'http://localhost:5000';

export default function AuthModal({ isOpen, onClose, initialTab = 'login' }) {
  const [mode, setMode] = useState(initialTab); // 'login' | 'register' | 'reset'
  const [formData, setFormData] = useState({ name: '', email: '', password: '', newPassword: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, register, loading } = useAuth();

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        const res = await login(formData.email, formData.password);
        setSuccessMsg(res.message || 'Logged in successfully!');
        setTimeout(() => { onClose(); setSuccessMsg(''); }, 1000);
      } else if (mode === 'register') {
        await register(formData.name, formData.email, formData.password);
        setSuccessMsg('Account created successfully!');
        setTimeout(() => { onClose(); setSuccessMsg(''); }, 1000);
      } else if (mode === 'reset') {
        const res = await fetch(`${API_BASE}/api/auth/reset-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, newPassword: formData.newPassword || formData.password })
        });
        const data = await res.json();
        if (data.success) {
          setSuccessMsg(data.message || 'Password reset successfully!');
          setTimeout(() => { setMode('login'); setSuccessMsg(''); }, 1500);
        } else {
          setErrorMsg(data.message || 'Password reset failed.');
        }
      }
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setErrorMsg('');
    setSuccessMsg('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(11,19,41,0.75)', backdropFilter: 'blur(12px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full flex overflow-hidden rounded-3xl shadow-2xl"
        style={{ maxWidth: '860px', maxHeight: '92vh', background: '#fff' }}
      >
        {/* ── LEFT PANEL — Brand & Visual ── */}
        <div
          className="hidden md:flex flex-col justify-between relative overflow-hidden"
          style={{
            width: '42%',
            minHeight: '580px',
            background: 'linear-gradient(160deg, #0B1329 0%, #004c6e 55%, #006591 100%)'
          }}
        >
          {/* Background travel photo overlay */}
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&auto=format&fit=crop&q=80"
            alt="Uttarakhand"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-20"
          />

          {/* Decorative circles */}
          <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full opacity-10" style={{ background: '#0ea5e9' }} />
          <div className="absolute -bottom-20 -right-10 w-72 h-72 rounded-full opacity-10" style={{ background: '#006591' }} />

          {/* Top — Logo */}
          <div className="relative z-10 p-8">
            <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-3 inline-flex items-center justify-center mb-6">
              <img
                src="/images/samika-holidays-logo.png"
                alt="Samika Holidays"
                className="h-12 w-auto object-contain"
              />
            </div>
            <h2 className="text-2xl font-extrabold text-white leading-tight mb-2">
              Your Journey<br />Starts Here
            </h2>
            <p className="text-sky-200/80 text-sm leading-relaxed">
              Premium travel experiences crafted for every explorer.
            </p>
          </div>

          {/* Middle — Floating destination cards */}
          <div className="relative z-10 px-8 space-y-3">
            {[
              { icon: '🏔️', name: 'Kedarnath Yatra', badge: '5★ Spiritual' },
              { icon: '⛷️', name: 'Auli Ski Adventure', badge: 'Snow & Thrills' },
              { icon: '🧘', name: 'Rishikesh Retreat', badge: 'Yoga Escape' },
            ].map((d, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-3"
              >
                <span className="text-xl">{d.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xs font-bold truncate">{d.name}</div>
                  <div className="text-sky-300/80 text-[10px] font-semibold">{d.badge}</div>
                </div>
                <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span className="text-[10px] font-bold text-white">4.9</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom — Trust badges */}
          <div className="relative z-10 p-8">
            <div className="flex items-center gap-4 flex-wrap">
              {[
                { icon: <ShieldCheck className="w-3.5 h-3.5" />, label: 'Secure Login' },
                { icon: <Plane className="w-3.5 h-3.5" />, label: '500+ Trips' },
                { icon: <MapPin className="w-3.5 h-3.5" />, label: '50+ Destinations' },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-1.5 text-sky-200/70 text-[10px] font-bold">
                  {b.icon}
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL — Form ── */}
        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-none" style={{ minHeight: '580px' }}>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4.5 h-4.5" />
          </button>

          <div className="flex-1 flex flex-col justify-center px-8 sm:px-10 py-10">
            {/* Mode Title */}
            <div className="mb-8">
              <p className="text-xs font-bold text-[#006591] uppercase tracking-widest mb-1.5">
                {mode === 'login' && 'Welcome back 👋'}
                {mode === 'register' && 'Join us today ✨'}
                {mode === 'reset' && 'Account recovery 🔑'}
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1329] tracking-tight">
                {mode === 'login' && 'Sign In'}
                {mode === 'register' && 'Create Account'}
                {mode === 'reset' && 'Reset Password'}
              </h2>
              <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">
                {mode === 'login' && 'Access your bookings, itineraries & exclusive deals.'}
                {mode === 'register' && 'Unlock AI trip planner, member rates & priority offers.'}
                {mode === 'reset' && 'Enter your email and choose a new secure password.'}
              </p>
            </div>

            {/* Tab switcher (Login / Register) */}
            {mode !== 'reset' && (
              <div className="flex rounded-2xl bg-slate-100 p-1 mb-7 gap-1">
                {['login', 'register'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => switchMode(tab)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      mode === tab
                        ? 'bg-white text-[#006591] shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {tab === 'login' ? 'Sign In' : 'Register'}
                  </button>
                ))}
              </div>
            )}

            {/* Alerts */}
            {errorMsg && (
              <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-start gap-2">
                <span className="mt-0.5 text-base">⚠️</span>
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name (register only) */}
              {mode === 'register' && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Full Name</label>
                  <div className="relative group">
                    <User className="w-4 h-4 text-slate-400 group-focus-within:text-[#006591] absolute left-4 top-1/2 -translate-y-1/2 transition-colors" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full bg-slate-50 border-2 border-slate-200 focus:border-[#006591] focus:bg-white rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold text-slate-800 focus:outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Email Address</label>
                <div className="relative group">
                  <Mail className="w-4 h-4 text-slate-400 group-focus-within:text-[#006591] absolute left-4 top-1/2 -translate-y-1/2 transition-colors" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@domain.com"
                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-[#006591] focus:bg-white rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold text-slate-800 focus:outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    {mode === 'reset' ? 'New Password' : 'Password'}
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => switchMode('reset')}
                      className="text-[11px] font-bold text-[#006591] hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative group">
                  <Lock className="w-4 h-4 text-slate-400 group-focus-within:text-[#006591] absolute left-4 top-1/2 -translate-y-1/2 transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name={mode === 'reset' ? 'newPassword' : 'password'}
                    required
                    value={mode === 'reset' ? (formData.newPassword || formData.password) : formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-[#006591] focus:bg-white rounded-2xl pl-11 pr-12 py-3.5 text-sm font-semibold text-slate-800 focus:outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#006591] transition-colors cursor-pointer"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || isSubmitting}
                className="w-full text-white font-bold py-4 rounded-2xl shadow-lg transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-60"
                style={{
                  background: loading || isSubmitting
                    ? '#94a3b8'
                    : 'linear-gradient(135deg, #006591 0%, #004c6e 100%)',
                  boxShadow: '0 8px 24px rgba(0,101,145,0.35)'
                }}
              >
                <span>
                  {(loading || isSubmitting) ? 'Processing...' : (
                    mode === 'login' ? 'Sign In to Account' :
                    mode === 'register' ? 'Create My Account' :
                    'Reset Password'
                  )}
                </span>
                {!loading && !isSubmitting && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            {/* Footer links */}
            <div className="mt-6 text-center">
              {mode === 'reset' && (
                <p className="text-xs text-slate-500">
                  Remember your password?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('login')}
                    className="text-[#006591] font-extrabold hover:underline cursor-pointer"
                  >
                    Back to Sign In
                  </button>
                </p>
              )}
              {mode !== 'reset' && (
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  By continuing, you agree to our{' '}
                  <span className="text-[#006591] font-semibold cursor-pointer hover:underline">Terms of Service</span>
                  {' '}&amp;{' '}
                  <span className="text-[#006591] font-semibold cursor-pointer hover:underline">Privacy Policy</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
