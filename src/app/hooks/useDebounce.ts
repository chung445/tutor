/**
 * Debounce Hook
 * Delays function execution until after a specified delay
 * Useful for search inputs to avoid excessive filtering/API calls
 */

import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timeout to update the debounced value
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout if value changes before delay completes
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
