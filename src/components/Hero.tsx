import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Download } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface HeroProps {
  data: {
    greeting: string;
    title: string;
    subtitle: string;
    imageUrl: string;
  };
}

export default function Hero({ data }: HeroProps) {
  const { t } = usePortfolio();

  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 pt-12 md:pt-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1 space-y-6 text-center md:text-left"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary-bg)] border border-[var(--primary-border)] text-[var(--primary)] text-sm font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary-hover)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary)]"></span>
          </span>
          {data.greeting}
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.1]">
          {data.title}
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          {data.subtitle}
        </p>
        
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
          <a 
            href="#projects" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-white transition-colors"
          >
            {t.viewWork}
            <ArrowRight className="w-4 h-4" />
          </a>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors backdrop-blur-sm"
          >
            {t.hireMe}
          </a>
          <a 
            href="#" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors backdrop-blur-sm"
          >
            <Download className="w-4 h-4" />
            {t.resume}
          </a>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary-bg)] to-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border border-zinc-200 dark:border-zinc-800/50 p-2 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
          <img 
            src={data.imageUrl} 
            alt="Aravind" 
            className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>
    </section>
  );
}
