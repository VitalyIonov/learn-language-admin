import { type CellContext } from '@tanstack/table-core';
import { memo, useState, useEffect, useCallback } from 'react';

import { Button } from '~/components/ui/button';
import { TablePagination, Table, TableToolbar } from '~/components/table';
import { useLoadLevels } from '~/hooks/api/useLoadLevels';
import { useDeleteLevel } from '~/hooks/api/useDeleteLevel';
import { usePagination } from '~/hooks/usePagination';
import { CreateLevelSheet } from '~/routes/levels/components/create-level-sheet';
import { MenuCell } from '~/components/table';
import { type LevelOut } from '~/types/api';

type Props = {};

export const LevelsTable = memo(({}: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [isSheetOpened, setIsSheetOpened] = useState(false);

  const { offset, setTotalCount, ...pagination } = usePagination();

  const {
    levels,
    meta,
    invalidate: invalidateLevels,
  } = useLoadLevels({
    q: searchValue,
    limit: pagination.pageSize,
    offset,
  });

  const { deleteLevel } = useDeleteLevel({ onSuccess: invalidateLevels });

  useEffect(() => {
    if (meta?.totalCount) {
      setTotalCount(meta.totalCount);
    }
  }, [meta?.totalCount]);

  const headerActions = [
    {
      label: 'Удалить',
      action: (item: LevelOut) => deleteLevel({ id: item.id }),
    },
  ];

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 50,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      size: 300,
    },
    {
      accessorKey: 'alias',
      header: 'Alias',
      size: 0,
    },
    {
      header: ' ',
      size: 80,
      meta: { align: 'center' as const },
      cell: ({ row }: CellContext<LevelOut, void>) => (
        <MenuCell item={row.original} actions={headerActions} />
      ),
    },
  ];

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const handleSheetOpen = () => {
    setIsSheetOpened(true);
  };

  return (
    <div className="flex w-150 flex-col gap-4">
      <TableToolbar
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        rightSpot={<Button onClick={handleSheetOpen}>Create level</Button>}
      />
      <Table columns={columns} data={levels || []} />
      <TablePagination {...pagination} />
      <CreateLevelSheet
        isOpen={isSheetOpened}
        onOpenChange={setIsSheetOpened}
        onSuccess={invalidateLevels}
      />
    </div>
  );
});
