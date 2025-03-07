import { getRouteApi } from '@tanstack/react-router'
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

export const isAuthenticated = () => Boolean(getAuthToken())
