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

type SignUpWithEmail = MedusaClient['auth']['register']
export type SignUpWithEmailParams = Parameters<SignUpWithEmail>[2]
export type SignUpWithEmailResponse = ReturnType<SignUpWithEmail>

type LogInWithEmail = MedusaClient['auth']['login']
export type LogInWithEmailParams = Exclude<
  Parameters<LogInWithEmail>[2],
  Record<string, unknown>
>
export type LogInWithEmailResponse = ReturnType<LogInWithEmail>

type RefreshToken = MedusaClient['auth']['refresh']
export type RefreshTokenResponse = ReturnType<RefreshToken>

type ResetPassword = MedusaClient['auth']['resetPassword']
export type ResetPasswordParams = Parameters<ResetPassword>[2]
export type ResetPasswordResponse = ReturnType<ResetPassword>

type SetNewPassword = MedusaClient['auth']['updateProvider']
export type SetNewPasswordParams = { password: string; token: string }
export type SetNewPasswordResponse = ReturnType<SetNewPassword>

type ListProduct = MedusaClient['store']['product']['list']
export type ListProductsParams = Parameters<ListProduct>[0]
export type ListProductsResponse = ReturnType<ListProduct>
