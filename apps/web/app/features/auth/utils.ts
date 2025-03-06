import { AUTH_TOKEN_KEY } from '~web/lib/medusa'

export const LOG_IN_EVENT_NAME = 'storage'

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY)

export const onLogIn = () => {
  window.dispatchEvent(new Event(LOG_IN_EVENT_NAME))
}
