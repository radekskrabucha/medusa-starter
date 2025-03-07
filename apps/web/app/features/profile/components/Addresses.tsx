import { buttonVariants } from '@medusa-starter/ui/button'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { QueryBoundary } from '~web/components/QueryBoundary'
import { getAddressesQueryOptions } from '../actions'
import { AddressSummaryTile } from './AddressSummaryTile'

export const Addresses = () => {
  const getAddressesQuery = useQuery(getAddressesQueryOptions({}))

  return (
    <QueryBoundary
      query={getAddressesQuery}
      isDataEmpty={data => data?.addresses.length === 0}
      noDataFallback={
        <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
          <p className="text-muted-foreground">No shipping addresses found</p>
          <Link
            to="/profile/shipping-addresses/add"
            className={buttonVariants({ variant: 'outline' })}
          >
            Add your first address
          </Link>
        </div>
      }
    >
      {data => (
        <div className="flex flex-col gap-4">
          {data.addresses.map(address => (
            <AddressSummaryTile
              key={address.id}
              address={address}
            />
          ))}
        </div>
      )}
    </QueryBoundary>
  )
}
