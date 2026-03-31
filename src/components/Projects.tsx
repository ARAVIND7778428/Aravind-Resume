import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, FolderGit2, CheckCircle2, Lock } from 'lucide-react';
import { usePortfolio, ProjectData } from '../context/PortfolioContext';

interface ProjectsProps {
  data: ProjectData[];
}

export default function Projects({ data }: ProjectsProps) {
  const { t } = usePortfolio();

  return (
    <section id="projects" className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{t.featuredWork}</h2>
        <div className="w-12 h-1 bg-[var(--primary)] rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 gap-12">
        {data.map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col lg:flex-row items-center gap-8 p-8 rounded-3xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:border-[var(--primary-border)] transition-all duration-500 overflow-hidden"
          >
            <div className="flex-1 space-y-6 w-full">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[var(--primary-hover)] font-medium tracking-wide text-sm uppercase">
                  <FolderGit2 className="w-5 h-5" />
                  {project.subtitle}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[var(--primary-hover)] transition-colors">
                  {project.title}
                </h3>
              </div>
              
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.description}
              </p>
              
              <ul className="space-y-3">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-wrap gap-3 pt-4">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 text-sm font-medium rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-4">
                {project.confidential ? (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 font-medium border border-zinc-200 dark:border-zinc-700/50">
                    <Lock className="w-4 h-4" />
                    {t.confidential}
                  </span>
                ) : project.demoLink ? (
                  <a 
                    href={project.demoLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white dark:text-zinc-950 font-bold transition-colors shadow-lg shadow-[var(--primary-bg)]"
                  >
                    {t.viewLive}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : null}
              </div>
            </div>
            
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="w-full lg:w-5/12 shrink-0 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800/50 group-hover:border-[var(--primary-border)] transition-colors">
                <img 
                  src={project.screenshots[0]} 
                  alt={`${project.title} screenshot`} 
                  className="w-full h-auto object-cover opacity-90 dark:opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
