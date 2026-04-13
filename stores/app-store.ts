import { Filter } from "@/types/filter";
import { Modal } from "@/types/modal";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@supabase/supabase-js";

type AppStore = {
  activeFilter: Filter;
  activeModal: Modal | null;
  user: User | null;
  setActiveFilter: (filter: Filter) => void;
  setActiveModal: (modal: Modal | null) => void;
  setUser: (user: User | null) => void;
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      activeFilter: Filter.Today,
      activeModal: null,
      user: null,
      setUser: (user: User | null) => set({ user: user }),
      setActiveFilter: (filter: Filter) => set({ activeFilter: filter }),
      setActiveModal: (modal: Modal | null) => set({ activeModal: modal }),
    }),
    { name: "nyx-store" },
  ),
);
