import { createFileRoute } from '@tanstack/react-router'
import { SetNewPasswordPage } from '~web/features/profile/SetNewPasswordPage'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute('/(app)/_layout/reset-password/$token')({
  component: SetNewPasswordPage,
  head: () => ({
    meta: [...seo({ title: 'Set New Password' })]
  })
})
