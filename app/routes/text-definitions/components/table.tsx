import { memo, useState, useEffect, useCallback } from "react";
import { type CellContext } from "@tanstack/table-core";
import { type TextDefinitionOut } from "~/types/api";

import { Button } from "~/components/ui/button";
import {
  TablePagination,
  Table as BaseTable,
  TableToolbar,
} from "~/components/table";
import { useLoadTextDefinitions } from "~/hooks/api/useLoadTextDefinitions";
import { useDeleteTextDefinition } from "~/hooks/api/useDeleteTextDefinition";
import { useTextDefinitionGenerateAudio } from "~/hooks/api/useTextDefinitionGenerateAudio";
import { usePagination } from "~/hooks/usePagination";
import { CreateSheet } from "~/routes/text-definitions/components/create-sheet";
import { UpdateSheet } from "~/routes/text-definitions/components/update-sheet";
import { MenuCell } from "~/components/table";

type Props = {};

export const Table = memo(({}: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [isCreateSheetOpened, setIsCreateSheetOpened] = useState(false);
  const [isUpdateSheetOpened, setIsUpdateSheetOpened] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState<TextDefinitionOut["id"] | null>(
    null,
  );

  const { offset, setTotalCount, ...pagination } = usePagination();

  const {
    definitions,
    meta,
    invalidate: invalidateTextDefinitions,
  } = useLoadTextDefinitions({
    q: searchValue,
    limit: pagination.pageSize,
    offset,
  });

  const { deleteDefinition } = useDeleteTextDefinition({
    onSuccess: invalidateTextDefinitions,
  });

  const { generateTextDefinitionAudio } = useTextDefinitionGenerateAudio({
    onSuccess: invalidateTextDefinitions,
  });

  const handleUpdateOpenChange = (open: boolean) => {
    setIsUpdateSheetOpened(open);
    if (!open) {
      setIdToUpdate(null);
    }
  };

  const handleUpdateClick = (id: TextDefinitionOut["id"]) => {
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
      action: (item: TextDefinitionOut) => handleUpdateClick(item.id),
    },
    {
      label: "Удалить",
      action: (item: TextDefinitionOut) => deleteDefinition({ id: item.id }),
    },
    {
      label: "Сгенерировать аудио",
      shouldDisplay: (item: TextDefinitionOut) => !Boolean(item.audio?.id),
      action: (item: TextDefinitionOut) =>
        generateTextDefinitionAudio({ id: item.id }),
    },
  ];

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      size: 50,
      meta: { align: "center" as const },
    },
    {
      accessorKey: "text",
      header: "Text",
      size: 0,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }: CellContext<TextDefinitionOut, void>) => (
        <div className="text-foreground">
          {row.original.category?.name || "-"}
        </div>
      ),
    },
    {
      accessorKey: "level",
      header: "Level",
      cell: ({ row }: CellContext<TextDefinitionOut, void>) => (
        <div className="text-foreground">{row.original.level?.name || "-"}</div>
      ),
    },
    {
      accessorKey: "meanings",
      header: "Meanings",
      cell: ({ row }: CellContext<TextDefinitionOut, void>) => (
        <div className="text-foreground">
          {row.original.meanings?.map((meaning) => (
            <div key={meaning.id}>{meaning.name}</div>
          )) || "-"}
        </div>
      ),
    },
    {
      accessorKey: "audio",
      header: "Audio",
      cell: ({ row }: CellContext<TextDefinitionOut, void>) => (
        <div className="text-foreground">
          {row.original.audio?.url ? "true" : ""}
        </div>
      ),
    },
    {
      header: " ",
      size: 80,
      meta: { align: "center" as const },
      cell: ({ row }: CellContext<TextDefinitionOut, void>) => (
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
    <div className="flex flex-col gap-4">
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
        onSuccess={invalidateTextDefinitions}
      />
      <UpdateSheet
        id={idToUpdate}
        isOpen={isUpdateSheetOpened}
        onOpenChange={handleUpdateOpenChange}
        onSuccess={invalidateTextDefinitions}
      />
    </div>
  );
});
