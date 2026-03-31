import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Download } from 'lucide-react';

interface HeroProps {
  data: {
    greeting: string;
    title: string;
    subtitle: string;
    imageUrl: string;
  };
}

export default function Hero({ data }: HeroProps) {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 pt-12 md:pt-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1 space-y-6 text-center md:text-left"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          {data.greeting}
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-100 leading-[1.1]">
          {data.title}
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed">
          {data.subtitle}
        </p>
        
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
          <a 
            href="#projects" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-100 text-zinc-900 font-medium hover:bg-white transition-colors"
          >
            View My Work
            <ArrowRight className="w-4 h-4" />
          </a>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 font-medium hover:bg-zinc-800 hover:text-white transition-colors backdrop-blur-sm"
          >
            Hire Me
          </a>
          <a 
            href="#" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 font-medium hover:bg-zinc-800 hover:text-white transition-colors backdrop-blur-sm"
          >
            <Download className="w-4 h-4" />
            Resume
          </a>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border border-zinc-800/50 p-2 bg-zinc-900/50 backdrop-blur-sm">
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
