import React from 'react';
import { motion } from 'motion/react';
import { Building2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface ExperienceProps {
  data: {
    id: string;
    company: string;
    role: string;
    description: string;
    highlights: string[];
  }[];
}

export default function Experience({ data }: ExperienceProps) {
  const { t } = usePortfolio();

  return (
    <section id="experience" className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{t.expTimeline}</h2>
        <div className="w-12 h-1 bg-[var(--primary)] rounded-full"></div>
      </div>
      
      <div className="relative pl-8 md:pl-0">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-zinc-200 dark:bg-zinc-800 -translate-x-1/2"></div>
        <div className="md:hidden absolute left-0 top-0 bottom-0 w-0.5 bg-zinc-200 dark:bg-zinc-800"></div>
        
        <div className="space-y-16">
          {data.map((exp, index) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="absolute left-[-33px] md:left-1/2 w-4 h-4 rounded-full bg-[var(--primary)] border-4 border-zinc-50 dark:border-zinc-950 md:-translate-x-1/2 mt-1.5 z-10"></div>
              
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50 hover:border-[var(--primary-border)] transition-colors">
                  <div className="flex items-center gap-3 text-[var(--primary-hover)] mb-3">
                    <Building2 className="w-5 h-5" />
                    <span className="font-semibold tracking-wide uppercase text-sm">{exp.company}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{exp.role}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">{exp.description}</p>
                  
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-bg)] mt-1.5 shrink-0"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
