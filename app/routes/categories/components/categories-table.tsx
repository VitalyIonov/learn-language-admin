import type { CellContext } from "@tanstack/table-core";
import { memo, useState, useEffect, useCallback } from "react";

import { Button } from "~/components/ui/button";
import { TablePagination, Table, TableToolbar } from "~/components/table";
import { useLoadCategories } from "~/hooks/api/useLoadCategories";
import { useDeleteCategory } from "~/hooks/api/useDeleteCategory";
import { usePagination } from "~/hooks/usePagination";
import { CreateCategorySheet } from "~/routes/categories/components/create-category-sheet";
import { UpdateCategorySheet } from "~/routes/categories/components/update-category-sheet";
import { MenuCell } from "~/components/table";
import type { CategoryOut, MeaningOut } from "~/types/api";

type Props = {};

export const CategoriesTable = memo(({}: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [isCreateSheetOpened, setIsCreateSheetOpened] = useState(false);
  const [isUpdateSheetOpened, setIsUpdateSheetOpened] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState<MeaningOut["id"] | null>(null);

  const { offset, setTotalCount, ...pagination } = usePagination();

  const {
    categories,
    meta,
    invalidate: invalidateCategories,
  } = useLoadCategories({
    q: searchValue,
    limit: pagination.pageSize,
    offset,
  });

  const { deleteCategory } = useDeleteCategory({
    onSuccess: invalidateCategories,
  });

  useEffect(() => {
    if (meta?.totalCount) {
      setTotalCount(meta.totalCount);
    }
  }, [meta?.totalCount]);

  const handleUpdateOpenChange = (open: boolean) => {
    setIsUpdateSheetOpened(open);
    if (!open) {
      setIdToUpdate(null);
    }
  };

  const handleUpdateClick = (id: MeaningOut["id"]) => {
    setIdToUpdate(id);
    setIsUpdateSheetOpened(true);
  };

  const headerActions = [
    {
      label: "Редактировать",
      action: (item: CategoryOut) => handleUpdateClick(item.id),
    },
    {
      label: "Удалить",
      action: (item: CategoryOut) => deleteCategory({ id: item.id }),
    },
  ];

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      size: 50,
    },
    {
      accessorKey: "name",
      header: "Name",
      size: 0,
    },
    {
      header: " ",
      size: 80,
      meta: { align: "center" as const },
      cell: ({ row }: CellContext<CategoryOut, void>) => (
        <MenuCell item={row.original} actions={headerActions} />
      ),
    },
  ];

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const handleCreateSheetOpen = () => {
    setIsCreateSheetOpened(true);
  };

  return (
    <div className="flex w-150 flex-col gap-4">
      <TableToolbar
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        rightSpot={
          <Button onClick={handleCreateSheetOpen}>Create category</Button>
        }
      />
      <Table columns={columns} data={categories || []} />
      <TablePagination {...pagination} />
      <CreateCategorySheet
        isOpen={isCreateSheetOpened}
        onOpenChange={setIsCreateSheetOpened}
        onSuccess={invalidateCategories}
      />
      <UpdateCategorySheet
        id={idToUpdate}
        isOpen={isUpdateSheetOpened}
        onOpenChange={handleUpdateOpenChange}
        onSuccess={invalidateCategories}
      />
    </div>
  );
});
