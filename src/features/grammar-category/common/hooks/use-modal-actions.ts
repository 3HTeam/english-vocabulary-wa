import { useCallback } from "react";

import { AxiosError } from "axios";
import { toast } from "sonner";

import {
  useCreateGrammarCategoryMutation,
  useDeleteGrammarCategoryMutation,
  useForceDeleteGrammarCategoryMutation,
  useRestoreGrammarCategoryMutation,
  useUpdateGrammarCategoryMutation,
} from "@/apis/queries";
import { MODES } from "@/constants/common";
import { ModalMode } from "@/features/grammar-category/common/hooks/use-modal";
import { useTranslations } from "@/hooks";
import { ApiResponse } from "@/types/api";

import { FormValues } from "../../components/modal-view/schemas";

interface UseModalActionsProps {
  mode: ModalMode;
  selectedId: string | null;
  onSuccess?: () => void;
}

export const useModalActions = ({
  mode,
  selectedId,
  onSuccess,
}: UseModalActionsProps) => {
  const t = useTranslations();

  const { mutate: createMutation, isPending: isCreating } =
    useCreateGrammarCategoryMutation();
  const { mutate: updateMutation, isPending: isUpdating } =
    useUpdateGrammarCategoryMutation();
  const { mutate: deleteMutation, isPending: isDeleting } =
    useDeleteGrammarCategoryMutation();
  const { mutate: restoreMutation, isPending: isRestoring } =
    useRestoreGrammarCategoryMutation();
  const { mutate: forceDeleteMutation, isPending: isForceDeleting } =
    useForceDeleteGrammarCategoryMutation();

  const handleSubmit = useCallback(
    (data: FormValues) => {
      // Transform data to match API expectations
      const payload = {
        name: data.name,
        slug: data.slug,
        imageUrl: data.imageUrl,
        status: data.status,
        description: data.description || "", // Ensure description is never null/undefined
      };

      if (mode === MODES.add) {
        createMutation(payload, {
          onSuccess: () => {
            toast.success(
              t("common.toast.create_success", {
                item: t("grammar_category.name"),
              }),
            );
            onSuccess?.();
          },
          onError: (error: Error) => {
            const axiosError = error as AxiosError<ApiResponse<void>>;
            const message =
              axiosError.response?.data?.message ||
              axiosError.message ||
              t("common.toast.create_error");
            toast.error(message);
          },
        });
      } else if (mode === MODES.edit && selectedId) {
        updateMutation(
          {
            id: selectedId,
            payload,
          },
          {
            onSuccess: () => {
              toast.success(
                t("common.toast.update_success", {
                  item: t("grammar_category.name"),
                }),
              );
              onSuccess?.();
            },
            onError: (error: Error) => {
              const axiosError = error as AxiosError<ApiResponse<void>>;
              const message =
                axiosError.response?.data?.message ||
                axiosError.message ||
                t("common.toast.update_error");
              toast.error(message);
            },
          },
        );
      }
    },
    [mode, selectedId, createMutation, updateMutation, onSuccess, t],
  );

  const handleDelete = useCallback(
    (id: string) => {
      deleteMutation(id, {
        onSuccess: () => {
          toast.success(
            t("common.toast.delete_success", {
              item: t("grammar_category.name"),
            }),
          );
          onSuccess?.();
        },
        onError: (error: Error) => {
          const axiosError = error as AxiosError<ApiResponse<void>>;
          const message =
            axiosError.response?.data?.message ||
            axiosError.message ||
            t("common.toast.delete_error");
          toast.error(message);
        },
      });
    },
    [deleteMutation, onSuccess, t],
  );

  const handleRestore = useCallback(
    (id: string) => {
      restoreMutation(id, {
        onSuccess: () => {
          toast.success(
            t("common.toast.restore_success", {
              item: t("grammar_category.name"),
            }),
          );
          onSuccess?.();
        },
        onError: (error: Error) => {
          const axiosError = error as AxiosError<ApiResponse<void>>;
          const message =
            axiosError.response?.data?.message ||
            axiosError.message ||
            t("common.toast.restore_error");
          toast.error(message);
        },
      });
    },
    [restoreMutation, onSuccess, t],
  );

  const handleForceDelete = useCallback(
    (id: string) => {
      forceDeleteMutation(id, {
        onSuccess: () => {
          toast.success(
            t("common.toast.force_delete_success", {
              item: t("grammar_category.name"),
            }),
          );
          onSuccess?.();
        },
        onError: (error: Error) => {
          const axiosError = error as AxiosError<ApiResponse<void>>;
          const message =
            axiosError.response?.data?.message ||
            axiosError.message ||
            t("common.toast.force_delete_error");
          toast.error(message);
        },
      });
    },
    [forceDeleteMutation, onSuccess, t],
  );

  const isLoading =
    isCreating || isUpdating || isDeleting || isRestoring || isForceDeleting;

  return {
    handleSubmit,
    handleDelete,
    handleRestore,
    handleForceDelete,
    isLoading,
  };
};
