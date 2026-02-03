"use client";

import { ArrowLeft, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks";

interface ActionViewProps {
  isTrashMode: boolean;
  onToggleTrashMode: () => void;
  onClickAdd: () => void;
}

export function ActionView({
  isTrashMode,
  onToggleTrashMode,
  onClickAdd,
}: ActionViewProps) {
  const t = useTranslations();

  return isTrashMode ? (
    <Button
      variant="outline"
      size="sm"
      onClick={onToggleTrashMode}
      className="cursor-pointer"
    >
      <ArrowLeft className="w-4 h-4 mr-1" />
      {t("common.actions.back")}
    </Button>
  ) : (
    <div className="flex items-center gap-2">
      <Button
        variant="destructive"
        size="sm"
        onClick={onToggleTrashMode}
        className="cursor-pointer"
      >
        <Trash2 className="w-4 h-4" />
        <span className="hidden lg:inline ml-1">{t("common.trash.trash")}</span>
      </Button>
      <Button
        variant="default"
        size="sm"
        className="cursor-pointer"
        onClick={onClickAdd}
      >
        <Plus className="w-4 h-4" />
        <span className="hidden lg:inline">
          {t("grammar_category.add_grammar_category")}
        </span>
      </Button>
    </div>
  );
}
