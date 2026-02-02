"use client";

import { useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Loader2, Plus } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { useCreateTopicMutation } from "@/apis/queries";
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
import { TCreateTopicResponse } from "@/types/features/topic";
import { generateSlug } from "@/utils";

import { topicDefaultValues } from "../../common";
import { getTopicSchema, type TopicFormValues } from "../../schemas";
import { TopicForm } from "../topic-form";

interface AddTopicModalProps {
  trigger?: React.ReactNode;
}

export function AddTopicModal({ trigger }: AddTopicModalProps) {
  const t = useTranslations();
  const { mutate: createTopic, isPending } = useCreateTopicMutation();
  const [open, setOpen] = useState(false);

  const topicSchema = useMemo(() => getTopicSchema(t), [t]);

  const form = useForm<TopicFormValues>({
    resolver: zodResolver(topicSchema),
    defaultValues: topicDefaultValues,
  });

  const { handleSubmit, reset, setValue } = form;

  const handleNameChange = (name: string) => {
    setValue("slug", generateSlug(name), { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<TopicFormValues> = (values) => {
    createTopic(
      {
        name: values.name,
        imageUrl: values.imageUrl,
        slug: values.slug,
        description: values.description || EMPTY.str,
        status: values.status,
      },
      {
        onSuccess: (data: TCreateTopicResponse) => {
          toast.success(data?.message || t("common.toast.create_success"));
          reset(topicDefaultValues);
          setOpen(false);
        },
        onError: (error: Error) => {
          const axiosError = error as AxiosError<
            ApiResponse<TCreateTopicResponse>
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
    reset(topicDefaultValues);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="default" size="sm" className="cursor-pointer">
            <Plus className="w-4 h-4" />
            <span className="hidden lg:inline">{t("topic.add_new_topic")}</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[650px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("topic.add_new_topic")}</DialogTitle>
          <DialogDescription>{t("topic.add_new_topic_desc")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <TopicForm
              form={form}
              mode={MODES.add}
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
