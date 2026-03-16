"use client";
import { Activity } from "@/components/widgets/activity";
import { Agent } from "@/components/widgets/agent";
import { LogEntry } from "@/components/widgets/log-entry";
import { Mood } from "@/components/widgets/mood";
import { Sleep } from "@/components/widgets/sleep";
import { WidgetsFilters } from "./widgets-filters";
import { useAppStore } from "@/stores/app-store";

export function Widgets() {
  const selectedFilter = useAppStore((state) => state.activeFilter);
  return (
    <div>
      <div className="mb-6">
        <WidgetsFilters selectedFilter={selectedFilter} />
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-4">
        <Sleep filter={selectedFilter} />
        <Activity filter={selectedFilter} />
        <Mood filter={selectedFilter} />
        <Agent className="md:col-span-2" />
        <LogEntry />
      </div>
    </div>
  );
}
