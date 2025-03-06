import { createFileRoute } from '@tanstack/react-router'
import { EditProfilePage } from '~web/features/profile/EditProfilePage'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute(
  '/(app)/_layout/_authenticated/profile/_layout/edit'
)({
  component: EditProfilePage,
  head: () => ({
    meta: [...seo({ title: 'Edit Profile' })]
  })
})
