"use client";

import React, { useMemo, useState } from "react";

import { AxiosError } from "axios";
import { ArrowLeft, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  useDeleteOnboardingMutation,
  useForceDeleteOnboardingMutation,
  useGetOnboardingQuery,
  useRestoreOnboardingMutation,
} from "@/apis/hooks";
import { DataTable } from "@/components/shared/data-table";
import { DialogDelete } from "@/components/shared/dialog";
import { Button } from "@/components/ui/button";
import { EMPTY } from "@/constants/common";
import { useTranslations } from "@/hooks";
import { ApiResponse } from "@/types/api";
import {
  TDeleteOnboardingResponse,
  TForceDeleteOnboardingResponse,
  TRestoreOnboardingResponse,
} from "@/types/features";

import { COLUMN_KEYS, createColumns, getStatuses } from "./common";
import {
  AddOnboardingModal,
  EditOnboardingModal,
  ViewOnboardingModal,
} from "./components";

export function OnboardingView() {
  const t = useTranslations();
  const { mutate: deleteOnboarding, isPending: isDeleting } =
    useDeleteOnboardingMutation();
  const { mutate: restoreOnboarding, isPending: isRestoring } =
    useRestoreOnboardingMutation();
  const { mutate: forceDeleteOnboarding, isPending: isForceDeleting } =
    useForceDeleteOnboardingMutation();

  const statuses = useMemo(() => getStatuses(t), [t]);

  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>(EMPTY.str);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined,
  );
  const [isTrashMode, setIsTrashMode] = useState<boolean>(false);
  const [viewModalState, setViewModalState] = useState<{
    open: boolean;
    onboardingId: string | null;
  }>({
    open: false,
    onboardingId: null,
  });
  const [editModalState, setEditModalState] = useState<{
    open: boolean;
    onboardingId: string | null;
  }>({
    open: false,
    onboardingId: null,
  });
  const [deleteModalState, setDeleteModalState] = useState<{
    open: boolean;
    onboardingId: string | null;
    isForceDelete: boolean;
  }>({
    open: false,
    onboardingId: null,
    isForceDelete: false,
  });

  const { data: onboardings } = useGetOnboardingQuery({
    page,
    search,
    status: statusFilter,
    isDeleted: isTrashMode,
  });

  const handleView = (id: string) => {
    setViewModalState({
      open: true,
      onboardingId: id,
    });
  };

  const handleEdit = (id: string) => {
    setEditModalState({
      open: true,
      onboardingId: id,
    });
  };

  const handleDelete = (id: string) => {
    setDeleteModalState({
      open: true,
      onboardingId: id,
      isForceDelete: false,
    });
  };

  const handleRestore = (id: string) => {
    restoreOnboarding(id, {
      onSuccess: (data: TRestoreOnboardingResponse) => {
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
      onboardingId: id,
      isForceDelete: true,
    });
  };

  const handleDeleteConfirm = () => {
    if (!deleteModalState.onboardingId) return;

    if (deleteModalState.isForceDelete) {
      forceDeleteOnboarding(deleteModalState.onboardingId, {
        onSuccess: (data: TForceDeleteOnboardingResponse) => {
          setDeleteModalState({
            open: false,
            onboardingId: null,
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
      deleteOnboarding(deleteModalState.onboardingId, {
        onSuccess: (data: TDeleteOnboardingResponse) => {
          setDeleteModalState({
            open: false,
            onboardingId: null,
            isForceDelete: false,
          });
          toast.success(data?.message || t("common.toast.delete_success"));
        },
        onError: (error: Error) => {
          const axiosError = error as AxiosError<
            ApiResponse<TDeleteOnboardingResponse>
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
        onForceDelete: handleForceDelete,
      })
    : createColumns({
        t,
        onView: handleView,
        onEdit: handleEdit,
        onDelete: handleDelete,
      });

  return (
    <React.Fragment>
      <ViewOnboardingModal
        onboardingId={viewModalState.onboardingId}
        open={viewModalState.open}
        onOpenChange={(open: boolean) =>
          setViewModalState((prev) => ({ ...prev, open }))
        }
      />
      <EditOnboardingModal
        onboardingId={editModalState.onboardingId}
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
        data={onboardings?.data?.onboardings || []}
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
              <AddOnboardingModal />
            </div>
          )
        }
        toolbarProps={{
          placeholder: isTrashMode
            ? t("common.trash.search_placeholder")
            : t("onboarding.search_placeholder"),
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
          page: onboardings?.data?.meta.page,
          pageCount: onboardings?.data?.meta.pageCount,
          limit: onboardings?.data?.meta.limit,
          total: onboardings?.data?.meta.total,
          onPageChange: (newPage) => setPage(newPage),
        }}
      />
    </React.Fragment>
  );
}

export default OnboardingView;
