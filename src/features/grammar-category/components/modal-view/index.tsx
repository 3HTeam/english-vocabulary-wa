"use client";

import { useEffect, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { get } from "radash";
import { useForm } from "react-hook-form";

import { useGetGrammarCategoryByIdQuery } from "@/apis/queries";
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
import { generateSlug } from "@/utils";

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
  } = useGetGrammarCategoryByIdQuery(selectedId || EMPTY.str, false);

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
      const category = data.data.grammarCategory;
      form.reset({
        name: category.name ?? EMPTY.str,
        slug: category.slug ?? EMPTY.str,
        imageUrl: category.imageUrl ?? EMPTY.str,
        description: category.description ?? EMPTY.str,
        status: category.status ?? true,
      });
    }
  }, [isOpen, isAddMode, isSuccess, data, form]);

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const handleNameChange = (name: string) => {
    if (!isViewMode) {
      form.setValue("slug", generateSlug(name), { shouldValidate: true });
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[650px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{modalConfig.title}</DialogTitle>
          <DialogDescription>{modalConfig.description}</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormFields
                form={form}
                isViewMode={isViewMode}
                onNameChange={handleNameChange}
              />

              <div className="flex justify-end gap-2 pt-4">
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
                    className="cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      t(
                        isAddMode
                          ? "common.actions.add"
                          : "common.actions.edit",
                      )
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
