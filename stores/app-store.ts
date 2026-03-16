import { Filter } from "@/types/filter";
import { Modal } from "@/types/modal";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AppStore = {
  activeFilter: Filter;
  setActiveFilter: (filter: Filter) => void;
  activeModal: Modal | null;
  setActiveModal: (modal: Modal | null) => void;
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      activeFilter: Filter.Today,
      setActiveFilter: (filter: Filter) => set({ activeFilter: filter }),
      activeModal: null,
      setActiveModal: (modal: Modal | null) => set({ activeModal: modal }),
    }),
    { name: "nyx-store" },
  ),
);
