import type { OnChangeParams } from '../types'
import { createArrayFilterMatcher, storePageRouteApi } from '../utils'
import type { StoreSearch, StoreSortOptions } from '../validationSchemas'
import { FiltersLabel } from './FilterLabel'
import { FilterRadioItem, type RadioValue } from './FilterRadioItem'

type CategoriesFilterProps = {
  options: StoreSearch
}

export const CategoriesFilter: React.FC<CategoriesFilterProps> = ({
  options
}) => {
  const { categoriesData } = storePageRouteApi.useLoaderData()
  const matchFilter = createArrayFilterMatcher(options)

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

const handleFilterCheckboxChange = <T extends StoreSortOptions>({
  checked,
  option,
  prevState,
  value
}: OnChangeParams<T, RadioValue<T>>): StoreSearch => {
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
