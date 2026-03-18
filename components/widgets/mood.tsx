"use client";
import { Filter } from "@/types/filter";
import { WidgetContainer } from "../widget-container";
import { BarChart, Bar, ResponsiveContainer, XAxis } from "recharts";
import { DotSelector } from "../dot-selector";
import { MoodEntry } from "@/types/mood";
import useSWR from "swr";
import { getMoodEntries } from "@/lib/supabase/client";

export function Mood({ filter }: { filter: Filter }) {
  const { data: periodData, isLoading } = useSWR(["mood", filter], () =>
    getMoodEntries(filter),
  );

  const getAverageScore = (data: MoodEntry[]) => {
    if (!data.length) return 0;
    const sum = data.reduce((acc, entry) => acc + entry.score, 0);
    return Math.round((sum / data.length) * 10) / 10;
  };

  const averageScore = getAverageScore(periodData ?? []);

  return (
    <WidgetContainer label="Mood" isLoading={isLoading}>
      <h3 className="text-xl mb-6">
        {averageScore}
        <span className="text-sm text-gray-500">/5</span>
      </h3>
      <div className="mb-4">
        <DotSelector score={Math.round(averageScore)} />
      </div>
      {periodData && (
        <ResponsiveContainer width="100%" height={80} className="mt-auto">
          <BarChart data={periodData} barSize={8}>
            <Bar
              dataKey="score"
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
