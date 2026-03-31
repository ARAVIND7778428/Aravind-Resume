import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-zinc-800/50 bg-zinc-950/50 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-zinc-500 text-sm">
          © {new Date().getFullYear()} Aravind. All rights reserved.
        </div>
        
        <div className="flex items-center gap-4">
          <a href="#" className="p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className="p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
