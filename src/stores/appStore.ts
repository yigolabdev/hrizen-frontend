import { create } from 'zustand';

interface AppState {
  siderCollapsed: boolean;
  toggleSider: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  siderCollapsed: false,
  toggleSider: () => set((s) => ({ siderCollapsed: !s.siderCollapsed })),
}));
