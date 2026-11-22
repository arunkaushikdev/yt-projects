export const CATEGORIES = [
  { name: "Food", icon: "🍔" },
  { name: "Travel", icon: "🚌" },
  { name: "Shopping", icon: "🛍️" },
  { name: "Bills", icon: "💡" },
  { name: "Other", icon: "📦" },
];

export function getIcon(name) {
  return CATEGORIES.find((c) => c.name === name)?.icon ?? "📦";
}
