import type {
  SignUpWithEmailParams,
  CreateCustomerParams
} from '@medusa-starter/medusa-utils/types'
import { actions } from '~web/lib/medusa'
import { dispatchAuthTokenEvent, removeAuthToken } from './utils'

export const logOut = (navigateCb: VoidFunction) => {
  removeAuthToken()
  dispatchAuthTokenEvent()

  navigateCb()
}

type SignUpWithCreateCustomerProfileParams = {
  signUpParams: SignUpWithEmailParams
  createCustomerParams: CreateCustomerParams
}

export const handleSignUp = async ({
  signUpParams,
  createCustomerParams
}: SignUpWithCreateCustomerProfileParams) => {
  await actions.auth.signUpWithEmail(signUpParams)
  await actions.customer.create(createCustomerParams)
  return await actions.auth.logInWithEmail(signUpParams)
}
