import { Checkbox } from '@medusa-starter/ui/checkbox'
import { Label } from '@medusa-starter/ui/label'
import { Link } from '@tanstack/react-router'
import type { IsChecked, OnChange } from '../types'
import type { StoreSortOptions, StoreSearch } from '../validationSchemas'

export type CheckboxValue<T extends StoreSortOptions> = StoreSearch[T]

type FilterCheckboxItemProps<T extends StoreSortOptions, TValue> = {
  label: React.ReactNode
  value: StoreSearch[T]
  option: T
  isChecked: IsChecked<T, TValue>
  onChange: OnChange<T, TValue>
}

export const FilterCheckboxItem = <T extends StoreSortOptions>({
  label,
  value,
  option,
  isChecked,
  onChange
}: FilterCheckboxItemProps<T, CheckboxValue<T>>) => {
  const checked = isChecked(option, value)

  return (
    <Link
      to="/store"
      replace
      search={prevState => onChange({ prevState, checked, value, option })}
      className="flex items-center gap-2 self-start"
    >
      <Checkbox
        checked={checked}
        id={option}
        name={option}
        className="shrink-0"
      />
      <Label htmlFor={option}>{label}</Label>
    </Link>
  )
}
