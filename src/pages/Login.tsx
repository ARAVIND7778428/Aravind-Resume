import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { LogIn } from 'lucide-react';

export default function Login() {
  const { user, isAdmin, login, t, mode } = usePortfolio();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin');
    }
  }, [user, isAdmin, navigate]);

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${mode === 'dark' ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
      <div className="w-full max-w-md p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl space-y-8 text-center">
        <div className="w-16 h-16 bg-[var(--primary-bg)] rounded-2xl flex items-center justify-center mx-auto text-[var(--primary)]">
          <LogIn className="w-8 h-8" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{t.adminLogin}</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Sign in to manage your portfolio content.</p>
        </div>
        
        <button
          onClick={login}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-zinc-100 dark:bg-white text-zinc-900 dark:text-zinc-950 font-bold hover:bg-zinc-200 dark:hover:bg-zinc-200 transition-colors border border-zinc-200 dark:border-transparent"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          {t.signInGoogle}
        </button>
        
        {user && !isAdmin && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm">
            {t.accessDenied}
          </div>
        )}
      </div>
    </div>
  );
}
