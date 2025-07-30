import type { Control, FieldValues, Path } from 'react-hook-form';

import { FormItem, FormLabel, FormControl, FormMessage, FormField } from '~/components/ui/form';
import { Input } from '~/components/ui/input';

type Props<FormValues extends FieldValues> = {
  name: Path<FormValues>;
  label: string;
  control: Control<FormValues>;
};

export function InputField<FormValues extends FieldValues>({
  control,
  name,
  label,
}: Props<FormValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={label} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
