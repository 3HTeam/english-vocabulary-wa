"use client";

import { useEffect, useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Loader2, Pencil } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { useGetTopicByIdQuery, useUpdateTopicMutation } from "@/apis/queries";
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
import { TUpdateTopicResponse } from "@/types/features";

import { topicDefaultValues } from "../../common";
import { getTopicSchema, type TopicFormValues } from "../../schemas";
import { TopicForm } from "../topic-form";

interface EditTopicModalProps {
  topicId: string | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EditTopicModal({
  topicId,
  open: controlledOpen,
  onOpenChange,
}: EditTopicModalProps) {
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
  const [isNameManuallyChanged, setIsNameManuallyChanged] = useState(false);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, EMPTY.str)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, EMPTY.str);
  };

  useEffect(() => {
    if (topicData?.data?.topic && controlledOpen) {
      const topic = topicData.data.topic;
      reset({
        name: topic.name,
        slug: topic.slug,
        description: topic.description || EMPTY.str,
        imageUrl: topic.imageUrl,
        status: topic.status,
      });
      setIsNameManuallyChanged(false);
    }
  }, [topicData, controlledOpen, reset]);

  useEffect(() => {
    if (!controlledOpen) {
      reset(topicDefaultValues);
      setIsNameManuallyChanged(false);
    }
  }, [controlledOpen, reset]);

  const handleNameChange = (name: string) => {
    if (!isNameManuallyChanged && name) {
      const generatedSlug = generateSlug(name);
      setValue("slug", generatedSlug);
    }
  };

  const onSubmit: SubmitHandler<TopicFormValues> = (values) => {
    updateTopic(
      {
        id: topicId || EMPTY.str,
        payload: {
          name: values.name,
          slug: values.slug,
          description: values.description || EMPTY.str,
          imageUrl: values.imageUrl,
          status: values.status,
        },
      },
      {
        onSuccess: (data: TUpdateTopicResponse) => {
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
    reset(topicDefaultValues);
    setIsNameManuallyChanged(false);
    onOpenChange?.(false);
  };

  if (isError) {
    return (
      <DialogError
        open={controlledOpen}
        onOpenChange={onOpenChange}
        title={t("topic.edit_topic")}
        onClose={handleCancel}
      />
    );
  }

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[650px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("topic.edit_topic")}</DialogTitle>
          <DialogDescription>{t("topic.edit_topic_desc")}</DialogDescription>
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
                mode={MODES.edit}
                onNameChange={handleNameChange}
              />

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
