import { dispatchAuthTokenEvent, removeAuthToken } from './utils'

export const logOut = (navigateCb: VoidFunction) => {
  removeAuthToken()
  dispatchAuthTokenEvent()

  navigateCb()
}
