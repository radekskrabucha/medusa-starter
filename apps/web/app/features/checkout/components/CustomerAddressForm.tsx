import type { Cart, Customer } from '@medusa-starter/medusa-utils/models'
import { Card, CardContent } from '@medusa-starter/ui/card'
import { SubmitButton } from '@medusa-starter/ui/components/form/submit-button'
import { StatusMessage } from '@medusa-starter/ui/status-message'
import { cn } from '@medusa-starter/ui/utils/styles'
import { getName } from '@medusa-starter/utils/name'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { useUpdateCart } from '~web/features/cart/hooks/useUpdateCart'

const customerAddressSchema = z.object({
  id: z.string().min(1, 'Please select an address')
})

type CustomerAddressFormProps = {
  onSuccess: VoidFunction
  customer: Customer
  cart: Cart
  selectedCountry: string | undefined
}

export const CustomerAddressForm: React.FC<CustomerAddressFormProps> = ({
  onSuccess,
  customer,
  cart,
  selectedCountry
}) => {
  const updateCartMutation = useUpdateCart(cart.id, onSuccess)

  const form = useForm({
    onSubmit: ({ value }) => {
      const selectedAddress = customer.addresses.find(
        address => address.id === value.id
      )

      if (!selectedAddress) {
        throw new Error('No address found')
      }

      const address = {
        first_name: selectedAddress.first_name ?? undefined,
        last_name: selectedAddress.last_name ?? undefined,
        phone: selectedAddress.phone ?? undefined,
        company: selectedAddress.company ?? undefined,
        address_1: selectedAddress.address_1 ?? undefined,
        address_2: selectedAddress.address_2 ?? undefined,
        city: selectedAddress.city ?? undefined,
        province: selectedAddress.province ?? undefined,
        postal_code: selectedAddress.postal_code ?? undefined,
        country_code: selectedCountry ?? undefined
      }

      updateCartMutation.mutate({
        body: {
          shipping_address: address,
          billing_address: address
        }
      })
    },
    defaultValues: {
      id: ''
    },
    validators: {
      onSubmit: customerAddressSchema
    }
  })

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()

        form.handleSubmit()
      }}
      noValidate
    >
      <form.Field name="id">
        {field => (
          <>
            {customer.addresses.map(address => (
              <AddressOption
                key={address.id}
                address={address}
                isSelected={field.state.value === address.id}
                onSelect={field.handleChange}
              />
            ))}
            {field.state.meta.errors?.[0]?.message && (
              <StatusMessage variant="error">
                {field.state.meta.errors?.[0]?.message}
              </StatusMessage>
            )}
          </>
        )}
      </form.Field>
      <SubmitButton
        text="Continue to Delivery"
        isPending={updateCartMutation.isPending}
      />
    </form>
  )
}

const AddressOption = ({
  address,
  isSelected,
  onSelect
}: {
  address: Customer['addresses'][number]
  isSelected: boolean
  onSelect: (value: string) => void
}) => (
  <label className="cursor-pointer">
    <Card
      className={cn(
        'transition-colors',
        isSelected ? 'border-primary bg-primary/15' : 'hover:border-primary'
      )}
    >
      <input
        type="radio"
        name="address-option"
        value={address.id}
        checked={isSelected}
        onChange={() => onSelect(address.id)}
        className="sr-only"
      />
      <CardContent className="flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <div
              className={cn(
                'size-4 rounded-full border transition-colors',
                isSelected
                  ? 'border-primary border-4'
                  : 'border-muted-primary border-2'
              )}
            />
          </div>
          <div className="text-muted-foreground text-sm">
            <p className="text-foreground font-medium">
              {address.address_name}
            </p>
            <p>
              {getName({
                firstName: address.first_name,
                lastName: address.last_name
              })}
            </p>
            <p>{address.address_1}</p>
            {address.address_2 && <p>{address.address_2}</p>}
            <p>
              {address.city}, {address.province} {address.postal_code}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </label>
)
