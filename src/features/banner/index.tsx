"use client";

import React, { useMemo, useState } from "react";

import { AxiosError } from "axios";
import { ArrowLeft, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  useDeleteBannerMutation,
  useForceDeleteBannerMutation,
  useGetBannerQuery,
  useGetModuleQuery,
  useRestoreBannerMutation,
} from "@/apis/queries";
import { DataTable } from "@/components/shared/data-table";
import { DialogDelete } from "@/components/shared/dialog";
import { Button } from "@/components/ui/button";
import { EMPTY } from "@/constants/common";
import { useTranslations } from "@/hooks";
import { ApiResponse } from "@/types/api";
import {
  TDeleteBannerResponse,
  TForceDeleteBannerResponse,
  TRestoreBannerResponse,
} from "@/types/features";

import { COLUMN_KEYS, createColumns, getStatuses } from "./common";
import { AddBannerModal, EditBannerModal, ViewBannerModal } from "./components";

export function BannerView() {
  const t = useTranslations();
  const { mutate: deleteBanner, isPending: isDeleting } =
    useDeleteBannerMutation();
  const { mutate: restoreBanner, isPending: isRestoring } =
    useRestoreBannerMutation();
  const { mutate: forceDeleteBanner, isPending: isForceDeleting } =
    useForceDeleteBannerMutation();

  const statuses = useMemo(() => getStatuses(t), [t]);

  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>(EMPTY.str);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined,
  );
  const [isTrashMode, setIsTrashMode] = useState<boolean>(false);
  const [viewModalState, setViewModalState] = useState<{
    open: boolean;
    bannerId: string | null;
  }>({
    open: false,
    bannerId: null,
  });
  const [editModalState, setEditModalState] = useState<{
    open: boolean;
    bannerId: string | null;
  }>({
    open: false,
    bannerId: null,
  });
  const [deleteModalState, setDeleteModalState] = useState<{
    open: boolean;
    bannerId: string | null;
    isForceDelete: boolean;
  }>({
    open: false,
    bannerId: null,
    isForceDelete: false,
  });

  const { data: banners } = useGetBannerQuery({
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
      bannerId: id,
    });
  };

  const handleEdit = (id: string) => {
    setEditModalState({
      open: true,
      bannerId: id,
    });
  };

  const handleDelete = (id: string) => {
    setDeleteModalState({
      open: true,
      bannerId: id,
      isForceDelete: false,
    });
  };

  const handleRestore = (id: string) => {
    restoreBanner(id, {
      onSuccess: (data: TRestoreBannerResponse) => {
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
      bannerId: id,
      isForceDelete: true,
    });
  };

  const handleDeleteConfirm = () => {
    if (!deleteModalState.bannerId) return;

    if (deleteModalState.isForceDelete) {
      forceDeleteBanner(deleteModalState.bannerId, {
        onSuccess: (data: TForceDeleteBannerResponse) => {
          setDeleteModalState({
            open: false,
            bannerId: null,
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
      deleteBanner(deleteModalState.bannerId, {
        onSuccess: (data: TDeleteBannerResponse) => {
          setDeleteModalState({
            open: false,
            bannerId: null,
            isForceDelete: false,
          });
          toast.success(data?.message || t("common.toast.delete_success"));
        },
        onError: (error: Error) => {
          const axiosError = error as AxiosError<
            ApiResponse<TDeleteBannerResponse>
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
      <ViewBannerModal
        bannerId={viewModalState.bannerId}
        open={viewModalState.open}
        onOpenChange={(open: boolean) =>
          setViewModalState((prev) => ({ ...prev, open }))
        }
      />
      <EditBannerModal
        bannerId={editModalState.bannerId}
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
        data={banners?.data?.banners || []}
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
              <AddBannerModal />
            </div>
          )
        }
        toolbarProps={{
          placeholder: isTrashMode
            ? t("common.trash.search_placeholder")
            : t("banner.search_placeholder"),
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
          page: banners?.data?.meta.page,
          pageCount: banners?.data?.meta.pageCount,
          limit: banners?.data?.meta.limit,
          total: banners?.data?.meta.total,
          onPageChange: (newPage) => setPage(newPage),
        }}
      />
    </React.Fragment>
  );
}

export default BannerView;
