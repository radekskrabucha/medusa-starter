import { createFileRoute, redirect } from '@tanstack/react-router'
import { isAuthenticated } from '~web/features/auth/utils'

export const Route = createFileRoute('/(app)/_layout/_authenticated')({
  beforeLoad: ({ location }) => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.href
        }
      })
    }
  }
})
