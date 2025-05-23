import { buttonVariants } from '@medusa-starter/ui/button'
import { Link } from '@tanstack/react-router'
import { Truck } from 'lucide-react'
import { EmptyState } from '~web/components/EmptyState'
import { QueryBoundary } from '~web/components/QueryBoundary'
import { useGetMeQuery } from '~web/features/auth/hooks/useGetMeQuery'
import { AddressSummaryTile } from './AddressSummaryTile'

export const Addresses = () => {
  const { getMeQuery } = useGetMeQuery()

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
              to="/profile/shipping-address/add"
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
        <div className="flex flex-col gap-6">
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
