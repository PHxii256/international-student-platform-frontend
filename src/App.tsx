import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
// Pages
import { Dashboard } from './pages/Dashboard';
import { Academics } from './pages/Academics';
import Questionnaires from './pages/Questionnaires';
import Resources from './pages/Resources';
import { Announcements } from './pages/Announcements';
import { Notifications } from './pages/Notifications';
import { ContactUs } from './pages/ContactUs';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { SubmitRequest } from './pages/SubmitRequest';
import { MyRequests } from './pages/MyRequests';
import { ProfileProvider } from './contexts/ProfileContext';
import { RequestsProvider } from './contexts/RequestsContext';
import { LanguageProvider, Language, useLanguage } from './contexts/LanguageContext';
import {Test} from "./pages/Test.tsx";

export type PageType = 'dashboard' | 'academics' | 'questionnaires' | 'resources' | 'announcements' | 'notifications' | 'contact-us' | 'profile' | 'settings' | 'submit-request' | 'my-requests';

export type { Language } from './contexts/LanguageContext';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const { language, dispatch: languageDispatch } = useLanguage();

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = (lang: Language) => {
    languageDispatch({ type: 'SET_LANGUAGE', payload: lang });
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode !== darkMode) {
      setDarkMode(savedDarkMode);
      document.documentElement.classList.toggle('dark', savedDarkMode);
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} darkMode={darkMode} />;
      case 'academics':
        return <Academics />;
      case 'questionnaires':
        return <Questionnaires darkMode={darkMode} />;
      case 'resources':
        return <Resources onNavigate={handleNavigate} />;
      case 'announcements':
        return <Announcements />;
      case 'notifications':
        return <Notifications />;
      case 'contact-us':
        return <ContactUs />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      case 'submit-request':
        return <SubmitRequest onNavigate={handleNavigate} />;
      case 'my-requests':
        return <MyRequests />;
      default:
        return <Dashboard onNavigate={handleNavigate} darkMode={darkMode} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'dark bg-comfortDark-bg text-comfortDark-text' : 'bg-white text-gray-900'}`}>
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        language={language}
        onToggleLanguage={toggleLanguage}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="min-h-[calc(100vh-140px)]">
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <ProfileProvider>
        <RequestsProvider>
          <AppContent />
        </RequestsProvider>
      </ProfileProvider>
    </LanguageProvider>
  );
}

