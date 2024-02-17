import { create } from "zustand";

interface CreatorSidebarStore {
  collapsed: boolean;
  onExpand: () => void;
  onCollapase: () => void;
}

export const useCreatorSidebar = create<CreatorSidebarStore>((set) => ({
  collapsed: false,
  onExpand: () => set(() => ({ collapsed: false })),
  onCollapase: () => set(() => ({ collapsed: true })),
}));