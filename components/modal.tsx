import { Modal as ModalType } from "@/types/modal";
import { createPortal } from "react-dom";

export function Modal({
  children,
  setActiveModal,
}: {
  children: React.ReactNode;
  setActiveModal: (modal: ModalType | null) => void;
}) {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => setActiveModal(null)}
      />
      <div className="relative glass-card p-6 w-full max-w-md">{children}</div>
    </div>,
    window.document.body,
  );
}
