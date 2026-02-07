"use client";

import React, { useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Loader2, Plus } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { useCreateOnboardingMutation } from "@/apis/hooks";
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
import { TCreateOnboardingResponse } from "@/types/features";

import { onboardingDefaultValues } from "../../common";
import { getOnboardingSchema, OnboardingFormValues } from "../../schemas";
import OnboardingForm from "../modal-form";

interface AddOnboardingModalProps {
  trigger?: React.ReactNode;
}

export function AddOnboardingModal({ trigger }: AddOnboardingModalProps) {
  const t = useTranslations();
  const { mutate: createOnboarding, isPending } = useCreateOnboardingMutation();
  const [open, setOpen] = useState<boolean>(false);

  const onboardingSchema = useMemo(() => getOnboardingSchema(t), [t]);

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: onboardingDefaultValues,
  });

  const { handleSubmit, reset } = form;

  const onSubmit: SubmitHandler<OnboardingFormValues> = (values) => {
    createOnboarding(
      {
        title: values.title,
        imageUrl: values.imageUrl || EMPTY.str,
        description: values.description || EMPTY.str,
        status: values.status,
      },
      {
        onSuccess: (data: TCreateOnboardingResponse) => {
          toast.success(data?.message || t("common.toast.create_success"));
          reset(onboardingDefaultValues);
          setOpen(false);
        },
        onError: (error: Error) => {
          const axiosError = error as AxiosError<
            ApiResponse<TCreateOnboardingResponse>
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
    reset(onboardingDefaultValues);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="default" size="sm" className="cursor-pointer">
            <Plus className="w-4 h-4" />
            <span className="hidden lg:inline">
              {t("onboarding.add_new_onboarding")}
            </span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[650px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("onboarding.add_new_onboarding")}</DialogTitle>
          <DialogDescription>
            {t("onboarding.add_new_onboarding_desc")}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <OnboardingForm form={form} mode={MODES.add} />

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
