import { create } from 'zustand'

interface UIStore {
    searchOpen: boolean
    mobileMenuOpen: boolean
    activeModal: string | null
    theme: 'light' | 'dark'
    toggleSearch: () => void
    openSearch: () => void
    closeSearch: () => void
    toggleMobileMenu: () => void
    closeMobileMenu: () => void
    openModal: (id: string) => void
    closeModal: () => void
    toggleTheme: () => void
}

export const useUIStore = create<UIStore>((set) => ({
    searchOpen: false,
    mobileMenuOpen: false,
    activeModal: null,
    theme: 'light',
    toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),
    openSearch: () => set({ searchOpen: true }),
    closeSearch: () => set({ searchOpen: false }),
    toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
    closeMobileMenu: () => set({ mobileMenuOpen: false }),
    openModal: (id) => set({ activeModal: id }),
    closeModal: () => set({ activeModal: null }),
    toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}))
