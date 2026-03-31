import React, { useState } from 'react';
import { Settings, Globe, Palette, X, Moon, Sun } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Language, Theme } from '../lib/i18n';

export default function SettingsWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, theme, setTheme, mode, setMode } = usePortfolio();

  const themes: { id: Theme; color: string }[] = [
    { id: 'emerald', color: 'bg-emerald-500' },
    { id: 'blue', color: 'bg-blue-500' },
    { id: 'purple', color: 'bg-purple-500' },
    { id: 'rose', color: 'bg-rose-500' },
  ];

  const languages: { id: Language; label: string }[] = [
    { id: 'en', label: 'English' },
    { id: 'es', label: 'Español' },
    { id: 'fr', label: 'Français' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-4 w-64 p-6 rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-zinc-900 dark:text-zinc-100 font-semibold">Settings</h3>
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              {mode === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              <span>Theme Mode</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setMode('light')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'light' ? 'bg-[var(--primary-bg)] text-[var(--primary)] border border-[var(--primary-border)]' : 'bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800'}`}
              >
                Light
              </button>
              <button
                onClick={() => setMode('dark')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'dark' ? 'bg-[var(--primary-bg)] text-[var(--primary)] border border-[var(--primary-border)]' : 'bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800'}`}
              >
                Dark
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Palette className="w-4 h-4" />
              <span>Theme Color</span>
            </div>
            <div className="flex gap-3">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`w-8 h-8 rounded-full ${t.color} ${theme === t.id ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-zinc-900 ring-zinc-900 dark:ring-zinc-100' : 'opacity-70 hover:opacity-100'} transition-all`}
                  aria-label={`Set theme to ${t.id}`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Globe className="w-4 h-4" />
              <span>Language</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {languages.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLanguage(l.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors ${language === l.id ? 'bg-[var(--primary-bg)] text-[var(--primary)] border border-[var(--primary-border)]' : 'bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800'}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-[var(--primary)] dark:hover:text-[var(--primary)] hover:border-[var(--primary)] dark:hover:border-[var(--primary)] flex items-center justify-center shadow-lg transition-colors"
        aria-label="Settings"
      >
        <Settings className="w-5 h-5" />
      </button>
    </div>
  );
}
