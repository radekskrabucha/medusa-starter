import type { Admin, Auth, Client, Store } from '@medusajs/js-sdk'
import {
  queryOptions,
  type QueryKey,
  type QueryOptions as QueryOpt
} from '@tanstack/react-query'

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

  const storeQueryOptions: ClientQueryOptions = {
    store: {
      listProducts: (params: ListProductsParams) =>
        queryOptions({
          queryFn: () => actions.store.listProducts(params),
          queryKey: ['listProducts', params] as const
        })
    }
  }

  return {
    actions,
    queryOptions: storeQueryOptions
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
  queryOptions: ClientQueryOptions
}

export type ClientActions = {
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
  store: {
    listProducts: (params: ListProductsParams) => ListProductsResponse
  }
}
export type ClientQueryOptions = {
  store: {
    listProducts: (
      params: ListProductsParams
    ) => QueryOptions<
      Awaited<ListProductsResponse>,
      readonly ['listProducts', ListProductsParams]
    >
  }
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

type ListProductsParams = Parameters<
  MedusaClient['store']['product']['list']
>[0]

type ListProductsResponse = ReturnType<MedusaClient['store']['product']['list']>

type QueryOptions<D, K extends QueryKey, E extends Error = Error> = QueryOpt<
  D,
  E,
  D,
  K
>
