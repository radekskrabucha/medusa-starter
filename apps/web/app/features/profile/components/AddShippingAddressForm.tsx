import { CheckboxForm } from '@medusa-starter/ui/components/form/checkbox-form'
import { InputForm } from '@medusa-starter/ui/components/form/input-form'
import { SubmitButton } from '@medusa-starter/ui/components/form/submit-button'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useGetMeQuery } from '~web/features/auth/hooks/useGetMeQuery'
import { actions } from '~web/lib/medusa'
import { shippingAddressSchema } from '../validationSchemas'

export const AddShippingAddressForm = () => {
  const navigate = useNavigate()
  const { getMeQuery, getMeQueryOptions } = useGetMeQuery()
  const queryClient = useQueryClient()

  const addShippingAddressMutation = useMutation({
    mutationFn: actions.customer.address.add,
    mutationKey: ['actions.customer.address.add'],
    onError: error => {
      toast.error('Failed to add shipping address', {
        description: error.message
      })
    },
    onSuccess: data => {
      toast.success('Shipping address added successfully')
      navigate({
        to: '/profile/shipping-address'
      })

      queryClient.setQueryData(getMeQueryOptions.queryKey, data)
    }
  })
  const form = useForm({
    onSubmit: ({
      value: {
        firstName,
        lastName,
        phoneNumber,
        companyName,
        addressName,
        address1,
        address2,
        city,
        province,
        postalCode,
        isDefaultBilling,
        isDefaultShipping
      }
    }) => {
      addShippingAddressMutation.mutate({
        body: {
          first_name: firstName ? firstName : undefined,
          last_name: lastName ? lastName : undefined,
          phone: phoneNumber ? phoneNumber : undefined,
          company: companyName ? companyName : undefined,
          address_name: addressName ? addressName : undefined,
          address_1: address1 ? address1 : undefined,
          address_2: address2 ? address2 : undefined,
          city: city ? city : undefined,
          province: province ? province : undefined,
          postal_code: postalCode ? postalCode : undefined,
          is_default_billing: isDefaultBilling ? isDefaultBilling : undefined,
          is_default_shipping: isDefaultShipping ? isDefaultShipping : undefined
        }
      })
    },
    defaultValues: {
      firstName: getMeQuery.data?.customer.first_name ?? '',
      lastName: getMeQuery.data?.customer.last_name ?? '',
      phoneNumber: getMeQuery.data?.customer.phone ?? '',
      companyName: getMeQuery.data?.customer.company_name ?? '',
      addressName: '',
      address1: '',
      address2: '',
      city: '',
      province: '',
      postalCode: '',
      isDefaultBilling: false,
      isDefaultShipping: false
    },
    validators: {
      onSubmit: shippingAddressSchema
    }
  })

  return (
    <form
      className="flex w-full max-w-md flex-col gap-4 max-sm:max-w-none"
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()

        form.handleSubmit()
      }}
      noValidate
    >
      <form.Field name="addressName">
        {field => (
          <InputForm
            fieldName={field.name}
            label="Address name"
            value={field.state.value}
            onChange={e => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder="Home"
            disabled={addShippingAddressMutation.isPending}
            errorMessage={field.state.meta.errors?.[0]?.message}
          />
        )}
      </form.Field>

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
              disabled={addShippingAddressMutation.isPending}
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
              disabled={addShippingAddressMutation.isPending}
              errorMessage={field.state.meta.errors?.[0]?.message}
            />
          )}
        </form.Field>
      </div>

      <div className="flex gap-4">
        <form.Field name="phoneNumber">
          {field => (
            <InputForm
              fieldName={field.name}
              label="Phone number"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="+1 234 567 890"
              disabled={addShippingAddressMutation.isPending}
              errorMessage={field.state.meta.errors?.[0]?.message}
            />
          )}
        </form.Field>

        <form.Field name="companyName">
          {field => (
            <InputForm
              fieldName={field.name}
              label="Company name"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="Company Ltd."
              disabled={addShippingAddressMutation.isPending}
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
            disabled={addShippingAddressMutation.isPending}
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
            disabled={addShippingAddressMutation.isPending}
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
            disabled={addShippingAddressMutation.isPending}
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
              disabled={addShippingAddressMutation.isPending}
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
              disabled={addShippingAddressMutation.isPending}
              errorMessage={field.state.meta.errors?.[0]?.message}
            />
          )}
        </form.Field>
      </div>

      <div className="flex flex-col gap-4">
        <form.Field name="isDefaultBilling">
          {field => (
            <CheckboxForm
              fieldName={field.name}
              label="Set as default billing address"
              checked={field.state.value}
              onCheckedChange={checked =>
                typeof checked === 'boolean' && field.handleChange(checked)
              }
              onBlur={field.handleBlur}
              disabled={addShippingAddressMutation.isPending}
              errorMessage={field.state.meta.errors?.[0]?.message}
            />
          )}
        </form.Field>

        <form.Field name="isDefaultShipping">
          {field => (
            <CheckboxForm
              fieldName={field.name}
              label="Set as default shipping address"
              checked={field.state.value}
              onCheckedChange={checked =>
                typeof checked === 'boolean' && field.handleChange(checked)
              }
              onBlur={field.handleBlur}
              disabled={addShippingAddressMutation.isPending}
              errorMessage={field.state.meta.errors?.[0]?.message}
            />
          )}
        </form.Field>
      </div>

      <SubmitButton
        isPending={addShippingAddressMutation.isPending}
        text="Add Address"
      />
    </form>
  )
}
