"use client";

import { useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Loader2, Plus } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { useCreateLevelMutation } from "@/apis/queries";
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
import { TCreateLevelResponse } from "@/types/features/level"; // You might need to check if this type exists or use generic

import { levelDefaultValues } from "../../common";
import { getLevelSchema, type LevelFormValues } from "../../schemas";
import { LevelForm } from "../level-form";

interface AddLevelModalProps {
  trigger?: React.ReactNode;
}

export function AddLevelModal({ trigger }: AddLevelModalProps) {
  const t = useTranslations();
  const { mutate: createLevel, isPending } = useCreateLevelMutation();
  const [open, setOpen] = useState(false);

  const levelSchema = useMemo(() => getLevelSchema(t), [t]);

  const form = useForm<LevelFormValues>({
    resolver: zodResolver(levelSchema),
    defaultValues: levelDefaultValues,
  });

  const { handleSubmit, reset } = form;

  const onSubmit: SubmitHandler<LevelFormValues> = (values) => {
    createLevel(
      {
        code: values.code,
        name: values.name,
        description: values.description || EMPTY.str,
        order: Number(values.order),
        status: values.status,
      },
      {
        onSuccess: (data: TCreateLevelResponse) => {
          toast.success(data?.message || t("common.toast.create_success"));
          reset(levelDefaultValues);
          setOpen(false);
        },
        onError: (error: Error) => {
          const axiosError = error as AxiosError<
            ApiResponse<TCreateLevelResponse>
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
    reset(levelDefaultValues);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="default" size="sm" className="cursor-pointer">
            <Plus className="w-4 h-4" />
            <span className="hidden lg:inline">{t("level.add_new_level")}</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[650px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("level.add_new_level")}</DialogTitle>
          <DialogDescription>{t("level.add_new_level_desc")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <LevelForm form={form} mode={MODES.add} />

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
