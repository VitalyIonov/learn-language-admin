import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';

export type Option = {
  id: number;
  label: string;
};

export type MultiSelectProps<Data extends Record<string, any>> = {
  options?: Data[];
  value?: number[];
  searchQuery?: string;
  labelKey: string;
  onSearchQueryChange?: (query: string) => void;
  onChange: (newValue: number[]) => void;
  placeholder?: string;
};

export function MultiSelect<Data extends Record<string, any>>({
  options,
  value,
  searchQuery,
  onSearchQueryChange,
  labelKey,
  onChange,
  placeholder,
}: MultiSelectProps<Data>) {
  const [open, setOpen] = React.useState(false);

  const preparedOptions: Option[] | undefined = options?.map((option) => ({
    id: option.id,
    label: option[labelKey],
  }));

  const selectedLabels = React.useMemo(
    () =>
      preparedOptions
        ?.filter((option) => value?.includes(option.id))
        .map((option) => option.label)
        .join(', '),
    [options, value],
  );

  const handleSelect = (id: number) => {
    if (value?.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...(value || []), id]);
    }
  };

  const preparedValue = value && value.length > 0 ? selectedLabels : placeholder || 'Select...';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
          <span className="block truncate" title={preparedValue}>
            {preparedValue}
          </span>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command shouldFilter={false}>
          {onSearchQueryChange ? (
            <CommandInput
              placeholder="Search..."
              value={searchQuery}
              onValueChange={onSearchQueryChange}
            />
          ) : null}
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {preparedOptions?.map((option) => {
                const selected = value?.includes(option.id);

                return (
                  <CommandItem key={option.id} onSelect={() => handleSelect(option.id)}>
                    <Check className={cn('mr-2 h-4 w-4', selected ? 'opacity-100' : 'opacity-0')} />
                    {option.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
