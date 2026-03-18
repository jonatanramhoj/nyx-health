// Repository Pattern
// data access layer (DAL)
// service layer

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

import { toCamel } from "@/utils/case-conversion";
import { SleepEntry } from "@/types/sleep";
import { calculateHours } from "@/utils/calculate-hours";
import { getDateRange } from "@/utils/get-date-range";
import { Filter } from "@/types/filter";

export const getSleepEntries = async (
  filter: Filter,
): Promise<SleepEntry[]> => {
  const { data, error } = await supabase
    .from("sleep_entries")
    .select("*")
    .gte("date", getDateRange(filter))
    .order("date");

  if (error) throw error;

  const entries = toCamel(data ?? []) as SleepEntry[];

  const res = entries.map((entry) => ({
    ...entry,
    hours:
      entry.bedTime && entry.wakeTime
        ? calculateHours(entry.bedTime, entry.wakeTime)
        : null,
  }));

  return res;
};

export const addSleep = async (
  date: string,
  bedTime: string,
  wakeTime: string,
) => {
  const res = await supabase.from("sleep_entries").insert({
    date: date,
    bed_time: bedTime,
    wake_time: wakeTime,
  });
  return res;
};

export const getActivityEntries = async (filter: string) => {
  const { data } = await supabase.from("activity_entries").select();
  return data;
};

export const addActivityEntry = async (entry: SleepEntry) => {
  const { data } = await supabase.from("activity_entries").insert(entry);
  return data;
};

export const getMoodEntries = async (filter: string) => {
  const { data } = await supabase.from("mood_entries").select();
  return data;
};

export const addMoodEntry = async (entry: SleepEntry) => {
  const { data } = await supabase.from("mood_entries").insert(entry);
  return data;
};
