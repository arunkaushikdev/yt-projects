// The page only asks. The main process does the file work.
export function loadExpenses() {
  return window.expensesApi.load();
}

export function saveExpenses(expenses) {
  return window.expensesApi.save(expenses);
}

// Opens the native Save dialog (in main) and writes the CSV file
export function exportCsv(expenses) {
  return window.expensesApi.exportCsv(expenses);
}

// Opens the native Open dialog (in main) and returns the rows it read
export function importCsv() {
  return window.expensesApi.importCsv();
}
