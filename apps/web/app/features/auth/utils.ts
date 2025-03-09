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

export const LOG_IN_EVENT_NAME = 'storage'

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY)

export const removeAuthToken = () =>
  window.localStorage.removeItem(AUTH_TOKEN_KEY)

export const dispatchAuthTokenEvent = () =>
  window.dispatchEvent(new Event(LOG_IN_EVENT_NAME))

export const onLogIn = () => {
  dispatchAuthTokenEvent()
}

export const isAuthenticated = (): boolean => {
  try {
    const token = getAuthToken()

    if (!token) {
      return false
    }

    const exp = getExpTimestampFromToken(token)

    if (!exp) {
      return false
    }

    const nowUnix = getNowUnix()

    if (nowUnix > exp) {
      return false
    }

    return true
  } catch {
    return false
  }
}

const getExpTimestampFromToken = (token: string) => {
  try {
    const decoded = decode(token)

    if (!decoded.payload.exp) {
      return null
    }

    return decoded.payload.exp
  } catch {
    return null
  }
}
