"use client";

import React, { useMemo, useState } from "react";

import { AxiosError } from "axios";
import { ArrowLeft, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  useDeletePopupMutation,
  useForceDeletePopupMutation,
  useGetModuleQuery,
  useGetPopupQuery,
  useRestorePopupMutation,
} from "@/apis/queries";
import { DataTable } from "@/components/shared/data-table";
import { DialogDelete } from "@/components/shared/dialog";
import { Button } from "@/components/ui/button";
import { EMPTY } from "@/constants/common";
import { useTranslations } from "@/hooks";
import { ApiResponse } from "@/types/api";
import {
  TDeletePopupResponse,
  TForceDeletePopupResponse,
  TRestorePopupResponse,
} from "@/types/features";

import { COLUMN_KEYS, createColumns, getStatuses } from "./common";
import { AddPopupModal, EditPopupModal, ViewPopupModal } from "./components";

export function PopupView() {
  const t = useTranslations();
  const { mutate: deletePopup, isPending: isDeleting } =
    useDeletePopupMutation();
  const { mutate: restorePopup, isPending: isRestoring } =
    useRestorePopupMutation();
  const { mutate: forceDeletePopup, isPending: isForceDeleting } =
    useForceDeletePopupMutation();

  const statuses = useMemo(() => getStatuses(t), [t]);

  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>(EMPTY.str);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined,
  );
  const [isTrashMode, setIsTrashMode] = useState<boolean>(false);
  const [viewModalState, setViewModalState] = useState<{
    open: boolean;
    popupId: string | null;
  }>({
    open: false,
    popupId: null,
  });
  const [editModalState, setEditModalState] = useState<{
    open: boolean;
    popupId: string | null;
  }>({
    open: false,
    popupId: null,
  });
  const [deleteModalState, setDeleteModalState] = useState<{
    open: boolean;
    popupId: string | null;
    isForceDelete: boolean;
  }>({
    open: false,
    popupId: null,
    isForceDelete: false,
  });

  const { data: popups } = useGetPopupQuery({
    page,
    search,
    status: statusFilter,
    isDeleted: isTrashMode,
  });

  const { data: modulesData } = useGetModuleQuery({
    page: 1,
    isDeleted: false,
  });

  const modules = modulesData?.data?.modules || [];

  const handleView = (id: string) => {
    setViewModalState({
      open: true,
      popupId: id,
    });
  };

  const handleEdit = (id: string) => {
    setEditModalState({
      open: true,
      popupId: id,
    });
  };

  const handleDelete = (id: string) => {
    setDeleteModalState({
      open: true,
      popupId: id,
      isForceDelete: false,
    });
  };

  const handleRestore = (id: string) => {
    restorePopup(id, {
      onSuccess: (data: TRestorePopupResponse) => {
        toast.success(data?.message || t("common.toast.restore_success"));
      },
      onError: (error: Error) => {
        const axiosError = error as AxiosError<ApiResponse<void>>;
        const message = axiosError.response?.data?.message;
        const fallbackMessage =
          axiosError.message || t("common.toast.restore_error");
        toast.error(message || fallbackMessage);
      },
    });
  };

  const handleForceDelete = (id: string) => {
    setDeleteModalState({
      open: true,
      popupId: id,
      isForceDelete: true,
    });
  };

  const handleDeleteConfirm = () => {
    if (!deleteModalState.popupId) return;

    if (deleteModalState.isForceDelete) {
      forceDeletePopup(deleteModalState.popupId, {
        onSuccess: (data: TForceDeletePopupResponse) => {
          setDeleteModalState({
            open: false,
            popupId: null,
            isForceDelete: false,
          });
          toast.success(
            data?.message || t("common.toast.force_delete_success"),
          );
        },
        onError: (error: Error) => {
          const axiosError = error as AxiosError<ApiResponse<void>>;
          const message = axiosError.response?.data?.message;
          const fallbackMessage =
            axiosError.message || t("common.toast.force_delete_error");
          toast.error(message || fallbackMessage);
        },
      });
    } else {
      deletePopup(deleteModalState.popupId, {
        onSuccess: (data: TDeletePopupResponse) => {
          setDeleteModalState({
            open: false,
            popupId: null,
            isForceDelete: false,
          });
          toast.success(data?.message || t("common.toast.delete_success"));
        },
        onError: (error: Error) => {
          const axiosError = error as AxiosError<
            ApiResponse<TDeletePopupResponse>
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
        modules,
        onView: handleView,
        onRestore: handleRestore,
        onForceDelete: handleForceDelete,
      })
    : createColumns({
        t,
        modules,
        onView: handleView,
        onEdit: handleEdit,
        onDelete: handleDelete,
      });

  return (
    <React.Fragment>
      <ViewPopupModal
        popupId={viewModalState.popupId}
        open={viewModalState.open}
        onOpenChange={(open: boolean) =>
          setViewModalState((prev) => ({ ...prev, open }))
        }
      />
      <EditPopupModal
        popupId={editModalState.popupId}
        open={editModalState.open}
        onOpenChange={(open: boolean) =>
          setEditModalState((prev) => ({ ...prev, open }))
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
        data={popups?.data?.popups || []}
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
              <AddPopupModal />
            </div>
          )
        }
        toolbarProps={{
          placeholder: isTrashMode
            ? t("common.trash.search_placeholder")
            : t("popup.search_placeholder"),
          searchColumn: COLUMN_KEYS.title,
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
          page: popups?.data?.meta.page,
          pageCount: popups?.data?.meta.pageCount,
          limit: popups?.data?.meta.limit,
          total: popups?.data?.meta.total,
          onPageChange: (newPage) => setPage(newPage),
        }}
      />
    </React.Fragment>
  );
}

export default PopupView;
