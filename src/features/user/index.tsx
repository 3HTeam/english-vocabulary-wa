"use client";

import { useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { useGetUserQuery } from "@/apis/queries";
import { DataTable } from "@/components/shared/data-table";
import { EMPTY } from "@/constants/common";
import { ROUTE_PATH } from "@/constants/routes";
import { useTranslations } from "@/hooks";

import { COLUMN_KEYS, createColumns } from "./common";

export function UserView() {
  const t = useTranslations();
  const router = useRouter();

  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>(EMPTY.str);
  const [roleFilter, setRoleFilter] = useState<string | undefined>(undefined);

  const { data: users, isLoading } = useGetUserQuery({
    page,
    search,
  });

  const handleView = (id: string) => {
    router.push(`${ROUTE_PATH.admin.users}/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`${ROUTE_PATH.admin.users}/${id}/edit`);
  };

  const columns = createColumns({
    t,
    onView: handleView,
    onEdit: handleEdit,
  });

  return (
    <DataTable
      data={users?.data?.users || []}
      columns={columns}
      toolbarProps={{
        placeholder: t("user.search_placeholder"),
        searchColumn: COLUMN_KEYS.fullName,
        search,
        onSearchChange: (val) => {
          setPage(1);
          setSearch(val);
        },
        onFilterChange: (columnId, value) => {
          if (columnId === COLUMN_KEYS.role) {
            setPage(1);
            setRoleFilter(value);
          }
        },
      }}
      paginationProps={{
        page: users?.data?.meta.page,
        pageCount: users?.data?.meta.pageCount,
        limit: users?.data?.meta.limit,
        total: users?.data?.meta.total,
        onPageChange: (newPage) => setPage(newPage),
      }}
    />
  );
}
