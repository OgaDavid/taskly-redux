export function getToday() {
  const options = { weekday: "long", day: "numeric", month: "long" };
  const today = new Date().toLocaleDateString(
    "en-US",
    options as Intl.DateTimeFormatOptions
  );
  return today;
}

export function generateTodoId(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let shortId = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    shortId += characters.charAt(randomIndex);
  }
  return shortId;
}

/**
 * Converts a date string to a formatted due date.
 * @param dateString - The date string to convert.
 * @returns The formatted due date.
 */
export const getDueDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { ...options, year: "numeric" });
};
