export function formatCurrency(amount = 0, currency = "IDR") {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "IDR" ? 0 : 2,
  }).format(Number(amount) || 0);
}

export function formatDate(value?: string | Date | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function formatDateRange(startDate?: string | null, endDate?: string | null) {
  if (!startDate || !endDate) return "-";
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

export function formatShortTime(value?: string | null) {
  if (!value) return "";
  return value.slice(0, 5);
}
