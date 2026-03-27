import React from 'react';
import { UserCircle, FileText, Search, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HowItWorks({ t }) {
  const steps = [
    { icon: <UserCircle size={32} />, title: t.step1Title, desc: t.step1Desc },
    { icon: <FileText size={32} />, title: t.step2Title, desc: t.step2Desc },
    { icon: <Search size={32} />, title: t.step3Title, desc: t.step3Desc },
    { icon: <MessageSquare size={32} />, title: t.step4Title, desc: t.step4Desc },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4 text-slate-900">{t.howItWorks}</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            {t.howItWorksSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 transition-all hover:shadow-xl hover:shadow-blue-50 group"
            >
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900">
                <span className="text-blue-600 opacity-20 mr-2">{index + 1}.</span>
                {step.title}
              </h3>
              <p className="text-slate-500 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}