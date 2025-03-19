import { transformRegionsToOptionsGroup } from '@medusa-starter/medusa-utils/region'
import { CheckboxForm } from '@medusa-starter/ui/components/form/checkbox-form'
import { InputForm } from '@medusa-starter/ui/components/form/input-form'
import { SelectForm } from '@medusa-starter/ui/components/form/select-form'
import { SubmitButton } from '@medusa-starter/ui/components/form/submit-button'
import { nonNullable } from '@medusa-starter/utils/common'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { appLayoutRouteApi } from '~web/layout/app/utils'
import { actions } from '~web/lib/medusa'
import { getMeQueryOptions } from '../actions'
import {
  useAddressQuery,
  getAddressQueryOptions
} from '../hooks/useAddressQuery'
import { shippingAddressSchema } from '../validationSchemas'

type EditShippingAddressFormProps = {
  id: string
}

export const EditShippingAddressForm: React.FC<
  EditShippingAddressFormProps
> = ({ id }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const getAddressQuery = useAddressQuery(id)
  const {
    regionsData: { regions }
  } = appLayoutRouteApi.useLoaderData()

  const editShippingAddressMutation = useMutation({
    mutationFn: actions.customer.address.update,
    mutationKey: ['actions.customer.address.update', id],
    onError: error => {
      toast.error('Failed to edit shipping address', {
        description: error.message
      })
    },
    onSuccess: data => {
      toast.success('Shipping address updated successfully')
      navigate({
        to: '/profile/shipping-address/$id',
        params: { id }
      })

      queryClient.invalidateQueries({
        queryKey: getAddressQueryOptions(id).queryKey
      })
      queryClient.setQueryData(getMeQueryOptions().queryKey, data)
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
        isDefaultShipping,
        countryCode
      }
    }) => {
      editShippingAddressMutation.mutate({
        id,
        body: {
          first_name: nonNullable(firstName) ? firstName : undefined,
          last_name: nonNullable(lastName) ? lastName : undefined,
          phone: nonNullable(phoneNumber) ? phoneNumber : undefined,
          company: nonNullable(companyName) ? companyName : undefined,
          address_name: nonNullable(addressName) ? addressName : undefined,
          address_1: nonNullable(address1) ? address1 : undefined,
          address_2: nonNullable(address2) ? address2 : undefined,
          city: nonNullable(city) ? city : undefined,
          province: nonNullable(province) ? province : undefined,
          postal_code: nonNullable(postalCode) ? postalCode : undefined,
          is_default_billing: nonNullable(isDefaultBilling)
            ? isDefaultBilling
            : undefined,
          is_default_shipping: nonNullable(isDefaultShipping)
            ? isDefaultShipping
            : undefined,
          country_code: nonNullable(countryCode) ? countryCode : undefined
        }
      })
    },
    defaultValues: {
      firstName: getAddressQuery.data?.address.first_name ?? '',
      lastName: getAddressQuery.data?.address.last_name ?? '',
      phoneNumber: getAddressQuery.data?.address.phone ?? '',
      companyName: getAddressQuery.data?.address.company ?? '',
      addressName: getAddressQuery.data?.address.address_name ?? '',
      address1: getAddressQuery.data?.address.address_1 ?? '',
      address2: getAddressQuery.data?.address.address_2 ?? '',
      city: getAddressQuery.data?.address.city ?? '',
      province: getAddressQuery.data?.address.province ?? '',
      postalCode: getAddressQuery.data?.address.postal_code ?? '',
      isDefaultBilling:
        getAddressQuery.data?.address.is_default_billing ?? false,
      isDefaultShipping:
        getAddressQuery.data?.address.is_default_shipping ?? false,
      countryCode: getAddressQuery.data?.address.country_code ?? ''
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
            disabled={editShippingAddressMutation.isPending}
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
              disabled={editShippingAddressMutation.isPending}
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
              disabled={editShippingAddressMutation.isPending}
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
              disabled={editShippingAddressMutation.isPending}
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
              disabled={editShippingAddressMutation.isPending}
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
            disabled={editShippingAddressMutation.isPending}
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
            disabled={editShippingAddressMutation.isPending}
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
            disabled={editShippingAddressMutation.isPending}
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
              disabled={editShippingAddressMutation.isPending}
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
              disabled={editShippingAddressMutation.isPending}
              errorMessage={field.state.meta.errors?.[0]?.message}
            />
          )}
        </form.Field>
      </div>

      <form.Field name="countryCode">
        {field => (
          <SelectForm
            fieldName={field.name}
            label="Country"
            placeholder="Select a country"
            value={field.state.value}
            onChange={value => field.handleChange(value)}
            options={transformRegionsToOptionsGroup(regions)}
            disabled={editShippingAddressMutation.isPending}
            errorMessage={field.state.meta.errors?.[0]?.message}
          />
        )}
      </form.Field>

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
              disabled={editShippingAddressMutation.isPending}
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
              disabled={editShippingAddressMutation.isPending}
              errorMessage={field.state.meta.errors?.[0]?.message}
            />
          )}
        </form.Field>
      </div>

      <SubmitButton
        isPending={editShippingAddressMutation.isPending}
        text="Update Address"
      />
    </form>
  )
}
