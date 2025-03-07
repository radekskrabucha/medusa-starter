import { DeleteAddressButton } from './components/DeleteAddressButton'
import { EditShippingAddressForm } from './components/EditShippingAddressForm'
import { editAddressPageRouteApi } from './utils'

export const EditShippingAddressPage = () => {
  const { id } = editAddressPageRouteApi.useParams()

  return (
    <section className="layout-section gap-8 !self-start">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-2xl font-semibold">Edit Shipping Address</h2>
        <DeleteAddressButton id={id} />
      </div>
      <EditShippingAddressForm id={id} />
    </section>
  )
}
