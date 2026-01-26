"use client";

import { ReactNode } from "react";

import { Loader2, Plus, Save } from "lucide-react";
import { FieldValues, UseFormReturn } from "react-hook-form";

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
import { MODES } from "@/constants/common";

export type CRUDModalMode =
  | typeof MODES.add
  | typeof MODES.view
  | typeof MODES.edit;

interface CRUDModalProps<TFormValues extends FieldValues> {
  mode: CRUDModalMode;
  title: string;
  description?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: ReactNode;
  form: UseFormReturn<TFormValues>;
  onSubmit: (values: TFormValues) => void;
  onCancel?: () => void;
  isPending?: boolean;
  children: ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  savingLabel?: string;
}

export function CRUDModal<TFormValues extends FieldValues>({
  mode,
  title,
  description,
  open,
  onOpenChange,
  trigger,
  form,
  onSubmit,
  onCancel,
  isPending = false,
  children,
  submitLabel,
  cancelLabel = "Cancel",
  savingLabel = "Saving...",
}: CRUDModalProps<TFormValues>) {
  const isViewMode = mode === MODES.view;
  const isAddMode = mode === MODES.add;

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const handleSubmit = form.handleSubmit((values) => {
    onSubmit(values as TFormValues);
  });

  const getSubmitButtonContent = () => {
    if (isPending) {
      return (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          {savingLabel}
        </>
      );
    }

    if (isAddMode) {
      return (
        <>
          <Plus className="w-4 h-4" />
          {submitLabel || "Add"}
        </>
      );
    }

    return (
      <>
        <Save className="w-4 h-4" />
        {submitLabel || "Save"}
      </>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[650px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {children}

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="cursor-pointer"
              >
                {cancelLabel}
              </Button>

              {!isViewMode && (
                <Button
                  type="submit"
                  className="cursor-pointer min-w-[120px]"
                  disabled={isPending}
                >
                  {getSubmitButtonContent()}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
