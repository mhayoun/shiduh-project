import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SecurityInfo({ t }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-blue-50/50 border border-blue-100 rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8"
        >
          {/* Icon Decoration */}
          <div className="relative">
            <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-blue-200">
              <ShieldCheck size={48} />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-md">
              <Lock size={18} />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 text-center md:text-start">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-widest">
              {t.googleSecurity}
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2 mb-4">
              {t.secureAuthSub}
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              {t.secureAuthDesc}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}