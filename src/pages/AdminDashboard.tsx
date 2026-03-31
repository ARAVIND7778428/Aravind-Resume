import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio, PortfolioData } from '../context/PortfolioContext';
import { Save, LogOut, ArrowLeft, Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const { data, user, isAdmin, logout, updateData } = usePortfolio();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PortfolioData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/login');
    }
  }, [user, isAdmin, navigate]);

  useEffect(() => {
    if (data) {
      setFormData(JSON.parse(JSON.stringify(data))); // Deep copy
    }
  }, [data]);

  const handleSave = async () => {
    if (!formData) return;
    setSaving(true);
    setMessage('');
    try {
      await updateData(formData);
      setMessage('Portfolio updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to update portfolio.');
    } finally {
      setSaving(false);
    }
  };

  if (!formData) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-zinc-800">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-zinc-400" />
            </button>
            <h1 className="text-2xl font-bold text-zinc-100">Admin Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={logout} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-red-400 hover:border-red-500/30 transition-colors">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
            <button 
              onClick={handleSave} 
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
          </div>
        </div>

        {message && (
          <div className={`p-4 rounded-xl border ${message.includes('success') ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
            {message}
          </div>
        )}

        <div className="space-y-12">
          {/* Hero Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-zinc-300">Hero Section</h2>
            <div className="grid gap-4 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <input 
                type="text" 
                value={formData.hero.greeting} 
                onChange={e => setFormData({...formData, hero: {...formData.hero, greeting: e.target.value}})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-emerald-500"
                placeholder="Greeting"
              />
              <input 
                type="text" 
                value={formData.hero.title} 
                onChange={e => setFormData({...formData, hero: {...formData.hero, title: e.target.value}})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-emerald-500"
                placeholder="Title"
              />
              <textarea 
                value={formData.hero.subtitle} 
                onChange={e => setFormData({...formData, hero: {...formData.hero, subtitle: e.target.value}})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-emerald-500 min-h-[100px]"
                placeholder="Subtitle"
              />
              <input 
                type="text" 
                value={formData.hero.imageUrl} 
                onChange={e => setFormData({...formData, hero: {...formData.hero, imageUrl: e.target.value}})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-emerald-500"
                placeholder="Image URL"
              />
            </div>
          </section>

          {/* About Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-zinc-300">About Section</h2>
            <div className="grid gap-4 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <textarea 
                value={formData.about.text} 
                onChange={e => setFormData({...formData, about: {...formData.about, text: e.target.value}})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-emerald-500 min-h-[150px]"
                placeholder="About Text"
              />
            </div>
          </section>

          {/* Advanced JSON Editor for Arrays */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-zinc-300">Advanced Data (JSON)</h2>
              <span className="text-sm text-zinc-500">Edit arrays like Projects, Skills, etc.</span>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <textarea 
                defaultValue={JSON.stringify(formData, null, 2)} 
                onChange={e => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setFormData(parsed);
                  } catch (err) {
                    // Ignore parsing errors while typing
                  }
                }}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-emerald-400 font-mono text-sm focus:outline-none focus:border-emerald-500 min-h-[600px]"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
