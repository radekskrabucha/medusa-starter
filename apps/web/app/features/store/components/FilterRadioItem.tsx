import { Label } from '@medusa-starter/ui/label'
import {
  RadioGroupIndicator,
  RadioGroupItemButton
} from '@medusa-starter/ui/radio-group'
import type { ArrayElementType } from '@medusa-starter/utils/types'
import { Link } from '@tanstack/react-router'
import type { IsChecked, OnChange } from '../types'
import type { StoreSortOptions, StoreSearch } from '../validationSchemas'

export type Value<T extends StoreSortOptions> = ArrayElementType<StoreSearch[T]>

type FilterRadioItemProps<T extends StoreSortOptions, TValue> = {
  label: React.ReactNode
  value: TValue
  option: T
  isChecked: IsChecked<T, TValue>
  onChange: OnChange<T, TValue>
}

export const FilterRadioItem = <T extends StoreSortOptions>({
  label,
  value,
  option,
  isChecked,
  onChange
}: FilterRadioItemProps<T, Value<T>>) => {
  const checked = isChecked(option, value)

  return (
    <Link
      to="/store"
      replace
      search={prevState => onChange({ prevState, checked, value, option })}
      className="flex items-center gap-2 self-start"
    >
      <RadioGroupItemButton
        aria-checked={checked}
        className="border-primary group text-primary focus-visible:ring-ring aspect-square h-4 w-4 rounded-full border shadow focus:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <RadioGroupIndicator>
          <span className="bg-primary hidden size-2 shrink-0 rounded-full group-aria-checked:block" />
        </RadioGroupIndicator>
      </RadioGroupItemButton>
      <Label htmlFor={option}>{label}</Label>
    </Link>
  )
}
