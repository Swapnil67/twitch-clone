import { create } from "zustand";

interface SidebarStore {
  collapsed: boolean;
  onExpand: () => void;
  onCollapase: () => void;
}

export const useSidebar = create<SidebarStore>((set) => ({
  collapsed: true,
  onExpand: () => set(() => ({ collapsed: false })),
  onCollapase: () => set(() => ({ collapsed: true })),
}));
