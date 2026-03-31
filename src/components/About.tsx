import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Code2, ArrowRightLeft } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface AboutProps {
  data: {
    text: string;
    highlights: string[];
  };
}

export default function About({ data }: AboutProps) {
  const { t } = usePortfolio();
  const icons = [ShieldCheck, Code2, ArrowRightLeft];

  return (
    <section id="about" className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{t.aboutMe}</h2>
        <div className="w-12 h-1 bg-[var(--primary)] rounded-full"></div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-6"
        >
          {data.text.split('. ').map((sentence, i) => (
            <p key={i}>{sentence}{i < data.text.split('. ').length - 1 ? '.' : ''}</p>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid gap-6"
        >
          {data.highlights.map((highlight, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div key={index} className="flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/50 hover:border-[var(--primary-border)] transition-colors group">
                <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 text-[var(--primary)] group-hover:bg-[var(--primary-bg)] transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-zinc-900 dark:text-zinc-100 font-medium text-lg">{highlight}</h3>
                  <p className="text-zinc-500 text-sm mt-1">{t.specializedExpertise}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
