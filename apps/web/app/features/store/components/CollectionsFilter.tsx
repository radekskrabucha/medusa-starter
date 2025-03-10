import type { OnChangeParams } from '../types'
import { createArrayFilterMatcher, storePageRouteApi } from '../utils'
import type { StoreSearch, StoreSortOptions } from '../validationSchemas'
import { FiltersLabel } from './FilterLabel'
import { FilterRadioItem, type RadioValue } from './FilterRadioItem'

type CollectionsFilterProps = {
  options: StoreSearch
}

export const CollectionsFilter: React.FC<CollectionsFilterProps> = ({
  options
}) => {
  const { collectionsData } = storePageRouteApi.useLoaderData()
  const matchFilter = createArrayFilterMatcher(options)

  return (
    <>
      <FiltersLabel>Collections</FiltersLabel>
      {collectionsData.collections.map(collection => (
        <FilterRadioItem
          key={collection.id}
          label={collection.title}
          value={collection.handle}
          option="collections"
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
  const { [option]: _collections, ...rest } = prevState
  const collections = _collections as StoreSearch['collections']

  if (checked) {
    if (collections?.length === 1) {
      return rest
    }
    return {
      ...rest,
      collections: collections?.filter(collection => collection !== value)
    }
  }

  if (!value) {
    return rest
  }

  return {
    ...rest,
    collections: collections ? [...collections, value] : [value]
  }
}
