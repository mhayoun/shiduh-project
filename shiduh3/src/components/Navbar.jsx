import React from 'react';
import { Heart, LogOut, Languages } from 'lucide-react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';

export default function Navbar({ isLoggedIn, user, onLogin, onLogout, currentLang, setLang, t }) {
  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex justify-between items-center">

      {/* LEFT SIDE: Logo */}
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
          <Heart size={20} fill="currentColor" />
        </div>
        <span className="text-xl font-black tracking-tight italic">
          {t.logo}<span className="text-blue-600">3</span>
        </span>
      </div>

      {/* RIGHT SIDE: Language Switcher + Auth */}
      <div className="flex items-center gap-4">

        {/* Language Selector */}
        <div className="flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
          <Languages size={14} className="text-slate-400" />
          <select
            value={currentLang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-600 outline-none cursor-pointer uppercase"
          >
            <option value="en">EN</option>
            <option value="fr">FR</option>
            <option value="he">עב</option>
          </select>
        </div>

        {/* Auth Logic */}
        {!isLoggedIn ? (
          <div className="scale-90 md:scale-100">
            <GoogleLogin
              onSuccess={onLogin}
              theme="outline"
              shape="pill"
              locale={currentLang === 'he' ? 'iw' : currentLang}
            />
          </div>
        ) : (
          <div className="flex items-center gap-3 bg-white border border-slate-100 rounded-full px-2 py-1 shadow-sm">
            <img
              src={user?.picture}
              className="w-8 h-8 rounded-full border border-slate-50"
              alt=""
              referrerPolicy="no-referrer"
            />
            <span className="font-bold text-sm text-slate-600 hidden md:block">{user?.name}</span>
            <button
              onClick={() => { googleLogout(); onLogout(); }}
              className="p-2 hover:bg-red-50 rounded-full text-slate-400 hover:text-red-500 transition-colors"
            >
              <LogOut size={18}/>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}