// Computes elapsed duration from a JSON-configured start date to "now",
// so total experience is never hardcoded and always reflects today's date.

/**
 * @param {string} startDateStr - ISO date string, e.g. "2023-09-01"
 * @returns {{ years: number, months: number, label: string }}
 */
export function computeExperience(startDateStr) {
  const start = new Date(startDateStr);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();

  // Borrow a year if we haven't reached the day-of-month yet this month,
  // and roll negative months into whole years.
  if (now.getDate() < start.getDate()) months -= 1;
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  if (years < 0) { years = 0; months = 0; }

  const yearLabel = `${years} ${years === 1 ? "Year" : "Years"}`;
  const monthLabel = `${months} ${months === 1 ? "Month" : "Months"}`;
  const label = months > 0 ? `${yearLabel} ${monthLabel}` : yearLabel;

  return { years, months, label };
}
