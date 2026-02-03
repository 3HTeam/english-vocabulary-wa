import type { ColumnDef } from "@tanstack/react-table";

import {
  DataTableColumnHeader,
  DataTableRowActions,
} from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DATE_FORMATS } from "@/constants/common";
import { formatDate } from "@/utils/date";

import { COLUMN_KEYS } from ".";

interface CreateColumnsOptions {
  t: (key: string, options?: any) => string;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onRestore?: (id: string) => void;
  onForceDelete?: (id: string) => void;
}

const getExerciseTypeLabel = (type: string, t: (key: string) => string) => {
  const typeMap: Record<string, string> = {
    MULTIPLE_CHOICE: t("common.exercise_type.multiple_choice"),
    FILL_IN_THE_BLANK: t("common.exercise_type.fill_in_the_blank"),
    TRUE_FALSE: t("common.exercise_type.true_false"),
    MATCHING: t("common.exercise_type.matching"),
  };
  return typeMap[type] || type;
};

const getExerciseTypeVariant = (type: string) => {
  const variantMap: Record<
    string,
    "default" | "secondary" | "outline" | "destructive"
  > = {
    MULTIPLE_CHOICE: "default",
    FILL_IN_THE_BLANK: "secondary",
    TRUE_FALSE: "outline",
    MATCHING: "destructive",
  };
  return variantMap[type] || "default";
};

export const createColumns = ({
  t,
  onView,
  onEdit,
  onDelete,
  onRestore,
  onForceDelete,
}: CreateColumnsOptions): ColumnDef<any>[] => [
  {
    id: COLUMN_KEYS.id,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        className="cursor-pointer mr-2"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        className="cursor-pointer mr-2"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: COLUMN_KEYS.type,
    meta: { name: t("field.exercise_type") },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t("field.exercise_type")} />
    ),
    cell: ({ row }) => {
      const type = row.getValue(COLUMN_KEYS.type) as string;
      return (
        <Badge variant={getExerciseTypeVariant(type)}>
          {getExerciseTypeLabel(type, t)}
        </Badge>
      );
    },
  },
  {
    accessorKey: COLUMN_KEYS.question,
    meta: { name: t("field.question") },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t("field.question")} />
    ),
    cell: ({ row }) => (
      <span className="max-w-[400px] truncate font-medium">
        {row.getValue(COLUMN_KEYS.question)}
      </span>
    ),
  },
  {
    accessorKey: COLUMN_KEYS.answer,
    meta: { name: t("field.answer") },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t("field.answer")} />
    ),
    cell: ({ row }) => (
      <Badge variant="outline" className="font-mono">
        {row.getValue(COLUMN_KEYS.answer)}
      </Badge>
    ),
  },
  {
    accessorKey: COLUMN_KEYS.grammarTopic,
    meta: { name: t("field.grammar_topic") },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t("field.grammar_topic")} />
    ),
    cell: ({ row }) => {
      const topic = row.getValue(COLUMN_KEYS.grammarTopic) as any;
      return (
        <span className="max-w-[200px] truncate">{topic?.title || "-"}</span>
      );
    },
  },
  {
    accessorKey: COLUMN_KEYS.order,
    meta: { name: t("field.order") },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t("field.order")} />
    ),
    cell: ({ row }) => (
      <Badge variant="secondary">{row.getValue(COLUMN_KEYS.order)}</Badge>
    ),
  },
  {
    accessorKey: COLUMN_KEYS.score,
    meta: { name: t("field.score") },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t("field.score")} />
    ),
    cell: ({ row }) => (
      <Badge variant="default">{row.getValue(COLUMN_KEYS.score)} pts</Badge>
    ),
  },
  {
    accessorKey: COLUMN_KEYS.status,
    meta: { name: t("field.status") },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t("field.status")} />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge variant={status ? "success" : "error"}>
          {status ? t("common.status.active") : t("common.status.inactive")}
        </Badge>
      );
    },
  },
  {
    accessorKey: COLUMN_KEYS.createdAt,
    meta: { name: t("field.created_at") },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t("field.created_at")} />
    ),
    cell: ({ row }) => (
      <span className="truncate font-medium">
        {formatDate(row.getValue("createdAt"), DATE_FORMATS.DD_MM_YYYY)}
      </span>
    ),
  },
  {
    id: COLUMN_KEYS.actions,
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        onRestore={onRestore}
        onForceDelete={onForceDelete}
      />
    ),
  },
];
