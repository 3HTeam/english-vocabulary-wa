"use client";

import { useMemo } from "react";

import { debounce } from "radash";

import { DEBOUNCE_TIME } from "@/constants/common";

export const useDebounce = <T extends (...args: any[]) => any>(
  fn: T,
  duration: number = DEBOUNCE_TIME,
): T => {
  return useMemo(
    () => debounce({ delay: duration }, fn) as unknown as T,
    [fn, duration],
  );
};
