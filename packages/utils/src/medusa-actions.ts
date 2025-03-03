import type { Admin, Auth, Client, Store } from '@medusajs/js-sdk'

export const getMedusaClientStoreActions = (
  client: MedusaClient
): MedusaClientActions => {
  const actions: ClientActions = {
    auth: {
      signUpWithEmail: (params: SignUpWithEmailParams) =>
        client.auth.register('customer', 'emailpass', params),
      logInWithEmail: (params: LogInWithEmailParams) =>
        client.auth.login('customer', 'emailpass', params),
      refreshToken: () => client.auth.refresh(),
      resetPassword: (params: ResetPasswordParams) =>
        client.auth.resetPassword('customer', 'emailpass', params),
      setNewPassword: (params: SetNewPasswordParams) =>
        client.auth.updateProvider(
          'customer',
          'emailpass',
          { password: params.password },
          params.token
        )
    },
    store: {
      listProducts: (params: ListProductsParams) =>
        client.store.product.list(params)
    }
  }

  return {
    actions
  }
}

export type MedusaClient = {
  client: Client
  admin: Admin
  store: Store
  auth: Auth
}

type MedusaClientActions = {
  actions: ClientActions
}

export type ClientActions = {
  auth: {
    signUpWithEmail: (params: SignUpWithEmailParams) => SignUpWithEmailResponse
    logInWithEmail: (params: LogInWithEmailParams) => LogInWithEmailResponse
    refreshToken: () => RefreshTokenResponse
    resetPassword: (params: ResetPasswordParams) => ResetPasswordResponse
    setNewPassword: (params: SetNewPasswordParams) => SetNewPasswordResponse
  }
  store: {
    listProducts: (params: ListProductsParams) => ListProductsResponse
  }
}

export type SignUpWithEmailParams = Parameters<
  MedusaClient['auth']['register']
>[2]
export type SignUpWithEmailResponse = ReturnType<
  MedusaClient['auth']['register']
>

export type LogInWithEmailParams = Exclude<
  Parameters<MedusaClient['auth']['login']>[2],
  Record<string, unknown>
>
export type LogInWithEmailResponse = ReturnType<MedusaClient['auth']['login']>

export type RefreshTokenResponse = ReturnType<MedusaClient['auth']['refresh']>

export type ResetPasswordParams = Parameters<
  MedusaClient['auth']['resetPassword']
>[2]
export type ResetPasswordResponse = ReturnType<
  MedusaClient['auth']['resetPassword']
>

export type SetNewPasswordParams = {
  password: string
  token: string
}
export type SetNewPasswordResponse = ReturnType<
  MedusaClient['auth']['updateProvider']
>

export type ListProductsParams = Parameters<
  MedusaClient['store']['product']['list']
>[0]
export type ListProductsResponse = ReturnType<
  MedusaClient['store']['product']['list']
>
