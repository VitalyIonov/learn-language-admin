import React, { memo, useState, useEffect, useCallback } from "react";
import { type CellContext } from "@tanstack/table-core";
import { type ImageDefinitionOut } from "~/types/api";

import { Button } from "~/components/ui/button";
import {
  TablePagination,
  Table as BaseTable,
  TableToolbar,
} from "~/components/table";
import { useLoadImageDefinitions } from "~/hooks/api/useLoadImageDefinitions";
import { useDeleteImageDefinition } from "~/hooks/api/useDeleteImageDefinition";
import { usePagination } from "~/hooks/usePagination";
import { CreateSheet } from "~/routes/image-definitions/components/create-sheet";
import { UpdateSheet } from "~/routes/image-definitions/components/update-sheet";
import { MenuCell } from "~/components/table";

type Props = {};

export const Table = memo(({}: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [isCreateSheetOpened, setIsCreateSheetOpened] = useState(false);
  const [isUpdateSheetOpened, setIsUpdateSheetOpened] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState<ImageDefinitionOut["id"] | null>(
    null,
  );

  const { offset, setTotalCount, ...pagination } = usePagination();

  const {
    definitions,
    meta,
    invalidate: invalidateMeanings,
  } = useLoadImageDefinitions({
    q: searchValue,
    limit: pagination.pageSize,
    offset,
  });

  const { deleteDefinition } = useDeleteImageDefinition({
    onSuccess: invalidateMeanings,
  });

  const handleUpdateOpenChange = (open: boolean) => {
    setIsUpdateSheetOpened(open);
    if (!open) {
      setIdToUpdate(null);
    }
  };

  const handleUpdateClick = (id: ImageDefinitionOut["id"]) => {
    setIdToUpdate(id);
    setIsUpdateSheetOpened(true);
  };

  useEffect(() => {
    if (meta?.totalCount) {
      setTotalCount(meta.totalCount);
    }
  }, [meta?.totalCount]);

  const headerActions = [
    {
      label: "Редактировать",
      action: (item: ImageDefinitionOut) => handleUpdateClick(item.id),
    },
    {
      label: "Удалить",
      action: (item: ImageDefinitionOut) => deleteDefinition({ id: item.id }),
    },
  ];

  const columns = [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }: CellContext<ImageDefinitionOut, void>) => (
        <div className="text-foreground">
          <img
            src={row.original.image.imageUrl}
            alt="Current image"
            className="max-h-18 max-w-full border border-border bg-stone-100 object-contain"
          />
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }: CellContext<ImageDefinitionOut, void>) => (
        <div className="text-foreground">
          {row.original.category?.name || "-"}
        </div>
      ),
    },
    {
      accessorKey: "level",
      header: "Level",
      cell: ({ row }: CellContext<ImageDefinitionOut, void>) => (
        <div className="text-foreground">{row.original.level?.name || "-"}</div>
      ),
    },
    {
      accessorKey: "meanings",
      header: "Meanings",
      cell: ({ row }: CellContext<ImageDefinitionOut, void>) => (
        <div className="text-foreground">
          {row.original.meanings?.map((meaning) => (
            <div key={meaning.id}>{meaning.name}</div>
          )) || "-"}
        </div>
      ),
    },
    {
      header: " ",
      size: 80,
      meta: { align: "center" as const },
      cell: ({ row }: CellContext<ImageDefinitionOut, void>) => (
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
    <div className="flex w-250 flex-col gap-4">
      <TableToolbar
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        rightSpot={
          <Button onClick={handleCreateSheetOpen}>Create definition</Button>
        }
      />
      <BaseTable columns={columns} data={definitions || []} />
      <TablePagination {...pagination} />
      <CreateSheet
        isOpen={isCreateSheetOpened}
        onOpenChange={setIsCreateSheetOpened}
        onSuccess={invalidateMeanings}
      />
      <UpdateSheet
        id={idToUpdate}
        isOpen={isUpdateSheetOpened}
        onOpenChange={handleUpdateOpenChange}
        onSuccess={invalidateMeanings}
      />
    </div>
  );
});
