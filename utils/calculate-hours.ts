// Calculate amount of hours slept based on bedTime and wakeTime
export const calculateHours = (bedTime: string, wakeTime: string): number => {
  const [bedH, bedM] = bedTime.split(":").map(Number);
  const [wakeH, wakeM] = wakeTime.split(":").map(Number);

  const bedMinutes = bedH * 60 + bedM;
  let wakeMinutes = wakeH * 60 + wakeM;

  if (wakeMinutes <= bedMinutes) wakeMinutes += 24 * 60;

  return Math.round(((wakeMinutes - bedMinutes) / 60) * 10) / 10;
};
