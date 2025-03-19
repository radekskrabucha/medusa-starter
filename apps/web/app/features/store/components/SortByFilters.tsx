import type React from 'react'
import type { OnChangeParams } from '../types'
import { createPrimitiveFilterMatcher } from '../utils'
import type { StoreSearch, StoreSortOptions } from '../validationSchemas'
import { FilterCheckboxItem, type CheckboxValue } from './FilterCheckboxItem'
import { FiltersLabel } from './FilterLabel'

type SortByFiltersProps = {
  options: StoreSearch
}

export const SortByFilters: React.FC<SortByFiltersProps> = ({ options }) => {
  const matchFilter = createPrimitiveFilterMatcher(options)

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
    </>
  )
}

const handleFilterCheckboxChange = <T extends StoreSortOptions>({
  checked,
  option,
  prevState,
  value
}: OnChangeParams<T, CheckboxValue<T>>): StoreSearch => {
  if (checked) {
    const { [option]: _, ...rest } = prevState

    return rest
  }

  return {
    ...prevState,
    [option]: value
  }
}
