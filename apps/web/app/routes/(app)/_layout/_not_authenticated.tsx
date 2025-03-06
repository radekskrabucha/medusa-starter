import { createFileRoute, redirect } from '@tanstack/react-router'
import { isAuthenticated } from '~web/features/auth/utils'

export const Route = createFileRoute('/(app)/_layout/_not_authenticated')({
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({
        to: '/'
      })
    }
  }
})
