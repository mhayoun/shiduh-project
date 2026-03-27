import React, { useState } from 'react';
import { useAuthFlow } from './hooks/useAuthFlow';
import { translations } from './utils/translations';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PhoneModal from './components/PhoneModal';
import HowItWorks from './components/HowItWorks';
import SecurityInfo from './components/SecurityInfo';

export default function App() {
  const [lang, setLang] = useState('fr'); // Default to French
  const t = translations[lang];

  const {
    user, isLoggedIn, logout,
    showModal, phoneInput, setPhoneInput,
    handleGoogleSuccess, handleSavePhone
  } = useAuthFlow();

  return (
    <div dir={t.dir} className="min-h-screen bg-[#FDFDFF] font-sans antialiased text-slate-900 transition-all">
      <Navbar
        isLoggedIn={isLoggedIn}
        user={user}
        onLogin={handleGoogleSuccess}
        onLogout={logout}
        currentLang={lang}
        setLang={setLang}
        t={t}
      />

      <Hero isLoggedIn={isLoggedIn} user={user} t={t} />
      <SecurityInfo t={t} />
      <HowItWorks t={t} />

      <PhoneModal
        isOpen={showModal}
        phoneInput={phoneInput}
        setPhoneInput={setPhoneInput}
        onSave={handleSavePhone}
        t={t}
      />
    </div>
  );
}