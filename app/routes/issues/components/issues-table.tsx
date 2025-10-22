import { type CellContext } from "@tanstack/table-core";
import { memo, useState, useEffect, useCallback } from "react";

import { TablePagination, Table, TableToolbar } from "~/components/table";
import { useLoadIssues } from "~/hooks/api/useLoadIssues";
import { usePagination } from "~/hooks/usePagination";
import { MenuCell } from "~/components/table";
import { type IssueOut } from "~/types/api";
import { UpdateIssueSheet } from "~/routes/issues/components/update-issue-sheet";

type Props = {};

export const IssuesTable = memo(({}: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [isUpdateSheetOpened, setIsUpdateSheetOpened] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState<IssueOut["id"] | null>(null);

  const { offset, setTotalCount, ...pagination } = usePagination();

  const {
    issues,
    meta,
    invalidate: invalidateIssues,
  } = useLoadIssues({
    q: searchValue,
    limit: pagination.pageSize,
    offset,
  });

  useEffect(() => {
    if (meta?.totalCount) {
      setTotalCount(meta.totalCount);
    }
  }, [meta?.totalCount]);

  const handleUpdateClick = (id: IssueOut["id"]) => {
    setIdToUpdate(id);
    setIsUpdateSheetOpened(true);
  };

  const headerActions = [
    {
      label: "Редактировать",
      action: (item: IssueOut) => handleUpdateClick(item.id),
    },
  ];

  const columns = [
    {
      accessorKey: "reporter",
      header: "Reporter",
      size: 150,
      cell: ({ row }: CellContext<IssueOut, void>) =>
        row.original.reporter?.name,
    },
    {
      accessorKey: "meaning",
      header: "Meaning",
      size: 100,
    },
    {
      accessorKey: "definitions",
      header: "Definitions",
      meta: { flex: true },
      cell: ({ row }: CellContext<IssueOut, void>) => (
        <div>
          {row.original.definitions.map((item, index) => {
            return <p>{item}</p>;
          })}
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "type",
      size: 120,
      cell: ({ row }: CellContext<IssueOut, void>) => row.original.type?.name,
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 120,
      cell: ({ row }: CellContext<IssueOut, void>) => row.original.status?.name,
    },
    {
      accessorKey: "text",
      header: "Text",
      size: 200,
    },
    {
      header: " ",
      size: 80,
      meta: { align: "center" as const },
      cell: ({ row }: CellContext<IssueOut, void>) => (
        <MenuCell item={row.original} actions={headerActions} />
      ),
    },
  ];

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const handleUpdateOpenChange = (open: boolean) => {
    setIsUpdateSheetOpened(open);
    if (!open) {
      setIdToUpdate(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <TableToolbar
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
      />
      <Table columns={columns} data={issues || []} />
      <TablePagination {...pagination} />
      <UpdateIssueSheet
        id={idToUpdate}
        isOpen={isUpdateSheetOpened}
        onOpenChange={handleUpdateOpenChange}
        onSuccess={invalidateIssues}
      />
    </div>
  );
});
