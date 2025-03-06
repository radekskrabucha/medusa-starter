import { Button } from '@medusa-starter/ui/button'
import { Input } from '@medusa-starter/ui/input'
import { Label } from '@medusa-starter/ui/label'
import { LoadingCircleIndicator } from '@medusa-starter/ui/loading-circle-indicator'
import { StatusMessage } from '@medusa-starter/ui/status-message'
import { phoneNumberRegex } from '@medusa-starter/utils/regex'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { z } from 'zod'
import { useSyncAuthToken } from '~web/hooks/useSyncAuthToken'
import { actions } from '~web/lib/medusa'
import { getMeQueryOptions } from '../actions'

const editProfileSchema = z.object({
  firstName: z
    .string()
    .transform(str => (str === '' ? undefined : str))
    .pipe(
      z.string().min(2, 'First name must be at least 2 characters').optional()
    ),
  lastName: z
    .string()
    .transform(str => (str === '' ? undefined : str))
    .pipe(
      z.string().min(2, 'Last name must be at least 2 characters').optional()
    ),
  phoneNumber: z
    .string()
    .transform(str => (str === '' ? undefined : str))
    .pipe(
      z.string().regex(phoneNumberRegex, 'Invalid phone number').optional()
    ),
  companyName: z.string()
})

export const EditProfileForm = () => {
  const token = useSyncAuthToken()
  const getMeQuery = useQuery(getMeQueryOptions(token))

  const navigate = useNavigate()
  const updateCustomerMutation = useMutation({
    mutationFn: actions.customer.update,
    mutationKey: ['actions.customer.update'],
    onError: error => {
      toast.error('Failed to update profile', {
        description: error.message
      })
    },
    onSuccess: () => {
      toast.success('Profile updated successfully')
      navigate({
        to: '/profile/details'
      })
      getMeQuery.refetch()
    }
  })
  const form = useForm({
    onSubmit: ({
      value: { firstName, lastName, phoneNumber, companyName }
    }) => {
      console.log({ firstName, lastName, phoneNumber, companyName })
      updateCustomerMutation.mutate({
        body: {
          first_name: firstName ? firstName.trim() : undefined,
          last_name: lastName ? lastName.trim() : undefined,
          phone: phoneNumber ? phoneNumber.trim() : undefined,
          company_name: companyName ? companyName.trim() : undefined
        },
        fields: {}
      })
    },
    defaultValues: {
      firstName: getMeQuery.data?.customer.first_name ?? '',
      lastName: getMeQuery.data?.customer.last_name ?? '',
      phoneNumber: getMeQuery.data?.customer.phone ?? '',
      companyName: getMeQuery.data?.customer.company_name ?? ''
    },
    validators: {
      onSubmit: editProfileSchema
    }
  })

  return (
    <form
      className="flex w-full max-w-sm flex-col gap-4"
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()

        form.handleSubmit()
      }}
      noValidate
    >
      <form.Field name="firstName">
        {field => (
          <div className="flex flex-col gap-2">
            <Label htmlFor={field.name}>First name</Label>
            <Input
              id={field.name}
              type="text"
              name={field.name}
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="John"
              disabled={updateCustomerMutation.isPending}
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
          <div className="flex flex-col gap-2">
            <Label htmlFor={field.name}>Last name</Label>
            <Input
              id={field.name}
              type="text"
              name={field.name}
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="Doe"
              disabled={updateCustomerMutation.isPending}
            />
            {field.state.meta.errors ? (
              <StatusMessage variant="error">
                {field.state.meta.errors[0]?.message}
              </StatusMessage>
            ) : null}
          </div>
        )}
      </form.Field>

      <form.Field name="phoneNumber">
        {field => (
          <div className="flex flex-col gap-2">
            <Label htmlFor={field.name}>Phone number</Label>
            <Input
              id={field.name}
              type="tel"
              name={field.name}
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="123-456-7890"
              disabled={updateCustomerMutation.isPending}
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
          <div className="flex flex-col gap-2">
            <Label htmlFor={field.name}>Company name</Label>
            <Input
              id={field.name}
              type="text"
              name={field.name}
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="Company name"
              disabled={updateCustomerMutation.isPending}
            />
            {field.state.meta.errors ? (
              <StatusMessage variant="error">
                {field.state.meta.errors[0]?.message}
              </StatusMessage>
            ) : null}
          </div>
        )}
      </form.Field>

      <Button
        type="submit"
        disabled={updateCustomerMutation.isPending}
      >
        {updateCustomerMutation.isPending && <LoadingCircleIndicator />}
        Update Profile
      </Button>
    </form>
  )
}
