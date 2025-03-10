import { buttonVariants } from '@medusa-starter/ui/button'
import { Card, CardContent, CardHeader } from '@medusa-starter/ui/card'
import { Separator } from '@medusa-starter/ui/separator'
import { Link } from '@tanstack/react-router'
import { Filter } from 'lucide-react'
import { calculateAppliedFilters, storePageRouteApi } from '../utils'
import { CategoriesFilter } from './CategoriesFilter'
import { CollectionsFilter } from './CollectionsFilter'
import { SortByFilters } from './SortByFilters'

export const Filters = () => {
  const options = storePageRouteApi.useSearch()
  const appliedFilters = calculateAppliedFilters(options)

  return (
    <aside className="layout-section !self-start">
      <Card>
        <CardHeader className="flex-row flex-wrap items-center justify-between">
          <div className="flex shrink-0 items-center gap-2">
            <Filter className="size-4 shrink-0" />
            <h3 className="text-2xl font-semibold">
              Filters{' '}
              {appliedFilters ? (
                <span className="text-muted-foreground text-sm">
                  ({appliedFilters})
                </span>
              ) : null}
            </h3>
          </div>
          {appliedFilters ? (
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
          <SortByFilters options={options} />
          <Separator />
          <CollectionsFilter options={options} />
          <Separator />
          <CategoriesFilter options={options} />
        </CardContent>
      </Card>
    </aside>
  )
}
