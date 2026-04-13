import { Filter } from "@/types/filter";
import { CircularProgress } from "../circular-progress";
import { WidgetContainer } from "../widget-container";
import { SleepEntry } from "@/types/sleep";
import useSWR from "swr";
import { getSleepEntries } from "@/lib/supabase/client";
import { useAppStore } from "@/stores/app-store";

export function Sleep({ filter }: { filter: Filter }) {
  const user = useAppStore((state) => state.user);

  const { data: periodData, isLoading } = useSWR<SleepEntry[]>(
    user ? ["sleep", filter] : null,
    () => getSleepEntries(filter),
  );

  const getAverageDuration = (data: SleepEntry[]) => {
    if (!data?.length) return 0;
    const sum = data.reduce((acc, entry) => acc + (entry.hours ?? 0), 0);
    const res = Math.round((sum / data.length) * 10) / 10;
    return res;
  };

  const getSleepSentiment = (hours: number): string => {
    if (hours < 5) return "Bad";
    if (hours < 6) return "Decent";
    if (hours < 7) return "Good";
    if (hours < 8) return "Excellent";
    return "Optimal";
  };

  const getAverageTime = (
    data: SleepEntry[],
    key: "bedTime" | "wakeTime",
  ): string => {
    if (!data?.length) return "";
    const totalMinutes = data.reduce((acc, entry) => {
      const [hours, minutes] = (entry[key] ?? "00:00").split(":").map(Number);
      let total = hours * 60 + minutes;
      // treat early morning hours as continuation of previous night
      if (key === "bedTime" && hours < 12) total += 24 * 60;
      return acc + total;
    }, 0);
    const avg = Math.round(totalMinutes / data.length);
    const h = Math.floor(avg / 60) % 24;
    const m = avg % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  const averageDuration = getAverageDuration(periodData ?? []);
  const sleepSentiment = getSleepSentiment(averageDuration);
  const avgBedTime = getAverageTime(periodData ?? [], "bedTime");
  const avgWakeTime = getAverageTime(periodData ?? [], "wakeTime");

  console.log("periodData", periodData);

  return (
    <WidgetContainer label="Sleep" isLoading={isLoading} type="ring">
      {periodData && periodData.length > 0 ? (
        <div className="flex items-center justify-center flex-col w-full">
          <div className="mb-4 flex items-center justify-center flex-col">
            <CircularProgress duration={averageDuration} />
          </div>

          <div className="flex justify-between mb-4">
            <span className="text-xs text-gray-500 mr-8">{avgBedTime} bed</span>
            <span className="text-xs text-gray-500">{avgWakeTime} wake</span>
          </div>
          <span className="text-xs text-gray-400 text-center block">
            {sleepSentiment}
          </span>
        </div>
      ) : (
        <span className="text-gray-400">Log your sleep</span>
      )}
    </WidgetContainer>
  );
}
