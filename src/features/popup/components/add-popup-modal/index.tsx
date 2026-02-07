"use client";

import React, { useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Loader2, Plus } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { useCreatePopupMutation } from "@/apis/hooks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { EMPTY, MODES } from "@/constants/common";
import { useTranslations } from "@/hooks";
import { ApiResponse } from "@/types/api";
import { TCreatePopupResponse } from "@/types/features";

import { popupDefaultValues } from "../../common";
import { getPopupSchema, PopupFormValues } from "../../schemas";
import PopupForm from "../modal-form";

interface AddPopupModalProps {
  trigger?: React.ReactNode;
}

export function AddPopupModal({ trigger }: AddPopupModalProps) {
  const t = useTranslations();
  const { mutate: createPopup, isPending } = useCreatePopupMutation();
  const [open, setOpen] = useState<boolean>(false);

  const popupSchema = useMemo(() => getPopupSchema(t), [t]);

  const form = useForm<PopupFormValues>({
    resolver: zodResolver(popupSchema),
    defaultValues: popupDefaultValues,
  });

  const { handleSubmit, reset } = form;

  const onSubmit: SubmitHandler<PopupFormValues> = (values) => {
    createPopup(
      {
        title: values.title,
        imageUrl: values.imageUrl || EMPTY.str,
        description: values.description || EMPTY.str,
        status: values.status,
        moduleId: values.moduleId,
      },
      {
        onSuccess: (data: TCreatePopupResponse) => {
          toast.success(data?.message || t("common.toast.create_success"));
          reset(popupDefaultValues);
          setOpen(false);
        },
        onError: (error: Error) => {
          const axiosError = error as AxiosError<
            ApiResponse<TCreatePopupResponse>
          >;
          const message = axiosError.response?.data?.message;
          const fallbackMessage =
            axiosError.message || t("common.toast.create_error");
          toast.error(message || fallbackMessage);
        },
      },
    );
  };

  const handleCancel = () => {
    reset(popupDefaultValues);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="default" size="sm" className="cursor-pointer">
            <Plus className="w-4 h-4" />
            <span className="hidden lg:inline">{t("popup.add_new_popup")}</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[650px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("popup.add_new_popup")}</DialogTitle>
          <DialogDescription>{t("popup.add_new_popup_desc")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <PopupForm form={form} mode={MODES.add} />

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
                className="cursor-pointer min-w-[120px]"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t("common.actions.saving")}
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    {t("common.actions.add")}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
