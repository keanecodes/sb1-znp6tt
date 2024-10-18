import create from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: null | { id: string; name: string; role: string };
  login: (user: { id: string; name: string; role: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (user) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));