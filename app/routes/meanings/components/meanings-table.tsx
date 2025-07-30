import { memo, useState, useEffect, useCallback } from 'react';
import { type CellContext } from '@tanstack/table-core';
import { type MeaningOut } from '~/types/api';

import { Button } from '~/components/ui/button';
import { TablePagination, Table, TableToolbar } from '~/components/table';
import { useLoadMeanings } from '~/hooks/api/useLoadMeanings';
import { useDeleteMeaning } from '~/hooks/api/useDeleteMeaning';
import { usePagination } from '~/hooks/usePagination';
import { CreateMeaningSheet } from 'app/routes/meanings/components/create-meaning-sheet';
import { UpdateMeaningSheet } from '~/routes/meanings/components/update-meaning-sheet';
import { MenuCell } from '~/components/table';

type Props = {};

export const MeaningsTable = memo(({}: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [isCreateSheetOpened, setIsCreateSheetOpened] = useState(false);
  const [isUpdateSheetOpened, setIsUpdateSheetOpened] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState<MeaningOut['id'] | null>(null);

  const { offset, setTotalCount, ...pagination } = usePagination();

  const {
    meanings,
    meta,
    invalidate: invalidateMeanings,
  } = useLoadMeanings({
    q: searchValue,
    limit: pagination.pageSize,
    offset,
  });

  const { deleteMeaning } = useDeleteMeaning({ onSuccess: invalidateMeanings });

  const handleUpdateOpenChange = (open: boolean) => {
    setIsUpdateSheetOpened(open);
    if (!open) {
      setIdToUpdate(null);
    }
  };

  const handleUpdateClick = (id: MeaningOut['id']) => {
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
      action: (item: MeaningOut) => handleUpdateClick(item.id),
    },
    {
      label: 'Удалить',
      action: (item: MeaningOut) => deleteMeaning({ id: item.id }),
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
      accessorKey: 'name',
      header: 'Name',
      size: 0,
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }: CellContext<MeaningOut, void>) => (
        <div className="text-foreground">{row.original.category?.name || '-'}</div>
      ),
    },
    {
      accessorKey: 'level',
      header: 'Level',
      cell: ({ row }: CellContext<MeaningOut, void>) => (
        <div className="text-foreground">{row.original.level?.name || '-'}</div>
      ),
    },
    {
      header: ' ',
      size: 80,
      meta: { align: 'center' as const },
      cell: ({ row }: CellContext<MeaningOut, void>) => (
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
    <div className="flex w-200 flex-col gap-4">
      <TableToolbar
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        rightSpot={<Button onClick={handleCreateSheetOpen}>Create meaning</Button>}
      />
      <Table columns={columns} data={meanings || []} />
      <TablePagination {...pagination} />
      <CreateMeaningSheet
        isOpen={isCreateSheetOpened}
        onOpenChange={setIsCreateSheetOpened}
        onSuccess={invalidateMeanings}
      />
      <UpdateMeaningSheet
        id={idToUpdate}
        isOpen={isUpdateSheetOpened}
        onOpenChange={handleUpdateOpenChange}
        onSuccess={invalidateMeanings}
      />
    </div>
  );
});
