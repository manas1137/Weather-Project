export function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatTime(timeString) {
  if (!timeString) return "";
  const date = new Date(timeString.replace(" ", "T"));
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export function formatShortDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", { weekday: "short" });
}

export function average(values) {
  const cleaned = values.filter((value) => Number.isFinite(value));
  if (!cleaned.length) return null;
  const total = cleaned.reduce((sum, value) => sum + value, 0);
  return total / cleaned.length;
}
