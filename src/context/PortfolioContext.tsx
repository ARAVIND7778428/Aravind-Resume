import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signInWithPopup } from 'firebase/auth';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase';

export interface PortfolioData {
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
  projects: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    highlights: string[];
    tags: string[];
    link: string;
  }[];
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

const defaultData: PortfolioData = {
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
      link: "#"
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
      link: "#"
    },
    {
      id: "3",
      title: "RoofTech Document Builder",
      subtitle: "Full Stack App",
      description: "Built from scratch with UUID security and dynamic PDF generation.",
      highlights: ["UUID security", "Dynamic PDF generation"],
      tags: ["Full Stack", "PDF"],
      link: "#"
    },
    {
      id: "4",
      title: "E-Commerce App",
      subtitle: "Next.js + Stripe",
      description: "Full-stack modern app with payment integration and headless CMS.",
      highlights: ["Payment integration", "Headless CMS (Sanity)"],
      tags: ["Next.js", "Stripe", "Sanity"],
      link: "#"
    },
    {
      id: "5",
      title: "Jay's Institute System",
      subtitle: "Booking + Subscription",
      description: "Booking + subscription system with Flask API integration.",
      highlights: ["Flask API integration"],
      tags: ["Flask", "Booking"],
      link: "#"
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

interface PortfolioContextType {
  data: PortfolioData | null;
  loading: boolean;
  user: User | null;
  isAdmin: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  updateData: (newData: PortfolioData) => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const isAdmin = user?.email === 'aravind17g08@gmail.com';

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    const docRef = doc(db, 'portfolio', 'main');
    
    // Initialize default data if it doesn't exist
    getDoc(docRef).then((snapshot) => {
      if (!snapshot.exists()) {
        setDoc(docRef, defaultData).catch(console.error);
      }
    });

    const unsubscribeData = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data() as PortfolioData);
      } else {
        setData(defaultData);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching portfolio data:", error);
      setLoading(false);
    });

    return () => unsubscribeData();
  }, []);

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
      await setDoc(doc(db, 'portfolio', 'main'), newData);
    } catch (error) {
      console.error("Update failed:", error);
      throw error;
    }
  };

  return (
    <PortfolioContext.Provider value={{ data, loading, user, isAdmin, login, logout, updateData }}>
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
