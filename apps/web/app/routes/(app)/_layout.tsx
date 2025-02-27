import { createFileRoute } from '@tanstack/react-router'
import { AppLayout } from '~web/layout/app/AppLayout'

export const Route = createFileRoute('/(app)/_layout')({
  component: AppLayout
})
