import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function Hero({ isLoggedIn, user, t }) {
  // Determine if we are in RTL mode to flip the icon
  const isRtl = t.dir === 'rtl';

  return (
    <main className="container mx-auto px-4 pt-32 text-center max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter text-slate-900">
          {t.heroTitle}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            {t.heroSub}
          </span>
        </h1>

        <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
          {t.heroDesc}
        </p>

        {isLoggedIn && user?.phone && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-slate-900 text-white px-10 py-5 rounded-3xl font-bold shadow-2xl flex items-center gap-3 mx-auto hover:bg-blue-600 transition-all group"
          >
            {t.addCandidate}
            {isRtl ? (
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            ) : (
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            )}
          </motion.button>
        )}
      </motion.div>
    </main>
  );
}