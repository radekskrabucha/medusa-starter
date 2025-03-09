import { Checkbox } from '@medusa-starter/ui/checkbox'
import { Label } from '@medusa-starter/ui/label'
import { Link } from '@tanstack/react-router'
import type { StoreSortOptions, StoreSearch } from '../validationSchemas'

export type IsChecked<T extends StoreSortOptions> = (
  option: T,
  value: StoreSearch[T]
) => boolean

type FilterCheckboxItemProps<T extends StoreSortOptions> = {
  label: React.ReactNode
  value: StoreSearch[T]
  option: T
  isChecked: IsChecked<T>
}

export const FilterCheckboxItem = <T extends StoreSortOptions>({
  label,
  value,
  option,
  isChecked
}: FilterCheckboxItemProps<T>) => {
  const checked = isChecked(option, value)

  return (
    <Link
      to="/store"
      replace
      search={prevState => {
        if (checked) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [option]: _, ...rest } = prevState

          return rest
        }

        return {
          ...prevState,
          [option]: value
        }
      }}
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
