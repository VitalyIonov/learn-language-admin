import { useState } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';

import { FormItem, FormLabel, FormControl, FormMessage, FormField } from '~/components/ui/form';
import { SingleSelect } from '~/components/single-select';
import { useLoadLevels } from '~/hooks/api/useLoadLevels';

type Props<FormValues extends FieldValues, Option extends Record<string, any>> = {
  name: Path<FormValues>;
  label: string;
  control: Control<FormValues>;

  placeholder?: string;
};

export function LevelsField<FormValues extends FieldValues, Option extends Record<string, any>>({
  control,
  name,
  placeholder,
  label,
}: Props<FormValues, Option>) {
  const [searchQuery, setSearchQuery] = useState('');
  const { levels } = useLoadLevels({ q: searchQuery });

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <SingleSelect
              options={levels}
              labelKey="name"
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
