import { memo, useState, useEffect, useCallback } from 'react';
import { type CellContext } from '@tanstack/table-core';
import { type DefinitionOut } from '~/types/api';

import { Button } from '~/components/ui/button';
import { TablePagination, Table, TableToolbar } from '~/components/table';
import { useLoadDefinitions } from '~/hooks/api/useLoadDefinitions';
import { useDeleteDefinition } from '~/hooks/api/useDeleteDefinition';
import { usePagination } from '~/hooks/usePagination';
import { CreateDefinitionSheet } from '~/routes/definitions/components/create-definition-sheet';
import { UpdateDefinitionSheet } from '~/routes/definitions/components/update-definition-sheet';
import { MenuCell } from '~/components/table';

type Props = {};

export const DefinitionsTable = memo(({}: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [isCreateSheetOpened, setIsCreateSheetOpened] = useState(false);
  const [isUpdateSheetOpened, setIsUpdateSheetOpened] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState<DefinitionOut['id'] | null>(null);

  const { offset, setTotalCount, ...pagination } = usePagination();

  const {
    definitions,
    meta,
    invalidate: invalidateMeanings,
  } = useLoadDefinitions({
    q: searchValue,
    limit: pagination.pageSize,
    offset,
  });

  const { deleteDefinition } = useDeleteDefinition({ onSuccess: invalidateMeanings });

  const handleUpdateOpenChange = (open: boolean) => {
    setIsUpdateSheetOpened(open);
    if (!open) {
      setIdToUpdate(null);
    }
  };

  const handleUpdateClick = (id: DefinitionOut['id']) => {
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
      label: 'Редактировать',
      action: (item: DefinitionOut) => handleUpdateClick(item.id),
    },
    {
      label: 'Удалить',
      action: (item: DefinitionOut) => deleteDefinition({ id: item.id }),
    },
  ];

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 50,
      meta: { align: 'center' as const },
    },
    {
      accessorKey: 'text',
      header: 'Text',
      size: 0,
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }: CellContext<DefinitionOut, void>) => (
        <div className="text-foreground">{row.original.category?.name || '-'}</div>
      ),
    },
    {
      accessorKey: 'level',
      header: 'Level',
      cell: ({ row }: CellContext<DefinitionOut, void>) => (
        <div className="text-foreground">{row.original.level?.name || '-'}</div>
      ),
    },
    {
      accessorKey: 'meanings',
      header: 'Meanings',
      cell: ({ row }: CellContext<DefinitionOut, void>) => (
        <div className="text-foreground">
          {row.original.meanings?.map((meaning) => <div key={meaning.id}>{meaning.name}</div>) ||
            '-'}
        </div>
      ),
    },
    {
      header: ' ',
      size: 80,
      meta: { align: 'center' as const },
      cell: ({ row }: CellContext<DefinitionOut, void>) => (
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
        rightSpot={<Button onClick={handleCreateSheetOpen}>Create definition</Button>}
      />
      <Table columns={columns} data={definitions || []} />
      <TablePagination {...pagination} />
      <CreateDefinitionSheet
        isOpen={isCreateSheetOpened}
        onOpenChange={setIsCreateSheetOpened}
        onSuccess={invalidateMeanings}
      />
      <UpdateDefinitionSheet
        id={idToUpdate}
        isOpen={isUpdateSheetOpened}
        onOpenChange={handleUpdateOpenChange}
        onSuccess={invalidateMeanings}
      />
    </div>
  );
});
