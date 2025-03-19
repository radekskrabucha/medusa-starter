import { calculateOffset } from '@medusa-starter/utils/pagination'
import { useQuery } from '@tanstack/react-query'
import { PaginationWithMeta } from '~web/components/PaginationWithMeta'
import { QueryBoundary } from '~web/components/QueryBoundary'
import { getOrdersQueryOptions } from './actions'
import { OrderCard } from './components/OrderCard'
import { ordersPageRouteApi } from './utils'

const ORDER_LIMIT = 6

export const OrdersPage = () => {
  const search = ordersPageRouteApi.useSearch()
  const page = search.page ?? 1
  const getOrdersQuery = useQuery(
    getOrdersQueryOptions({
      order: '-created_at',
      limit: ORDER_LIMIT,
      offset: calculateOffset(page, ORDER_LIMIT)
    })
  )

  return (
    <section className="layout-section gap-8 !self-start">
      <h2 className="text-2xl font-semibold">Orders</h2>
      <QueryBoundary query={getOrdersQuery}>
        {data => (
          <>
            <div className="flex flex-col gap-4">
              {data.orders.map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                />
              ))}
            </div>
            <PaginationWithMeta
              page={page}
              limit={data.limit}
              offset={data.offset}
              total={data.count}
              to="/profile/orders"
              getQuery={page => ({
                search: {
                  page
                }
              })}
            />
          </>
        )}
      </QueryBoundary>
    </section>
  )
}
