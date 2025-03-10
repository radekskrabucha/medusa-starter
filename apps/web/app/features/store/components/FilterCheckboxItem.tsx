import { Checkbox } from '@medusa-starter/ui/checkbox'
import { Label } from '@medusa-starter/ui/label'
import { Link } from '@tanstack/react-router'
import type { StoreSortOptions, StoreSearch } from '../validationSchemas'

export type IsChecked<T extends StoreSortOptions> = (
  option: T,
  value: StoreSearch[T]
) => boolean

export type State = StoreSearch
export type OnChangeParams<T extends StoreSortOptions> = {
  prevState: State
  checked: boolean
  value: StoreSearch[T]
  option: T
}
export type OnChange<T extends StoreSortOptions> = (
  params: OnChangeParams<T>
) => State

type FilterCheckboxItemProps<T extends StoreSortOptions> = {
  label: React.ReactNode
  value: StoreSearch[T]
  option: T
  isChecked: IsChecked<T>
  onChange: OnChange<T>
}

export const FilterCheckboxItem = <T extends StoreSortOptions>({
  label,
  value,
  option,
  isChecked,
  onChange
}: FilterCheckboxItemProps<T>) => {
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
