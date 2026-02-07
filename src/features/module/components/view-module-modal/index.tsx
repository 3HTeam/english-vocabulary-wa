"use client";

import { useEffect, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useGetModuleByIdQuery } from "@/apis/hooks";
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

import { moduleDefaultValues } from "../../common";
import { getModuleSchema, type ModuleFormValues } from "../../schemas";
import ModuleForm from "../modal-form";

interface ViewModuleModalProps {
  moduleId: string | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ViewModuleModal({
  moduleId,
  open: controlledOpen,
  onOpenChange,
}: ViewModuleModalProps) {
  const t = useTranslations();
  const {
    data: moduleData,
    isLoading,
    isError,
  } = useGetModuleByIdQuery(moduleId || EMPTY.str);

  const moduleSchema = useMemo(() => getModuleSchema(t), [t]);

  const form = useForm<ModuleFormValues>({
    resolver: zodResolver(moduleSchema),
    defaultValues: moduleDefaultValues,
  });

  const { reset } = form;

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

  const handleClose = () => {
    reset(moduleDefaultValues);
    onOpenChange?.(false);
  };

  if (isError) {
    return (
      <DialogError
        open={controlledOpen}
        onOpenChange={onOpenChange}
        title={t("module.module_details")}
        onClose={handleClose}
      />
    );
  }

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[650px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("module.module_details")}</DialogTitle>
          <DialogDescription>
            {t("module.module_details_desc")}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <Form {...form}>
            <form className="space-y-6">
              <ModuleForm form={form} mode={MODES.view} />

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
