/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CheckCircle,
  CheckSquare,
  CircleOff,
  FileQuestion,
  FileText,
  Link,
} from "lucide-react";

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

export const getExerciseTypes = (t: (key: string, options?: any) => string) => [
  {
    value: "MULTIPLE_CHOICE",
    label: t("common.exercise_type.multiple_choice"),
    icon: FileQuestion,
  },
  {
    value: "FILL_IN_THE_BLANK",
    label: t("common.exercise_type.fill_in_the_blank"),
    icon: FileText,
  },
  {
    value: "TRUE_FALSE",
    label: t("common.exercise_type.true_false"),
    icon: CheckSquare,
  },
  {
    value: "MATCHING",
    label: t("common.exercise_type.matching"),
    icon: Link,
  },
];
