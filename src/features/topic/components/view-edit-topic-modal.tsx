"use client";

import { useEffect } from "react";
import { Pencil, Loader2 } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

import {
  topicSchema,
  type TopicFormValues,
  topicDefaultValues,
} from "../schemas/topic.schema";
import {
  useGetTopicByIdQuery,
  useUpdateTopicMutation,
} from "@/apis/queries/topic";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/api/base";
import { TopicForm } from "./topic-form";
import { useTranslations } from "@/hooks";

interface ViewEditTopicModalProps {
  topicId: string | null;
  mode: "view" | "edit";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ViewEditTopicModal({
  topicId,
  mode,
  open: controlledOpen,
  onOpenChange,
}: ViewEditTopicModalProps) {
  const t = useTranslations();
  const {
    data: topicData,
    isLoading,
    isError,
  } = useGetTopicByIdQuery(topicId || "");
  const { mutate: updateTopic, isPending } = useUpdateTopicMutation();

  const form = useForm<TopicFormValues>({
    resolver: zodResolver(topicSchema),
    defaultValues: topicDefaultValues,
  });

  const { handleSubmit, reset, setValue } = form;

  useEffect(() => {
    if (topicData?.data?.topic && controlledOpen) {
      const topic = topicData.data.topic;
      reset({
        name: topic.name,
        imageUrl: topic.imageUrl,
        slug: topic.slug,
        description: topic.description || "",
        status: topic.status,
      });
    }
  }, [topicData, controlledOpen, reset]);

  useEffect(() => {
    if (!controlledOpen) {
      reset(topicDefaultValues);
    }
  }, [controlledOpen, reset]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (name: string) => {
    if (mode !== "view") {
      setValue("slug", generateSlug(name), { shouldValidate: true });
    }
  };

  const onSubmit: SubmitHandler<TopicFormValues> = (values) => {
    if (mode === "view") {
      return;
    }
    updateTopic(
      {
        id: topicId || "",
        payload: {
          name: values.name,
          imageUrl: values.imageUrl,
          slug: values.slug,
          description: values.description || "",
          status: values.status,
        },
      },
      {
        onSuccess: () => {
          toast.success(
            t("common.toast.update_success", { item: t("topic.name") })
          );
          onOpenChange?.(false);
        },
        onError: (error) => {
          const axiosError = error as AxiosError<ApiResponse>;
          const message = axiosError.response?.data?.message;
          const fallbackMessage =
            axiosError.message ||
            t("common.toast.update_error", { item: t("topic.name") });
          toast.error(message || fallbackMessage);
        },
      }
    );
  };

  const handleCancel = () => {
    reset(topicDefaultValues);
    onOpenChange?.(false);
  };

  const isReadonly = mode === "view";

  if (isError) {
    return (
      <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
        <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>
              {mode === "view" ? t("topic.view_title") : t("topic.edit_title")}
            </DialogTitle>
          </DialogHeader>
          <div className="py-8 text-center text-destructive">
            {t("common.error.loading")}
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={handleCancel}>
              {t("common.actions.close")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[650px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "view" ? t("topic.view_title") : t("topic.edit_title")}
          </DialogTitle>
          <DialogDescription>
            {mode === "view" ? t("topic.view_desc") : t("topic.edit_desc")}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <TopicForm
                form={form}
                mode={mode}
                onNameChange={handleNameChange}
              />

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="cursor-pointer"
                >
                  {isReadonly
                    ? t("common.actions.close")
                    : t("common.actions.cancel")}
                </Button>
                {!isReadonly && (
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
                )}
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
