import { useState, useEffect } from "react";

// Returns `value`, but only after it has stopped changing for `delay` ms
export function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // typing again cancels the old timer
  }, [value, delay]);

  return debounced;
}
