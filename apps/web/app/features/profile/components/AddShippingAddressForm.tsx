import { Button } from '@medusa-starter/ui/button'
import { Checkbox } from '@medusa-starter/ui/checkbox'
import { Input } from '@medusa-starter/ui/input'
import { Label } from '@medusa-starter/ui/label'
import { LoadingCircleIndicator } from '@medusa-starter/ui/loading-circle-indicator'
import { StatusMessage } from '@medusa-starter/ui/status-message'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { z } from 'zod'
import { useSyncAuthToken } from '~web/hooks/useSyncAuthToken'
import { actions } from '~web/lib/medusa'
import { getMeQueryOptions } from '../actions'

const addShippingAddressSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phoneNumber: z.string().min(2, 'Phone number must be at least 2 characters'),
  companyName: z.string(),
  addressName: z.string().min(2, 'Address name must be at least 2 characters'),
  address1: z.string().min(2, 'Address 1 must be at least 2 characters'),
  address2: z.string(),
  city: z.string().min(2, 'City must be at least 2 characters'),
  province: z.string().min(2, 'Province must be at least 2 characters'),
  postalCode: z.string().min(2, 'Postal code must be at least 2 characters'),
  isDefaultBilling: z.boolean(),
  isDefaultShipping: z.boolean()
})

export const AddShippingAddressForm = () => {
  const navigate = useNavigate()
  const token = useSyncAuthToken()
  const meQueryOptions = getMeQueryOptions(token)
  const getMeQuery = useQuery(meQueryOptions)
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
        to: '/profile/shipping-addresses/list'
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
        },
        fields: {}
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
      onSubmit: addShippingAddressSchema
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
              disabled={addShippingAddressMutation.isPending}
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
                disabled={addShippingAddressMutation.isPending}
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
                disabled={addShippingAddressMutation.isPending}
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
                disabled={addShippingAddressMutation.isPending}
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
                disabled={addShippingAddressMutation.isPending}
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
              disabled={addShippingAddressMutation.isPending}
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
              disabled={addShippingAddressMutation.isPending}
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
              disabled={addShippingAddressMutation.isPending}
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
                disabled={addShippingAddressMutation.isPending}
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
                disabled={addShippingAddressMutation.isPending}
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
                  disabled={addShippingAddressMutation.isPending}
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
                  disabled={addShippingAddressMutation.isPending}
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
        disabled={addShippingAddressMutation.isPending}
      >
        {addShippingAddressMutation.isPending && <LoadingCircleIndicator />}
        Add Address
      </Button>
    </form>
  )
}
