import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import Hero from '../components/Hero';
import Trust from '../components/Trust';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Services from '../components/Services';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import SettingsWidget from '../components/SettingsWidget';

export default function PublicPortfolio() {
  const { data, loading, language, mode } = usePortfolio();

  if (loading || !data) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${mode === 'dark' ? 'bg-zinc-950 text-zinc-50' : 'bg-zinc-50 text-zinc-900'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  const currentData = data[language] || data.en;

  return (
    <div className={`min-h-screen font-sans selection:bg-[var(--primary-bg)] transition-colors duration-300 ${mode === 'dark' ? 'bg-zinc-950 text-zinc-50' : 'bg-zinc-50 text-zinc-900'}`}>
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      <div className={`fixed inset-0 -z-10 ${mode === 'dark' ? 'bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-950' : 'bg-gradient-to-tr from-zinc-50 via-zinc-100 to-zinc-50'}`}></div>
      
      <main className="max-w-5xl mx-auto px-6 sm:px-12 py-24 space-y-32 relative z-10">
        <Hero data={currentData.hero} />
        <Trust data={currentData.trustStats} />
        <About data={currentData.about} />
        <Skills data={currentData.skills} />
        <Projects data={currentData.projects} />
        <Experience data={currentData.experiences} />
        <Services data={currentData.services} />
        <CTA data={currentData.cta} />
      </main>
      
      <SettingsWidget />
      <Footer />
    </div>
  );
}
