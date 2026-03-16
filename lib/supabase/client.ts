// Repository Pattern
// data access layer (DAL)
// service layer

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

import { SleepEntryInsert } from "@/types/sleep";

export const getSleepEntries = async (filter: string) => {
  const { data } = await supabase.from("sleep_entries").select();
  return data;
};

export const addSleepEntry = async (entry: SleepEntryInsert) => {
  const { data } = await supabase.from("sleep_entries").insert(entry);
  return data;
};

export const getActivityEntries = async (filter: string) => {
  const { data } = await supabase.from("activity_entries").select();
  return data;
};

export const addActivityEntry = async (entry: SleepEntryInsert) => {
  const { data } = await supabase.from("activity_entries").insert(entry);
  return data;
};

export const getMoodEntries = async (filter: string) => {
  const { data } = await supabase.from("mood_entries").select();
  return data;
};

export const addMoodEntry = async (entry: SleepEntryInsert) => {
  const { data } = await supabase.from("mood_entries").insert(entry);
  return data;
};
