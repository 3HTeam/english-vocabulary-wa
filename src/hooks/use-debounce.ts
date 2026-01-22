"use client";

import { useState, useEffect } from "react";
import { DEBOUNCE_TIME } from "@/constants/common";

export function useDebounce<T>(value: T, delay: number = DEBOUNCE_TIME): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
