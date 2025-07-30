import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList,
  CommandInput,
  CommandItem,
} from '~/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';

export type Option = {
  id: number;
  label: string;
};

export type SingleSelectProps<Data extends Record<string, any>> = {
  options?: Data[];
  value?: number;
  searchQuery?: string;
  labelKey: string;
  onSearchQueryChange?: (query: string) => void;
  onChange: (value: number | null) => void;
  placeholder?: string;
};

export function SingleSelect<Data extends Record<string, any>>({
  options,
  value,
  searchQuery,
  onSearchQueryChange,
  labelKey,
  onChange,
  placeholder,
}: SingleSelectProps<Data>) {
  const [open, setOpen] = React.useState(false);

  const preparedOptions: Option[] | undefined = options?.map((option) => ({
    id: option.id,
    label: option[labelKey],
  }));

  const selectedLabel = React.useMemo(
    () => preparedOptions?.find((opt) => opt.id === value)?.label,
    [preparedOptions, value],
  );

  const handleSelect = (id: number) => {
    if (id === value) {
      onChange(null);
      setOpen(false);
    } else {
      onChange(id);
      setOpen(false);
    }

    onSearchQueryChange?.('');
  };

  const preparedValue = selectedLabel || placeholder || 'Select...';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
          <span className="block truncate" title={preparedValue}>
            {preparedValue}
          </span>
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
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
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {preparedOptions?.map((opt) => (
                <CommandItem
                  key={opt.id}
                  onSelect={() => handleSelect(opt.id)}
                  className={cn(
                    'flex items-center justify-between',
                    opt.id === value && 'bg-accent',
                  )}
                >
                  {opt.label}
                  {opt.id === value && <Check className="h-4 w-4" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
