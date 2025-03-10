import { buttonVariants } from '@medusa-starter/ui/button'
import { Card, CardContent, CardHeader } from '@medusa-starter/ui/card'
import { Separator } from '@medusa-starter/ui/separator'
import { Link } from '@tanstack/react-router'
import { Filter } from 'lucide-react'
import { storePageRouteApi } from '../utils'
import type { StoreSortOptions, StoreSearch } from '../validationSchemas'
import { FilterCheckboxItem, type OnChangeParams } from './FilterCheckboxItem'

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

export const Filters = () => {
  const options = storePageRouteApi.useSearch()
  const matchFilter = createFilterMatcher(options)
  const optionsLength = Object.keys(options).length

  return (
    <aside className="layout-section !self-start">
      <Card>
        <CardHeader className="flex-row flex-wrap items-center justify-between">
          <div className="flex shrink-0 items-center gap-2">
            <Filter className="size-4 shrink-0" />
            <h3 className="text-2xl font-semibold">
              Filters{' '}
              {optionsLength ? (
                <span className="text-muted-foreground text-sm">
                  ({optionsLength})
                </span>
              ) : null}
            </h3>
          </div>
          {optionsLength ? (
            <Link
              to="/store"
              replace
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              Clear Filters
            </Link>
          ) : null}
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Separator />
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
        </CardContent>
      </Card>
    </aside>
  )
}

const FiltersLabel: React.FC<React.PropsWithChildren> = ({ children }) => (
  <h3 className="text-md font-semibold">{children}</h3>
)
