import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: (data) => set({ user: data, isLoggedIn: true }),
      logout: () => {
        set({ user: null, isLoggedIn: false });
        localStorage.removeItem('shiduh_final_v1');
      },
      setPhone: (phone) => set((state) => ({
        user: state.user ? { ...state.user, phone } : null
      })),
    }),
    { name: 'shiduh_final_v1' }
  )
);