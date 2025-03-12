import type { CartShippingAddress } from '@medusa-starter/medusa-utils/models'
import { CheckboxForm } from '@medusa-starter/ui/components/form/checkbox-form'
import { InputForm } from '@medusa-starter/ui/components/form/input-form'
import { SubmitButton } from '@medusa-starter/ui/components/form/submit-button'
import { phoneNumberRegex } from '@medusa-starter/utils/regex'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { useUpdateCart } from '~web/features/cart/hooks/useUpdateCart'

const shippingAddressSchema = z.object({
  address1: z.string().min(2, 'Address 1 must be at least 2 characters'),
  address2: z.string(),
  city: z.string().min(2, 'City must be at least 2 characters'),
  company: z.string(),
  countryCode: z.string().min(2, 'Country code must be at least 2 characters'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().regex(phoneNumberRegex, 'Invalid phone number'),
  postalCode: z.string().min(2, 'Postal code must be at least 2 characters'),
  province: z.string().min(2, 'Province must be at least 2 characters')
})

const addressSchema = z
  .object({
    billingSameAddress: z.boolean()
  })
  .extend(shippingAddressSchema.shape)

type AddressFormProps = {
  address: CartShippingAddress | undefined
  cartId: string
}

export const AddressForm: React.FC<AddressFormProps> = ({
  address,
  cartId
}) => {
  const updateCartMutation = useUpdateCart(cartId)
  const form = useForm({
    onSubmit: ({ value }) => {
      const addressData = {
        address_1: value.address1,
        address_2: value.address2 ? value.address2 : undefined,
        city: value.city,
        company: value.company ? value.company : undefined,
        country_code: value.countryCode,
        first_name: value.firstName,
        last_name: value.lastName,
        phone: value.phone,
        postal_code: value.postalCode,
        province: value.province
      }

      updateCartMutation.mutate({
        body: {
          shipping_address: addressData,
          billing_address: value.billingSameAddress ? addressData : undefined
        }
      })
    },
    defaultValues: {
      address1: address?.address_1 ?? '',
      address2: address?.address_2 ?? '',
      city: address?.city ?? '',
      company: address?.company ?? '',
      countryCode: address?.country_code ?? '',
      firstName: address?.first_name ?? '',
      lastName: address?.last_name ?? '',
      phone: address?.phone ?? '',
      postalCode: address?.postal_code ?? '',
      province: address?.province ?? '',
      billingSameAddress: true
    },
    validators: {
      onSubmit: addressSchema
    }
  })

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()

        form.handleSubmit()
      }}
      noValidate
    >
      <div className="flex gap-4">
        <form.Field name="firstName">
          {field => (
            <InputForm
              fieldName={field.name}
              label="First name"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="John"
              disabled={updateCartMutation.isPending}
              errorMessage={field.state.meta.errors?.[0]?.message}
            />
          )}
        </form.Field>

        <form.Field name="lastName">
          {field => (
            <InputForm
              fieldName={field.name}
              label="Last name"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="Doe"
              disabled={updateCartMutation.isPending}
              errorMessage={field.state.meta.errors?.[0]?.message}
            />
          )}
        </form.Field>
      </div>

      <div className="flex gap-4">
        <form.Field name="phone">
          {field => (
            <InputForm
              fieldName={field.name}
              label="Phone number"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="+1 234 567 890"
              disabled={updateCartMutation.isPending}
              errorMessage={field.state.meta.errors?.[0]?.message}
            />
          )}
        </form.Field>

        <form.Field name="company">
          {field => (
            <InputForm
              fieldName={field.name}
              label="Company name"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="Company Ltd."
              disabled={updateCartMutation.isPending}
              errorMessage={field.state.meta.errors?.[0]?.message}
            />
          )}
        </form.Field>
      </div>

      <form.Field name="address1">
        {field => (
          <InputForm
            fieldName={field.name}
            label="Address line 1"
            value={field.state.value}
            onChange={e => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder="123 Main St"
            disabled={updateCartMutation.isPending}
            errorMessage={field.state.meta.errors?.[0]?.message}
          />
        )}
      </form.Field>

      <form.Field name="address2">
        {field => (
          <InputForm
            fieldName={field.name}
            label="Address line 2"
            value={field.state.value}
            onChange={e => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder="Apt 4B"
            disabled={updateCartMutation.isPending}
            errorMessage={field.state.meta.errors?.[0]?.message}
          />
        )}
      </form.Field>

      <form.Field name="city">
        {field => (
          <InputForm
            fieldName={field.name}
            label="City"
            value={field.state.value}
            onChange={e => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder="New York"
            disabled={updateCartMutation.isPending}
            errorMessage={field.state.meta.errors?.[0]?.message}
          />
        )}
      </form.Field>

      <div className="flex gap-4">
        <form.Field name="province">
          {field => (
            <InputForm
              fieldName={field.name}
              label="Province/State"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="NY"
              disabled={updateCartMutation.isPending}
              errorMessage={field.state.meta.errors?.[0]?.message}
            />
          )}
        </form.Field>

        <form.Field name="postalCode">
          {field => (
            <InputForm
              fieldName={field.name}
              label="Postal code"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="10001"
              disabled={updateCartMutation.isPending}
              errorMessage={field.state.meta.errors?.[0]?.message}
            />
          )}
        </form.Field>
      </div>

      <form.Field name="billingSameAddress">
        {field => (
          <CheckboxForm
            fieldName={field.name}
            label="Billing address same as shipping address"
            checked={field.state.value}
            onCheckedChange={checked =>
              typeof checked === 'boolean' && field.handleChange(checked)
            }
            onBlur={field.handleBlur}
            disabled={updateCartMutation.isPending}
            errorMessage={field.state.meta.errors?.[0]?.message}
          />
        )}
      </form.Field>

      <SubmitButton
        isPending={updateCartMutation.isPending}
        text="Update Address"
      />
    </form>
  )
}
