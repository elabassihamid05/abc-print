import * as React from "react";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Badge, Button, Checkbox, MantineSize } from "@mantine/core";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command";

type OptionT = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};

interface MultiSelectFilterProps {
  selectedValues?: OptionT[];
  title?: string;
  options: OptionT[];
  size?: MantineSize;
  selectedUiLimit?: number;
  align?: "center" | "start" | "end";
  onChange?: (selectedValues: OptionT[]) => any;
  onClearFilter?: () => any;
}

export function MultiSelectFilter({
  selectedValues = [],
  title,
  options,
  size = "sm",
  selectedUiLimit = 1,
  align = "end",
  onChange = (selectedValues) => {},
  onClearFilter = () => {},
}: MultiSelectFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size={size}
          className="!text-slate-700 !border !border-slate-300"
        >
          <PlusCircledIcon className="w-4 h-4 mr-2" />

          {title}

          {selectedValues?.length > 0 && (
            <>
              <div className="h-full py-1.5 mx-2">
                <div className="shrink-0 bg-slate-200 h-full w-[1px] " />
              </div>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.length > selectedUiLimit ? (
                  <Badge
                    color="gray"
                    variant="light"
                    size={size}
                    className="px-1 font-normal rounded-sm"
                  >
                    {selectedValues.length} selected
                  </Badge>
                ) : (
                  selectedValues
                    .filter((option) => !!option.value)
                    .map((option) => (
                      <Badge
                        color="gray"
                        variant="light"
                        size={size}
                        key={option.value}
                        className="px-1 font-normal rounded-sm truncate max-w-[6rem]"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align={align}>
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = !!selectedValues.find(
                  (v) => v.value === option.value
                );

                return (
                  <CommandItem
                    value={option?.label + option?.value}
                    key={option?.value}
                    title={option?.label || ""}
                    onSelect={() => {
                      let _selectedValues = [...selectedValues];

                      try {
                        if (isSelected) {
                          _selectedValues = _selectedValues.filter(
                            (item) => item.value !== option.value
                          );
                        } else {
                          _selectedValues = [..._selectedValues, option];
                        }
                      } catch (error) {}

                      onChange(_selectedValues);
                    }}
                  >
                    <Checkbox
                      checked={isSelected}
                      className="mr-2"
                      size="xs"
                      color="gray"
                      onChange={() => {}}
                    />
                    {option.icon ? option.icon : null}
                    <span className="break-all line-clamp-1">
                      {option?.label}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.length > 0 && (
              <CommandGroup className="sticky bottom-0 bg-white border-t">
                <CommandItem
                  onSelect={() => onClearFilter()}
                  className="justify-center text-center"
                >
                  Clear {title ? title.toLocaleLowerCase() : ""}
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
