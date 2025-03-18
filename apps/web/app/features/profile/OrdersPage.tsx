import { useQuery } from '@tanstack/react-query'
import { QueryBoundary } from '~web/components/QueryBoundary'
import { getOrdersQueryOptions } from './actions'
import { OrderCard } from './components/OrderCard'

export const OrdersPage = () => {
  const getOrdersQuery = useQuery(
    getOrdersQueryOptions({
      order: '-created_at'
    })
  )

  return (
    <section className="layout-section gap-8 !self-start">
      <h2 className="text-2xl font-semibold">Orders</h2>
      <QueryBoundary query={getOrdersQuery}>
        {({ orders }) => (
          <div className="flex flex-col gap-4">
            {orders.map(order => (
              <OrderCard
                key={order.id}
                order={order}
              />
            ))}
          </div>
        )}
      </QueryBoundary>
    </section>
  )
}
