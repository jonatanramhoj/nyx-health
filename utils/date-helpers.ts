export const today = () => new Date().toISOString().split("T")[0];

export const formatDisplayDate = (date: Date = new Date()) =>
  date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
