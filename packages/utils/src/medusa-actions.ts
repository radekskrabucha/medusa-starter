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
        client.store.product.list(params),
      getProduct: (params: GetProductParams) =>
        client.store.product.retrieve(params.id, params.fields),
      listCategories: (params: ListCategoriesParams) =>
        client.store.category.list(params),
      getCategory: (params: GetCategoryParams) =>
        client.store.category.retrieve(params.id, params.fields),
      listCollections: (params: ListCollectionsParams) =>
        client.store.collection.list(params),
      getCollection: (params: GetCollectionParams) =>
        client.store.collection.retrieve(params.id, params.fields)
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
    getProduct: (params: GetProductParams) => GetProductResponse
    listCategories: (params: ListCategoriesParams) => ListCategoriesResponse
    getCategory: (params: GetCategoryParams) => GetCategoryResponse
    listCollections: (params: ListCollectionsParams) => ListCollectionsResponse
    getCollection: (params: GetCollectionParams) => GetCollectionResponse
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
export type SetNewPasswordParams = {
  password: string
  token: string
}
export type SetNewPasswordResponse = ReturnType<SetNewPassword>

type ListProduct = MedusaClient['store']['product']['list']
export type ListProductsParams = Parameters<ListProduct>[0]
export type ListProductsResponse = ReturnType<ListProduct>

type GetProduct = MedusaClient['store']['product']['retrieve']
type GetProductId = Parameters<GetProduct>[0]
type GetProductFields = Parameters<GetProduct>[1]
export type GetProductParams = {
  id: GetProductId
  fields: GetProductFields
}
export type GetProductResponse = ReturnType<GetProduct>

type ListCategories = MedusaClient['store']['category']['list']
export type ListCategoriesParams = Parameters<ListCategories>[0]
export type ListCategoriesResponse = ReturnType<ListCategories>

type GetCategory = MedusaClient['store']['category']['retrieve']
type GetCategoryId = Parameters<GetCategory>[0]
type GetCategoryFields = Parameters<GetCategory>[1]
export type GetCategoryParams = {
  id: GetCategoryId
  fields: GetCategoryFields
}
export type GetCategoryResponse = ReturnType<GetCategory>

type ListCollections = MedusaClient['store']['collection']['list']
export type ListCollectionsParams = Parameters<ListCollections>[0]
export type ListCollectionsResponse = ReturnType<ListCollections>

type GetCollection = MedusaClient['store']['collection']['retrieve']
type GetCollectionId = Parameters<GetCollection>[0]
type GetCollectionFields = Parameters<GetCollection>[1]
export type GetCollectionParams = {
  id: GetCollectionId
  fields: GetCollectionFields
}
export type GetCollectionResponse = ReturnType<GetCollection>
