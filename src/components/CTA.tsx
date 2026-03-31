import React from 'react';
import { motion } from 'motion/react';
import { Mail, MessageSquare } from 'lucide-react';

interface CTAProps {
  data: {
    text: string;
    email: string;
    whatsapp: string;
  };
}

export default function CTA({ data }: CTAProps) {
  return (
    <section id="contact" className="py-24 border-t border-zinc-800/50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center space-y-8"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100">
          {data.text}
        </h2>
        
        <p className="text-xl text-zinc-400">
          Open for freelance projects, collaborations, and full-time opportunities.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <a 
            href={`mailto:${data.email}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Mail className="w-5 h-5" />
            Email Me
          </a>
          
          <a 
            href={`https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-zinc-100 font-bold transition-colors"
          >
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  );
}
