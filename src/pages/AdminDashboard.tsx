import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio, PortfolioData, LocalizedPortfolioData } from '../context/PortfolioContext';
import { Save, LogOut, ArrowLeft, Loader2, Globe, Plus, Trash2, Image as ImageIcon, Link as LinkIcon, Lock } from 'lucide-react';
import { Language } from '../lib/i18n';

export default function AdminDashboard() {
  const { data, updateData, logout, isAdmin, loading: contextLoading, language } = usePortfolio();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PortfolioData | null>(null);
  const [saving, setSaving] = useState(false);
  const [editLang, setEditLang] = useState<Language>('en');

  useEffect(() => {
    if (!contextLoading && !isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate, contextLoading]);

  useEffect(() => {
    if (data) {
      setFormData(JSON.parse(JSON.stringify(data))); // Deep copy
    }
  }, [data]);

  useEffect(() => {
    const tabTitle = formData?.[editLang]?.tabTitle;
    if (tabTitle) {
      document.title = tabTitle;
    }
    
    return () => {
      if (data) {
        document.title = data[language]?.tabTitle || data.en?.tabTitle || "Aravind | Full Stack Engineer";
      }
    };
  }, [formData, editLang, data, language]);

  if (contextLoading || !formData) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[var(--primary)] animate-spin" />
      </div>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateData(formData);
      alert('Portfolio updated successfully!');
    } catch (error) {
      alert('Failed to update portfolio');
    } finally {
      setSaving(false);
    }
  };

  const currentLangData = formData[editLang];

  // Helper to update deeply nested state safely
  const updateLangData = (updater: (draft: LocalizedPortfolioData) => void) => {
    setFormData(prev => {
      if (!prev) return prev;
      const next = JSON.parse(JSON.stringify(prev));
      updater(next[editLang]);
      return next;
    });
  };

  const handleCommaArray = (val: string) => val.split(',').map(s => s.trim()).filter(Boolean);
  const handleNewlineArray = (val: string) => val.split('\n').map(s => s.trim()).filter(Boolean);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Portfolio
            </button>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">Manage your portfolio content</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white dark:bg-zinc-900/50 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800">
              {(['en', 'es', 'fr'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setEditLang(lang)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${editLang === lang ? 'bg-[var(--primary-bg)] text-[var(--primary)]' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-50 font-medium"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors font-medium"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid gap-8">
          {/* General Settings */}
          <section className="space-y-6 bg-white dark:bg-zinc-900/30 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">General Settings</h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">Chrome Tab Title</label>
                <input
                  type="text"
                  value={currentLangData.tabTitle || ''}
                  onChange={(e) => updateLangData(d => { d.tabTitle = e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[var(--primary)]"
                  placeholder="e.g. Aravind | Full Stack Engineer"
                />
              </div>
            </div>
          </section>

          {/* Hero Section */}
          <section className="space-y-6 bg-white dark:bg-zinc-900/30 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">Hero Section</h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">Greeting</label>
                <input
                  type="text"
                  value={currentLangData.hero.greeting}
                  onChange={(e) => updateLangData(d => { d.hero.greeting = e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[var(--primary)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">Title</label>
                <input
                  type="text"
                  value={currentLangData.hero.title}
                  onChange={(e) => updateLangData(d => { d.hero.title = e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[var(--primary)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">Subtitle</label>
                <textarea
                  value={currentLangData.hero.subtitle}
                  onChange={(e) => updateLangData(d => { d.hero.subtitle = e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[var(--primary)] h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">Profile Image URL</label>
                <input
                  type="text"
                  value={currentLangData.hero.imageUrl}
                  onChange={(e) => updateLangData(d => { d.hero.imageUrl = e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[var(--primary)]"
                />
              </div>
            </div>
          </section>

          {/* Trust Stats */}
          <section className="space-y-6 bg-white dark:bg-zinc-900/30 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">Trust Stats</h2>
            <div className="space-y-4">
              {currentLangData.trustStats.map((stat, i) => (
                <div key={i} className="flex gap-4 items-start p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <input value={stat.label} onChange={e => updateLangData(d => { d.trustStats[i].label = e.target.value })} className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[var(--primary)]" placeholder="Label (e.g. Experience)" />
                    <input value={stat.value} onChange={e => updateLangData(d => { d.trustStats[i].value = e.target.value })} className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[var(--primary)]" placeholder="Value (e.g. 4+ Years)" />
                  </div>
                  <button onClick={() => updateLangData(d => { d.trustStats.splice(i, 1) })} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="w-5 h-5" /></button>
                </div>
              ))}
              <button onClick={() => updateLangData(d => { d.trustStats.push({label: '', value: ''}) })} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--primary)] bg-[var(--primary-bg)] rounded-lg hover:bg-[var(--primary-glow)] transition-colors"><Plus className="w-4 h-4" /> Add Stat</button>
            </div>
          </section>

          {/* About Section */}
          <section className="space-y-6 bg-white dark:bg-zinc-900/30 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">About Section</h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">About Text</label>
                <textarea
                  value={currentLangData.about.text}
                  onChange={(e) => updateLangData(d => { d.about.text = e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[var(--primary)] h-32"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">Highlights (One per line)</label>
                <textarea
                  value={currentLangData.about.highlights.join('\n')}
                  onChange={(e) => updateLangData(d => { d.about.highlights = handleNewlineArray(e.target.value) })}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[var(--primary)] h-32"
                />
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="space-y-6 bg-white dark:bg-zinc-900/30 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">Skills</h2>
            <div className="space-y-4">
              {currentLangData.skills.map((skill, i) => (
                <div key={i} className="flex gap-4 items-start p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                  <div className="flex-1 grid gap-4">
                    <input value={skill.category} onChange={e => updateLangData(d => { d.skills[i].category = e.target.value })} className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-zinc-900 dark:text-zinc-100 font-medium focus:outline-none focus:border-[var(--primary)]" placeholder="Category (e.g. Frontend)" />
                    <textarea value={skill.items.join(', ')} onChange={e => updateLangData(d => { d.skills[i].items = handleCommaArray(e.target.value) })} className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[var(--primary)] h-20" placeholder="Skills (comma separated)" />
                  </div>
                  <button onClick={() => updateLangData(d => { d.skills.splice(i, 1) })} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="w-5 h-5" /></button>
                </div>
              ))}
              <button onClick={() => updateLangData(d => { d.skills.push({category: '', items: []}) })} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--primary)] bg-[var(--primary-bg)] rounded-lg hover:bg-[var(--primary-glow)] transition-colors"><Plus className="w-4 h-4" /> Add Skill Category</button>
            </div>
          </section>

          {/* Projects Section */}
          <section className="space-y-6 bg-white dark:bg-zinc-900/30 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">Projects</h2>
            <div className="space-y-6">
              {currentLangData.projects.map((proj, i) => (
                <div key={proj.id} className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 space-y-4 relative">
                  <button onClick={() => updateLangData(d => { d.projects.splice(i, 1) })} className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="w-5 h-5" /></button>
                  
                  <div className="grid md:grid-cols-2 gap-4 pr-12">
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Project Title</label>
                      <input value={proj.title} onChange={e => updateLangData(d => { d.projects[i].title = e.target.value })} className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[var(--primary)]" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Subtitle / Role</label>
                      <input value={proj.subtitle} onChange={e => updateLangData(d => { d.projects[i].subtitle = e.target.value })} className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[var(--primary)]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Description</label>
                    <textarea value={proj.description} onChange={e => updateLangData(d => { d.projects[i].description = e.target.value })} className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[var(--primary)] h-24" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Highlights (One per line)</label>
                      <textarea value={proj.highlights.join('\n')} onChange={e => updateLangData(d => { d.projects[i].highlights = handleNewlineArray(e.target.value) })} className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[var(--primary)] h-32" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Screenshots URLs (One per line)</label>
                      <textarea value={proj.screenshots?.join('\n') || ''} onChange={e => updateLangData(d => { d.projects[i].screenshots = handleNewlineArray(e.target.value) })} className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[var(--primary)] h-32" placeholder="https://image-url.com/1.jpg&#10;https://image-url.com/2.jpg" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Tags (Comma separated)</label>
                    <input value={proj.tags.join(', ')} onChange={e => updateLangData(d => { d.projects[i].tags = handleCommaArray(e.target.value) })} className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[var(--primary)]" />
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={proj.confidential} onChange={e => updateLangData(d => { d.projects[i].confidential = e.target.checked })} className="w-4 h-4 text-[var(--primary)] rounded border-zinc-300 dark:border-zinc-700 focus:ring-[var(--primary)]" />
                      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1"><Lock className="w-4 h-4"/> Confidential</span>
                    </label>
                    
                    {!proj.confidential && (
                      <div className="flex-1 flex items-center gap-2">
                        <LinkIcon className="w-4 h-4 text-zinc-400" />
                        <input value={proj.demoLink || ''} onChange={e => updateLangData(d => { d.projects[i].demoLink = e.target.value })} placeholder="Live Demo URL" className="flex-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[var(--primary)]" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <button onClick={() => updateLangData(d => { d.projects.push({id: Date.now().toString(), title: '', subtitle: '', description: '', highlights: [], tags: [], confidential: false, screenshots: []}) })} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--primary)] bg-[var(--primary-bg)] rounded-lg hover:bg-[var(--primary-glow)] transition-colors"><Plus className="w-4 h-4" /> Add Project</button>
            </div>
          </section>

          {/* Experience Section */}
          <section className="space-y-6 bg-white dark:bg-zinc-900/30 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">Experience</h2>
            <div className="space-y-6">
              {currentLangData.experiences.map((exp, i) => (
                <div key={exp.id} className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 space-y-4 relative">
                  <button onClick={() => updateLangData(d => { d.experiences.splice(i, 1) })} className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="w-5 h-5" /></button>
                  
                  <div className="grid md:grid-cols-2 gap-4 pr-12">
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Company / Period</label>
                      <input value={exp.company} onChange={e => updateLangData(d => { d.experiences[i].company = e.target.value })} className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[var(--primary)]" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Role</label>
                      <input value={exp.role} onChange={e => updateLangData(d => { d.experiences[i].role = e.target.value })} className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[var(--primary)]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Description</label>
                    <textarea value={exp.description} onChange={e => updateLangData(d => { d.experiences[i].description = e.target.value })} className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[var(--primary)] h-24" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Highlights (One per line)</label>
                    <textarea value={exp.highlights.join('\n')} onChange={e => updateLangData(d => { d.experiences[i].highlights = handleNewlineArray(e.target.value) })} className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[var(--primary)] h-32" />
                  </div>
                </div>
              ))}
              <button onClick={() => updateLangData(d => { d.experiences.push({id: Date.now().toString(), company: '', role: '', description: '', highlights: []}) })} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--primary)] bg-[var(--primary-bg)] rounded-lg hover:bg-[var(--primary-glow)] transition-colors"><Plus className="w-4 h-4" /> Add Experience</button>
            </div>
          </section>

          {/* Services Section */}
          <section className="space-y-6 bg-white dark:bg-zinc-900/30 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">Services</h2>
            <div>
              <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">Services Offered (One per line)</label>
              <textarea
                value={currentLangData.services.join('\n')}
                onChange={(e) => updateLangData(d => { d.services = handleNewlineArray(e.target.value) })}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[var(--primary)] h-48"
              />
            </div>
          </section>

          {/* CTA Section */}
          <section className="space-y-6 bg-white dark:bg-zinc-900/30 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">Call to Action (Contact)</h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">CTA Text</label>
                <input
                  type="text"
                  value={currentLangData.cta.text}
                  onChange={(e) => updateLangData(d => { d.cta.text = e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[var(--primary)]"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">Email</label>
                  <input
                    type="email"
                    value={currentLangData.cta.email}
                    onChange={(e) => updateLangData(d => { d.cta.email = e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    value={currentLangData.cta.whatsapp}
                    onChange={(e) => updateLangData(d => { d.cta.whatsapp = e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
