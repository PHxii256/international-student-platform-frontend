import {useState, useEffect} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';

import {Navbar} from './components/Navbar';
import {Footer} from './components/Footer';

// Pages
import {Dashboard} from './pages/Dashboard';
import {Academics} from './pages/Academics';
import Questionnaires from './pages/Questionnaires';
import Resources from './pages/Resources';
import {Announcements} from './pages/Announcements';
import {Notifications} from './pages/Notifications';
import {ContactUs} from './pages/ContactUs';
import {Profile} from './pages/Profile';
import {Settings} from './pages/Settings';
import {SubmitRequest} from './pages/SubmitRequest';
import {MyRequests} from './pages/MyRequests';

import {ProfileProvider} from './contexts/ProfileContext';
import {RequestsProvider} from './contexts/RequestsContext';
import {LanguageProvider, Language, useLanguage} from './contexts/LanguageContext';
import {RootPage} from "./pages/RootHome/RootPage.tsx";

export type {Language} from './contexts/LanguageContext';

function AppContent() {
    const [darkMode, setDarkMode] = useState(false);
    const {language, dispatch: languageDispatch} = useLanguage();

    const location = useLocation(); // للى هيبص هنا دى بدل الكارنت بييدج location.pathname
    const navigate = useNavigate();

    const handleNavigate = (path: string) => {
        navigate(path);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const toggleLanguage = (lang: Language) => {
        languageDispatch({type: 'SET_LANGUAGE', payload: lang});
    };

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode.toString());
        document.documentElement.classList.toggle('dark', newDarkMode);
    };

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedDarkMode);
        document.documentElement.classList.toggle('dark', savedDarkMode);
    }, []);

    return (<div
            className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'dark bg-comfortDark-bg text-comfortDark-text' : 'bg-white text-gray-900'}`}>

            <Navbar
                language={language}
                onToggleLanguage={toggleLanguage}
                darkMode={darkMode}
                onToggleDarkMode={toggleDarkMode}
            />

            <main className="flex-1">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -10}}
                        transition={{duration: 0.2}}
                        className="min-h-[calc(100vh-140px)]"
                    >

                        <Routes>
                            <Route
                              path="/"
                              element={<RootPage />}
                            />
                            <Route
                                path="/home"
                                element={<Dashboard onNavigate={handleNavigate} darkMode={darkMode}/>}
                            />

                            <Route path="/academics" element={<Academics/>}/>

                            <Route
                                path="/questionnaires"
                                element={<Questionnaires darkMode={darkMode}/>}
                            />

                            <Route
                                path="/resources"
                                element={<Resources onNavigate={handleNavigate}/>}
                            />

                            <Route path="/announcements" element={<Announcements/>}/>
                            <Route path="/notifications" element={<Notifications/>}/>
                            <Route path="/contact-us" element={<ContactUs/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/settings" element={<Settings/>}/>

                            <Route
                                path="/submit-request"
                                element={<SubmitRequest onNavigate={handleNavigate}/>}
                            />

                            <Route path="/my-requests" element={<MyRequests/>}/>
                        </Routes>

                    </motion.div>
                </AnimatePresence>
            </main>

            <Footer darkMode={darkMode}/>
        </div>);
}

export function App() {
    return (<LanguageProvider>
            <ProfileProvider>
                <RequestsProvider>
                    <AppContent/>
                </RequestsProvider>
            </ProfileProvider>
        </LanguageProvider>);
}