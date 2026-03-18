// Repository Pattern, data access layer (DAL), service layer

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
import { ActivityEntry } from "@/types/activity";
import { getDay } from "@/utils/get-day";

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

export const getActivityEntries = async (
  filter: Filter,
): Promise<ActivityEntry[]> => {
  const { data, error } = await supabase
    .from("activity_entries")
    .select("*")
    .gte("date", getDateRange(filter))
    .order("date");

  if (error) throw error;

  const entries = toCamel(data ?? []) as ActivityEntry[];

  const res = entries.map((entry) => ({
    ...entry,
    day: getDay(entry.date),
  }));

  return res;
};

export const getMoodEntries = async (filter: string) => {
  const { data } = await supabase.from("mood_entries").select();
  return data;
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

export const addActivity = async (
  date: string,
  activity: string,
  minutes: number,
) => {
  const res = await supabase.from("activity_entries").insert({
    date,
    activity,
    minutes,
  });
  return res;
};

export const addMoodEntry = async (entry: SleepEntry) => {
  const { data } = await supabase.from("mood_entries").insert(entry);
  return data;
};
