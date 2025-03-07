import { Button } from '@medusa-starter/ui/button'
import { Checkbox } from '@medusa-starter/ui/checkbox'
import { Input } from '@medusa-starter/ui/input'
import { Label } from '@medusa-starter/ui/label'
import { LoadingCircleIndicator } from '@medusa-starter/ui/loading-circle-indicator'
import { StatusMessage } from '@medusa-starter/ui/status-message'
import { nonNullable } from '@medusa-starter/utils/common'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useSyncAuthToken } from '~web/hooks/useSyncAuthToken'
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
  const token = useSyncAuthToken()
  const meQueryOptions = getMeQueryOptions(token)
  const queryClient = useQueryClient()
  const getAddressQuery = useAddressQuery(id)

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
      queryClient.setQueryData(meQueryOptions.queryKey, data)
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
            : undefined
        },
        fields: {}
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
        getAddressQuery.data?.address.is_default_shipping ?? false
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
          <div className="flex flex-col gap-2">
            <Label htmlFor={field.name}>Address name</Label>
            <Input
              id={field.name}
              type="text"
              name={field.name}
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="Home"
              disabled={editShippingAddressMutation.isPending}
            />
            {field.state.meta.errors ? (
              <StatusMessage variant="error">
                {field.state.meta.errors[0]?.message}
              </StatusMessage>
            ) : null}
          </div>
        )}
      </form.Field>

      <div className="flex gap-4">
        <form.Field name="firstName">
          {field => (
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor={field.name}>First name</Label>
              <Input
                id={field.name}
                type="text"
                name={field.name}
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="John"
                disabled={editShippingAddressMutation.isPending}
              />
              {field.state.meta.errors ? (
                <StatusMessage variant="error">
                  {field.state.meta.errors[0]?.message}
                </StatusMessage>
              ) : null}
            </div>
          )}
        </form.Field>

        <form.Field name="lastName">
          {field => (
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor={field.name}>Last name</Label>
              <Input
                id={field.name}
                type="text"
                name={field.name}
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Doe"
                disabled={editShippingAddressMutation.isPending}
              />
              {field.state.meta.errors ? (
                <StatusMessage variant="error">
                  {field.state.meta.errors[0]?.message}
                </StatusMessage>
              ) : null}
            </div>
          )}
        </form.Field>
      </div>

      <div className="flex gap-4">
        <form.Field name="phoneNumber">
          {field => (
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor={field.name}>Phone number</Label>
              <Input
                id={field.name}
                type="tel"
                name={field.name}
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="+1 234 567 890"
                disabled={editShippingAddressMutation.isPending}
              />
              {field.state.meta.errors ? (
                <StatusMessage variant="error">
                  {field.state.meta.errors[0]?.message}
                </StatusMessage>
              ) : null}
            </div>
          )}
        </form.Field>

        <form.Field name="companyName">
          {field => (
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor={field.name}>Company name</Label>
              <Input
                id={field.name}
                type="text"
                name={field.name}
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Company Ltd."
                disabled={editShippingAddressMutation.isPending}
              />
              {field.state.meta.errors ? (
                <StatusMessage variant="error">
                  {field.state.meta.errors[0]?.message}
                </StatusMessage>
              ) : null}
            </div>
          )}
        </form.Field>
      </div>

      <form.Field name="address1">
        {field => (
          <div className="flex flex-col gap-2">
            <Label htmlFor={field.name}>Address line 1</Label>
            <Input
              id={field.name}
              type="text"
              name={field.name}
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="123 Main St"
              disabled={editShippingAddressMutation.isPending}
            />
            {field.state.meta.errors ? (
              <StatusMessage variant="error">
                {field.state.meta.errors[0]?.message}
              </StatusMessage>
            ) : null}
          </div>
        )}
      </form.Field>

      <form.Field name="address2">
        {field => (
          <div className="flex flex-col gap-2">
            <Label htmlFor={field.name}>Address line 2</Label>
            <Input
              id={field.name}
              type="text"
              name={field.name}
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="Apt 4B"
              disabled={editShippingAddressMutation.isPending}
            />
            {field.state.meta.errors ? (
              <StatusMessage variant="error">
                {field.state.meta.errors[0]?.message}
              </StatusMessage>
            ) : null}
          </div>
        )}
      </form.Field>

      <form.Field name="city">
        {field => (
          <div className="flex flex-1 flex-col gap-2">
            <Label htmlFor={field.name}>City</Label>
            <Input
              id={field.name}
              type="text"
              name={field.name}
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="New York"
              disabled={editShippingAddressMutation.isPending}
            />
            {field.state.meta.errors ? (
              <StatusMessage variant="error">
                {field.state.meta.errors[0]?.message}
              </StatusMessage>
            ) : null}
          </div>
        )}
      </form.Field>

      <div className="flex gap-4">
        <form.Field name="province">
          {field => (
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor={field.name}>Province/State</Label>
              <Input
                id={field.name}
                type="text"
                name={field.name}
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="NY"
                disabled={editShippingAddressMutation.isPending}
              />
              {field.state.meta.errors ? (
                <StatusMessage variant="error">
                  {field.state.meta.errors[0]?.message}
                </StatusMessage>
              ) : null}
            </div>
          )}
        </form.Field>

        <form.Field name="postalCode">
          {field => (
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor={field.name}>Postal code</Label>
              <Input
                id={field.name}
                type="text"
                name={field.name}
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="10001"
                disabled={editShippingAddressMutation.isPending}
              />
              {field.state.meta.errors ? (
                <StatusMessage variant="error">
                  {field.state.meta.errors[0]?.message}
                </StatusMessage>
              ) : null}
            </div>
          )}
        </form.Field>
      </div>

      <div className="flex flex-col gap-4">
        <form.Field name="isDefaultBilling">
          {field => (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id={field.name}
                  name={field.name}
                  checked={field.state.value}
                  onCheckedChange={checked =>
                    typeof checked === 'boolean' && field.handleChange(checked)
                  }
                  onBlur={field.handleBlur}
                  disabled={editShippingAddressMutation.isPending}
                />
                <Label htmlFor={field.name}>
                  Set as default billing address
                </Label>
              </div>
              {field.state.meta.errors ? (
                <StatusMessage variant="error">
                  {field.state.meta.errors[0]?.message}
                </StatusMessage>
              ) : null}
            </div>
          )}
        </form.Field>

        <form.Field name="isDefaultShipping">
          {field => (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id={field.name}
                  name={field.name}
                  checked={field.state.value}
                  onCheckedChange={checked =>
                    typeof checked === 'boolean' && field.handleChange(checked)
                  }
                  onBlur={field.handleBlur}
                  disabled={editShippingAddressMutation.isPending}
                />
                <Label htmlFor={field.name}>
                  Set as default shipping address
                </Label>
              </div>
              {field.state.meta.errors ? (
                <StatusMessage variant="error">
                  {field.state.meta.errors[0]?.message}
                </StatusMessage>
              ) : null}
            </div>
          )}
        </form.Field>
      </div>

      <Button
        type="submit"
        disabled={editShippingAddressMutation.isPending}
      >
        {editShippingAddressMutation.isPending && <LoadingCircleIndicator />}
        Update Address
      </Button>
    </form>
  )
}
