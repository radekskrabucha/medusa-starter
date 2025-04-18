import { Button } from '@medusa-starter/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useGetMeQuery } from '~web/features/auth/hooks/useGetMeQuery'
import { useResetPassword } from '~web/features/auth/hooks/useResetPassword'

export const ChangePassword = () => {
  const { getMeQuery } = useGetMeQuery()
  const email = getMeQuery.data?.customer.email

  const navigate = useNavigate()
  const resetPasswordMutation = useResetPassword({
    onError: error => {
      toast.error('Failed to send password reset email', {
        description: error.message
      })
    },
    onSuccess: () => {
      toast.success('Password reset email sent successfully', {
        description: 'Check your email to reset your password'
      })
      navigate({
        to: '/profile/details'
      })
    }
  })

  return (
    <div className="flex flex-col gap-6">
      <p className="text-muted-foreground text-sm text-balance">
        Click the button below to send a password reset email to{' '}
        <span className="font-semibold">{email}</span> and we will send you a
        link to reset your password.
      </p>
      <Button
        onClick={
          email
            ? () => resetPasswordMutation.mutate({ identifier: email })
            : undefined
        }
        className="capitalize md:self-start"
        disabled={resetPasswordMutation.isPending || getMeQuery.isPending}
      >
        Send password reset email
      </Button>
    </div>
  )
}
