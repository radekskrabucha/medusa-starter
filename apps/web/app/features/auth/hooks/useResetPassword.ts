import { useMutation } from '@tanstack/react-query'
import { actions } from '~web/lib/medusa'

type UseResetPasswordParams = {
  onSuccess?: (email: string) => void
  onError?: (error: Error) => void
}

export const useResetPassword = ({
  onSuccess,
  onError
}: UseResetPasswordParams) => {
  return useMutation({
    mutationFn: actions.auth.resetPassword,
    mutationKey: ['actions.auth.resetPassword'],
    onError: onError,
    onSuccess: (_, { identifier }) => onSuccess?.(identifier)
  })
}
