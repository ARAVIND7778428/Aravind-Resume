import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, FolderGit2, CheckCircle2 } from 'lucide-react';

interface ProjectsProps {
  data: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    highlights: string[];
    tags: string[];
    link: string;
  }[];
}

export default function Projects({ data }: ProjectsProps) {
  return (
    <section id="projects" className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100">Featured Work</h2>
        <div className="w-12 h-1 bg-emerald-500 rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 gap-12">
        {data.map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col lg:flex-row items-center gap-8 p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/50 hover:border-emerald-500/30 transition-all duration-500"
          >
            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-emerald-400 font-medium tracking-wide text-sm uppercase">
                  <FolderGit2 className="w-5 h-5" />
                  {project.subtitle}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 group-hover:text-emerald-300 transition-colors">
                  {project.title}
                </h3>
              </div>
              
              <p className="text-lg text-zinc-400 leading-relaxed">
                {project.description}
              </p>
              
              <ul className="space-y-3">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-wrap gap-3 pt-4">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 text-sm font-medium rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="w-full lg:w-auto lg:self-start pt-4 lg:pt-0">
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full lg:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-colors shadow-lg shadow-emerald-500/20"
              >
                View Project
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
