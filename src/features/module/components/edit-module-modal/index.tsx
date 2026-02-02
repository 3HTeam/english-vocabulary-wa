"use client";

import { useEffect, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Loader2, Pencil } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { useGetModuleByIdQuery, useUpdateModuleMutation } from "@/apis/queries";
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
import { TUpdateModuleResponse } from "@/types/features";

import { moduleDefaultValues } from "../../common";
import { getModuleSchema, type ModuleFormValues } from "../../schemas";
import ModuleForm from "../modal-form";

interface EditModuleModalProps {
  moduleId: string | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EditModuleModal({
  moduleId,
  open: controlledOpen,
  onOpenChange,
}: EditModuleModalProps) {
  const t = useTranslations();
  const {
    data: moduleData,
    isLoading,
    isError,
  } = useGetModuleByIdQuery(moduleId || EMPTY.str);
  const { mutate: updateModule, isPending } = useUpdateModuleMutation();

  const moduleSchema = useMemo(() => getModuleSchema(t), [t]);

  const form = useForm<ModuleFormValues>({
    resolver: zodResolver(moduleSchema),
    defaultValues: moduleDefaultValues,
  });

  const { handleSubmit, reset } = form;

  useEffect(() => {
    if (moduleData?.data?.module && controlledOpen) {
      const module = moduleData.data.module;
      reset({
        name: module.name,
        description: module.description || EMPTY.str,
        status: module.status,
      });
    }
  }, [moduleData, controlledOpen, reset]);

  useEffect(() => {
    if (!controlledOpen) {
      reset(moduleDefaultValues);
    }
  }, [controlledOpen, reset]);

  const onSubmit: SubmitHandler<ModuleFormValues> = (values) => {
    updateModule(
      {
        id: moduleId || EMPTY.str,
        payload: {
          name: values.name,
          description: values.description || EMPTY.str,
          status: values.status,
        },
      },
      {
        onSuccess: (data: TUpdateModuleResponse) => {
          toast.success(data?.message || t("common.toast.update_success"));
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
    reset(moduleDefaultValues);
    onOpenChange?.(false);
  };

  if (isError) {
    return (
      <DialogError
        open={controlledOpen}
        onOpenChange={onOpenChange}
        title={t("module.edit_module")}
        onClose={handleCancel}
      />
    );
  }

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[650px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("module.edit_module")}</DialogTitle>
          <DialogDescription>{t("module.edit_module_desc")}</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <ModuleForm form={form} mode={MODES.edit} />

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
