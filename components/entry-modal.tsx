"use client";
import { useAppStore } from "@/stores/app-store";
import { Modal } from "./modal";
import { Modal as ModalTypes } from "@/types/modal";
import { MoodForm } from "./forms/mood-form";
import { ActivityForm } from "./forms/activity-form";
import { SleepForm } from "./forms/sleep-form";

export function EntryModal() {
  const activeModal = useAppStore((state) => state.activeModal);
  const setActiveModal = useAppStore((state) => state.setActiveModal);

  const forms = {
    [ModalTypes.Sleep]: SleepForm,
    [ModalTypes.Activity]: ActivityForm,
    [ModalTypes.Mood]: MoodForm,
  };

  if (!activeModal) return null;

  console.log("activeModal", activeModal);

  const ActiveForm = activeModal ? forms[activeModal] : null;

  return (
    <Modal setActiveModal={setActiveModal}>
      {ActiveForm && <ActiveForm />}
    </Modal>
  );
}
