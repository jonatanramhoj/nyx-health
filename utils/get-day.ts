export const getDay = (date: string) =>
  new Date(date).toLocaleDateString("en-US", { weekday: "short" }).charAt(0);
