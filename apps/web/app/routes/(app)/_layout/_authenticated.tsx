import { isBrowser } from '@medusa-starter/browser-utils/common'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { getCookie } from '@tanstack/react-start/server'
import { authTokenStorage, isAuthenticated } from '~web/features/auth/utils'
import { AUTH_TOKEN_KEY } from '~web/lib/medusa'

export const Route = createFileRoute('/(app)/_layout/_authenticated')({
  beforeLoad: ({ location }) => {
    const token = isBrowser ? authTokenStorage.get() : getCookie(AUTH_TOKEN_KEY)

    if (!isAuthenticated(token)) {
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.href
        }
      })
    }
  }
})
