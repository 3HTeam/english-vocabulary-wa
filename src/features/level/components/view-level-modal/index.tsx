"use client";

import { useEffect, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";

import { useGetLevelByIdQuery } from "@/apis/hooks";
import { DialogError } from "@/components/shared/dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { EMPTY, MODES } from "@/constants/common";
import { useTranslations } from "@/hooks";

import { levelDefaultValues } from "../../common";
import { getLevelSchema, type LevelFormValues } from "../../schemas";
import { LevelForm } from "../level-form";

interface ViewLevelModalProps {
  levelId: string | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ViewLevelModal({
  levelId,
  open: controlledOpen,
  onOpenChange,
}: ViewLevelModalProps) {
  const t = useTranslations();
  const {
    data: levelData,
    isLoading,
    isError,
  } = useGetLevelByIdQuery(levelId || EMPTY.str);

  const levelSchema = useMemo(() => getLevelSchema(t), [t]);

  const form = useForm<LevelFormValues>({
    resolver: zodResolver(levelSchema) as Resolver<LevelFormValues>,
    defaultValues: levelDefaultValues,
  });

  const { reset } = form;

  useEffect(() => {
    if (levelData?.data?.level && controlledOpen) {
      const level = levelData.data.level;
      reset({
        code: level.code,
        name: level.name,
        description: level.description || EMPTY.str,
        order: level.order,
        status: level.status,
      });
    }
  }, [levelData, controlledOpen, reset]);

  useEffect(() => {
    if (!controlledOpen) {
      reset(levelDefaultValues);
    }
  }, [controlledOpen, reset]);

  const handleClose = () => {
    reset(levelDefaultValues);
    onOpenChange?.(false);
  };

  if (isError) {
    return (
      <DialogError
        open={controlledOpen}
        onOpenChange={onOpenChange}
        title={t("level.level_details")}
        onClose={handleClose}
      />
    );
  }

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[650px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("level.level_details")}</DialogTitle>
          <DialogDescription>{t("level.level_details_desc")}</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <Form {...form}>
            <form className="space-y-6">
              <LevelForm form={form} mode={MODES.view} />

              <div className="flex justify-end pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="cursor-pointer"
                >
                  {t("common.actions.close")}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
