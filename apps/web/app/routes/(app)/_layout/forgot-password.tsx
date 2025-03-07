import { createFileRoute } from '@tanstack/react-router'
import { ForgotPasswordPage } from '~web/features/auth/ForgotPasswordPage'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute('/(app)/_layout/forgot-password')({
  component: ForgotPasswordPage,
  head: () => ({
    meta: [...seo({ title: 'Forgot Password' })]
  })
})
