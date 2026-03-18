import { Filter } from "@/types/filter";

export const getDateRange = (filter: Filter) => {
  const now = new Date();
  const from = new Date();

  if (filter === Filter.Today) from.setHours(0, 0, 0, 0);
  if (filter === Filter.Week) from.setDate(now.getDate() - 7);
  if (filter === Filter.Month) from.setDate(now.getDate() - 30);

  return from.toISOString();
};
