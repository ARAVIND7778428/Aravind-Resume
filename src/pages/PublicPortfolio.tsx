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

export default function PublicPortfolio() {
  const { data, loading } = usePortfolio();

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-emerald-500/30">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      <div className="fixed inset-0 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-950 -z-10"></div>
      
      <main className="max-w-5xl mx-auto px-6 sm:px-12 py-24 space-y-32 relative z-10">
        <Hero data={data.hero} />
        <Trust data={data.trustStats} />
        <About data={data.about} />
        <Skills data={data.skills} />
        <Projects data={data.projects} />
        <Experience data={data.experiences} />
        <Services data={data.services} />
        <CTA data={data.cta} />
      </main>
      
      <Footer />
    </div>
  );
}
