"use client";

import { useMemo, useState } from "react";

import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { get } from "radash";

import { useGetGrammarExercisesQuery } from "@/apis/queries";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { EMPTY, MODES } from "@/constants/common";
import { useTranslations } from "@/hooks";

import {
  COLUMN_KEYS,
  createColumns,
  getExerciseTypes,
  getStatuses,
  useModal,
  useModalActions,
} from "./common";
import { ModalView } from "./components";

export function GrammarExerciseView() {
  const t = useTranslations();
  const { isOpen, mode, selectedId, openModal, closeModal } = useModal();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(EMPTY.str);
  const [statusFilter, setStatusFilter] = useState<string>();
  const [typeFilter, setTypeFilter] = useState<string>();
  const [isTrashMode, setIsTrashMode] = useState(false);

  const { data, isLoading, refetch } = useGetGrammarExercisesQuery({
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
    setTypeFilter(undefined);
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
        data={get(data, "data.grammarExercises", EMPTY.arr)}
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
              <Button
                variant="default"
                size="sm"
                className="cursor-pointer"
                onClick={handleAdd}
              >
                <Plus className="w-4 h-4" />
                <span className="hidden lg:inline">
                  {t("grammar_exercise.add_grammar_exercise")}
                </span>
              </Button>
            </div>
          )
        }
        toolbarProps={{
          placeholder: isTrashMode
            ? t("common.trash.search_placeholder")
            : t("grammar_exercise.search_placeholder"),
          searchColumn: COLUMN_KEYS.question,
          search,
          filters: isTrashMode
            ? []
            : [
                {
                  columnId: "type",
                  title: t("field.exercise_type"),
                  options: getExerciseTypes(t),
                },
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
            } else if (columnId === COLUMN_KEYS.type) {
              setPage(1);
              setTypeFilter(value);
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
