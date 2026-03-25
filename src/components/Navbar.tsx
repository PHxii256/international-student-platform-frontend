import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Bell,
  Menu,
  X,
  ChevronDown,
  User,
  Settings as SettingsIcon,
  LogOut,
  Sun,
  Moon
} from 'lucide-react';
import type { PageType, Language } from '../App';

interface NavbarProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Navbar({
  language,
  onToggleLanguage,
  darkMode,
  onToggleDarkMode
}: NavbarProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const currentPage = location.pathname.slice(1) as PageType || 'dashboard';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems: Array<{ id: PageType; label: string }> = [
    { id: 'dashboard' as PageType, label: t('university') || 'University' },
    { id: 'academics' as PageType, label: t('academics') || 'Academics' },
    { id: 'submit-request' as PageType, label: t('admission') || 'Admission' },
    { id: 'announcements' as PageType, label: t('mustBuzz') || 'MUST Buzz' },
    { id: 'resources' as PageType, label: t('centers') || 'Centers' },
    { id: 'profile' as PageType, label: t('lifeAtMUST') || 'Life at MUST' },
    { id: 'questionnaires' as PageType, label: t('sdgs') || 'SDGs' }
  ];

  const handleNavClick = (page: PageType) => {
    navigate(`/${page}`);
    setIsMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    onToggleLanguage(newLang);
  };

  const toggleDarkMode = () => {
    onToggleDarkMode();
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 md:h-20 lg:h-24 backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border-b border-gray-200/50 dark:border-gray-700/50 shadow-xl transition-all duration-300">
      <div className="h-full container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => handleNavClick('dashboard')}>
          <div className="w-12 h-12 md:w-14 md:h-14 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-lg shrink-0 overflow-hidden">
            <img src="/must_logo.png" alt="MUST" className="w-full h-full object-contain p-1" />
          </div>
          <div className="hidden md:block">
            <h1 className="text-xs font-bold tracking-wide leading-tight text-navy-900">
              MISR UNIVERSITY FOR
            </h1>
            <h1 className="text-xs font-bold tracking-wide leading-tight text-navy-900">
              SCIENCE & TECHNOLOGY
            </h1>
            <p className="text-xs text-navy-400">
              International Students Affairs
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                currentPage === item.id 
                  ? 'bg-[#00AC5C]/10 text-[#00AC5C] shadow-md' 
                  : 'text-navy-700 hover:text-[#00AC5C] hover:bg-gray-100/50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Dark Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100/50 transition-colors"
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-navy-600" />
            ) : (
              <Moon className="w-5 h-5 text-navy-600" />
            )}
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="p-2 text-navy-600 hover:text-[#00AC5C] rounded-full transition-colors text-xs font-medium whitespace-nowrap"
            title="Toggle Language"
          >
            E | ع
          </button>

          {/* Search */}
          <button className="p-2 text-navy-600 dark:text-gray-300 hover:text-[#00AC5C] rounded-full transition-colors" onClick={() => alert('Search functionality coming soon')}>
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <button className="p-2 text-navy-600 relative rounded-full transition-colors" onClick={() => handleNavClick('notifications')}>
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={toggleProfileDropdown}
              className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ampr;auto=format&amp;fit=crop&amp;w=100&amp;q=80"
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-600"
              />
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-600">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Ahmed Hassan</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">ID: 20230145</p>
                </div>
                <button
                  onClick={() => {
                    handleNavClick('profile');
                    setIsProfileDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <User className="w-4 h-4 text-gray-500" />
                  {t('profile') || 'My Profile'}
                </button>
                <button
                  onClick={() => {
                    handleNavClick('settings');
                    setIsProfileDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <SettingsIcon className="w-4 h-4 text-gray-500" />
                  {t('settings') || 'Settings'}
                </button>
                <div className="border-t border-gray-100 dark:border-gray-600 my-1" />
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-colors" onClick={() => {
                  localStorage.clear();
                  navigate('/');
                }}>
                  <LogOut className="w-4 h-4" />
                  {t('signOut') || 'Sign Out'}
                </button>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-navy-600 hover:text-[#00AC5C] rounded-md transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-3 rounded-md font-medium transition-colors ${
                  currentPage === item.id 
                    ? 'bg-green-50 text-[#00AC5C] border-l-4 border-[#00AC5C]' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center gap-3 p-3 border-t border-gray-200 dark:border-gray-700">
              <button onClick={toggleDarkMode} className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button onClick={toggleLanguage} className="text-sm font-medium hover:text-[#00AC5C] flex items-center gap-1">
                E | ع
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

