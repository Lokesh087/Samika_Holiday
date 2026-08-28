import { useState, useEffect } from 'react';
import { 
  Shield, Plus, Trash2, Edit3, MapPin, DollarSign, Package as PackageIcon, 
  Users, User, Layers, CheckCircle, Lock, Mail, ArrowRight, RefreshCw, X, Star, Globe, Leaf, LogOut, LayoutDashboard,
  ClipboardList, Settings, Search, Filter, Phone, Calendar, Clock, AlertTriangle, Eye, Building, BedDouble, Wifi, Coffee, Sparkles,
  FileText, PenTool, BookOpen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const API_BASE = 'http://localhost:5000';

export default function AdminDashboard() {
  const { user, login, register, logout, token } = useAuth();

  // Admin Auth Mode: 'login' | 'register' | 'reset'
  const [adminAuthMode, setAdminAuthMode] = useState('login');
  const [adminResetMsg, setAdminResetMsg] = useState('');

  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const handleAdminPasswordReset = async (e) => {
    e.preventDefault();
    setLoginError('');
    setAdminResetMsg('');
    setLoginLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, newPassword: adminPassword })
      });
      const data = await res.json();
      if (data.success) {
        setAdminResetMsg(data.message || 'Admin password reset successfully!');
        setTimeout(() => {
          setAdminAuthMode('login');
          setAdminResetMsg('');
        }, 1500);
      } else {
        setLoginError(data.message || 'Password reset failed.');
      }
    } catch (err) {
      setLoginError('Error resetting admin password.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleAdminRegister = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const res = await register(adminName, adminEmail, adminPassword, 'admin');
      if (res.user && res.user.role === 'admin') {
        showToast('Single Admin Account created & logged in!');
      } else {
        setLoginError('Registration failed.');
      }
    } catch (err) {
      setLoginError(err.message || 'Registration failed. An admin might already exist.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Dashboard Tab State: 'overview' | 'tours' | 'packages' | 'hotels' | 'blogs' | 'bookings' | 'users' | 'settings'
  const [activeTab, setActiveTab] = useState('overview');
  const [tours, setTours] = useState([]);
  const [packages, setPackages] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Blog Form State
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    category: 'Destination Guides',
    author: 'Alexander Wright',
    readTime: '5 min read',
    image: '',
    excerpt: '',
    content: ''
  });

  // Search & Filter state for Tours
  const [tourSearch, setTourSearch] = useState('');
  const [tourCategoryFilter, setTourCategoryFilter] = useState('All');

  // Bookings / Inquiries State
  const [bookings, setBookings] = useState([
    { id: 'BK-101', customer: 'Cody Fisher', email: 'cody@example.com', phone: '+1 555-0192', tour: 'Swiss Alps Expedition', date: '2026-08-15', status: 'Approved', price: '$1,850' },
    { id: 'BK-102', customer: 'Sarah Jenkins', email: 'sarah@example.com', phone: '+1 555-0143', tour: 'Grand Alpine Palace & Spa (Hotel)', date: '2026-08-20', status: 'Pending', price: '$240 / night' },
    { id: 'BK-103', customer: 'Alexander Wright', email: 'alex@example.com', phone: '+1 555-0188', tour: 'Machu Picchu Highlands', date: '2026-09-01', status: 'Completed', price: '$1,350' },
    { id: 'BK-104', customer: 'Li Na', email: 'lina@example.com', phone: '+1 555-0122', tour: 'Azure Beach Resort & Villas (Hotel)', date: '2026-09-10', status: 'Approved', price: '$180 / night' }
  ]);

  // Users List State
  const [userList, setUserList] = useState([
    { id: 'USR-1', name: 'System Admin', email: 'admin@travelleragencie.com', role: 'admin', joined: 'July 2026' },
    { id: 'USR-2', name: 'Cody Fisher', email: 'cody@example.com', role: 'user', joined: 'July 2026' },
    { id: 'USR-3', name: 'Sophia Chen', email: 'sophia@example.com', role: 'user', joined: 'July 2026' },
    { id: 'USR-4', name: 'Marcus Aurel', email: 'marcus@example.com', role: 'user', joined: 'July 2026' }
  ]);

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState({
    agencyName: 'Travelleragencie',
    supportEmail: 'support@travelleragencie.com',
    currency: 'USD ($)',
    maintenanceMode: false
  });

  // Tour Form State
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [editingTourId, setEditingTourId] = useState(null);
  const [tourForm, setTourForm] = useState({
    title: '',
    location: '',
    price: '$1,200',
    duration: '5 Days',
    rating: '4.8',
    image: '',
    category: 'Mountain Trekking',
    description: ''
  });

  // Package Form State
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState(null);
  const [packageForm, setPackageForm] = useState({
    name: '',
    price: '$899',
    desc: '',
    features: '',
    isPopular: false
  });

  // Hotel Form State
  const [isHotelModalOpen, setIsHotelModalOpen] = useState(false);
  const [editingHotelId, setEditingHotelId] = useState(null);
  const [hotelForm, setHotelForm] = useState({
    name: '',
    location: '',
    price: '$180 / night',
    rating: '4.8',
    image: '',
    amenities: 'Free High-Speed WiFi\nSwimming Pool\nLuxury Spa Center\nBuffet Breakfast Included',
    description: '',
    roomsAvailable: 12
  });

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const openCreateBlogModal = () => {
    setEditingBlogId(null);
    setBlogForm({
      title: '',
      category: 'Destination Guides',
      author: user ? user.name : 'Alexander Wright',
      readTime: '5 min read',
      image: '',
      excerpt: '',
      content: ''
    });
    setIsBlogModalOpen(true);
  };

  const openEditBlogModal = (blog) => {
    setEditingBlogId(blog._id || blog.id);
    setBlogForm({
      title: blog.title || '',
      category: blog.category || 'Destination Guides',
      author: blog.author || (user ? user.name : 'Admin'),
      readTime: blog.readTime || '5 min read',
      image: blog.image || '',
      excerpt: blog.excerpt || '',
      content: blog.content || blog.excerpt || ''
    });
    setIsBlogModalOpen(true);
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingBlogId ? `${API_BASE}/api/blogs/${editingBlogId}` : `${API_BASE}/api/blogs`;
      const method = editingBlogId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(blogForm)
      });
      const data = await res.json();
      if (data.success) {
        showToast(editingBlogId ? 'Blog post updated successfully!' : 'New Blog post published successfully!');
        setIsBlogModalOpen(false);
        setEditingBlogId(null);
        fetchData();
      } else {
        showToast(data.message || 'Failed to save blog post.');
      }
    } catch (err) {
      showToast('Error saving blog post.');
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        showToast('Blog post deleted!');
        fetchData();
      }
    } catch (err) {
      showToast('Failed to delete blog.');
    }
  };

  // Fetch Tours, Packages, Hotels, Blogs
  const fetchData = async () => {
    setLoadingData(true);
    try {
      const [toursRes, pkgRes, hotelsRes, blogsRes] = await Promise.all([
        fetch(`${API_BASE}/api/tours`),
        fetch(`${API_BASE}/api/packages`),
        fetch(`${API_BASE}/api/hotels`),
        fetch(`${API_BASE}/api/blogs`)
      ]);
      const toursData = await toursRes.json();
      const pkgData = await pkgRes.json();
      const hotelsData = await hotelsRes.json();
      const blogsData = await blogsRes.json();

      if (toursData.success) setTours(toursData.tours);
      if (pkgData.success) setPackages(pkgData.packages);
      if (hotelsData.success) setHotels(hotelsData.hotels);
      if (blogsData.success) setBlogs(blogsData.blogs);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Admin Login Submit
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const res = await login(adminEmail, adminPassword);
      if (res.user && res.user.role === 'admin') {
        showToast('Welcome System Admin!');
      } else {
        setLoginError('Access denied. User account is not an Admin.');
      }
    } catch (err) {
      setLoginError(err.message || 'Login failed. Invalid admin credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Tour Submit Handler
  const handleTourSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingTourId ? `${API_BASE}/api/tours/${editingTourId}` : `${API_BASE}/api/tours`;
      const method = editingTourId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(tourForm)
      });
      const data = await res.json();
      if (data.success) {
        showToast(editingTourId ? 'Tour updated successfully!' : 'New Tour location created successfully!');
        setIsTourModalOpen(false);
        setEditingTourId(null);
        setTourForm({ title: '', location: '', price: '$1,200', duration: '5 Days', rating: '4.8', image: '', category: 'Mountain Trekking', description: '' });
        fetchData();
      } else {
        showToast(data.message || 'Failed to save tour.');
      }
    } catch (err) {
      showToast('Error saving tour.');
    }
  };

  // Delete Tour Handler
  const handleDeleteTour = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tour location?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/tours/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        showToast('Tour deleted!');
        fetchData();
      }
    } catch (err) {
      showToast('Failed to delete tour.');
    }
  };

  // Package Submit Handler
  const handlePackageSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingPackageId ? `${API_BASE}/api/packages/${editingPackageId}` : `${API_BASE}/api/packages`;
      const method = editingPackageId ? 'PUT' : 'POST';

      const featuresArr = typeof packageForm.features === 'string'
        ? packageForm.features.split('\n').filter(f => f.trim() !== '')
        : packageForm.features;

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...packageForm, features: featuresArr })
      });
      const data = await res.json();
      if (data.success) {
        showToast(editingPackageId ? 'Pricing Package updated!' : 'New Pricing Package created!');
        setIsPackageModalOpen(false);
        setEditingPackageId(null);
        setPackageForm({ name: '', price: '$899', desc: '', features: '', isPopular: false });
        fetchData();
      } else {
        showToast(data.message || 'Failed to save package.');
      }
    } catch (err) {
      showToast('Error saving package.');
    }
  };

  // Delete Package Handler
  const handleDeletePackage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this pricing package?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/packages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        showToast('Pricing package deleted!');
        fetchData();
      }
    } catch (err) {
      showToast('Failed to delete package.');
    }
  };

  // Hotel Submit Handler
  const handleHotelSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingHotelId ? `${API_BASE}/api/hotels/${editingHotelId}` : `${API_BASE}/api/hotels`;
      const method = editingHotelId ? 'PUT' : 'POST';

      const amenitiesArr = typeof hotelForm.amenities === 'string'
        ? hotelForm.amenities.split('\n').filter(a => a.trim() !== '')
        : hotelForm.amenities;

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...hotelForm, amenities: amenitiesArr })
      });
      const data = await res.json();
      if (data.success) {
        showToast(editingHotelId ? 'Hotel updated successfully!' : 'New Hotel created successfully!');
        setIsHotelModalOpen(false);
        setEditingHotelId(null);
        setHotelForm({ name: '', location: '', price: '$180 / night', rating: '4.8', image: '', amenities: '', description: '', roomsAvailable: 10 });
        fetchData();
      } else {
        showToast(data.message || 'Failed to save hotel.');
      }
    } catch (err) {
      showToast('Error saving hotel.');
    }
  };

  // Delete Hotel Handler
  const handleDeleteHotel = async (id) => {
    if (!window.confirm('Are you sure you want to delete this hotel listing?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/hotels/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        showToast('Hotel deleted!');
        fetchData();
      }
    } catch (err) {
      showToast('Failed to delete hotel.');
    }
  };

  // Toggle Featured Hotel Handler (for Home Page showcase)
  const handleToggleHotelFeatured = async (hotel) => {
    try {
      const res = await fetch(`${API_BASE}/api/hotels/${hotel._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isFeatured: !hotel.isFeatured })
      });
      const data = await res.json();
      if (data.success) {
        showToast(!hotel.isFeatured ? `${hotel.name} set as Featured on Home Page!` : `${hotel.name} unfeatured.`);
        fetchData();
      }
    } catch (err) {
      showToast('Failed to update featured hotel.');
    }
  };

  // Toggle Booking Status
  const handleBookingStatusChange = (id, newStatus) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
    showToast(`Booking ${id} status updated to ${newStatus}`);
  };

  // Filtered Tours List
  const filteredTours = tours.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(tourSearch.toLowerCase()) ||
                          t.location.toLowerCase().includes(tourSearch.toLowerCase());
    const matchesCategory = tourCategoryFilter === 'All' || t.category === tourCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  // 1. IF UNAUTHENTICATED AS ADMIN -> RENDER ADMIN LOGIN PAGE
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-emerald-950 flex flex-col justify-center items-center p-4 relative overflow-hidden text-left">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-lime-400/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-emerald-950 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg text-lime-400 border border-lime-400/30">
              <Shield className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-black tracking-widest uppercase bg-lime-100 text-emerald-900 px-3 py-1 rounded-full">
              Protected Admin Portal
            </span>
            <h2 className="text-3xl font-black text-emerald-950 mt-3">
              {adminAuthMode === 'register' && 'Register Admin Account'}
              {adminAuthMode === 'reset' && 'Reset Admin Password'}
              {adminAuthMode === 'login' && 'Admin Login'}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {adminAuthMode === 'register' && 'Create your unique System Admin account'}
              {adminAuthMode === 'reset' && 'Enter admin email and new password'}
              {adminAuthMode === 'login' && 'Access Travelleragencie Backend Management Dashboard'}
            </p>
          </div>

          {adminResetMsg && (
            <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              {adminResetMsg}
            </div>
          )}

          {loginError && (
            <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
              {loginError}
            </div>
          )}

          {/* ================= MODE 1: REGISTER ADMIN ================= */}
          {adminAuthMode === 'register' && (
            <form onSubmit={handleAdminRegister} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Admin Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#034b42]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Admin Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="Enter admin email address"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#034b42]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Create admin password"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#034b42]"
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[10px] font-bold text-amber-800">
                ⚡ <strong>Single Admin Policy:</strong> Only 1 Admin account is permitted. Once created, no additional admin accounts can be registered.
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-[#a3e635] hover:bg-lime-400 text-emerald-950 font-black py-4 rounded-2xl shadow-lg transition-all active:scale-95 text-xs uppercase tracking-wider flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                <span>{loginLoading ? 'Registering Admin...' : 'Create Admin & Open Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* ================= MODE 2: LOGIN ADMIN ================= */}
          {adminAuthMode === 'login' && (
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="Enter admin email"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#034b42]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => { setAdminAuthMode('reset'); setLoginError(''); }}
                    className="text-[11px] font-bold text-[#034b42] hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#034b42]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-[#a3e635] hover:bg-lime-400 text-emerald-950 font-black py-4 rounded-2xl shadow-lg transition-all active:scale-95 text-xs uppercase tracking-wider flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                <span>{loginLoading ? 'Unlocking...' : 'Unlock Admin Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* ================= MODE 3: RESET PASSWORD ================= */}
          {adminAuthMode === 'reset' && (
            <form onSubmit={handleAdminPasswordReset} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Admin Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="Enter admin email address"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#034b42]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#034b42]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-[#a3e635] hover:bg-lime-400 text-emerald-950 font-black py-4 rounded-2xl shadow-lg transition-all active:scale-95 text-xs uppercase tracking-wider flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                <span>{loginLoading ? 'Processing...' : 'Reset Admin Password'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Bottom Switch Prompt */}
          <div className="mt-6 pt-5 border-t border-gray-100 text-center space-y-2">
            {adminAuthMode === 'login' && (
              <p className="text-xs text-gray-500 font-semibold">
                Need to create Admin account?{' '}
                <button
                  type="button"
                  onClick={() => { setAdminAuthMode('register'); setLoginError(''); }}
                  className="text-[#034b42] font-black hover:underline cursor-pointer ml-1 text-xs"
                >
                  Register Admin
                </button>
              </p>
            )}

            {adminAuthMode === 'register' && (
              <p className="text-xs text-gray-500 font-semibold">
                Already registered Admin?{' '}
                <button
                  type="button"
                  onClick={() => { setAdminAuthMode('login'); setLoginError(''); }}
                  className="text-[#034b42] font-black hover:underline cursor-pointer ml-1 text-xs"
                >
                  Admin Sign In
                </button>
              </p>
            )}

            {adminAuthMode === 'reset' && (
              <p className="text-xs text-gray-500 font-semibold">
                Remember your password?{' '}
                <button
                  type="button"
                  onClick={() => { setAdminAuthMode('login'); setLoginError(''); }}
                  className="text-[#034b42] font-black hover:underline cursor-pointer ml-1 text-xs"
                >
                  Back to Admin Login
                </button>
              </p>
            )}

            <div className="pt-2">
              <Link to="/" className="text-xs font-bold text-gray-400 hover:text-emerald-900 transition-colors">
                ← Return to Main Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED ADMIN -> RENDER DASHBOARD WITH LEFT SIDEBAR LAYOUT
  return (
    <div className="min-h-screen bg-[#f4f8f6] flex text-left">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 bg-[#034b42] text-lime-400 px-5 py-3 rounded-2xl shadow-2xl border border-lime-400/40 text-xs font-bold flex items-center gap-3 animate-bounce-slow">
          <CheckCircle className="w-4 h-4 text-lime-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-[#034b42] text-white fixed inset-y-0 left-0 flex flex-col justify-between p-6 shadow-2xl z-40">
        <div>
          {/* Sidebar Brand Header */}
          <Link to="/" className="flex items-center gap-2.5 mb-8 group">
            <div className="w-10 h-10 bg-lime-400 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Leaf className="w-6 h-6 text-emerald-950 fill-current" />
            </div>
            <div>
              <span className="text-lg font-black text-white tracking-tight block">
                Traveller<span className="text-lime-400">agencie</span>
              </span>
              <span className="text-[10px] text-lime-300 uppercase tracking-widest font-mono font-bold block">
                Admin Control
              </span>
            </div>
          </Link>

          {/* Navigation Menu Items */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-lime-400 text-emerald-950 shadow-lg'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview & Stats</span>
            </button>

            <button
              onClick={() => setActiveTab('tours')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'tours'
                  ? 'bg-lime-400 text-emerald-950 shadow-lg'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Tours & Locations</span>
              <span className="ml-auto bg-white/20 px-2 py-0.5 rounded-full text-[10px]">{tours.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('hotels')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'hotels'
                  ? 'bg-lime-400 text-emerald-950 shadow-lg'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Building className="w-4 h-4 text-lime-300" />
              <span>Hotels & Resorts</span>
              <span className="ml-auto bg-white/20 px-2 py-0.5 rounded-full text-[10px]">{hotels.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('packages')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'packages'
                  ? 'bg-lime-400 text-emerald-950 shadow-lg'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Pricing Packages</span>
              <span className="ml-auto bg-white/20 px-2 py-0.5 rounded-full text-[10px]">{packages.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('blogs')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'blogs'
                  ? 'bg-lime-400 text-emerald-950 shadow-lg'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4 text-lime-300" />
              <span>Blog Articles</span>
              <span className="ml-auto bg-white/20 px-2 py-0.5 rounded-full text-[10px]">{blogs.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-lime-400 text-emerald-950 shadow-lg'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <span>Bookings & Requests</span>
              <span className="ml-auto bg-white/20 px-2 py-0.5 rounded-full text-[10px]">{bookings.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'users'
                  ? 'bg-lime-400 text-emerald-950 shadow-lg'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Users & Admins</span>
              <span className="ml-auto bg-white/20 px-2 py-0.5 rounded-full text-[10px]">{userList.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-lime-400 text-emerald-950 shadow-lg'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>System Settings</span>
            </button>

            <Link
              to="/"
              className="w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-xs font-extrabold text-gray-300 hover:bg-white/10 hover:text-white transition-all mt-4 border-t border-white/10 pt-4"
            >
              <Globe className="w-4 h-4 text-lime-400" />
              <span>View Live Website</span>
            </Link>
          </nav>
        </div>

        {/* Sidebar Footer User Info & Logout */}
        <div className="pt-4 border-t border-white/10">
          <div className="bg-black/20 rounded-2xl p-3 mb-3 border border-white/10 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-lime-400 text-emerald-950 flex items-center justify-center font-black text-xs shrink-0">
              {user.name ? user.name[0] : 'A'}
            </div>
            <div className="overflow-hidden">
              <span className="block text-xs font-bold text-white truncate">{user.name}</span>
              <span className="block text-[10px] text-emerald-200 truncate">{user.email}</span>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-400/30 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Admin</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="ml-64 flex-grow p-8">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#034b42]">
              {activeTab === 'overview' && 'Dashboard Overview & Stats'}
              {activeTab === 'tours' && 'Tours & Destinations Manager'}
              {activeTab === 'hotels' && 'Hotels & Luxury Resorts Manager'}
              {activeTab === 'packages' && 'Pricing Packages Manager'}
              {activeTab === 'blogs' && 'Blog Posts & Travel Guides'}
              {activeTab === 'bookings' && 'Bookings & Customer Requests'}
              {activeTab === 'users' && 'Users & Admin Accounts'}
              {activeTab === 'settings' && 'Platform System Settings'}
            </h1>
            <p className="text-xs text-gray-500 mt-1">Real-time control center for Travelleragencie platform</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="p-3 bg-white hover:bg-gray-50 text-gray-700 rounded-2xl shadow-xs border border-gray-200 transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loadingData ? 'animate-spin' : ''}`} />
            </button>

            {activeTab === 'blogs' && (
              <button
                onClick={openCreateBlogModal}
                className="bg-[#a3e635] hover:bg-lime-400 text-emerald-950 font-black px-5 py-3 rounded-2xl text-xs shadow-md transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Write New Blog</span>
              </button>
            )}

            {activeTab === 'tours' && (
              <button
                onClick={() => {
                  setEditingTourId(null);
                  setTourForm({ title: '', location: '', price: '$1,200', duration: '5 Days', rating: '4.8', image: '', category: 'Mountain Trekking', description: '' });
                  setIsTourModalOpen(true);
                }}
                className="bg-[#a3e635] hover:bg-lime-400 text-emerald-950 font-black px-5 py-3 rounded-2xl text-xs shadow-md transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add New Tour</span>
              </button>
            )}

            {activeTab === 'hotels' && (
              <button
                onClick={() => {
                  setEditingHotelId(null);
                  setHotelForm({ name: '', location: '', price: '$180 / night', rating: '4.8', image: '', amenities: 'Free High-Speed WiFi\nSwimming Pool\nLuxury Spa Center\nBuffet Breakfast Included', description: '', roomsAvailable: 12 });
                  setIsHotelModalOpen(true);
                }}
                className="bg-[#a3e635] hover:bg-lime-400 text-emerald-950 font-black px-5 py-3 rounded-2xl text-xs shadow-md transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add New Hotel</span>
              </button>
            )}

            {activeTab === 'packages' && (
              <button
                onClick={() => {
                  setEditingPackageId(null);
                  setPackageForm({ name: '', price: '$899', desc: '', features: '', isPopular: false });
                  setIsPackageModalOpen(true);
                }}
                className="bg-[#a3e635] hover:bg-lime-400 text-emerald-950 font-black px-5 py-3 rounded-2xl text-xs shadow-md transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add Pricing Package</span>
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: OVERVIEW & STATS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Active Tours</span>
                  <h3 className="text-3xl font-black text-[#034b42] mt-1">{tours.length}</h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#034b42] flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Hotels & Resorts</span>
                  <h3 className="text-3xl font-black text-[#034b42] mt-1">{hotels.length}</h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-lime-100 text-lime-800 flex items-center justify-center">
                  <Building className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Bookings</span>
                  <h3 className="text-3xl font-black text-[#034b42] mt-1">{bookings.length}</h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                  <ClipboardList className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Platform Status</span>
                  <h3 className="text-sm font-black text-emerald-600 mt-1">100% Online</h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Quick Management Shortcuts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Tours Control</span>
                  <h3 className="text-xl font-extrabold text-[#034b42] mt-1">Destination Routes</h3>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    Create new mountain trails, beach getaways, or edit existing tour pricing.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('tours')}
                  className="mt-6 bg-[#034b42] text-lime-400 font-bold px-5 py-2.5 rounded-2xl text-xs flex items-center justify-center gap-2 hover:bg-[#046155] transition-colors cursor-pointer"
                >
                  <span>Tours Manager</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Hotels Control</span>
                  <h3 className="text-xl font-extrabold text-[#034b42] mt-1">Resorts & Lodges</h3>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    Add luxury hotels, chalet lodges, beachfront villas, and amenities.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('hotels')}
                  className="mt-6 bg-[#034b42] text-lime-400 font-bold px-5 py-2.5 rounded-2xl text-xs flex items-center justify-center gap-2 hover:bg-[#046155] transition-colors cursor-pointer"
                >
                  <span>Hotels Manager</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Pricing Control</span>
                  <h3 className="text-xl font-extrabold text-[#034b42] mt-1">Pricing Packages</h3>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    Update Explorer, Adventurer, and Luxury packages or custom VIP deals.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('packages')}
                  className="mt-6 bg-[#034b42] text-lime-400 font-bold px-5 py-2.5 rounded-2xl text-xs flex items-center justify-center gap-2 hover:bg-[#046155] transition-colors cursor-pointer"
                >
                  <span>Packages Manager</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TOURS LIST */}
        {activeTab === 'tours' && (
          <div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search tour title or location..."
                  value={tourSearch}
                  onChange={(e) => setTourSearch(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#034b42]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                <span className="text-xs font-bold text-gray-500 flex items-center gap-1"><Filter className="w-3.5 h-3.5" /> Category:</span>
                {['All', 'Mountain Trekking', 'Island Getaway', 'Cultural Heritage'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setTourCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      tourCategoryFilter === cat ? 'bg-[#034b42] text-lime-400' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTours.map(t => (
                <div
                  key={t._id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img src={t.image} alt={t.title} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 bg-[#034b42] text-lime-400 text-[10px] font-bold px-3 py-1 rounded-full">
                        {t.location}
                      </div>
                      <div className="absolute top-3 right-3 bg-white text-gray-900 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {t.rating}
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="text-[10px] font-bold text-orange-500 uppercase">{t.category}</span>
                      <h4 className="text-xl font-bold text-[#034b42] mt-1">{t.title}</h4>
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2">{t.description || 'Verified expedition route led by certified guides.'}</p>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <span className="text-xs text-gray-400 font-semibold">{t.duration}</span>
                        <span className="text-lg font-black text-emerald-950">{t.price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingTourId(t._id);
                        setTourForm(t);
                        setIsTourModalOpen(true);
                      }}
                      className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 border border-gray-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteTour(t._id)}
                      className="p-2.5 rounded-xl bg-white hover:bg-rose-50 text-rose-600 border border-gray-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: HOTELS LIST */}
        {activeTab === 'hotels' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map(h => (
              <div
                key={h._id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-[#034b42] text-lime-400 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {h.location}
                    </div>
                    <div className="absolute top-3 right-3 bg-white text-gray-900 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {h.rating}
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-[#034b42]">{h.name}</h4>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2">{h.description}</p>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap gap-1.5">
                      {(Array.isArray(h.amenities) ? h.amenities : []).slice(0, 3).map((a, idx) => (
                        <span key={idx} className="bg-lime-50 text-emerald-950 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                          ✓ {a}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-400 font-semibold">{h.roomsAvailable || 10} Rooms Left</span>
                      <span className="text-lg font-black text-emerald-950">{h.price}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-2 flex-wrap">
                  <button
                    onClick={() => handleToggleHotelFeatured(h)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                      h.isFeatured 
                        ? 'bg-[#c5221f] text-white shadow-sm hover:bg-red-700' 
                        : 'bg-white text-slate-700 hover:bg-red-50 border border-slate-200'
                    }`}
                    title="Featured stays appear in the Luxury Stays section on Home page"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{h.isFeatured ? '★ Featured on Home' : 'Feature on Home'}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingHotelId(h._id);
                        setHotelForm({
                          ...h,
                          amenities: Array.isArray(h.amenities) ? h.amenities.join('\n') : h.amenities
                        });
                        setIsHotelModalOpen(true);
                      }}
                      className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 border border-gray-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteHotel(h._id)}
                      className="p-2.5 rounded-xl bg-white hover:bg-rose-50 text-rose-600 border border-gray-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: PACKAGES LIST */}
        {activeTab === 'packages' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map(p => (
              <div
                key={p._id}
                className={`bg-white rounded-3xl p-6 shadow-sm border ${p.isPopular ? 'border-lime-400 ring-2 ring-lime-400/30' : 'border-gray-100'} flex flex-col justify-between relative`}
              >
                {p.isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-lime-400 text-emerald-950 font-black text-[10px] uppercase px-3 py-1 rounded-full shadow-sm">
                    Most Popular
                  </span>
                )}
                <div>
                  <h4 className="text-2xl font-black text-[#034b42] mt-2">{p.name}</h4>
                  <div className="text-3xl font-black text-emerald-950 mt-2">{p.price}</div>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">{p.desc}</p>

                  <ul className="mt-6 space-y-2 text-xs text-gray-600">
                    {(Array.isArray(p.features) ? p.features : []).map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-lime-500 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      setEditingPackageId(p._id);
                      setPackageForm({
                        ...p,
                        features: Array.isArray(p.features) ? p.features.join('\n') : p.features
                      });
                      setIsPackageModalOpen(true);
                    }}
                    className="p-2.5 rounded-xl bg-[#eaf4f1] text-emerald-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Package</span>
                  </button>
                  <button
                    onClick={() => handleDeletePackage(p._id)}
                    className="p-2.5 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: BLOG ARTICLES */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-[#034b42]">Published Travel Articles & Guides</h3>
                <p className="text-xs text-gray-500 mt-0.5">Manage articles visible on the public /blog route</p>
              </div>
              <button
                onClick={openCreateBlogModal}
                className="bg-[#034b42] hover:bg-[#046155] text-lime-400 font-black px-5 py-2.5 rounded-2xl text-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Write New Article</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map(b => (
                <div key={b._id || b.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="aspect-[16/9] relative overflow-hidden">
                      <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 bg-[#034b42] text-lime-400 text-[10px] font-bold px-3 py-1 rounded-full">
                        {b.category}
                      </div>
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                        {b.readTime}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between text-[11px] text-gray-400 font-bold mb-2">
                        <span>By {b.author}</span>
                        <span>{b.date}</span>
                      </div>
                      <h4 className="text-lg font-bold text-[#034b42] line-clamp-2">{b.title}</h4>
                      <p className="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">{b.excerpt}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">ID: {(b._id || b.id).toString().slice(-6)}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditBlogModal(b)}
                        className="p-2 rounded-xl bg-[#eaf4f1] text-emerald-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-emerald-100"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(b._id || b.id)}
                        className="p-2 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-rose-100"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: BOOKINGS & REQUESTS */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-[#034b42]">Recent Tour & Hotel Bookings</h3>
              <span className="text-xs font-bold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full">{bookings.length} Total Requests</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider">
                    <th className="p-3">Booking ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Tour / Hotel Name</th>
                    <th className="p-3">Travel Date</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
                  {bookings.map(b => (
                    <tr key={b.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="p-3 font-mono font-bold text-[#034b42]">{b.id}</td>
                      <td className="p-3">
                        <span className="block font-bold text-gray-900">{b.customer}</span>
                        <span className="block text-[10px] text-gray-400">{b.email}</span>
                      </td>
                      <td className="p-3 font-bold text-emerald-950">{b.tour}</td>
                      <td className="p-3">{b.date}</td>
                      <td className="p-3 font-bold">{b.price}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          b.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                          b.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => handleBookingStatusChange(b.id, 'Approved')}
                          className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-2.5 py-1 rounded-lg font-bold text-[10px] cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleBookingStatusChange(b.id, 'Completed')}
                          className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-2.5 py-1 rounded-lg font-bold text-[10px] cursor-pointer"
                        >
                          Complete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: USERS & ADMINS */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-[#034b42]">Registered Accounts</h3>
              <span className="text-xs font-bold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full">{userList.length} Total Users</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {userList.map(u => (
                <div key={u.id} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 ${
                    u.role === 'admin' ? 'bg-lime-400 text-emerald-950' : 'bg-emerald-950 text-white'
                  }`}>
                    {u.name[0]}
                  </div>
                  <div className="overflow-hidden">
                    <span className="block font-bold text-xs text-gray-900 truncate">{u.name}</span>
                    <span className="block text-[10px] text-gray-400 truncate">{u.email}</span>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-black ${
                      u.role === 'admin' ? 'bg-lime-200 text-emerald-950' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {u.role.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: SYSTEM SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 max-w-2xl">
            <h3 className="text-xl font-black text-[#034b42] mb-6">Platform Settings</h3>

            <form onSubmit={(e) => { e.preventDefault(); showToast('Settings saved successfully!'); }} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Agency Name</label>
                <input
                  type="text"
                  value={settingsForm.agencyName}
                  onChange={e => setSettingsForm({ ...settingsForm, agencyName: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Support Contact Email</label>
                <input
                  type="email"
                  value={settingsForm.supportEmail}
                  onChange={e => setSettingsForm({ ...settingsForm, supportEmail: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Default Display Currency</label>
                <select
                  value={settingsForm.currency}
                  onChange={e => setSettingsForm({ ...settingsForm, currency: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold cursor-pointer"
                >
                  <option value="USD ($)">USD ($)</option>
                  <option value="EUR (€)">EUR (€)</option>
                  <option value="GBP (£)">GBP (£)</option>
                  <option value="INR (₹)">INR (₹)</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="maint"
                  checked={settingsForm.maintenanceMode}
                  onChange={e => setSettingsForm({ ...settingsForm, maintenanceMode: e.target.checked })}
                  className="w-4 h-4 text-[#034b42] rounded cursor-pointer"
                />
                <label htmlFor="maint" className="text-xs font-bold text-gray-700 cursor-pointer">
                  Enable Site Maintenance Mode
                </label>
              </div>

              <button
                type="submit"
                className="bg-[#a3e635] hover:bg-lime-400 text-emerald-950 font-black px-8 py-3.5 rounded-xl shadow-md text-xs uppercase tracking-wider mt-4 cursor-pointer"
              >
                Save Settings
              </button>
            </form>

            {/* Change Admin Password Section */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <h4 className="text-lg font-black text-[#034b42] mb-1">Security & Change Password</h4>
              <p className="text-xs text-gray-500 mb-4">Update your admin account password</p>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const targetPass = e.target.newAdminPassword.value;
                  if (!targetPass) return;
                  try {
                    const res = await fetch(`${API_BASE}/api/auth/reset-password`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email: user.email, newPassword: targetPass })
                    });
                    const data = await res.json();
                    if (data.success) {
                      showToast('Admin password updated successfully!');
                      e.target.reset();
                    } else {
                      showToast(data.message || 'Failed to update password.');
                    }
                  } catch (err) {
                    showToast('Error updating password.');
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">New Password</label>
                  <input
                    type="password"
                    name="newAdminPassword"
                    required
                    placeholder="Enter new password"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#034b42] hover:bg-[#046155] text-lime-400 font-bold px-6 py-3 rounded-xl shadow-md text-xs uppercase tracking-wider cursor-pointer"
                >
                  Update Admin Password
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* TOUR FORM MODAL */}
      {isTourModalOpen && (
        <div className="fixed inset-0 z-50 bg-emerald-950/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar relative text-left">
            <button
              onClick={() => setIsTourModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black text-[#034b42] mb-1">
              {editingTourId ? 'Edit Tour Destination' : 'Create New Tour Location'}
            </h3>
            <p className="text-xs text-gray-500 mb-6">Enter destination details to display on frontend</p>

            <form onSubmit={handleTourSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Tour Title</label>
                  <input
                    type="text"
                    required
                    value={tourForm.title}
                    onChange={e => setTourForm({ ...tourForm, title: e.target.value })}
                    placeholder="e.g. Swiss Alps Trek"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Location / Country</label>
                  <input
                    type="text"
                    required
                    value={tourForm.location}
                    onChange={e => setTourForm({ ...tourForm, location: e.target.value })}
                    placeholder="e.g. Switzerland"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Price</label>
                  <input
                    type="text"
                    required
                    value={tourForm.price}
                    onChange={e => setTourForm({ ...tourForm, price: e.target.value })}
                    placeholder="$1,200"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={tourForm.duration}
                    onChange={e => setTourForm({ ...tourForm, duration: e.target.value })}
                    placeholder="5 Days"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Rating</label>
                  <input
                    type="text"
                    value={tourForm.rating}
                    onChange={e => setTourForm({ ...tourForm, rating: e.target.value })}
                    placeholder="4.8"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={tourForm.image}
                  onChange={e => setTourForm({ ...tourForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                <select
                  value={tourForm.category}
                  onChange={e => setTourForm({ ...tourForm, category: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold cursor-pointer"
                >
                  <option value="Mountain Trekking">Mountain Trekking</option>
                  <option value="Island Getaway">Island Getaway</option>
                  <option value="Cultural Heritage">Cultural Heritage</option>
                  <option value="Wildlife Safari">Wildlife Safari</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={tourForm.description}
                  onChange={e => setTourForm({ ...tourForm, description: e.target.value })}
                  placeholder="Enter short tour highlights..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#a3e635] hover:bg-lime-400 text-emerald-950 font-black py-4 rounded-xl shadow-md text-xs uppercase tracking-wider mt-4 cursor-pointer"
              >
                {editingTourId ? 'Save Changes' : 'Publish Tour Location'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* HOTEL FORM MODAL */}
      {isHotelModalOpen && (
        <div className="fixed inset-0 z-50 bg-emerald-950/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar relative text-left">
            <button
              onClick={() => setIsHotelModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black text-[#034b42] mb-1">
              {editingHotelId ? 'Edit Hotel Listing' : 'Create New Hotel / Resort'}
            </h3>
            <p className="text-xs text-gray-500 mb-6">Enter luxury hotel details for frontend booking</p>

            <form onSubmit={handleHotelSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Hotel Name</label>
                  <input
                    type="text"
                    required
                    value={hotelForm.name}
                    onChange={e => setHotelForm({ ...hotelForm, name: e.target.value })}
                    placeholder="e.g. Grand Alpine Palace & Spa"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Location / City</label>
                  <input
                    type="text"
                    required
                    value={hotelForm.location}
                    onChange={e => setHotelForm({ ...hotelForm, location: e.target.value })}
                    placeholder="e.g. Zermatt, Switzerland"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Price per Night</label>
                  <input
                    type="text"
                    required
                    value={hotelForm.price}
                    onChange={e => setHotelForm({ ...hotelForm, price: e.target.value })}
                    placeholder="$180 / night"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Star Rating</label>
                  <input
                    type="text"
                    value={hotelForm.rating}
                    onChange={e => setHotelForm({ ...hotelForm, rating: e.target.value })}
                    placeholder="4.8"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Rooms Available</label>
                  <input
                    type="number"
                    value={hotelForm.roomsAvailable}
                    onChange={e => setHotelForm({ ...hotelForm, roomsAvailable: e.target.value })}
                    placeholder="15"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Hotel Image URL</label>
                <input
                  type="url"
                  required
                  value={hotelForm.image}
                  onChange={e => setHotelForm({ ...hotelForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Amenities (One per line)</label>
                <textarea
                  rows={3}
                  value={hotelForm.amenities}
                  onChange={e => setHotelForm({ ...hotelForm, amenities: e.target.value })}
                  placeholder="Free High-Speed WiFi&#10;Heated Infinity Pool&#10;Luxury Spa Center&#10;Buffet Breakfast Included"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Hotel Description</label>
                <textarea
                  rows={3}
                  value={hotelForm.description}
                  onChange={e => setHotelForm({ ...hotelForm, description: e.target.value })}
                  placeholder="Describe luxury room features, view, and dining..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#a3e635] hover:bg-lime-400 text-emerald-950 font-black py-4 rounded-xl shadow-md text-xs uppercase tracking-wider mt-4 cursor-pointer"
              >
                {editingHotelId ? 'Save Changes' : 'Publish Hotel Listing'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* PACKAGE FORM MODAL */}
      {isPackageModalOpen && (
        <div className="fixed inset-0 z-50 bg-emerald-950/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar relative text-left">
            <button
              onClick={() => setIsPackageModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black text-[#034b42] mb-1">
              {editingPackageId ? 'Edit Pricing Package' : 'Create Pricing Package'}
            </h3>
            <p className="text-xs text-gray-500 mb-6">Manage prices and features shown on Pricing page</p>

            <form onSubmit={handlePackageSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Package Name</label>
                  <input
                    type="text"
                    required
                    value={packageForm.name}
                    onChange={e => setPackageForm({ ...packageForm, name: e.target.value })}
                    placeholder="e.g. Adventurer"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Price</label>
                  <input
                    type="text"
                    required
                    value={packageForm.price}
                    onChange={e => setPackageForm({ ...packageForm, price: e.target.value })}
                    placeholder="$899"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Short Description</label>
                <input
                  type="text"
                  required
                  value={packageForm.desc}
                  onChange={e => setPackageForm({ ...packageForm, desc: e.target.value })}
                  placeholder="Perfect for family vacationers..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Features (One per line)</label>
                <textarea
                  rows={4}
                  required
                  value={packageForm.features}
                  onChange={e => setPackageForm({ ...packageForm, features: e.target.value })}
                  placeholder="5 Destinations included&#10;Private premium transfers&#10;Expert guide"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isPopular"
                  checked={packageForm.isPopular}
                  onChange={e => setPackageForm({ ...packageForm, isPopular: e.target.checked })}
                  className="w-4 h-4 text-[#034b42] rounded focus:ring-0 cursor-pointer"
                />
                <label htmlFor="isPopular" className="text-xs font-bold text-gray-700 cursor-pointer">
                  Mark as "Most Popular" Badge
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#a3e635] hover:bg-lime-400 text-emerald-950 font-black py-4 rounded-xl shadow-md text-xs uppercase tracking-wider mt-4 cursor-pointer"
              >
                {editingPackageId ? 'Save Package' : 'Publish Package'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* BLOG FORM MODAL */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 bg-emerald-950/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar relative text-left">
            <button
              onClick={() => setIsBlogModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black text-[#034b42] mb-1">
              {editingBlogId ? 'Edit Travel Blog Post' : 'Write & Publish Travel Article'}
            </h3>
            <p className="text-xs text-gray-500 mb-6">Create engaging travel guides for public website visitors</p>

            <form onSubmit={handleBlogSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={e => setBlogForm({ ...blogForm, title: e.target.value })}
                  placeholder="e.g. 10 Secret Hidden Gems in Switzerland"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={blogForm.category}
                    onChange={e => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold cursor-pointer"
                  >
                    <option value="Destination Guides">Destination Guides</option>
                    <option value="Mountain Expeditions">Mountain Expeditions</option>
                    <option value="Travel Tips">Travel Tips</option>
                    <option value="Food & Culture">Food & Culture</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Author Name</label>
                  <input
                    type="text"
                    required
                    value={blogForm.author}
                    onChange={e => setBlogForm({ ...blogForm, author: e.target.value })}
                    placeholder="Alexander Wright"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={blogForm.readTime}
                    onChange={e => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    placeholder="5 min read"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Cover Image URL</label>
                <input
                  type="url"
                  required
                  value={blogForm.image}
                  onChange={e => setBlogForm({ ...blogForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Short Excerpt / Summary</label>
                <textarea
                  rows={2}
                  required
                  value={blogForm.excerpt}
                  onChange={e => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  placeholder="Brief preview summary shown on blog cards..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Article Content</label>
                <textarea
                  rows={6}
                  value={blogForm.content}
                  onChange={e => setBlogForm({ ...blogForm, content: e.target.value })}
                  placeholder="Write complete blog post paragraphs here..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-bold"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#a3e635] hover:bg-lime-400 text-emerald-950 font-black py-4 rounded-xl shadow-md text-xs uppercase tracking-wider mt-4 cursor-pointer"
              >
                {editingBlogId ? 'Save Article Changes' : 'Publish Article Live'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
