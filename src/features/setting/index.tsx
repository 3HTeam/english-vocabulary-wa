"use client";

import { useEffect, useMemo } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { ArrowLeft, Loader2, Pencil, Save, Settings } from "lucide-react";
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { useSettingQuery, useUpdateSettingMutation } from "@/apis/queries";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTE_PATH } from "@/constants/routes";
import { useTranslations } from "@/hooks";
import { ApiResponse } from "@/types/api";
import { TUpdateSettingResponse } from "@/types/features/setting";

import { settingDefaultValues } from "./common";
import { SettingForm } from "./components/setting-form";
import { getSettingSchema, type SettingFormValues } from "./schema";

type ViewMode = "view" | "edit";

export function SettingView() {
  const t = useTranslations();
  const router = useRouter();
  const { data: settingData, isLoading, error } = useSettingQuery();
  const { mutate: updateSetting, isPending } = useUpdateSettingMutation();

  const settingSchema = useMemo(() => getSettingSchema(t), [t]);

  const form = useForm<SettingFormValues>({
    resolver: zodResolver(settingSchema) as Resolver<SettingFormValues>,
    defaultValues: settingDefaultValues,
  });

  const { handleSubmit, reset } = form;

  const [mode, setMode] = useMemo(() => {
    return ["view" as ViewMode, () => {}] as const;
  }, []);

  const isEditMode = mode === "edit";

  useEffect(() => {
    if (settingData?.data?.setting) {
      const setting = settingData.data.setting;
      reset({
        appName: setting.appName,
        appDescription: setting.appDescription,
        logoUrl: setting.logoUrl,
        faviconUrl: setting.faviconUrl,
        primaryColor: setting.primaryColor || "#3b82f6",
        email: setting.email,
        phone: setting.phone,
        address: setting.address,
        facebook: setting.facebook,
        twitter: setting.twitter,
        instagram: setting.instagram,
        youtube: setting.youtube,
        tiktok: setting.tiktok,
      });
    }
  }, [settingData, reset]);

  const onSubmit: SubmitHandler<SettingFormValues> = (values) => {
    updateSetting(
      {
        appName: values.appName,
        appDescription: values.appDescription || "",
        logoUrl: values.logoUrl || "",
        faviconUrl: values.faviconUrl || "",
        primaryColor: values.primaryColor,
        email: values.email || "",
        phone: values.phone || "",
        address: values.address || "",
        facebook: values.facebook || "",
        twitter: values.twitter || "",
        instagram: values.instagram || "",
        youtube: values.youtube || "",
        tiktok: values.tiktok || "",
      },
      {
        onSuccess: (data: TUpdateSettingResponse) => {
          toast.success(data.message || t("common.toast.update_success"));
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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Skeleton className="h-64 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] gap-4">
        <p className="text-muted-foreground">{t("common.error.loading")}</p>
        <Button
          variant="outline"
          onClick={() => router.push(ROUTE_PATH.admin.dashboard)}
          className="cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("common.actions.back")}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="flex items-center gap-4">
              <Button
                variant="secondary"
                size="icon"
                onClick={() => router.back()}
                className="cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <BreadcrumbLink asChild>
                <Link href={ROUTE_PATH.admin.dashboard}>
                  {t("dashboard.dashboard")}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t("setting.settings")}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Settings className="h-6 w-6" />
            {t("setting.settings")}
          </h1>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isPending}
            className="cursor-pointer min-w-[140px]"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t("common.actions.saving")}
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {t("common.actions.save")}
              </>
            )}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <SettingForm form={form} isReadonly={false} />
        </form>
      </Form>
    </div>
  );
}
