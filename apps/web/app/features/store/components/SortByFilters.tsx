import { Separator } from '@medusa-starter/ui/separator'
import type React from 'react'
import type { StoreSearch, StoreSortOptions } from '../validationSchemas'
import { FilterCheckboxItem, type OnChangeParams } from './FilterCheckboxItem'
import { FiltersLabel } from './FilterLabel'

type SortByFiltersProps = {
  options: StoreSearch
}

export const SortByFilters: React.FC<SortByFiltersProps> = ({ options }) => {
  const matchFilter = createFilterMatcher(options)

  return (
    <>
      <FiltersLabel>Sort by date</FiltersLabel>
      <FilterCheckboxItem
        label="From oldest to newest"
        value="created_at"
        option="order"
        isChecked={matchFilter}
        onChange={handleFilterCheckboxChange}
      />
      <FilterCheckboxItem
        label="From newest to oldest"
        value="-created_at"
        option="order"
        isChecked={matchFilter}
        onChange={handleFilterCheckboxChange}
      />
      <Separator />
      <FiltersLabel>Sort by price</FiltersLabel>
      <FilterCheckboxItem
        label="From lowest to highest"
        value="price_asc"
        option="order"
        isChecked={matchFilter}
        onChange={handleFilterCheckboxChange}
      />
      <FilterCheckboxItem
        label="From highest to lowest"
        value="price_desc"
        option="order"
        isChecked={matchFilter}
        onChange={handleFilterCheckboxChange}
      />
    </>
  )
}

const createFilterMatcher =
  (options: StoreSearch) =>
  <T extends StoreSortOptions>(option: T, value: StoreSearch[T]) =>
    options[option] === value

const handleFilterCheckboxChange = <T extends StoreSortOptions>({
  checked,
  option,
  prevState,
  value
}: OnChangeParams<T>): StoreSearch => {
  if (checked) {
    const { [option]: _, ...rest } = prevState

    return rest
  }

  return {
    ...prevState,
    [option]: value
  }
}
