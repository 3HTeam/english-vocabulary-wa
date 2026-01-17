"use client";

import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

import {
  topicSchema,
  type TopicFormValues,
  topicDefaultValues,
} from "../schemas/topic.schema";
import { useCreateTopicMutation } from "@/apis/queries/topic";
import { toast } from "sonner";
import { ApiResponse } from "@/types/api/base";
import { AxiosError } from "axios";
import { TCreateTopicResponse } from "@/types/features/topic";
import { TopicForm } from "./topic-form";
import { useTranslations } from "@/hooks";

interface AddTopicModalProps {
  trigger?: React.ReactNode;
}

export function AddTopicModal({ trigger }: AddTopicModalProps) {
  const t = useTranslations();
  const { mutate: createTopic, isPending } = useCreateTopicMutation();
  const [open, setOpen] = useState(false);

  const form = useForm<TopicFormValues>({
    resolver: zodResolver(topicSchema),
    defaultValues: topicDefaultValues,
  });

  const { handleSubmit, reset, setValue } = form;

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (name: string) => {
    setValue("slug", generateSlug(name), { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<TopicFormValues> = (values) => {
    createTopic(
      {
        name: values.name,
        imageUrl: values.imageUrl,
        slug: values.slug,
        description: values.description || "",
        status: values.status,
      },
      {
        onSuccess: (data) => {
          toast.success(
            data?.message ||
              t("common.toast.create_success", { item: t("topic.name") })
          );
          reset(topicDefaultValues);
          setOpen(false);
        },
        onError: (error) => {
          const axiosError = error as AxiosError<
            ApiResponse<TCreateTopicResponse>
          >;
          const message = axiosError.response?.data?.message;
          const fallbackMessage =
            axiosError.message ||
            t("common.toast.create_error", { item: t("topic.name") });
          toast.error(message || fallbackMessage);
        },
      }
    );
  };

  const handleCancel = () => {
    reset(topicDefaultValues);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="default" size="sm" className="cursor-pointer">
            <Plus className="w-4 h-4" />
            <span className="hidden lg:inline">{t("topic.add_title")}</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[650px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("topic.add_title")}</DialogTitle>
          <DialogDescription>{t("topic.add_desc")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <TopicForm form={form} mode="add" onNameChange={handleNameChange} />

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
