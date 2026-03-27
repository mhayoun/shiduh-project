import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

export default function Hero({ t }) {
  return (
    <main className="relative pt-48 pb-24 text-center overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-400/10 blur-[120px] rounded-full -z-10" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.05]">
          {t.heroTitle}<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">
            {t.heroSub}
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium px-4">
          {t.heroDesc}
        </p>

        <button
          onClick={() => document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center gap-2 mx-auto px-10 py-5 rounded-[2rem] font-bold text-slate-600 bg-white shadow-xl shadow-slate-200/50 border border-slate-100 hover:bg-slate-50 transition-all active:scale-95"
        >
          <Info size={20} className="text-blue-600" />
          {t.howItWorks}
        </button>
      </motion.div>
    </main>
  );
}