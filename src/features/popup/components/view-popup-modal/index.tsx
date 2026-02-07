"use client";

import { useEffect, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useGetPopupByIdQuery } from "@/apis/hooks";
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

import { popupDefaultValues } from "../../common";
import { getPopupSchema, type PopupFormValues } from "../../schemas";
import PopupForm from "../modal-form";

interface ViewPopupModalProps {
  popupId: string | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ViewPopupModal({
  popupId,
  open: controlledOpen,
  onOpenChange,
}: ViewPopupModalProps) {
  const t = useTranslations();
  const {
    data: popupData,
    isLoading,
    isError,
  } = useGetPopupByIdQuery(popupId || EMPTY.str);

  const popupSchema = useMemo(() => getPopupSchema(t), [t]);

  const form = useForm<PopupFormValues>({
    resolver: zodResolver(popupSchema),
    defaultValues: popupDefaultValues,
  });

  const { reset } = form;

  useEffect(() => {
    if (popupData?.data?.popup && controlledOpen) {
      const popup = popupData.data.popup;
      reset({
        title: popup.title,
        imageUrl: popup.imageUrl || EMPTY.str,
        description: popup.description || EMPTY.str,
        status: popup.status,
        moduleId: popup.moduleId,
      });
    }
  }, [popupData, controlledOpen, reset]);

  useEffect(() => {
    if (!controlledOpen) {
      reset(popupDefaultValues);
    }
  }, [controlledOpen, reset]);

  const handleClose = () => {
    reset(popupDefaultValues);
    onOpenChange?.(false);
  };

  if (isError) {
    return (
      <DialogError
        open={controlledOpen}
        onOpenChange={onOpenChange}
        title={t("popup.popup_details")}
        onClose={handleClose}
      />
    );
  }

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[650px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("popup.popup_details")}</DialogTitle>
          <DialogDescription>{t("popup.popup_details_desc")}</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <Form {...form}>
            <form className="space-y-6">
              <PopupForm form={form} mode={MODES.view} />

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
