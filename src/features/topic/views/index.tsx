"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Trash2, ArrowLeft } from "lucide-react";
import { AxiosError } from "axios";

import { createColumns } from "../common/columns";
import { DataTable } from "@/components/shared/data-table";
import { AddTopicModal } from "../components/add-topic-modal";
import { ViewEditTopicModal } from "../components/view-edit-topic-modal";
import { statuses } from "../common/filter";
import {
  useDeleteTopicMutation,
  useGetTopicQuery,
  useRestoreTopicMutation,
  useForceDeleteTopicMutation,
} from "@/apis/queries/topic";
import { DialogDelete } from "@/components/shared/dialog";
import { Button } from "@/components/ui/button";
import { ApiResponse } from "@/types/api/base";
import { TDeleteTopicResponse } from "@/types/features/topic";
import { useTranslations } from "@/hooks";

export default function TopicView() {
  const t = useTranslations();
  const { mutate: deleteTopic, isPending: isDeleting } =
    useDeleteTopicMutation();
  const { mutate: restoreTopic, isPending: isRestoring } =
    useRestoreTopicMutation();
  const { mutate: forceDeleteTopic, isPending: isForceDeleting } =
    useForceDeleteTopicMutation();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );
  const [isTrashMode, setIsTrashMode] = useState(false);
  const [viewEditModalState, setViewEditModalState] = useState<{
    open: boolean;
    topicId: string | null;
    mode: "view" | "edit";
  }>({
    open: false,
    topicId: null,
    mode: "view",
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
      mode: "view",
    });
  };

  const handleEdit = (id: string) => {
    setViewEditModalState({
      open: true,
      topicId: id,
      mode: "edit",
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
        toast.success(
          data?.message ||
            t("common.toast.restore_success", { item: t("topic.name") })
        );
      },
      onError: (error) => {
        const axiosError = error as AxiosError<ApiResponse<void>>;
        const message = axiosError.response?.data?.message;
        const fallbackMessage =
          axiosError.message ||
          t("common.toast.restore_error", { item: t("topic.name") });
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
            data?.message ||
              t("common.toast.force_delete_success", { item: t("topic.name") })
          );
        },
        onError: (error) => {
          const axiosError = error as AxiosError<ApiResponse<void>>;
          const message = axiosError.response?.data?.message;
          const fallbackMessage =
            axiosError.message ||
            t("common.toast.force_delete_error", { item: t("topic.name") });
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
          toast.success(
            data?.message ||
              t("common.toast.delete_success", { item: t("topic.name") })
          );
        },
        onError: (error) => {
          const axiosError = error as AxiosError<
            ApiResponse<TDeleteTopicResponse>
          >;
          const message = axiosError.response?.data?.message;
          const fallbackMessage =
            axiosError.message ||
            t("common.toast.delete_error", { item: t("topic.name") });
          toast.error(message || fallbackMessage);
        },
      });
    }
  };

  const handleToggleTrashMode = () => {
    setIsTrashMode((prev) => !prev);
    setPage(1);
    setSearch("");
    setStatusFilter(undefined);
  };

  const columns = isTrashMode
    ? createColumns({
        onView: handleView,
        onRestore: handleRestore,
        onForceDelete: handleForceDeleteClick,
      })
    : createColumns({
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
            ? t("common.dialog.force_delete_title", { item: t("topic.name") })
            : t("common.dialog.delete_title", { item: t("topic.name") })
        }
        description={
          deleteModalState.isForceDelete
            ? t("common.dialog.force_delete_desc", { item: t("topic.name") })
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
                  {t("common.trash.title")}
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
          searchColumn: "name",
          search,
          filters: isTrashMode
            ? []
            : [
                {
                  columnId: "status",
                  title: t("common.status.label"),
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
