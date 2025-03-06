import { createFileRoute } from '@tanstack/react-router'
import { ProfileLayout } from '~web/features/profile/ProfileLayout'

export const Route = createFileRoute('/(app)/_layout/profile/_layout')({
  component: ProfileLayout
})
