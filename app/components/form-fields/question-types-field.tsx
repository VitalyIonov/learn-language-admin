import type { Control, FieldValues, Path } from "react-hook-form";

import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "~/components/ui/form";
import { MultiSelect } from "~/components/multi-select";

import { useLoadQuestionTypes } from "~/hooks/api/useLoadQuestionTypes";

type Props<FormValues extends FieldValues> = {
  name: Path<FormValues>;
  label: string;
  control: Control<FormValues>;

  placeholder?: string;
};

export function QuestionTypesField<FormValues extends FieldValues>({
  control,
  name,
  placeholder,
  label,
}: Props<FormValues>) {
  const { questionTypes } = useLoadQuestionTypes();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <MultiSelect
              options={questionTypes}
              labelKey="name"
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
