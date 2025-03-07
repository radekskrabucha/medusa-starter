import type { NoEmpty } from '@medusa-starter/utils/types'
import { useMutation } from '@tanstack/react-query'
import { actions } from '~web/lib/medusa'

type UseResetPasswordParams = {
  email?: string | null
  onSuccess?: (email: string) => void
  onError?: (error: Error) => void
}

export const useResetPassword = ({
  email,
  onSuccess,
  onError
}: UseResetPasswordParams) => {
  return useMutation({
    mutationFn: email
      ? () => actions.auth.resetPassword({ identifier: email })
      : undefined,
    mutationKey: ['actions.auth.setNewPassword', email],
    onError: onError,
    onSuccess: () => onSuccess?.(email as NoEmpty<typeof email>)
  })
}
