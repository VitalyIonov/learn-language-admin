import { memo, useState, useEffect, useCallback } from 'react';

import { Button } from '~/components/ui/button';
import { TablePagination, Table, TableToolbar } from '~/components/table';
import { useLoadCategories } from '~/hooks/api/useLoadCategories';
import { usePagination } from '~/hooks/usePagination';
import { CreateCategorySheet } from '~/routes/categories/components/create-category-sheet';

type Props = {};

export const CategoriesTable = memo(({}: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [isSheetOpened, setIsSheetOpened] = useState(false);

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

  useEffect(() => {
    if (meta?.totalCount) {
      setTotalCount(meta.totalCount);
    }
  }, [meta?.totalCount]);

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 50,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      size: 0,
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
        rightSpot={<Button onClick={handleSheetOpen}>Create category</Button>}
      />
      <Table columns={columns} data={categories || []} />
      <TablePagination {...pagination} />
      <CreateCategorySheet
        isOpen={isSheetOpened}
        onOpenChange={setIsSheetOpened}
        onSuccess={invalidateCategories}
      />
    </div>
  );
});
