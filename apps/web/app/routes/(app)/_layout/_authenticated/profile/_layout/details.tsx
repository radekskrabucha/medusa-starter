import { createFileRoute } from '@tanstack/react-router'
import { ProfilePage } from '~web/features/profile/ProfilePage'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute(
  '/(app)/_layout/_authenticated/profile/_layout/details'
)({
  component: ProfilePage,
  head: () => ({
    meta: [...seo({ title: 'Profile' })]
  })
})
