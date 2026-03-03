import { create } from 'zustand';

export type Language = 'pl' | 'en';

interface AppState {
  isModalOpen: boolean;
  isVideoModalOpen: boolean;
  language: Language;
  openModal: () => void;
  closeModal: () => void;
  openVideoModal: () => void;
  closeVideoModal: () => void;
  setLanguage: (lang: Language) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isModalOpen: false,
  isVideoModalOpen: false,
  language: 'pl',
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  openVideoModal: () => set({ isVideoModalOpen: true }),
  closeVideoModal: () => set({ isVideoModalOpen: false }),
  setLanguage: (lang) => set({ language: lang }),
}));
