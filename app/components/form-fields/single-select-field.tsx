import type { Control, FieldValues, Path } from 'react-hook-form';

import { FormItem, FormLabel, FormControl, FormMessage, FormField } from '~/components/ui/form';
import { SingleSelect } from '~/components/single-select';

type Props<FormValues extends FieldValues, Option extends Record<string, any>> = {
  name: Path<FormValues>;
  label: string;
  options: Option[];
  labelKey: string;
  control: Control<FormValues>;

  placeholder?: string;
};

export function SingleSelectField<
  FormValues extends FieldValues,
  Option extends Record<string, any>,
>({ control, name, options, placeholder, labelKey, label }: Props<FormValues, Option>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <SingleSelect
              options={options}
              labelKey={labelKey}
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
