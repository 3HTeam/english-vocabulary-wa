import { CheckCircle, CircleOff } from "lucide-react";

export const getStatuses = (t: (key: string) => string) => [
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
