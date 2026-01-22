"use client";

import { useEffect, useMemo } from "react";
import { Pencil, Loader2 } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AxiosError } from "axios";
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
import { useTranslations } from "@/hooks";
import { useGetTopicByIdQuery, useUpdateTopicMutation } from "@/apis/queries";
import { ApiResponse } from "@/types/api";
import { EMPTY, MODES } from "@/constants/common";
import { getTopicSchema, type TopicFormValues } from "../../schemas";
import { TopicForm } from "../topic-form";
import { topicDefaultValues } from "../../common";

interface ViewEditTopicModalProps {
  topicId: string | null;
  mode: typeof MODES.view | typeof MODES.edit;
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
  } = useGetTopicByIdQuery(topicId || EMPTY.str);
  const { mutate: updateTopic, isPending } = useUpdateTopicMutation();

  const topicSchema = useMemo(() => getTopicSchema(t), [t]);

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
        description: topic.description || EMPTY.str,
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
      .replace(/[\u0300-\u036f]/g, EMPTY.str)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, EMPTY.str);
  };

  const handleNameChange = (name: string) => {
    if (mode !== MODES.view) {
      setValue("slug", generateSlug(name), { shouldValidate: true });
    }
  };

  const onSubmit: SubmitHandler<TopicFormValues> = (values) => {
    if (mode === MODES.view) {
      return;
    }
    updateTopic(
      {
        id: topicId || EMPTY.str,
        payload: {
          name: values.name,
          imageUrl: values.imageUrl,
          slug: values.slug,
          description: values.description || EMPTY.str,
          status: values.status,
        },
      },
      {
        onSuccess: () => {
          toast.success(t("common.toast.update_success"));
          onOpenChange?.(false);
        },
        onError: (error) => {
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
    reset(topicDefaultValues);
    onOpenChange?.(false);
  };

  const isReadonly = mode === MODES.view;

  if (isError) {
    return (
      <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
        <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>
              {mode === MODES.view
                ? t("topic.topic_details")
                : t("topic.edit_topic")}
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
            {mode === MODES.view
              ? t("topic.topic_details")
              : t("topic.edit_topic")}
          </DialogTitle>
          <DialogDescription>
            {mode === MODES.view
              ? t("topic.topic_details_desc")
              : t("topic.edit_topic_desc")}
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
