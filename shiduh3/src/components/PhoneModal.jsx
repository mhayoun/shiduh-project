import { motion, AnimatePresence } from 'framer-motion';
import { Phone, CheckCircle2 } from 'lucide-react';

export default function PhoneModal({ isOpen, phoneInput, setPhoneInput, onSave }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-md w-full text-center relative border border-white">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
            <Phone size={40} />
          </div>
          <h2 className="text-3xl font-black mb-2">WhatsApp</h2>
          <form onSubmit={onSave} className="space-y-4">
            <div className="relative">
              <input
                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-5 px-6 text-center text-2xl font-bold focus:border-blue-500 outline-none"
                placeholder="05x-xxxxxxx"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                autoFocus required
              />
              {phoneInput.length >= 9 && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />}
            </div>
            <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 shadow-xl">
              CONFIRMER
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}