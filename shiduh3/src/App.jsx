import React, { useState } from 'react';
import { useAuthStore } from './store';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, LogOut, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function App() {
  const { user, isLoggedIn, login, logout, setPhone } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");

const onGoogleSuccess = async (res) => {
  const decoded = jwtDecode(res.credential);

  try {
    // ON DEMANDE AU SERVEUR UBUNTU : "Est-ce que cet email existe ?"
    const response = await fetch('http://localhost:5000/api/sync-contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture
      })
    });

    const data = await response.json();

    // On met à jour le store avec les infos venant de la DB (tel, valid, etc.)
    login({
      ...decoded,
      phone: data.exists ? data.user.tel : "",
      db_id: data.id || data.user.id
    });

    // Si l'utilisateur n'existe pas ou n'a pas de téléphone validé
    if (!data.exists || !data.user.tel) {
      setShowModal(true);
    }
  } catch (error) {
    console.error("Erreur de synchronisation avec le serveur local:", error);
    // Fallback : on connecte quand même en local si le serveur est down
    login(decoded);
  }
};

const handleSavePhone = async (e) => {
  e.preventDefault();
  if (!phoneInput) return;

  try {
    const response = await fetch('http://localhost:5000/api/update-tel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        tel: phoneInput
      })
    });

    const data = await response.json();

    if (data.success) {
      // Mise à jour du store Zustand
      setPhone(phoneInput);
      // Fermeture de la modal
      setShowModal(false);
      console.log("✅ Téléphone enregistré sur le serveur Ubuntu !");
    }
  } catch (error) {
    alert("Erreur lors de la sauvegarde sur le serveur local.");
  }
};

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans antialiased text-slate-900">
      {/* HEADER PREMIUM */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
            <Heart size={20} fill="currentColor" />
          </div>
          <span className="text-xl font-black tracking-tight italic">SHIDUH<span className="text-blue-600">3</span></span>
        </div>

        {!isLoggedIn ? (
          <GoogleLogin onSuccess={onGoogleSuccess} theme="outline" shape="pill" />
        ) : (
          <div className="flex items-center gap-3 bg-white border border-slate-100 rounded-full px-2 py-1 shadow-sm">
             <img src={user?.picture} className="w-8 h-8 rounded-full border border-slate-50" alt="" referrerPolicy="no-referrer" />
             <span className="font-bold text-sm text-slate-600 hidden md:block">{user?.name}</span>
             <button onClick={() => { googleLogout(); logout(); }} className="p-2 hover:bg-red-50 rounded-full text-slate-400 hover:text-red-500 transition-colors">
                <LogOut size={18}/>
             </button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <main className="container mx-auto px-4 pt-32 text-center max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-7xl font-black mb-8 leading-[1.1] tracking-tighter">
            L'excellence du <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Shiduh Moderne.</span>
          </h1>
          <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Créez des fiches professionnelles et gérez vos candidats en toute simplicité.
          </p>

          {isLoggedIn && user?.phone && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-slate-900 text-white px-10 py-5 rounded-3xl font-bold shadow-2xl flex items-center gap-3 mx-auto hover:bg-blue-600 transition-all group"
            >
              Ajouter un candidat <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          )}
        </motion.div>
      </main>

      {/* MODAL SANS AUTOMATISME */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-md w-full text-center relative overflow-hidden border border-white">
              <div className="absolute top-0 left-0 w-full h-2 bg-blue-600" />
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
                <Phone size={40} />
              </div>
              <h2 className="text-3xl font-black mb-2">WhatsApp</h2>
              <p className="text-slate-400 mb-10">Votre numéro est requis pour le partage de fiches.</p>

              <form onSubmit={handleSavePhone} className="space-y-4">
                <div className="relative">
                   <input
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-5 px-6 text-center text-2xl font-bold focus:border-blue-500 focus:bg-white outline-none transition-all shadow-inner"
                    placeholder="05x-xxxxxxx"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    autoFocus required
                  />
                  {phoneInput.length >= 9 && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />}
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
                  CONFIRMER
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}