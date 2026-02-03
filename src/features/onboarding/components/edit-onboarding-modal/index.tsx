"use client";

import { useEffect, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Loader2, Pencil } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import {
  useGetOnboardingByIdQuery,
  useUpdateOnboardingMutation,
} from "@/apis/queries";
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
import { TUpdateOnboardingResponse } from "@/types/features";

import { onboardingDefaultValues } from "../../common";
import { getOnboardingSchema, type OnboardingFormValues } from "../../schemas";
import OnboardingForm from "../modal-form";

interface EditOnboardingModalProps {
  onboardingId: string | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EditOnboardingModal({
  onboardingId,
  open: controlledOpen,
  onOpenChange,
}: EditOnboardingModalProps) {
  const t = useTranslations();
  const {
    data: onboardingData,
    isLoading,
    isError,
  } = useGetOnboardingByIdQuery(onboardingId || EMPTY.str);
  const { mutate: updateOnboarding, isPending } = useUpdateOnboardingMutation();

  const onboardingSchema = useMemo(() => getOnboardingSchema(t), [t]);

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: onboardingDefaultValues,
  });

  const { handleSubmit, reset } = form;

  useEffect(() => {
    if (onboardingData?.data?.onboarding && controlledOpen) {
      const onboarding = onboardingData.data.onboarding;
      reset({
        title: onboarding.title,
        imageUrl: onboarding.imageUrl || EMPTY.str,
        description: onboarding.description || EMPTY.str,
        status: onboarding.status,
      });
    }
  }, [onboardingData, controlledOpen, reset]);

  useEffect(() => {
    if (!controlledOpen) {
      reset(onboardingDefaultValues);
    }
  }, [controlledOpen, reset]);

  const onSubmit: SubmitHandler<OnboardingFormValues> = (values) => {
    updateOnboarding(
      {
        id: onboardingId || EMPTY.str,
        payload: {
          title: values.title,
          imageUrl: values.imageUrl || EMPTY.str,
          description: values.description || EMPTY.str,
          status: values.status,
        },
      },
      {
        onSuccess: (data: TUpdateOnboardingResponse) => {
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
    reset(onboardingDefaultValues);
    onOpenChange?.(false);
  };

  if (isError) {
    return (
      <DialogError
        open={controlledOpen}
        onOpenChange={onOpenChange}
        title={t("onboarding.edit_onboarding")}
        onClose={handleCancel}
      />
    );
  }

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[650px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("onboarding.edit_onboarding")}</DialogTitle>
          <DialogDescription>
            {t("onboarding.edit_onboarding_desc")}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <OnboardingForm form={form} mode={MODES.edit} />

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
