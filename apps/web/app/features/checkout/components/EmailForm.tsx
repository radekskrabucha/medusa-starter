import { InputForm } from '@medusa-starter/ui/components/form/input-form'
import { SubmitButton } from '@medusa-starter/ui/components/form/submit-button'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { useUpdateCart } from '~web/features/cart/hooks/useUpdateCart'

const emailSchema = z.object({
  email: z.string().email('Invalid email')
})

type EmailFormProps = {
  email: string | undefined
  cartId: string
}

export const EmailForm: React.FC<EmailFormProps> = ({ email, cartId }) => {
  const updateCartMutation = useUpdateCart(cartId)
  const form = useForm({
    onSubmit: ({ value: { email } }) => {
      updateCartMutation.mutate({ body: { email } })
    },
    defaultValues: {
      email: email ?? ''
    },
    validators: {
      onSubmit: emailSchema
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
      <form.Field name="email">
        {field => (
          <InputForm
            fieldName={field.name}
            label="Email"
            type="email"
            value={field.state.value}
            onChange={e => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder="john@example.com"
            disabled={updateCartMutation.isPending}
            errorMessage={field.state.meta.errors?.[0]?.message}
          />
        )}
      </form.Field>
      <SubmitButton
        text="Submit"
        isPending={updateCartMutation.isPending}
      />
    </form>
  )
}
