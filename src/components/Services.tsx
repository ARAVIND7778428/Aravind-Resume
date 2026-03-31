import React from 'react';
import { motion } from 'motion/react';
import { Layers, Zap, Shield, Code, Server, Database } from 'lucide-react';

interface ServicesProps {
  data: string[];
}

export default function Services({ data }: ServicesProps) {
  const icons = [Code, Server, Zap, Layers, Database, Shield];

  return (
    <section id="services" className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100">Services & Expertise</h2>
        <div className="w-12 h-1 bg-emerald-500 rounded-full"></div>
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
              className="group p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 hover:bg-emerald-500/5 hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-800/50 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-emerald-300 transition-colors">
                {service}
              </h3>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
