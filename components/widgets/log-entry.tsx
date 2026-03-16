import { WidgetContainer } from "../widget-container";

export function LogEntry() {
  return (
    <WidgetContainer label="Log entry">
      <div>
        <button className="log-button text-gray-400 hover:text-gray-200 mb-2">
          + Sleep
        </button>
        <button className="log-button text-gray-400 hover:text-gray-200 mb-2">
          + Activity
        </button>
        <button className="log-button text-gray-400 hover:text-gray-200">
          + Mood
        </button>
      </div>
    </WidgetContainer>
  );
}
