import React from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

interface SkillsProps {
  data: {
    category: string;
    items: string[];
  }[];
}

export default function Skills({ data }: SkillsProps) {
  const { t } = usePortfolio();

  return (
    <section id="skills" className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{t.techArsenal}</h2>
        <div className="w-12 h-1 bg-[var(--primary)] rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((category, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--primary)]"></span>
              {category.category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {category.items.map((item, i) => (
                <span 
                  key={i} 
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-[var(--primary-hover)] dark:hover:text-[var(--primary-hover)] transition-colors cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
