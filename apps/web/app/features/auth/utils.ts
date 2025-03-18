import {
  getItem,
  removeItem,
  setItem
} from '@medusa-starter/browser-utils/cookie'
import { nonNullable } from '@medusa-starter/utils/common'
import { getNowUnix } from '@medusa-starter/utils/date'
import { getRouteApi } from '@tanstack/react-router'
import { decode } from 'hono/jwt'
import { AUTH_TOKEN_KEY } from '~web/lib/medusa'

export const signInPageRouteApi = getRouteApi(
  '/(app)/_layout/_not_authenticated/sign-in'
)
export const signUpPageRouteApi = getRouteApi(
  '/(app)/_layout/_not_authenticated/sign-up'
)

export const resetPasswordPageRouteApi = getRouteApi(
  '/(app)/_layout/reset-password/$token'
)

export const LOG_IN_EVENT_NAME = 'auth_token_update'

export const localAuthToken = {
  get: () => getItem(AUTH_TOKEN_KEY),
  set: (token: string) => {
    setItem(AUTH_TOKEN_KEY, token)
    dispatchAuthTokenEvent()
  },
  remove: () => {
    removeItem(AUTH_TOKEN_KEY)
    dispatchAuthTokenEvent()
  }
}

export const dispatchAuthTokenEvent = () =>
  window.dispatchEvent(
    new CustomEvent(LOG_IN_EVENT_NAME, { detail: localAuthToken.get() })
  )

export const onLogIn = () => {
  dispatchAuthTokenEvent()
}
export const logOut = (navigateCb: VoidFunction) => {
  localAuthToken.remove()

  navigateCb()
}

export const isAuthenticated = (): boolean => {
  try {
    const token = localAuthToken.get()

    if (!token) {
      return false
    }

    const timestamps = getAuthTokenTimestamps(token)

    if (!timestamps) {
      return false
    }

    const nowUnix = getNowUnix()

    if (nowUnix > timestamps.exp) {
      return false
    }

    return true
  } catch {
    return false
  }
}

export const getAuthTokenTimestamps = (token: string) => {
  try {
    const decoded = decode(token)

    if (nonNullable(decoded.payload.exp) && nonNullable(decoded.payload.iat)) {
      const exp = decoded.payload.exp
      const iat = decoded.payload.iat

      return {
        exp,
        iat,
        difference: () => exp - iat
      }
    }

    return null
  } catch {
    return null
  }
}
