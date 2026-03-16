import { useAppStore } from "@/stores/app-store";
import { Filter } from "@/types/filter";
import clsx from "clsx";

export function WidgetsFilters({ selectedFilter }: { selectedFilter: Filter }) {
  const setActiveFilter = useAppStore((state) => state.setActiveFilter);
  return (
    <div className="flex">
      {Object.values(Filter).map((filter) => (
        <button
          className={clsx("filter-btn", { active: selectedFilter === filter })}
          key={filter}
          onClick={() => setActiveFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
