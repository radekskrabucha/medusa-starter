import type { OnChangeParams } from '../types'
import { storePageRouteApi } from '../utils'
import type { StoreSearch, StoreSortOptions } from '../validationSchemas'
import { FiltersLabel } from './FilterLabel'
import { FilterRadioItem, type Value } from './FilterRadioItem'

type CategoriesFilterProps = {
  options: StoreSearch
}

export const CategoriesFilter: React.FC<CategoriesFilterProps> = ({
  options
}) => {
  const { categoriesData } = storePageRouteApi.useLoaderData()
  const matchFilter = createFilterMatcher(options)

  return (
    <>
      <FiltersLabel>Categories</FiltersLabel>
      {categoriesData.product_categories.map(category => (
        <FilterRadioItem
          key={category.id}
          label={category.name}
          value={category.handle}
          option="categories"
          isChecked={matchFilter}
          onChange={handleFilterCheckboxChange}
        />
      ))}
    </>
  )
}

const createFilterMatcher =
  (options: StoreSearch) =>
  <T extends StoreSortOptions>(option: T, value: Value<T>) => {
    if (!value) {
      return false
    }

    const selectedOption = options[option]

    if (!selectedOption) {
      return false
    }

    return selectedOption?.includes(value)
  }

const handleFilterCheckboxChange = <T extends StoreSortOptions>({
  checked,
  option,
  prevState,
  value
}: OnChangeParams<T, Value<T>>): StoreSearch => {
  const { [option]: _categories, ...rest } = prevState
  const categories = _categories as StoreSearch['categories']

  if (checked) {
    if (categories?.length === 1) {
      return rest
    }
    return {
      ...rest,
      categories: categories?.filter(category => category !== value)
    }
  }

  if (!value) {
    return rest
  }

  return {
    ...rest,
    categories: categories ? [...categories, value] : [value]
  }
}
