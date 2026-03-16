"use client";
import { Filter } from "@/types/filter";
import { WidgetContainer } from "../widget-container";
import { BarChart, Bar, ResponsiveContainer, XAxis } from "recharts";
import {
  dailyActivityData,
  weeklyActivityData,
  monthlyActivityData,
} from "@/data/mock-data";
import { ActivityEntry } from "@/types/activity";

export function Activity({ filter }: { filter: Filter }) {
  // TODO: SWR request
  const periodData =
    filter === Filter.Today
      ? dailyActivityData
      : filter === Filter.Week
        ? weeklyActivityData
        : monthlyActivityData;

  const getAverageDuration = (data: ActivityEntry[]) => {
    if (!data.length) return 0;
    const sum = data.reduce((acc, entry) => acc + entry.minutes, 0);
    return Math.round((sum / data.length) * 10) / 10;
  };

  const getMostPopularActivity = (data: ActivityEntry[]): string => {
    if (!data.length) return "";
    const counts = data.reduce<Record<string, number>>((acc, entry) => {
      if (!entry.activity) return acc;
      acc[entry.activity] = (acc[entry.activity] ?? 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  };

  const averageDuration = getAverageDuration(periodData);

  const mostPopularActivity = getMostPopularActivity(periodData);

  return (
    <WidgetContainer label="Activity">
      <h3 className="text-xl">
        {mostPopularActivity}{" "}
        <span className="text-sm text-gray-500">{averageDuration} min</span>
      </h3>
      {periodData && (
        <ResponsiveContainer width="100%" height={80} className="mt-auto">
          <BarChart data={periodData} barSize={8}>
            <Bar
              dataKey="minutes"
              fill="rgba(255,255,255,0.7)"
              radius={[2, 2, 0, 0]}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </WidgetContainer>
  );
}
