import { Modal } from "@/types/modal";
import { WidgetContainer } from "../widget-container";
import { useAppStore } from "@/stores/app-store";

export function LogEntry() {
  const setActiveModal = useAppStore((state) => state.setActiveModal);

  return (
    <WidgetContainer label="Log entry">
      <div>
        <button
          onClick={() => setActiveModal(Modal.Sleep)}
          className="log-button text-gray-400 hover:text-gray-200 mb-2"
        >
          + Sleep
        </button>
        <button
          onClick={() => setActiveModal(Modal.Activity)}
          className="log-button text-gray-400 hover:text-gray-200 mb-2"
        >
          + Activity
        </button>
        <button
          onClick={() => setActiveModal(Modal.Mood)}
          className="log-button text-gray-400 hover:text-gray-200"
        >
          + Mood
        </button>
      </div>
    </WidgetContainer>
  );
}
