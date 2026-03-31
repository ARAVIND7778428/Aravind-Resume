import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Footer() {
  const { t } = usePortfolio();
  
  return (
    <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-950/50 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-zinc-500 text-sm">
          © {new Date().getFullYear()} Aravind. {t.allRightsReserved}
        </div>
        
        <div className="flex items-center gap-4">
          <a href="#" className="p-2 rounded-full bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:text-[var(--primary)] dark:hover:text-[var(--primary)] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-transparent">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className="p-2 rounded-full bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:text-[var(--primary)] dark:hover:text-[var(--primary)] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-transparent">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="p-2 rounded-full bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:text-[var(--primary)] dark:hover:text-[var(--primary)] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-transparent">
            <Twitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
