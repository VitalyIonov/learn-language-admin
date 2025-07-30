import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { Button } from '~/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

type Props = {
  pageSize: number;
  currentPage: number;
  pageCount: number;
  setPageSize: (newLimit: number) => void;
  setCurrentPage: (newPage: number) => void;
};

export function TablePagination<TData>({
  pageSize,
  currentPage,
  pageCount,
  setPageSize,
  setCurrentPage,
}: Props) {
  const handleSetFirstPage = () => {
    setCurrentPage(1);
  };

  const handleSetLastPage = () => {
    setCurrentPage(pageCount);
  };

  const handleSetNextPage = () => {
    currentPage < pageCount && setCurrentPage(currentPage + 1);
  };

  const handleSetPreviousPage = () => {
    currentPage > 1 && setCurrentPage(currentPage - 1);
  };

  if (pageCount < 2) {
    return null;
  }

  return (
    <div className="flex w-full items-center justify-between px-2">
      <div className="flex w-full items-center justify-between space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => {
              setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 25, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {currentPage} of {pageCount}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={handleSetFirstPage}
              disabled={false}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={handleSetPreviousPage}
              disabled={false}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={handleSetNextPage}
              disabled={false}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={handleSetLastPage}
              disabled={false}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
