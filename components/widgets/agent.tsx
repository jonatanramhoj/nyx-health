import { WidgetContainer } from "../widget-container";

export function Agent({ className }: { className?: string }) {
  return (
    <WidgetContainer label="NYX · Insight" className={className}>
      <div>
        <p className="text-xs leading-snug text-gray-400">
          Your sleep consistency has improved over the past week. The
          correlation between your evening runs and sleep quality is notable —
          on days you ran, you fell asleep 18 minutes faster. Consider
          maintaining your current bedtime window.
        </p>
      </div>
    </WidgetContainer>
  );
}
