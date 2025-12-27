"use client";

import { useState } from "react";

import { createColumns } from "../common/columns";
import { DataTable } from "@/components/data-table";
import { AddTopicModal } from "../components/add-topic-modal";
import { ViewEditTopicModal } from "../components/view-edit-topic-modal";
import { statuses } from "../common/filter";
import {
  useDeleteTopicMutation,
  useGetTopicQuery,
} from "@/apis/tanstack/hooks/topic.tanstack";
import DialogDelete from "@/components/dialog/dialog-delete";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/base";
import { TDeleteTopicResponse } from "@/types/topic.type";

export default function TopicView() {
  const { mutate: deleteTopic, isPending: isDeleting } =
    useDeleteTopicMutation();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );
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
  }>({
    open: false,
    topicId: null,
  });

  const { data: topics, isLoading } = useGetTopicQuery({
    page,
    search,
    status: statusFilter,
    isDeleted: false,
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
    });
  };

  const handleDeleteConfirm = () => {
    if (!deleteModalState.topicId) return;

    deleteTopic(deleteModalState.topicId, {
      onSuccess: (data) => {
        setDeleteModalState({ open: false, topicId: null });
        toast.success(data?.message || "Xoá chủ đề thành công!");
      },
      onError: (error) => {
        const axiosError = error as AxiosError<
          ApiResponse<TDeleteTopicResponse>
        >;
        const message = axiosError.response?.data?.message;
        const fallbackMessage =
          axiosError.message || "Xoá chủ đề thất bại, vui lòng thử lại.";
        toast.error(message || fallbackMessage);
      },
    });
  };

  const columns = createColumns({
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
        title="Bạn có chắc chắn muốn xoá chủ đề này?"
        description="Hành động này có thể hoàn tác. Sau khi xoá mọi thứ sẽ được lưu trong thùng rác để bạn khôi phục khi cần."
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
      <DataTable
        data={topics?.data?.topics || []}
        addButton={<AddTopicModal />}
        columns={columns}
        toolbarProps={{
          placeholder: "Tìm kiếm tên chủ đề",
          searchColumn: "name",
          filters: [
            { columnId: "status", title: "Trạng thái", options: statuses },
          ],
          search,
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
