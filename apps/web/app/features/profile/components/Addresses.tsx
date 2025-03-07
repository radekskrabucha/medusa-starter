import { buttonVariants } from '@medusa-starter/ui/button'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { Truck } from 'lucide-react'
import { EmptyState } from '~web/components/EmptyState'
import { QueryBoundary } from '~web/components/QueryBoundary'
import { useSyncAuthToken } from '~web/hooks/useSyncAuthToken'
import { getMeQueryOptions } from '../actions'
import { AddressSummaryTile } from './AddressSummaryTile'

export const Addresses = () => {
  const token = useSyncAuthToken()
  const getMeQuery = useQuery(getMeQueryOptions(token))

  return (
    <QueryBoundary
      query={getMeQuery}
      isDataEmpty={data => data?.customer.addresses.length === 0}
      noDataFallback={
        <EmptyState
          title="No shipping addresses found"
          description="Create your first shipping address to start receiving shipments."
          action={
            <Link
              to="/profile/shipping-addresses/add"
              className={buttonVariants({ variant: 'outline' })}
            >
              Add your first address
            </Link>
          }
          icon={Truck}
        />
      }
    >
      {data => (
        <div className="flex flex-col gap-4">
          {data.customer.addresses.map(address => (
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
