"use client";

import { useContext } from "react";

import {
  SidebarContext, 
  type SidebarContextValue,
} from "@/components/shared/providers";

export function useSidebarConfig(): SidebarContextValue {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      "useSidebarConfig must be used within a SidebarConfigProvider"
    );
  }
  return context;
}
