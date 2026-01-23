"use client";

import { useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { AxiosError } from "axios";
import { ArrowLeft, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  useDeleteVocabularyMutation,
  useForceDeleteVocabularyMutation,
  useGetTopicQuery,
  useGetVocabularyQuery,
  useRestoreVocabularyMutation,
} from "@/apis/queries";
import {
  DataTable,
  DataTableSelectFilter,
} from "@/components/shared/data-table";
import { DialogDelete } from "@/components/shared/dialog";
import { Button } from "@/components/ui/button";
import { EMPTY, MODES } from "@/constants/common";
import { ROUTE_PATH } from "@/constants/routes";
import { useTranslations } from "@/hooks";
import { ApiResponse } from "@/types/api";

import { createColumns, getStatuses } from "./common";
import { AddVocabularyModal } from "./components";

export function VocabularyView() {
  const t = useTranslations();
  const router = useRouter();
  const { mutate: deleteVocabulary, isPending: isDeleting } =
    useDeleteVocabularyMutation();
  const { mutate: restoreVocabulary, isPending: isRestoring } =
    useRestoreVocabularyMutation();
  const { mutate: forceDeleteVocabulary, isPending: isForceDeleting } =
    useForceDeleteVocabularyMutation();

  const statuses = useMemo(() => getStatuses(t), [t]);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(EMPTY.str);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined,
  );
  const [topicFilter, setTopicFilter] = useState<string | undefined>(undefined);
  const [isTrashMode, setIsTrashMode] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState<{
    open: boolean;
    vocabularyId: string | null;
    isForceDelete: boolean;
  }>({
    open: false,
    vocabularyId: null,
    isForceDelete: false,
  });

  const { data: vocabulary, isLoading } = useGetVocabularyQuery({
    page,
    search,
    status: statusFilter,
    isDeleted: isTrashMode,
    topicId: topicFilter,
  });

  const { data: topicData } = useGetTopicQuery();

  const topicOptions =
    topicData?.data?.topics.map((topic) => ({
      label: topic.name,
      value: topic.id,
    })) || EMPTY.arr;

  const handleView = (id: string) => {
    router.push(`${ROUTE_PATH.admin.vocabularies}/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`${ROUTE_PATH.admin.vocabularies}/${id}/${MODES.edit}`);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteModalState({
      open: true,
      vocabularyId: id,
      isForceDelete: false,
    });
  };

  const handleRestore = (id: string) => {
    restoreVocabulary(id, {
      onSuccess: (data) => {
        toast.success(data?.message || t("common.toast.restore_success"));
      },
      onError: (error) => {
        const axiosError = error as AxiosError<ApiResponse<void>>;
        const message = axiosError.response?.data?.message;
        const fallbackMessage =
          axiosError.message || t("common.toast.restore_error");
        toast.error(message || fallbackMessage);
      },
    });
  };

  const handleForceDeleteClick = (id: string) => {
    setDeleteModalState({
      open: true,
      vocabularyId: id,
      isForceDelete: true,
    });
  };

  const handleDeleteConfirm = () => {
    if (!deleteModalState.vocabularyId) return;

    if (deleteModalState.isForceDelete) {
      forceDeleteVocabulary(deleteModalState.vocabularyId, {
        onSuccess: (data) => {
          setDeleteModalState({
            open: false,
            vocabularyId: null,
            isForceDelete: false,
          });
          toast.success(
            data?.message || t("common.toast.force_delete_success"),
          );
        },
        onError: (error) => {
          const axiosError = error as AxiosError<ApiResponse<void>>;
          const message = axiosError.response?.data?.message;
          const fallbackMessage =
            axiosError.message || t("common.toast.force_delete_error");
          toast.error(message || fallbackMessage);
        },
      });
    } else {
      deleteVocabulary(deleteModalState.vocabularyId, {
        onSuccess: (data) => {
          setDeleteModalState({
            open: false,
            vocabularyId: null,
            isForceDelete: false,
          });
          toast.success(data?.message || t("common.toast.delete_success"));
        },
        onError: (error) => {
          const axiosError = error as AxiosError<ApiResponse<void>>;
          const message = axiosError.response?.data?.message;
          const fallbackMessage =
            axiosError.message || t("common.toast.delete_error");
          toast.error(message || fallbackMessage);
        },
      });
    }
  };

  const handleToggleTrashMode = () => {
    setIsTrashMode((prev) => !prev);
    setPage(1);
    setSearch(EMPTY.str);
    setStatusFilter(undefined);
    setTopicFilter(undefined);
  };

  const columns = isTrashMode
    ? createColumns({
        t,
        onView: handleView,
        onRestore: handleRestore,
        onForceDelete: handleForceDeleteClick,
      })
    : createColumns({
        t,
        onView: handleView,
        onEdit: handleEdit,
        onDelete: handleDeleteClick,
      });

  return (
    <>
      <DialogDelete
        open={deleteModalState.open}
        onOpenChange={(open) =>
          setDeleteModalState((prev) => ({ ...prev, open }))
        }
        title={
          deleteModalState.isForceDelete
            ? t("common.dialog.force_delete_title")
            : t("common.dialog.delete_title")
        }
        description={
          deleteModalState.isForceDelete
            ? t("common.dialog.force_delete_desc")
            : t("common.dialog.delete_desc")
        }
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting || isForceDeleting}
      />
      <DataTable
        data={vocabulary?.data?.vocabularies || EMPTY.arr}
        columns={columns}
        addButton={
          isTrashMode ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleTrashMode}
              className="cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              {t("common.actions.back")}
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleToggleTrashMode}
                className="cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden lg:inline ml-1">
                  {t("common.trash.trash")}
                </span>
              </Button>
              <AddVocabularyModal />
            </div>
          )
        }
        toolbarProps={{
          placeholder: isTrashMode
            ? t("common.trash.search_placeholder")
            : t("vocabulary.search_placeholder"),
          searchColumn: "word",
          search,
          filters: isTrashMode
            ? EMPTY.arr
            : [
                {
                  columnId: "status",
                  title: t("field.status"),
                  options: statuses,
                },
              ],
          onSearchChange: (value) => {
            setPage(1);
            setSearch(value);
          },
          onFilterChange: (columnId, value) => {
            if (columnId === "status") {
              setPage(1);
              setStatusFilter(value);
            }
          },
          customFilters: isTrashMode ? null : (
            <DataTableSelectFilter
              title={t("field.topic")}
              placeholder={t("field.topic_placeholder")}
              options={topicOptions}
              value={topicFilter}
              onFilterChange={(value) => {
                setPage(1);
                setTopicFilter(value);
              }}
              className="h-8 w-[180px]"
            />
          ),
        }}
        paginationProps={{
          page: vocabulary?.data?.meta.page,
          pageCount: vocabulary?.data?.meta.pageCount,
          limit: vocabulary?.data?.meta.limit,
          total: vocabulary?.data?.meta.total,
          onPageChange: (newPage) => setPage(newPage),
        }}
      />
    </>
  );
}
