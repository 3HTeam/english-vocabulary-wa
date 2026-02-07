"use client";

import { useEffect, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Loader2, Pencil } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { useGetBannerByIdQuery, useUpdateBannerMutation } from "@/apis/hooks";
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
import { TUpdateBannerResponse } from "@/types/features";

import { bannerDefaultValues } from "../../common";
import { getBannerSchema, type BannerFormValues } from "../../schemas";
import BannerForm from "../modal-form";

interface EditBannerModalProps {
  bannerId: string | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EditBannerModal({
  bannerId,
  open: controlledOpen,
  onOpenChange,
}: EditBannerModalProps) {
  const t = useTranslations();
  const {
    data: bannerData,
    isLoading,
    isError,
  } = useGetBannerByIdQuery(bannerId || EMPTY.str);
  const { mutate: updateBanner, isPending } = useUpdateBannerMutation();

  const bannerSchema = useMemo(() => getBannerSchema(t), [t]);

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(bannerSchema),
    defaultValues: bannerDefaultValues,
  });

  const { handleSubmit, reset } = form;

  useEffect(() => {
    if (bannerData?.data?.banner && controlledOpen) {
      const banner = bannerData.data.banner;
      reset({
        title: banner.title,
        imageUrl: banner.imageUrl || EMPTY.str,
        description: banner.description || EMPTY.str,
        status: banner.status,
        moduleId: banner.moduleId,
      });
    }
  }, [bannerData, controlledOpen, reset]);

  useEffect(() => {
    if (!controlledOpen) {
      reset(bannerDefaultValues);
    }
  }, [controlledOpen, reset]);

  const onSubmit: SubmitHandler<BannerFormValues> = (values) => {
    updateBanner(
      {
        id: bannerId || EMPTY.str,
        payload: {
          title: values.title,
          imageUrl: values.imageUrl || EMPTY.str,
          description: values.description || EMPTY.str,
          status: values.status,
          moduleId: values.moduleId,
        },
      },
      {
        onSuccess: (data: TUpdateBannerResponse) => {
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
    reset(bannerDefaultValues);
    onOpenChange?.(false);
  };

  if (isError) {
    return (
      <DialogError
        open={controlledOpen}
        onOpenChange={onOpenChange}
        title={t("banner.edit_banner")}
        onClose={handleCancel}
      />
    );
  }

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[650px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("banner.edit_banner")}</DialogTitle>
          <DialogDescription>{t("banner.edit_banner_desc")}</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <BannerForm form={form} mode={MODES.edit} />

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
