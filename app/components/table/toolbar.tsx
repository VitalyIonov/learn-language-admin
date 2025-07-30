import React, { memo, type ChangeEvent } from 'react';

import { Input } from '~/components/ui/input';

type Props = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  rightSpot?: React.ReactNode;
};

export const TableToolbar = memo(({ searchValue, onSearchChange, rightSpot }: Props) => {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target?.value);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearchChange}
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="flex items-center gap-2">{rightSpot}</div>
    </div>
  );
});
