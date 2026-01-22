"use client";

import { useEffect, useState } from "react";
import { MOBILE_BREAKPOINT } from "@/constants/common";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = typeof window !== "undefined" ? window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`) : null
    const onChange = () => {
      setIsMobile(typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false)
    }

    if (mql) {
      mql.addEventListener("change", onChange)
    }
    setIsMobile(typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false)

    return () => {
      if (mql) {
        mql.removeEventListener("change", onChange)
      }
    }
  }, [])

  return !!isMobile
}
