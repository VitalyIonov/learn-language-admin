import { memo, useState, useEffect, useCallback } from "react";

import {
  TablePagination,
  Table as BaseTable,
  TableToolbar,
} from "~/components/table";
import { usePagination } from "~/hooks/usePagination";
import { useLoadUsers } from "~/hooks/api/useLoadUsers";

type Props = {};

export const Table = memo(({}: Props) => {
  const [searchValue, setSearchValue] = useState("");

  const { offset, setTotalCount, ...pagination } = usePagination();

  const { users, meta } = useLoadUsers({
    q: searchValue,
    limit: pagination.pageSize,
    offset,
  });

  useEffect(() => {
    if (meta?.totalCount) {
      setTotalCount(meta.totalCount);
    }
  }, [meta?.totalCount, setTotalCount]);

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      size: 50,
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 250,
    },
    {
      accessorKey: "name",
      header: "Name",
      size: 150,
    },
    {
      accessorKey: "role",
      header: "Role",
      size: 120,
    },
  ];

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <TableToolbar
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
      />
      <BaseTable columns={columns} data={users || []} />
      <TablePagination {...pagination} />
    </div>
  );
});
