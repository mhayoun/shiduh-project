import React from 'react';
import { motion } from 'framer-motion';
import { UserCircle, FileText, Search, MessageSquare, ShieldCheck } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';

export default function UnifiedProcess({ t, isLoggedIn, onLogin, currentLang }) {
  const steps = [
    { icon: <UserCircle size={28} />, title: t.step1Title, desc: t.step1Desc },
    { icon: <FileText size={28} />, title: t.step2Title, desc: t.step2Desc },
    { icon: <Search size={28} />, title: t.step3Title, desc: t.step3Desc },
    { icon: <MessageSquare size={28} />, title: t.step4Title, desc: t.step4Desc },
  ];

  return (
    <section id="how-it-works-section" className="min-h-screen flex items-center bg-slate-50/50 py-20">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Section Header */}
        <div className="text-center mb-6">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight"
          >
            {t.howItWorks}
          </motion.h2>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            {t.howItWorksSub}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-[2.5rem] bg-white border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 text-blue-600 bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center">
                  {step.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
                  {index + 1}. {step.title}
                </h3>
              </div>

              <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Compact Security Banner */}
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 text-white rounded-[2.5rem] p-6 md:p-10 shadow-xl border border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 blur-[80px] pointer-events-none" />

            {/* Added 'dir={t.dir}' to force the flex-row-reverse if Hebrew */}
            <div
              className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10"
              style={{ direction: t.dir }}
            >

              {/* Left/Right Side: Typography - Changed text-left to text-start */}
              <div className="flex-1 text-center lg:text-start">
                {/* Badge alignment fixed with flex and text-start */}
                <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-3 border border-blue-500/20">
                  <ShieldCheck size={14}/> {t.googleSecurity}
                </div>

                <h2 className="text-xl md:text-2xl font-black mb-2 leading-tight tracking-tight">
                  {t.secureAuthSub}
                </h2>

                <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-xl font-medium">
                  {t.secureAuthDesc}
                </p>
              </div>

              {/* Right/Left Side: Login Action */}
              <div className="flex flex-col items-center gap-2 min-w-[240px]">
                {!isLoggedIn ? (
                  <>
                    <div className="scale-100 md:scale-110 transition-transform hover:scale-115 py-2">
                      <GoogleLogin
                        onSuccess={onLogin}
                        theme="filled_blue"
                        shape="pill"
                        locale={currentLang === 'he' ? 'iw' : currentLang}
                      />
                    </div>
                    <span className="text-[10px] text-blue-400/60 font-black uppercase tracking-widest animate-pulse mt-2">
                      {t.clickGoogle}
                    </span>
                  </>
                ) : (
                  <div className="flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm font-black shadow-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    {t.logo} {t.confirm}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>


      </div>
    </section>
  );
}