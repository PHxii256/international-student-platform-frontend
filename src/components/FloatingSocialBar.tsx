import React from 'react';
import { 
  Search, 
  Linkedin, 
  Facebook, 
  Instagram, 
  MessageCircle 
} from 'lucide-react';

export function FloatingSocialBar() {
  const socialLinks = [
    { icon: Search, href: '#', label: 'Search' },
    { icon: Linkedin, href: 'https://www.linkedin.com/school/misr-university-for-science-and-technology/', label: 'LinkedIn' },
    { icon: Facebook, href: 'https://www.facebook.com/mustuni/', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/mustuni/', label: 'Instagram' },
   
  ];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[99] sm:right-4 pointer-events-auto">
      {socialLinks.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
className="w-14 h-14 md:w-16 md:h-16 lg:w-16 lg:h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group border-0 text-gray-800 dark:text-white"
          aria-label={label}
        >
          <Icon className="w-7 h-7 text-gray-600 group-hover:text-emerald-500 group-hover:scale-110 transition-all duration-200" />
        </a>
      ))}
    </div>
  );
}

