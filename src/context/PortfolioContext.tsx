import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signInWithPopup } from 'firebase/auth';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase';
import { Language, Theme, translations } from '../lib/i18n';

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tags: string[];
  confidential: boolean;
  demoLink?: string;
  screenshots: string[];
}

export interface LocalizedPortfolioData {
  tabTitle?: string;
  hero: {
    greeting: string;
    title: string;
    subtitle: string;
    imageUrl: string;
  };
  trustStats: { label: string; value: string }[];
  about: {
    text: string;
    highlights: string[];
  };
  skills: {
    category: string;
    items: string[];
  }[];
  projects: ProjectData[];
  experiences: {
    id: string;
    company: string;
    role: string;
    description: string;
    highlights: string[];
  }[];
  services: string[];
  cta: {
    text: string;
    email: string;
    whatsapp: string;
  };
}

export interface PortfolioData {
  en: LocalizedPortfolioData;
  es: LocalizedPortfolioData;
  fr: LocalizedPortfolioData;
}

const defaultLocalizedData: LocalizedPortfolioData = {
  tabTitle: "Aravind | Full Stack Engineer",
  hero: {
    greeting: "Hi, I'm Aravind 👋",
    title: "Full Stack Engineer building secure & scalable web applications",
    subtitle: "Specialized in Laravel, React & API Systems. Currently working on PHP → Node.js & Go migrations.",
    imageUrl: "https://media.licdn.com/dms/image/v2/D5603AQEYCEu2OZrBag/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1707394795333?e=1776297600&v=beta&t=5K7hXiZ6aR8O3h_ff9xzlpTbVnTmogDViYdp7X4SleQ"
  },
  trustStats: [
    { label: "Experience", value: "4+ Years" },
    { label: "Projects", value: "Banking Security (CISO)" },
    { label: "Production Systems", value: "10+ Built" },
    { label: "Users Impacted", value: "100K+" }
  ],
  about: {
    text: "I'm a Software Engineer with 4+ years of experience building secure, scalable enterprise applications. I started my career as a PHP developer and evolved into a full-stack engineer, working on banking systems, HR platforms, and high-performance dashboards. Currently, I specialize in modernizing legacy systems by migrating PHP applications into Node.js and Go architectures.",
    highlights: [
      "Security (CSP, XSS, Access Control)",
      "Full-stack capability",
      "Migration expertise"
    ]
  },
  skills: [
    { category: "Backend", items: ["PHP", "Laravel", "CodeIgniter", "Node.js", "Go"] },
    { category: "Frontend", items: ["React.js", "Next.js", "jQuery", "Angular"] },
    { category: "Database", items: ["MySQL", "Oracle SQL"] },
    { category: "DevOps / Tools", items: ["AWS", "cPanel", "Vercel"] },
    { category: "Security", items: ["CSP", "XSS Protection", "Access Control"] }
  ],
  projects: [
    {
      id: "1",
      title: "Lakshya – HR Systems",
      subtitle: "Indian Overseas Bank",
      description: "Built enterprise HR tools (Appraisal, Feedback, Talent Mgmt). Worked with CISO security standards.",
      highlights: [
        "Implemented CSP & XSS protection",
        "Created dashboards using Highcharts"
      ],
      tags: ["PHP", "Security", "Highcharts"],
      confidential: true,
      screenshots: ["https://picsum.photos/seed/lakshya/800/450"]
    },
    {
      id: "2",
      title: "Legacy Modernization",
      subtitle: "PHP → Node.js / Go",
      description: "Led modernization initiatives to migrate legacy PHP applications to Node.js and Go-based microservices.",
      highlights: [
        "Improved performance & scalability",
        "Reduced technical debt",
        "Designed API-first architecture",
        "Enabled future-ready system architecture"
      ],
      tags: ["Node.js", "Go", "Microservices"],
      confidential: false,
      screenshots: ["https://picsum.photos/seed/legacy/800/450"]
    },
    {
      id: "3",
      title: "RoofTech Document Builder",
      subtitle: "Full Stack App",
      description: "Built from scratch with UUID security and dynamic PDF generation.",
      highlights: ["UUID security", "Dynamic PDF generation"],
      tags: ["Full Stack", "PDF"],
      confidential: true,
      screenshots: ["https://picsum.photos/seed/rooftech/800/450"]
    },
    {
      id: "4",
      title: "E-Commerce App",
      subtitle: "Next.js + Stripe",
      description: "Full-stack modern app with payment integration and headless CMS.",
      highlights: ["Payment integration", "Headless CMS (Sanity)"],
      tags: ["Next.js", "Stripe", "Sanity"],
      confidential: false,
      demoLink: "https://aravindkumar-electronic.vercel.app/",
      screenshots: ["https://picsum.photos/seed/ecommerce/800/450"]
    },
    {
      id: "5",
      title: "Jay's Institute System",
      subtitle: "Booking + Subscription",
      description: "Booking + subscription system with Flask API integration.",
      highlights: ["Flask API integration"],
      tags: ["Flask", "Booking"],
      confidential: true,
      screenshots: ["https://picsum.photos/seed/jays/800/450"]
    }
  ],
  experiences: [
    {
      id: "1",
      company: "NeoSOFT",
      role: "Software Engineer",
      description: "Banking systems and security implementation.",
      highlights: ["Banking systems", "Security implementation"]
    },
    {
      id: "2",
      company: "Techcedence",
      role: "Developer",
      description: "Laravel + WordPress, Campaign system (100K emails).",
      highlights: ["Laravel", "WordPress", "Campaign system"]
    },
    {
      id: "3",
      company: "Scoto Systec",
      role: "Full-stack Developer",
      description: "Full-stack projects and API systems.",
      highlights: ["Full-stack projects", "API systems"]
    }
  ],
  services: [
    "Web Application Development",
    "SaaS Platforms",
    "API Development",
    "Legacy System Migration (PHP → Node/Go)",
    "Performance Optimization",
    "Security Implementation"
  ],
  cta: {
    text: "Let's build something impactful 🚀",
    email: "aravind17g08@gmail.com",
    whatsapp: "+910000000000"
  }
};

