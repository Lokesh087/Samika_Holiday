import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Newsletter from './components/Newsletter';
import ScrollToTop from './components/ScrollToTop';
import AuthModal from './components/AuthModal';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import AIArchitect from './pages/AIArchitect';
import About from './pages/About';
import Services from './pages/Services';
import Hotels from './pages/Hotels';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';

function MainLayout() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/tour/admin');

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState('login');

  const handleOpenAuth = (tab = 'login') => {
    setAuthInitialTab(tab);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] font-sans antialiased text-[#131b2e]">
      {/* Navbar (Hide on Admin Portal) */}
      {!isAdminPage && <Navbar onOpenAuth={handleOpenAuth} />}

      {/* Main Content Area */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/ai-architect" element={<AIArchitect />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/tour/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={authInitialTab}
      />

      {/* Footer (Hide on Admin Portal) */}
      {!isAdminPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <MainLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;
