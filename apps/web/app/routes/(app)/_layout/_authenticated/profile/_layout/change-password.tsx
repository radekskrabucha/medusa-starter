import { createFileRoute } from '@tanstack/react-router'
import { ChangePasswordPage } from '~web/features/profile/ChangePasswordPage'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute(
  '/(app)/_layout/_authenticated/profile/_layout/change-password'
)({
  component: ChangePasswordPage,
  head: () => ({
    meta: [...seo({ title: 'Change Password' })]
  })
})
