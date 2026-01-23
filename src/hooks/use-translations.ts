"use client";

import { useTranslations as useTranslationsHook } from "next-intl";

export const useTranslations = () => {
  const t = useTranslationsHook();
  return t;
};
