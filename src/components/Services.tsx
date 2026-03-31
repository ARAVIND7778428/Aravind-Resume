import React from 'react';
import { motion } from 'motion/react';
import { Layers, Zap, Shield, Code, Server, Database } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface ServicesProps {
  data: string[];
}

export default function Services({ data }: ServicesProps) {
  const { t } = usePortfolio();
  const icons = [Code, Server, Zap, Layers, Database, Shield];

  return (
    <section id="services" className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{t.services}</h2>
        <div className="w-12 h-1 bg-[var(--primary)] rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((service, index) => {
          const Icon = icons[index % icons.length];
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group p-6 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50 hover:bg-[var(--primary-bg)] dark:hover:bg-[var(--primary-bg)] hover:border-[var(--primary-border)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center text-[var(--primary)] mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-[var(--primary-hover)] transition-colors">
                {service}
              </h3>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
