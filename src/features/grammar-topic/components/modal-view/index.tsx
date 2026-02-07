"use client";

import { useEffect, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "radash";
import { useForm } from "react-hook-form";

import { useGetGrammarTopicByIdQuery } from "@/apis/hooks";
import { DialogError } from "@/components/shared/dialog";
import { ModalCustom } from "@/components/shared/modal-custom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { EMPTY, MODES } from "@/constants/common";
import { useTranslations } from "@/hooks";
import { generateSlug } from "@/utils/string";

import { ModalMode, useModalActions } from "../../common";
import { FormFields } from "./components";
import { defaultValues, MODAL_CONFIG } from "./constants";
import { FormValues, getSchema } from "./schemas";

interface ModalViewProps {
  isOpen: boolean;
  mode: ModalMode;
  selectedId: string | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ModalView({
  isOpen,
  mode,
  selectedId,
  onClose,
  onSuccess,
}: ModalViewProps) {
  const t = useTranslations();

  const {
    data,
    isLoading: isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetGrammarTopicByIdQuery(selectedId || EMPTY.str, false);

  const { handleSubmit: onSubmit, isLoading: isSubmitting } = useModalActions({
    mode,
    selectedId,
    onSuccess: () => {
      onSuccess?.();
      onClose();
    },
  });

  const isAddMode = mode === MODES.add;
  const isViewMode = mode === MODES.view;
  const isLoading = (isFetching || isSubmitting) && !isAddMode && !!selectedId;

  const form = useForm<FormValues>({
    resolver: zodResolver(getSchema(t)),
    defaultValues,
  });

  // Refetch data when modal opens with selectedId
  useEffect(() => {
    if (isOpen && selectedId && !isAddMode) {
      refetch();
    }
  }, [isOpen, selectedId, isAddMode, refetch]);

  // Reset form when modal opens or data changes
  useEffect(() => {
    if (!isOpen) return;

    if (isAddMode) {
      form.reset(defaultValues);
    } else if (isSuccess && data?.data) {
      const topic = data.data.grammarTopic;
      form.reset({
        title: topic?.title ?? EMPTY.str,
        slug: topic?.slug ?? EMPTY.str,
        imageUrl: topic?.imageUrl ?? EMPTY.str,
        description: topic?.description ?? EMPTY.str,
        content: topic?.content ?? EMPTY.str,
        status: topic?.status ?? true,
        order: topic?.order ?? 1,
        difficulty: topic?.difficulty ?? "BEGINNER",
        levelId: topic?.levelId ?? EMPTY.str,
        grammarCategoryId: topic?.grammarCategoryId ?? EMPTY.str,
      });
    }
  }, [isOpen, isAddMode, isSuccess, data, form]);

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const handleTitleChange = (title: string) => {
    if (!isViewMode) {
      form.setValue("slug", generateSlug(title), { shouldValidate: true });
    }
  };

  const modalConfig = useMemo(() => MODAL_CONFIG[mode](t), [mode, t]);

  if (isError && !isAddMode) {
    return (
      <DialogError
        open={isOpen}
        onOpenChange={handleClose}
        title={modalConfig.title}
        description={
          get(error, "response.data.message") ||
          t("common.errors.something_went_wrong")
        }
        onClose={handleClose}
      />
    );
  }

  const footer = (
    <div className="flex justify-end gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={handleClose}
        className="cursor-pointer"
      >
        {t("common.actions.cancel")}
      </Button>

      {!isViewMode && (
        <Button
          type="submit"
          form="grammar-topic-form"
          className="cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingSpinner size="sm" />
          ) : (
            t(isAddMode ? "common.actions.add" : "common.actions.edit")
          )}
        </Button>
      )}
    </div>
  );

  return (
    <ModalCustom
      open={isOpen}
      onOpenChange={handleClose}
      title={modalConfig.title}
      description={modalConfig.description}
      footer={footer}
      isLoading={isLoading}
    >
      <Form {...form}>
        <form
          id="grammar-topic-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormFields
            form={form}
            isViewMode={isViewMode}
            onTitleChange={handleTitleChange}
          />
        </form>
      </Form>
    </ModalCustom>
  );
}
