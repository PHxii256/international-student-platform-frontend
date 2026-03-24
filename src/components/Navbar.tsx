import {useState } from 'react';
import {
    Bell,
    Menu,
    X,
    User,
    Sun,
    Moon
} from 'lucide-react';

import { Link, NavLink } from 'react-router-dom';
import type { Language } from '../App';

interface NavbarProps {
    language: Language;
    onToggleLanguage: (lang: Language) => void;
    darkMode: boolean;
    onToggleDarkMode: () => void;
}

export function Navbar({
                           darkMode,
                           onToggleDarkMode
                       }: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    // const langRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     const handleClickOutside = (e: MouseEvent) => {
    //         if (langRef.current && !langRef.current.contains(e.target as Node)) {
    //             setIsLangDropdownOpen(false);
    //         }
    //     };
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => document.removeEventListener('mousedown', handleClickOutside);
    // }, []);

    const navItems = [
        { path: '/home', label: 'Home' },
        { path: '/academics', label: 'Academics' },
        { path: '/questionnaires', label: 'Questionnaires' },
        { path: '/resources', label: 'Resources' },
        { path: '/announcements', label: 'Announcements' },
        { path: '/contact-us', label: 'Contact Us' }
    ];

    return (
        <header
            className={`sticky top-0 z-50 shadow-sm border-b transition-colors duration-300 ${
                darkMode
                    ? 'bg-gray-900 border-gray-800 text-gray-100'
                    : 'bg-white text-gray-900'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-20">

                    {/* 🔹 Logo */}
                    <Link to="/" className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden">
                            <img src="/assists/must_logo.png" alt="MUST" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-sm font-bold">MUST</h1>
                        </div>
                    </Link>

                    {/* 🔹 Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `px-4 py-2 text-sm font-medium ${
                                        isActive
                                            ? 'text-[#00AC5C] border-b-2 border-[#00AC5C]'
                                            : 'text-gray-700 dark:text-white'
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* 🔹 Right Side */}
                    <div className="flex items-center gap-2">

                        {/* Dark Mode */}
                        <button onClick={onToggleDarkMode}>
                            {darkMode ? <Sun /> : <Moon />}
                        </button>

                        {/* Notifications */}
                        <Link to="/notifications" className="p-2 relative">
                            <Bell />
                        </Link>

                        {/* Profile */}
                        <div className="relative">
                            <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>
                                <User />
                            </button>

                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow rounded">
                                    <Link to="/profile" className="block px-4 py-2">
                                        Profile
                                    </Link>
                                    <Link to="/settings" className="block px-4 py-2">
                                        Settings
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden"
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* 🔹 Mobile Nav */}
            {isMobileMenuOpen && (
                <div className="lg:hidden px-4 py-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `block py-2 ${
                                    isActive ? 'text-[#00AC5C]' : 'text-gray-700'
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            )}
        </header>
    );
}