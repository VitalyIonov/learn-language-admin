import type { Control, FieldValues, Path } from 'react-hook-form';

import { FormItem, FormLabel, FormControl, FormMessage, FormField } from '~/components/ui/form';
import { MultiSelect, type Option } from '~/components/multi-select';

type Props<FormValues extends FieldValues> = {
  name: Path<FormValues>;
  label: string;
  options: Option[];
  value: number[];
  labelKey: string;
  control: Control<FormValues>;
  onChange: (newValue: number[]) => void;
};

export function MultiSelectField<FormValues extends FieldValues>({
  control,
  name,
  options,
  value,
  labelKey,
  label,
  onChange,
}: Props<FormValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <MultiSelect options={options} labelKey={labelKey} value={value} onChange={onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
