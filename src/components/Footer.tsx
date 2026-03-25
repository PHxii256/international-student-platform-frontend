import {
    MapPin,
    Phone,
    Mail,
    Facebook,
    Twitter,
    Instagram,
    Linkedin
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface FooterProps {
    darkMode?: boolean;
}

export function Footer({ darkMode = false }: FooterProps) {
  return (
    <footer
      className={`pt-16 pb-8 border-t-4 border-[#00AC5C] mt-auto transition-colors duration-300 ${darkMode ? 'bg-dark-surface text-white' : 'bg-navy-500 text-white'}`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Center Logo */}
        <div className="flex justify-center mb-12">
          <div
            className={`w-28 h-28 rounded-full flex items-center justify-center overflow-hidden shadow-lg border-4 transition-colors duration-300 ${darkMode ? 'bg-white border-dark-border' : 'bg-white border-navy-400'}`}>
            <img src="/must_logo.png" alt="MUST" className="w-full h-full object-contain p-2" />
          </div>
        </div>

                {/* Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

                    {/* Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-[#00AC5C]">Links</h3>
                        <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-navy-100'}`}>
                            {[
                                { label: 'Home', to: '/dashboard' },
                                { label: 'The University', href: 'https://must.edu.eg/about-must/board-of-trustees/', external: true },
                                { label: 'Academics', href: 'https://must.edu.eg/academic_programs/undergraduate-studies/', external: true },
                                { label: 'Life at MUST', href: 'https://must.edu.eg/about-must/board-of-trustees/', external: true },
                                { label: 'Research & Centres', href: 'https://must.edu.eg/centers/', external: true },
                                { label: 'Maps & Directions', href: 'https://must.edu.eg/centers/', external: true },
                                { label: 'FAQs', href: 'https://must.edu.eg/faqs/', external: true }
                            ].map(({ label, href, to, external }) => (
                                external ? (
                                    <li key={label}>
                                        <a href={href!} target="_blank" rel="noopener noreferrer" className="hover:text-[#00AC5C]">
                                            {label}
                                        </a>
                                    </li>
                                ) : (
                                    <li key={label}>
                                        <NavLink to={to!} className="hover:text-[#00AC5C]">
                                            {label}
                                        </NavLink>
                                    </li>
                                )
                            ))}
                        </ul>
                    </div>

                    {/* About */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-[#00AC5C]">
                            About University
                        </h3>
                        <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-navy-100'}`}>
                            {[
                                { label: 'About MUST', href: 'https://must.edu.eg/about-must/board-of-trustees/', external: true },
                                { label: 'History', href: 'https://must.edu.eg/history/', external: true },
                                { label: 'Accreditation', to: '/academics' },
                                { label: 'Why MUST', href: 'https://must.edu.eg/why-must/', external: true },
                                { label: 'Values', href: 'https://must.edu.eg/about-must/must-policies/', external: true },
                                { label: 'Contact Us', to: '/contact-us' },
                                { label: 'Privacy Policy', href: 'https://must.edu.eg/privacy-policy-2/', external: true }
                            ].map(({ label, href, to, external }) => (
                                external ? (
                                    <li key={label}>
                                        <a href={href!} target="_blank" rel="noopener noreferrer" className="hover:text-[#00AC5C]">
                                            {label}
                                        </a>
                                    </li>
                                ) : (
                                    <li key={label}>
                                        <NavLink to={to!} className="hover:text-[#00AC5C]">
                                            {label}
                                        </NavLink>
                                    </li>
                                )
                            ))}
                        </ul>
                    </div>

                    {/* Buzz */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-[#00AC5C]">
                            MUST Buzz
                        </h3>
                        <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-navy-100'}`}>
                            {[
                                { label: 'MUST Events', to: '/announcements' },
                                { label: 'MUST News', to: '/announcements' },
                                { label: 'Blog', to: '/resources' },
                                { label: 'Announcement', to: '/announcements' }
                            ].map(({ label, to }) => (
                                <li key={label}>
                                    <NavLink to={to} className="hover:text-[#00AC5C]">
                                        {label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-[#00AC5C]">
                            Contact Info
                        </h3>

                        <ul className={`space-y-4 text-sm ${darkMode ? 'text-gray-300' : 'text-navy-100'}`}>
                            <li className="flex gap-3">
                                <Phone className="w-5 h-5 text-[#00AC5C]" />
                                <span>16878</span>
                            </li>

                            <li className="flex gap-3">
                                <Mail className="w-5 h-5 text-[#00AC5C]" />
                                <a href="mailto:info@must.edu.eg">info@must.edu.eg</a>
                            </li>

                            <li className="flex gap-3">
                                <MapPin className="w-5 h-5 text-[#00AC5C]" />
                                <span>6th of October, Egypt</span>
                            </li>
                        </ul>

          </div>
        </div>


                {/* Bottom */}
                <div
                    className={`pt-8 border-t text-center text-sm ${
                        darkMode
                            ? 'border-dark-border text-gray-400'
                            : 'border-navy-400 text-navy-200'
                    }`}
                >
                    <p>
                        © MUST University {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </footer>
    );
}