export function getToday() {
  const options = { weekday: "long", day: "numeric", month: "long" };
  const today = new Date().toLocaleDateString(
    "en-US",
    options as Intl.DateTimeFormatOptions
  );
  return today;
}
