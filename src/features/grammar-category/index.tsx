"use client";

import { useMemo, useState } from "react";
import { get } from "radash";

import { useGetGrammarCategoriesQuery } from "@/apis/queries";
import { DataTable } from "@/components/shared/data-table";
import { EMPTY, MODES } from "@/constants/common";
import { useTranslations } from "@/hooks";

import {
  COLUMN_KEYS,
  createColumns,
  getStatuses,
  useModal,
  useModalActions,
} from "./common";
import { ActionView, ModalView } from "./components";

export function GrammarCategoryView() {
  const t = useTranslations();
  const { isOpen, mode, selectedId, openModal, closeModal } = useModal();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(EMPTY.str);
  const [statusFilter, setStatusFilter] = useState<string>();
  const [isTrashMode, setIsTrashMode] = useState(false);

  const { data, isLoading, refetch } = useGetGrammarCategoriesQuery({
    page,
    search,
    status: statusFilter,
    isDeleted: isTrashMode,
  });

  const { handleDelete, handleRestore, handleForceDelete } = useModalActions({
    mode: MODES.view,
    selectedId: null,
    onSuccess: refetch,
  });

  const handleView = (id: string) => openModal(MODES.view, id);
  const handleEdit = (id: string) => openModal(MODES.edit, id);
  const handleAdd = () => openModal(MODES.add);

  const handleToggleTrashMode = () => {
    setIsTrashMode((prev) => !prev);
    setPage(1);
    setSearch(EMPTY.str);
    setStatusFilter(undefined);
  };

  const columns = useMemo(
    () =>
      createColumns({
        t,
        onView: handleView,
        onEdit: !isTrashMode ? handleEdit : undefined,
        onDelete: !isTrashMode ? handleDelete : undefined,
        onForceDelete: isTrashMode ? handleForceDelete : undefined,
        onRestore: isTrashMode ? handleRestore : undefined,
      }),
    [t, isTrashMode],
  );

  return (
    <>
      <DataTable
        data={get(data, "data.grammarCategories", EMPTY.arr)}
        columns={columns}
        addButton={
          <ActionView
            isTrashMode={isTrashMode}
            onToggleTrashMode={handleToggleTrashMode}
            onClickAdd={handleAdd}
          />
        }
        toolbarProps={{
          placeholder: isTrashMode
            ? t("common.trash.search_placeholder")
            : t("grammar_category.search_placeholder"),
          searchColumn: COLUMN_KEYS.name,
          search,
          filters: isTrashMode
            ? []
            : [
                {
                  columnId: "status",
                  title: t("field.status"),
                  options: getStatuses(t),
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
          page: get(data, "data.meta.page"),
          pageCount: get(data, "data.meta.pageCount"),
          limit: get(data, "data.meta.limit"),
          total: get(data, "data.meta.total"),
          onPageChange: (newPage) => setPage(newPage),
        }}
        loading={isLoading}
      />

      <ModalView
        isOpen={isOpen}
        mode={mode}
        selectedId={selectedId}
        onClose={closeModal}
        onSuccess={refetch}
      />
    </>
  );
}
