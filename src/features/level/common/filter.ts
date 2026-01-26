/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCircle, CircleOff } from "lucide-react";

export const getStatuses = (t: (key: string, options?: any) => string) => [
  {
    value: "true",
    label: t("common.status.active"),
    icon: CheckCircle,
  },
  {
    value: "false",
    label: t("common.status.inactive"),
    icon: CircleOff,
  },
];