const defaultData: PortfolioData = {
  en: defaultLocalizedData,
  es: { ...defaultLocalizedData, tabTitle: "Aravind | Ingeniero Full Stack", hero: { ...defaultLocalizedData.hero, greeting: "Hola, soy Aravind 👋", title: "Ingeniero Full Stack construyendo aplicaciones seguras" } },
  fr: { ...defaultLocalizedData, tabTitle: "Aravind | Ingénieur Full Stack", hero: { ...defaultLocalizedData.hero, greeting: "Bonjour, je suis Aravind 👋", title: "Ingénieur Full Stack créant des applications sécurisées" } }
};

interface PortfolioContextType {
  data: PortfolioData | null;
  loading: boolean;
  user: User | null;
  isAdmin: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  mode: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark') => void;
  t: typeof translations['en'];
  login: () => Promise<void>;
  logout: () => Promise<void>;
  updateData: (newData: PortfolioData) => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('emerald');
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const isAdmin = user?.email === 'aravind17g08@gmail.com';
  const t = translations[language];

  useEffect(() => {
    // Apply theme to body
    document.body.className = theme === 'emerald' ? '' : `theme-${theme}`;
  }, [theme]);

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  useEffect(() => {
    if (data) {
      const title = data[language]?.tabTitle || data.en?.tabTitle || "Aravind | Full Stack Engineer";
      document.title = title;
      
      // Update meta tags for SEO and social sharing
      const metaTitle = document.querySelector('meta[name="title"]');
      if (metaTitle) metaTitle.setAttribute('content', title);
      
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', title);
      
      const twitterTitle = document.querySelector('meta[property="twitter:title"]');
      if (twitterTitle) twitterTitle.setAttribute('content', title);
    }
  }, [data, language]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    const docRef = doc(db, 'portfolio', 'main_v2');
    
    // Only attempt to initialize default data if we are an admin
    // Public users will just read the data via onSnapshot
    if (isAdmin) {
      getDoc(docRef).then((snapshot) => {
        if (!snapshot.exists()) {
          setDoc(docRef, defaultData).catch(console.error);
        }
      }).catch(console.error);
    }

    const unsubscribeData = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data() as PortfolioData);
      } else {
        setData(defaultData);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching portfolio data:", error);
      // Fallback to default data if there's a permission error or it doesn't exist yet
      setData(defaultData);
      setLoading(false);
    });

    return () => unsubscribeData();
  }, [isAdmin]);

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const updateData = async (newData: PortfolioData) => {
    if (!isAdmin) throw new Error("Unauthorized");
    try {
      await setDoc(doc(db, 'portfolio', 'main_v2'), newData);
    } catch (error) {
      console.error("Update failed:", error);
      throw error;
    }
  };

  return (
    <PortfolioContext.Provider value={{ data, loading, user, isAdmin, language, setLanguage, theme, setTheme, mode, setMode, t, login, logout, updateData }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
