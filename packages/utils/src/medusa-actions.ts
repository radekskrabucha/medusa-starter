import type { Admin, Auth, Client, Store } from '@medusajs/js-sdk'

type MedusaClient = {
  client: Client
  admin: Admin
  store: Store
  auth: Auth
}

type SignUpWithEmailParams = Parameters<MedusaClient['auth']['register']>[2]
type LogInWithEmailParams = Exclude<
  Parameters<MedusaClient['auth']['login']>[2],
  Record<string, unknown>
>
type ResetPasswordParams = Parameters<MedusaClient['auth']['resetPassword']>[2]
type SetNewPasswordParams = {
  password: string
  token: string
}

type MedusaClientStoreActions = {
  actions: {
    auth: {
      signUpWithEmail: (
        params: SignUpWithEmailParams
      ) => ReturnType<MedusaClient['auth']['register']>
      logInWithEmail: (
        params: LogInWithEmailParams
      ) => ReturnType<MedusaClient['auth']['login']>
      refreshToken: () => ReturnType<MedusaClient['auth']['refresh']>
      resetPassword: (
        params: ResetPasswordParams
      ) => ReturnType<MedusaClient['auth']['resetPassword']>
      setNewPassword: (
        params: SetNewPasswordParams
      ) => ReturnType<MedusaClient['auth']['updateProvider']>
    }
  }
}

export function getMedusaClientStoreActions(
  client: MedusaClient
): MedusaClientStoreActions {
  return {
    actions: {
      auth: {
        signUpWithEmail: function (params: SignUpWithEmailParams) {
          return client.auth.register('customer', 'emailpass', params)
        },
        logInWithEmail: function (params: LogInWithEmailParams) {
          return client.auth.login('customer', 'emailpass', params)
        },
        refreshToken: function () {
          return client.auth.refresh()
        },
        resetPassword: function (params: ResetPasswordParams) {
          return client.auth.resetPassword('customer', 'emailpass', params)
        },
        setNewPassword: function (params: SetNewPasswordParams) {
          return client.auth.updateProvider(
            'customer',
            'emailpass',
            {
              password: params.password
            },
            params.token
          )
        }
      }
    }
  }
}
