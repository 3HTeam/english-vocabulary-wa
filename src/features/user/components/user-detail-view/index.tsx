"use client";

import { useEffect, useMemo } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Pencil } from "lucide-react";
import { useForm, type Resolver } from "react-hook-form";

import { useGetUserByIdQuery } from "@/apis/queries";
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
import { EMPTY, MODES } from "@/constants/common";
import { ROUTE_PATH } from "@/constants/routes";
import { useTranslations } from "@/hooks";

import { userDefaultValues } from "../../common";
import { getUserSchema, type UserFormValues } from "../../schemas";
import { UserForm } from "../user-form";

interface UserDetailViewProps {
  id: string;
}

export function UserDetailView({ id }: UserDetailViewProps) {
  const t = useTranslations();
  const router = useRouter();
  const {
    data: userData,
    isLoading,
    error,
  } = useGetUserByIdQuery(id || EMPTY.str);

  const userSchema = useMemo(() => getUserSchema(t), [t]);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema) as Resolver<UserFormValues>,
    defaultValues: userDefaultValues,
  });

  const { reset } = form;

  useEffect(() => {
    if (userData?.data?.user) {
      const user = userData.data.user;
      reset({
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone,
        levelId: user.levelId,
        targetLevel: user.targetLevel,
        dailyGoal: user.dailyGoal,
        streak: user.streak,
        emailVerified: user.emailVerified,
      });
    }
  }, [userData, reset]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Skeleton className="h-64 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (error || !userData?.data?.user) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] gap-4">
        <p className="text-muted-foreground">{t("common.error.loading")}</p>
        <Button
          variant="outline"
          onClick={() => router.push(ROUTE_PATH.admin.users)}
          className="cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("common.actions.back")}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
                <Link href={ROUTE_PATH.admin.users}>{t("user.users")}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t("user.user_details")}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            {t("user.user_details")}
          </h1>
          <Button
            onClick={() => router.push(`${ROUTE_PATH.admin.users}/${id}/edit`)}
            className="cursor-pointer"
          >
            <Pencil className="h-4 w-4 mr-2" />
            {t("common.actions.edit")}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          <UserForm
            form={form}
            mode={MODES.view}
            userData={userData.data.user}
          />
        </form>
      </Form>
    </div>
  );
}
