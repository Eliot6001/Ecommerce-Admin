"use client"

import * as React from "react"
import { Check, CheckIcon, ChevronsUpDown, PlusCircle, Store, StoreIcon } from "lucide-react"


import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


import { useStoreModal } from "@/hooks/useStoreModal"
import { useParams, useRouter } from "next/navigation"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>
interface StoreSwitcherProps extends PopoverTriggerProps{
  items: Record<string, any>[];
}

export function StoreSwitcher({
  className,
  items = []
}: StoreSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items?.map((item) => ({
    label: item.name,
    value: item.id
  }));
  const currentStore = formattedItems?.find((item) => item.value === params.storeId);
  const onStoreSelect = (store: {value: String, label: String}) => {
    setOpen(false);
    router.push(`${store.value}`)
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
          size="sm"
        >
          <Store className={"mr-2 h-4 w-4"}/>
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" >
        <Command >
          <CommandList >
            <CommandInput placeholder="Select Store..." />
            <CommandEmpty>No Store, Create a new one</CommandEmpty>
            <CommandGroup heading="Stores" >
              {formattedItems.map((store) =>
              (
                <CommandItem key={store.value} onSelect={() => onStoreSelect(store)} className="text-sm">
                <StoreIcon className="mr-2"/>
                {store.label}
                <Check className={cn("ml-auto h-4 w-4", currentStore?.value === store.value ? "opacity-100": "opacity-0")}/>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator/>
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  storeModal.onOpen()
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
