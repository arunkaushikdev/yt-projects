// The page only asks. The main process does the file work.
export function loadExpenses() {
  return window.expensesApi.load();
}

export function saveExpenses(expenses) {
  return window.expensesApi.save(expenses);
}
