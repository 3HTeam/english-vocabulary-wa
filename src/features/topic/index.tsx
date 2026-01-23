"use client";

import { useMemo, useState } from "react";

import { AxiosError } from "axios";
import { ArrowLeft, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  useDeleteTopicMutation,
  useForceDeleteTopicMutation,
  useGetTopicQuery,
  useRestoreTopicMutation,
} from "@/apis/queries";
import { DataTable } from "@/components/shared/data-table";
import { DialogDelete } from "@/components/shared/dialog";
import { Button } from "@/components/ui/button";
import { EMPTY, MODES } from "@/constants/common";
import { useTranslations } from "@/hooks";
import { ApiResponse } from "@/types/api";
import { TDeleteTopicResponse } from "@/types/features/topic";

import { COLUMN_KEYS, createColumns, getStatuses } from "./common";
import { AddTopicModal, ViewEditTopicModal } from "./components";

export function TopicView() {
  const t = useTranslations();
  const { mutate: deleteTopic, isPending: isDeleting } =
    useDeleteTopicMutation();
  const { mutate: restoreTopic, isPending: isRestoring } =
    useRestoreTopicMutation();
  const { mutate: forceDeleteTopic, isPending: isForceDeleting } =
    useForceDeleteTopicMutation();

  const statuses = useMemo(() => getStatuses(t), [t]);

  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>(EMPTY.str);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined,
  );
  const [isTrashMode, setIsTrashMode] = useState<boolean>(false);
  const [viewEditModalState, setViewEditModalState] = useState<{
    open: boolean;
    topicId: string | null;
    mode: typeof MODES.view | typeof MODES.edit;
  }>({
    open: false,
    topicId: null,
    mode: MODES.view,
  });
  const [deleteModalState, setDeleteModalState] = useState<{
    open: boolean;
    topicId: string | null;
    isForceDelete: boolean;
  }>({
    open: false,
    topicId: null,
    isForceDelete: false,
  });

  const { data: topics, isLoading } = useGetTopicQuery({
    page,
    search,
    status: statusFilter,
    isDeleted: isTrashMode,
  });

  const handleView = (id: string) => {
    setViewEditModalState({
      open: true,
      topicId: id,
      mode: MODES.view,
    });
  };

  const handleEdit = (id: string) => {
    setViewEditModalState({
      open: true,
      topicId: id,
      mode: MODES.edit,
    });
  };

  const handleDeleteClick = (id: string) => {
    setDeleteModalState({
      open: true,
      topicId: id,
      isForceDelete: false,
    });
  };

  const handleRestore = (id: string) => {
    restoreTopic(id, {
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
      topicId: id,
      isForceDelete: true,
    });
  };

  const handleDeleteConfirm = () => {
    if (!deleteModalState.topicId) return;

    if (deleteModalState.isForceDelete) {
      forceDeleteTopic(deleteModalState.topicId, {
        onSuccess: (data) => {
          setDeleteModalState({
            open: false,
            topicId: null,
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
      deleteTopic(deleteModalState.topicId, {
        onSuccess: (data) => {
          setDeleteModalState({
            open: false,
            topicId: null,
            isForceDelete: false,
          });
          toast.success(data?.message || t("common.toast.delete_success"));
        },
        onError: (error) => {
          const axiosError = error as AxiosError<
            ApiResponse<TDeleteTopicResponse>
          >;
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
      <ViewEditTopicModal
        topicId={viewEditModalState.topicId}
        mode={viewEditModalState.mode}
        open={viewEditModalState.open}
        onOpenChange={(open) =>
          setViewEditModalState((prev) => ({ ...prev, open }))
        }
      />
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
        data={topics?.data?.topics || []}
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
              <AddTopicModal />
            </div>
          )
        }
        toolbarProps={{
          placeholder: isTrashMode
            ? t("common.trash.search_placeholder")
            : t("topic.search_placeholder"),
          searchColumn: COLUMN_KEYS.name,
          search,
          filters: isTrashMode
            ? []
            : [
                {
                  columnId: "status",
                  title: t("field.status"),
                  options: statuses,
                },
              ],
          onSearchChange: (val) => {
            setPage(1);
            setSearch(val);
          },
          onFilterChange: (columnId, value) => {
            if (columnId === COLUMN_KEYS.status) {
              setPage(1);
              setStatusFilter(value);
            }
          },
        }}
        paginationProps={{
          page: topics?.data?.meta.page,
          pageCount: topics?.data?.meta.pageCount,
          limit: topics?.data?.meta.limit,
          total: topics?.data?.meta.total,
          onPageChange: (newPage) => setPage(newPage),
        }}
      />
    </>
  );
}
