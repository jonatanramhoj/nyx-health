import { WidgetContainer } from "../widget-container";

const AgentLabel = () => {
  return (
    <p className="flex items-center">
      <span
        className="nyx-pulse mr-2 inline-block w-[6px] h-[6px] align-middle rounded-full shrink-0"
        style={{ background: "var(--nyx-text-primary)" }}
      />
      NYX · Insight
    </p>
  );
};

export function Agent({ className }: { className?: string }) {
  return (
    <WidgetContainer label={<AgentLabel />} className={className}>
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
