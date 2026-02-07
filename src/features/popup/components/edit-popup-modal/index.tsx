"use client";

import { useEffect, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Loader2, Pencil } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { useGetPopupByIdQuery, useUpdatePopupMutation } from "@/apis/hooks";
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
import { TUpdatePopupResponse } from "@/types/features";

import { popupDefaultValues } from "../../common";
import { getPopupSchema, type PopupFormValues } from "../../schemas";
import PopupForm from "../modal-form";

interface EditPopupModalProps {
  popupId: string | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EditPopupModal({
  popupId,
  open: controlledOpen,
  onOpenChange,
}: EditPopupModalProps) {
  const t = useTranslations();
  const {
    data: popupData,
    isLoading,
    isError,
  } = useGetPopupByIdQuery(popupId || EMPTY.str);
  const { mutate: updatePopup, isPending } = useUpdatePopupMutation();

  const popupSchema = useMemo(() => getPopupSchema(t), [t]);

  const form = useForm<PopupFormValues>({
    resolver: zodResolver(popupSchema),
    defaultValues: popupDefaultValues,
  });

  const { handleSubmit, reset } = form;

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

  const onSubmit: SubmitHandler<PopupFormValues> = (values) => {
    updatePopup(
      {
        id: popupId || EMPTY.str,
        payload: {
          title: values.title,
          imageUrl: values.imageUrl || EMPTY.str,
          description: values.description || EMPTY.str,
          status: values.status,
          moduleId: values.moduleId,
        },
      },
      {
        onSuccess: (data: TUpdatePopupResponse) => {
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
    reset(popupDefaultValues);
    onOpenChange?.(false);
  };

  if (isError) {
    return (
      <DialogError
        open={controlledOpen}
        onOpenChange={onOpenChange}
        title={t("popup.edit_popup")}
        onClose={handleCancel}
      />
    );
  }

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[650px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("popup.edit_popup")}</DialogTitle>
          <DialogDescription>{t("popup.edit_popup_desc")}</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <PopupForm form={form} mode={MODES.edit} />

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
