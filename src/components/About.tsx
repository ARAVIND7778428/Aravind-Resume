import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Code2, ArrowRightLeft } from 'lucide-react';

interface AboutProps {
  data: {
    text: string;
    highlights: string[];
  };
}

export default function About({ data }: AboutProps) {
  const icons = [ShieldCheck, Code2, ArrowRightLeft];

  return (
    <section id="about" className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100">About Me</h2>
        <div className="w-12 h-1 bg-emerald-500 rounded-full"></div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-lg text-zinc-400 leading-relaxed space-y-6"
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
              <div key={index} className="flex items-start gap-4 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:border-emerald-500/30 transition-colors group">
                <div className="p-3 rounded-xl bg-zinc-800/50 text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-zinc-100 font-medium text-lg">{highlight}</h3>
                  <p className="text-zinc-500 text-sm mt-1">Specialized expertise</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
