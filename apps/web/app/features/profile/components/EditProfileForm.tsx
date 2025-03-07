import { InputForm } from '@medusa-starter/ui/components/form/input-form'
import { SubmitButton } from '@medusa-starter/ui/components/form/submit-button'
import { nonNullable } from '@medusa-starter/utils/common'
import { phoneNumberRegex } from '@medusa-starter/utils/regex'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { z } from 'zod'
import { useGetMeQuery } from '~web/features/auth/hooks/useGetMeQuery'
import { actions } from '~web/lib/medusa'

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
  const { getMeQuery, getMeQueryOptions } = useGetMeQuery()
  const queryClient = useQueryClient()

  const navigate = useNavigate()
  const updateCustomerMutation = useMutation({
    mutationFn: actions.customer.update,
    mutationKey: ['actions.customer.update'],
    onError: error => {
      toast.error('Failed to update profile', {
        description: error.message
      })
    },
    onSuccess: data => {
      toast.success('Profile updated successfully')
      navigate({
        to: '/profile/details'
      })

      queryClient.setQueryData(getMeQueryOptions.queryKey, data)
    }
  })
  const form = useForm({
    onSubmit: ({
      value: { firstName, lastName, phoneNumber, companyName }
    }) => {
      updateCustomerMutation.mutate({
        body: {
          first_name: nonNullable(firstName) ? firstName.trim() : undefined,
          last_name: nonNullable(lastName) ? lastName.trim() : undefined,
          phone: nonNullable(phoneNumber) ? phoneNumber.trim() : undefined,
          company_name: nonNullable(companyName)
            ? companyName.trim()
            : undefined
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
      className="flex w-full max-w-md flex-col gap-4 max-sm:max-w-none"
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()

        form.handleSubmit()
      }}
      noValidate
    >
      <form.Field name="firstName">
        {field => (
          <InputForm
            fieldName={field.name}
            label="First name"
            value={field.state.value}
            onChange={e => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder="John"
            disabled={updateCustomerMutation.isPending}
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
            disabled={updateCustomerMutation.isPending}
            errorMessage={field.state.meta.errors?.[0]?.message}
          />
        )}
      </form.Field>

      <form.Field name="phoneNumber">
        {field => (
          <InputForm
            fieldName={field.name}
            type="tel"
            label="Phone number"
            value={field.state.value}
            onChange={e => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder="+1 234 567 890"
            disabled={updateCustomerMutation.isPending}
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
            placeholder="Company name"
            disabled={updateCustomerMutation.isPending}
            errorMessage={field.state.meta.errors?.[0]?.message}
          />
        )}
      </form.Field>

      <SubmitButton
        isPending={updateCustomerMutation.isPending}
        text="Update"
      />
    </form>
  )
}
