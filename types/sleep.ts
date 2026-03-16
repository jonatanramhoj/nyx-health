export type SleepEntry = {
  date: string;
  day: string;
  bedTime: string;
  wakeTime: string;
  hours: number;
};

export type SleepEntryInsert = {
  date: string;
  bed_time: string;
  wake_time: string;
  hours: number;
};
