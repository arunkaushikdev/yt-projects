// 1250 → "₹1,250" (Indian number format)
export function formatMoney(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}

// "2026-11-23" → "23 Nov"
export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

// "2026-11" → "Nov 2026"
export function formatMonth(month) {
  return new Date(month + "-01").toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
}
