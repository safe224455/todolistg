'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

interface Option {
  label: string;
  value: string;
  data: any;
}

interface MultiSelectProps {
  options: Option[];
  selected: any[];
  onChange: (selected: any[]) => void;
  placeholder?: string;
}

export function MultiSelect({ 
  options, 
  selected, 
  onChange, 
  placeholder = "Select items..." 
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (option: Option) => {
    const isSelected = selected.find(item => item.id === option.data.id);
    if (isSelected) {
      onChange(selected.filter(item => item.id !== option.data.id));
    } else {
      onChange([...selected, option.data]);
    }
  };

  const handleRemove = (selectedItem: any) => {
    onChange(selected.filter(item => item.id !== selectedItem.id));
  };

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => handleSelect(option)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected.find(item => item.id === option.data.id) 
                        ? "opacity-100" 
                        : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex flex-wrap gap-2">
        {selected.map((selectedItem) => (
          <Badge
            key={selectedItem.id}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {selectedItem.name}
            <button
              className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
              onClick={() => handleRemove(selectedItem)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}