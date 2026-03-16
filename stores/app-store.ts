import { Filter } from "@/types/filter";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AppStore = {
  activeFilter: Filter;
  setActiveFilter: (filter: Filter) => void;
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      activeFilter: Filter.Today,
      setActiveFilter: (filter: Filter) => set({ activeFilter: filter }),
    }),
    { name: "nyx-store" },
  ),
);
