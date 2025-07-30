import { useState } from 'react';

type Params = {
  totalCount?: number;
};

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [totalCountState, setTotalCountState] = useState(0);

  const pageCount = Math.ceil(totalCountState / pageSize);
  const offset = (currentPage - 1) * pageSize;

  return {
    pageSize,
    offset,
    setPageSize,
    pageCount,
    currentPage,
    setCurrentPage,
    setTotalCount: setTotalCountState,
  };
};
