import { useCallback } from "react";

import { AxiosError } from "axios";
import { toast } from "sonner";

import {
  useCreateGrammarExerciseMutation,
  useDeleteGrammarExerciseMutation,
  useForceDeleteGrammarExerciseMutation,
  useRestoreGrammarExerciseMutation,
  useUpdateGrammarExerciseMutation,
} from "@/apis/queries";
import { MODES } from "@/constants/common";
import { useTranslations } from "@/hooks";
import { ApiResponse } from "@/types/api";

import { FormValues } from "../../components/modal-view/schemas";
import { ModalMode } from "../constants";

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
    useCreateGrammarExerciseMutation();
  const { mutate: updateMutation, isPending: isUpdating } =
    useUpdateGrammarExerciseMutation();
  const { mutate: deleteMutation, isPending: isDeleting } =
    useDeleteGrammarExerciseMutation();
  const { mutate: restoreMutation, isPending: isRestoring } =
    useRestoreGrammarExerciseMutation();
  const { mutate: forceDeleteMutation, isPending: isForceDeleting } =
    useForceDeleteGrammarExerciseMutation();

  const handleSubmit = useCallback(
    (data: FormValues) => {
      const payload = {
        type: data.type,
        question: data.question,
        answer: data.answer,
        options: data.options,
        explanation: data.explanation,
        order: data.order,
        score: data.score,
        status: data.status,
        grammarTopicId: data.grammarTopicId,
      };

      if (mode === MODES.add) {
        createMutation(payload, {
          onSuccess: () => {
            toast.success(
              t("common.toast.create_success", {
                item: t("grammar_exercise.name"),
              }),
            );
            onSuccess?.();
          },
          onError: (error: Error) => {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(
              axiosError.response?.data?.message ||
                t("common.toast.create_error", {
                  item: t("grammar_exercise.name"),
                }),
            );
          },
        });
      } else if (mode === MODES.edit && selectedId) {
        updateMutation(
          { id: selectedId, payload },
          {
            onSuccess: () => {
              toast.success(
                t("common.toast.update_success", {
                  item: t("grammar_exercise.name"),
                }),
              );
              onSuccess?.();
            },
            onError: (error: Error) => {
              const axiosError = error as AxiosError<ApiResponse>;
              toast.error(
                axiosError.response?.data?.message ||
                  t("common.toast.update_error", {
                    item: t("grammar_exercise.name"),
                  }),
              );
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
              item: t("grammar_exercise.name"),
            }),
          );
          onSuccess?.();
        },
        onError: (error: Error) => {
          const axiosError = error as AxiosError<ApiResponse>;
          toast.error(
            axiosError.response?.data?.message ||
              t("common.toast.delete_error", {
                item: t("grammar_exercise.name"),
              }),
          );
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
              item: t("grammar_exercise.name"),
            }),
          );
          onSuccess?.();
        },
        onError: (error: Error) => {
          const axiosError = error as AxiosError<ApiResponse>;
          toast.error(
            axiosError.response?.data?.message ||
              t("common.toast.restore_error", {
                item: t("grammar_exercise.name"),
              }),
          );
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
              item: t("grammar_exercise.name"),
            }),
          );
          onSuccess?.();
        },
        onError: (error: Error) => {
          const axiosError = error as AxiosError<ApiResponse>;
          toast.error(
            axiosError.response?.data?.message ||
              t("common.toast.force_delete_error", {
                item: t("grammar_exercise.name"),
              }),
          );
        },
      });
    },
    [forceDeleteMutation, onSuccess, t],
  );

  return {
    handleSubmit,
    handleDelete,
    handleRestore,
    handleForceDelete,
    isLoading:
      isCreating || isUpdating || isDeleting || isRestoring || isForceDeleting,
  };
};
