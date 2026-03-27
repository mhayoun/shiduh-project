import React from 'react';
import { Heart, LogOut, Languages } from 'lucide-react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';

export default function Navbar({ isLoggedIn, user, onLogin, onLogout, currentLang, setLang, t }) {
  const scrollToSteps = () => {
    document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex justify-between items-center transition-all">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <div
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
            <Heart size={20} fill="currentColor" />
          </div>
          <span className="text-xl font-black tracking-tight italic">
            {t.logo}<span className="text-blue-600">3</span>
          </span>
        </div>

        {/* Menu: Only Home and Steps (How it Works) */}
        <div className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-500">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-blue-600 transition-colors"
          >
            {t.menuHome}
          </button>
          <button
            onClick={scrollToSteps}
            className="hover:text-blue-600 transition-colors"
          >
            {t.howItWorks}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
          <Languages size={14} className="text-slate-400" />
          <select
            value={currentLang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-600 outline-none cursor-pointer uppercase"
          >
            <option value="fr">FR</option>
            <option value="en">EN</option>
            <option value="he">עב</option>
          </select>
        </div>

        {!isLoggedIn ? (
          <div className="scale-90 origin-right">
            <GoogleLogin
              onSuccess={onLogin}
              theme="outline"
              shape="pill"
              locale={currentLang === 'he' ? 'iw' : currentLang}
            />
          </div>
        ) : (
          <div className="flex items-center gap-3 bg-white border border-slate-100 rounded-full pr-2 pl-1 py-1 shadow-sm transition-all animate-in fade-in zoom-in duration-300">
            <img src={user?.picture} className="w-8 h-8 rounded-full border border-slate-50" alt="" referrerPolicy="no-referrer" />
            <span className="font-bold text-xs text-slate-600 hidden lg:block">{user?.name}</span>
            <button onClick={() => { googleLogout(); onLogout(); }} className="p-2 hover:bg-red-50 rounded-full text-slate-400 hover:text-red-500 transition-colors">
              <LogOut size={16}/>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}