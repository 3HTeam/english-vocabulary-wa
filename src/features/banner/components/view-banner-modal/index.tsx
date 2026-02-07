"use client";

import { useEffect, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useGetBannerByIdQuery } from "@/apis/hooks";
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

import { bannerDefaultValues } from "../../common";
import { getBannerSchema, type BannerFormValues } from "../../schemas";
import BannerForm from "../modal-form";

interface ViewBannerModalProps {
  bannerId: string | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ViewBannerModal({
  bannerId,
  open: controlledOpen,
  onOpenChange,
}: ViewBannerModalProps) {
  const t = useTranslations();
  const {
    data: bannerData,
    isLoading,
    isError,
  } = useGetBannerByIdQuery(bannerId || EMPTY.str);

  const bannerSchema = useMemo(() => getBannerSchema(t), [t]);

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(bannerSchema),
    defaultValues: bannerDefaultValues,
  });

  const { reset } = form;

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

  const handleClose = () => {
    reset(bannerDefaultValues);
    onOpenChange?.(false);
  };

  if (isError) {
    return (
      <DialogError
        open={controlledOpen}
        onOpenChange={onOpenChange}
        title={t("banner.banner_details")}
        onClose={handleClose}
      />
    );
  }

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[650px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("banner.banner_details")}</DialogTitle>
          <DialogDescription>
            {t("banner.banner_details_desc")}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <Form {...form}>
            <form className="space-y-6">
              <BannerForm form={form} mode={MODES.view} />

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
