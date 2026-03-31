import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

interface TrustProps {
  data: { label: string; value: string }[];
}

export default function Trust({ data }: TrustProps) {
  return (
    <section className="py-12 border-y border-zinc-200 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/20 backdrop-blur-sm -mx-6 sm:-mx-12 px-6 sm:px-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {data.map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center justify-center text-center space-y-2"
          >
            <div className="flex items-center gap-2 text-[var(--primary)] mb-1">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{stat.value}</span>
            </div>
            <span className="text-sm font-medium text-zinc-500 uppercase tracking-wider">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
