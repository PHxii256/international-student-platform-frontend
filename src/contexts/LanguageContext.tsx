import React, { createContext, useContext, useReducer } from 'react';

export type Language = 'en' | 'ar';

interface Translations {
  en: Record<string, string>;
  ar: Record<string, string>;
}

const translations: Translations = {
  en: {
    // Navbar
    home: 'Home',
    academics: 'Academics',
    questionnaires: 'Questionnaires',
    resources: 'Resources',
    announcements: 'Announcements',
    contactUs: 'Contact Us',
    profile: 'My Profile',
    settings: 'Settings',
    signOut: 'Sign Out',
    notifications: 'Notifications',
    language: 'Language',
    english: 'English',
    arabic: 'العربية',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    // Hero
    heroTitle: 'International Students Affairs Portal',
    heroSubtitle: 'Students Live Their Days In The Best Environment',
    // Common
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    download: 'Download',
    upload: 'Upload',
    search: 'Search',
    // Dashboard
    welcome: 'Welcome back',
    portal: 'International Students Affairs Portal',
    quickActions: 'Quick Actions',
    todaysClasses: "Today's Classes",
    viewAll: 'View all',
    discoverMore: 'Discover More',
    currentGPA: 'Current GPA',
    credits: 'Credits',
    semester: 'Semester',
    pendingRequests: 'Pending Requests',
    events: 'Events',
    news: 'News',
    upcoming: 'Upcoming',
    latest: 'Latest',
    // Dashboard Quick Actions
    viewSchedule: 'View Schedule',
    submitRequest: 'Submit Request',
    myRequests: 'My Requests',
    studentServices: 'Student Services',
    contactAdvisor: 'Contact Advisor',
    viewScheduleDesc: 'Check your weekly classes and exams',
    submitRequestDesc: 'Apply for letters, transcripts, or visas',
    myRequestsDesc: 'Track your submitted applications',
    announcementsDesc: 'Official news and important updates',
    studentServicesDesc: 'Housing, medical, and library access',
    contactAdvisorDesc: 'Message your international advisor',
    // Footer
    links: 'Links',
    aboutUniversity: 'About University',
    mustBuzz: 'MUST Buzz',
    contactInfo: 'Contact Info',
    universityLink: 'University Link',
    academicsFooter: 'Academics',
    lifeAtMUST: 'Life at MUST',
    research: 'Research & Centres',
    maps: 'Maps & Directions',
    faqs: 'FAQs',
    aboutMUST: 'About MUST',
    history: 'History',
    whyMUST: 'Why MUST',
    values: 'Values & Principles',
    contactUsFooter: 'Contact Us',
    privacyPolicy: 'Privacy & Policy',
    // New Navbar
    university: 'University',
    admission: 'Admission',
    mustBuzz: 'Must Buzz',
    centers: 'Centers',
    lifeAtMUSTNav: 'Life at MUST',
    sdgs: 'SDGs',
    internationalStudentsPlatform: 'International Students Platform'
  },
  ar: {
    home: 'الرئيسية',
    academics: 'الكليات والبرامج',
    questionnaires: 'الاستبيانات',
    resources: 'الموارد',
    announcements: 'الإعلانات',
    contactUs: 'اتصل بنا',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    signOut: 'تسجيل الخروج',
    notifications: 'الإشعارات',
    language: 'اللغة',
    english: 'English',
    arabic: 'العربية',
    lightMode: 'الوضع الفاتح',
    darkMode: 'الوضع الغامق',
    heroTitle: 'بوابة شؤون الطلاب الدوليين',
    heroSubtitle: 'يعيش الطلاب أيامهم في أفضل بيئة',
    welcome: 'مرحباً بعودتك',
    portal: 'بوابة شؤون الطلاب الدوليين',
    quickActions: 'إجراءات سريعة',
    todaysClasses: 'حصص اليوم',
    viewAll: 'عرض الكل',
    discoverMore: 'اكتشف المزيد',
    currentGPA: 'المعدل الحالي',
    credits: 'الساعات',
    semester: 'الفصل الدراسي',
    pendingRequests: 'الطلبات المعلقة',
    events: 'الفعاليات',
    news: 'الأخبار',
    upcoming: 'القادمة',
    latest: 'الأحدث',
    viewSchedule: 'عرض الجدول الزمني',
    submitRequest: 'تقديم طلب',
    myRequests: 'طلباتي',
    studentServices: 'خدمات الطلاب',
    contactAdvisor: 'الاتصال بالمستشار',
    viewScheduleDesc: 'تحقق من حصصك الأسبوعية والامتحانات',
    submitRequestDesc: 'قدم طلبات للرسائل أو الشهادات أو التأشيرات',
    myRequestsDesc: 'تتبع طلباتك المقدمة',
    announcementsDesc: 'الأخبار الرسمية والتحديثات المهمة',
    studentServicesDesc: 'السكن والطب والمكتبة',
    contactAdvisorDesc: 'رسالة مستشارك الدولي',
    links: 'الروابط',
    aboutUniversity: 'عن الجامعة',
    mustBuzz: 'أخبار مصت',
    contactInfo: 'معلومات الاتصال'
  }
};

type LanguageAction = { type: 'SET_LANGUAGE'; payload: Language };

const languageReducer = (state: Language, action: LanguageAction): Language => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      localStorage.setItem('language', action.payload);
      document.documentElement.dir = action.payload === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = action.payload;
      return action.payload;
    default:
      return state;
  }
};

interface LanguageContextType {
  language: Language;
  t: (key: keyof Translations['en']) => string;
  dispatch: React.Dispatch<LanguageAction>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, dispatch] = useReducer(languageReducer, 'en' as Language);

  const t = (key: keyof Translations['en']): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, t, dispatch }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

