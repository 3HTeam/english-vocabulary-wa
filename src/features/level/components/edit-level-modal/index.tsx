"use client";

import { useEffect, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Loader2, Pencil } from "lucide-react";
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { useGetLevelByIdQuery, useUpdateLevelMutation } from "@/apis/queries";
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
import { ApiResponse } from "@/types/api";
import { TUpdateLevelResponse } from "@/types/features/level";

import { levelDefaultValues } from "../../common";
import { getLevelSchema, type LevelFormValues } from "../../schemas";
import { LevelForm } from "../level-form";

interface EditLevelModalProps {
  levelId: string | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EditLevelModal({
  levelId,
  open: controlledOpen,
  onOpenChange,
}: EditLevelModalProps) {
  const t = useTranslations();
  const {
    data: levelData,
    isLoading,
    isError,
  } = useGetLevelByIdQuery(levelId || EMPTY.str);
  const { mutate: updateLevel, isPending } = useUpdateLevelMutation();

  const levelSchema = useMemo(() => getLevelSchema(t), [t]);

  const form = useForm<LevelFormValues>({
    resolver: zodResolver(levelSchema) as Resolver<LevelFormValues>,
    defaultValues: levelDefaultValues,
  });

  const { handleSubmit, reset } = form;

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

  const onSubmit: SubmitHandler<LevelFormValues> = (values) => {
    updateLevel(
      {
        id: levelId || EMPTY.str,
        payload: {
          code: values.code,
          name: values.name,
          description: values.description || EMPTY.str,
          order: Number(values.order),
          status: values.status,
        },
      },
      {
        onSuccess: (data: TUpdateLevelResponse) => {
          toast.success(data.message || t("common.toast.update_success"));
          onOpenChange?.(false);
        },
        onError: (error: Error) => {
          const axiosError = error as AxiosError<ApiResponse>;
          const message = axiosError.response?.data?.message;
          const fallbackMessage =
            axiosError.message || t("common.toast.update_error");
          toast.error(message || fallbackMessage);
        },
      },
    );
  };

  const handleCancel = () => {
    reset(levelDefaultValues);
    onOpenChange?.(false);
  };

  if (isError) {
    return (
      <DialogError
        open={controlledOpen}
        onOpenChange={onOpenChange}
        title={t("level.edit_level")}
        onClose={handleCancel}
      />
    );
  }

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[650px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("level.edit_level")}</DialogTitle>
          <DialogDescription>{t("level.edit_level_desc")}</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <LevelForm form={form} mode={MODES.edit} />

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="cursor-pointer"
                >
                  {t("common.actions.cancel")}
                </Button>
                <Button
                  type="submit"
                  className="cursor-pointer min-w-[130px]"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t("common.actions.saving")}
                    </>
                  ) : (
                    <>
                      <Pencil className="w-4 h-4 mr-2" />
                      {t("common.actions.update")}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
