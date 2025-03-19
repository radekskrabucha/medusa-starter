import type { Customer } from '@medusa-starter/medusa-utils/models'
import type { Cart } from '@medusa-starter/medusa-utils/models'
import { useState } from 'react'
import { AddressForm } from './AddressForm'
import { CustomerAddressForm } from './CustomerAddressForm'

type CustomerAddressProps = {
  onSuccess: VoidFunction
  cart: Cart
  customer: Customer
  isFilled: boolean
  selectedCountry: string | undefined
}

export const CustomerAddress: React.FC<CustomerAddressProps> = ({
  onSuccess,
  cart,
  customer,
  isFilled,
  selectedCountry
}) => {
  const [view, setView] = useState<'form' | 'select'>(
    isFilled ? 'form' : 'select'
  )

  return (
    <>
      {view === 'form' ? (
        <div className="flex flex-col gap-8">
          <p className="text-muted-foreground text-sm">
            Fill out the form below to use a new address for shipping and
            billing or{' '}
            <button
              className="text-foreground inline cursor-pointer underline underline-offset-4"
              onClick={() => setView('select')}
            >
              select an address from your address book
            </button>
            .
          </p>
          <AddressForm
            onSuccess={onSuccess}
            cart={cart}
            customer={customer}
            selectedCountry={selectedCountry}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <h3 className="text-lg font-medium">Select an address</h3>

          <CustomerAddressForm
            onSuccess={onSuccess}
            customer={customer}
            cart={cart}
            selectedCountry={selectedCountry}
          />

          <p className="text-muted-foreground text-sm">
            Can&apos;t find the address you need?{' '}
            <button
              className="text-foreground inline cursor-pointer underline underline-offset-4"
              onClick={() => setView('form')}
            >
              Set new shipping address
            </button>
            .
          </p>
        </div>
      )}
    </>
  )
}
