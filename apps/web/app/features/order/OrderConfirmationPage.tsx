import { orderConfirmationPageRouteApi } from '~web/features/order/utils'

export const OrderConfirmationPage = () => {
  const data = orderConfirmationPageRouteApi.useLoaderData()

  return (
    <section className="layout-section">
      <h1 className="text-2xl font-bold">Order Confirmed</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  )
}
