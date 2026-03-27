import { useState } from 'react';
import { useAuthStore } from '../store';
import { jwtDecode } from "jwt-decode";
import { userService } from '../services/userService';

export function useAuthFlow() {
  const { user, isLoggedIn, login, logout, setPhone } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");

  const handleGoogleSuccess = async (res) => {
    const decoded = jwtDecode(res.credential);
    try {
      let contact = await userService.getContactByEmail(decoded.email);

      if (!contact) {
        contact = await userService.createContact({
          email: decoded.email,
          name: decoded.name
        });
      }

      login({ ...decoded, phone: contact.tel || "", db_id: contact.id });
      if (!contact.tel) setShowModal(true);

    } catch (error) {
      console.error("Auth Sync Error:", error.message);
      login(decoded);
    }
  };

  const handleSavePhone = async (e) => {
    e.preventDefault();
    try {
      await userService.updatePhone(user.email, phoneInput);
      setPhone(phoneInput);
      setShowModal(false);
    } catch (error) {
      alert("Erreur lors de la sauvegarde.");
    }
  };

  return {
    user,
    isLoggedIn,
    logout,
    showModal,
    phoneInput,
    setPhoneInput,
    handleGoogleSuccess,
    handleSavePhone
  };
}