import React, { useState } from 'react';
import { Menu, X, Phone, Clock, ChevronRight, ShieldCheck } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, navigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { config, isAdmin, applications } = useAcademy();

  const pendingCount = applications.filter((a) => a.status === 'Pending').length;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Courses', path: '/courses' },
    { label: 'Apply Now', path: '/apply' },
    { label: 'FAQs', path: '/faq' },
    { label: 'Contact', path: '/contact' },
    { label: 'Dashboard', path: '/dashboard', badge: pendingCount > 0 ? pendingCount : undefined }
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-200">
      {/* Admissions Notice Ribbon */}
      {(config.announcementActive ?? true) && (
        <div className="bg-primary text-white text-xs md:text-sm py-2 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span className="bg-accent text-navy-950 font-bold px-2 py-0.5 rounded text-xs uppercase tracking-wider">
                Admissions Open
              </span>
              <span>{config.announcementText || `New batches now enrolling at ${config.location.city}!`}</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span>{config.hours.morningSession} & {config.hours.eveningSession}</span>
              </span>
              <a
                href={`tel:${config.contact.primaryPhone}`}
                className="hover:text-accent font-medium transition-colors flex items-center gap-1 font-mono"
              >
                <Phone className="w-3.5 h-3.5 text-accent" />
                <span>{config.contact.primaryPhone}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Official Academy Branding with Official Logo Insignia */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
            title="Go to Home"
          >
            <div className="w-13 h-13 rounded-full overflow-hidden bg-white shadow-md border-2 border-primary/20 flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform shrink-0">
              <img
                src="/logo.png"
                alt="Global Institute of Computer Science Naudero Logo"
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  // Fallback if image path differs
                  const target = e.target as HTMLImageElement;
                  target.src = '/assets/aistudio/Screenshot_20250912-103759_29eddee8.png';
                }}
              />
            </div>
            <div>
              <div className="text-base sm:text-lg font-black text-primary leading-tight tracking-tight">
                Global Institute
              </div>
              <div className="text-xs sm:text-xs font-semibold text-slate-600">
                of Computer Science Naudero
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'text-primary bg-slate-100 font-bold'
                      : 'text-slate-700 hover:text-primary hover:bg-slate-50'
                  }`}
                >
                  {link.path === '/dashboard' && <ShieldCheck className="w-4 h-4 text-emerald-600" />}
                  <span>{link.label}</span>
                  {link.badge !== undefined && (
                    <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Primary Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('/dashboard')}
              className={`text-xs font-bold px-3 py-2 rounded-lg border transition flex items-center gap-1.5 cursor-pointer ${
                isAdmin
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{isAdmin ? 'Admin Dashboard (Active)' : 'Admin Portal'}</span>
            </button>

            <button
              onClick={() => handleNavClick('/apply')}
              className="bg-accent hover:bg-accent-hover text-navy-950 font-bold text-sm px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Apply for Admission</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => handleNavClick('/dashboard')}
              className="p-2 text-slate-700 bg-slate-100 rounded-lg text-xs font-bold flex items-center gap-1"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Admin</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-primary hover:bg-slate-100 rounded-lg focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-800" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNavClick(link.path)}
              className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-md text-base font-medium cursor-pointer ${
                currentPath === link.path
                  ? 'bg-slate-100 text-primary font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                {link.path === '/dashboard' && <ShieldCheck className="w-4 h-4 text-emerald-600" />}
                <span>{link.label}</span>
              </div>
              {link.badge !== undefined && (
                <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {link.badge} pending
                </span>
              )}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('/apply')}
              className="w-full text-center bg-accent text-navy-950 font-bold py-3 px-4 rounded-lg shadow-sm cursor-pointer"
            >
              Apply for Admission
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
