import type { Admin, Auth, Client, Store } from '@medusajs/js-sdk'

export const getMedusaClientStoreActions = (
  client: MedusaClient
): MedusaClientActions => ({
  actions: {
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
      getProducts: (params: GetProductsParams) =>
        client.store.product.list(params),
      getProduct: (params: GetProductParams) =>
        client.store.product.retrieve(params.id, params.fields),
      getCategories: (params: GetCategoriesParams) =>
        client.store.category.list(params),
      getCategory: (params: GetCategoryParams) =>
        client.store.category.retrieve(params.id, params.fields),
      getCollections: (params: GetCollectionsParams) =>
        client.store.collection.list(params),
      getCollection: (params: GetCollectionParams) =>
        client.store.collection.retrieve(params.id, params.fields)
    },
    region: {
      getRegions: (params: GetRegionsParams) =>
        client.store.region.list(params),
      getRegion: (params: GetRegionParams) =>
        client.store.region.retrieve(params.id, params.fields)
    },
    order: {
      getOrders: (params: GetOrdersParams) => client.store.order.list(params),
      getOrder: (params: GetOrderParams) =>
        client.store.order.retrieve(params.id, params.fields),
      requestOrderTransfer: (params: RequestOrderTransferParams) =>
        client.store.order.requestTransfer(
          params.id,
          params.body,
          params.fields
        ),
      cancelOrderTransfer: (params: CancelOrderTransferParams) =>
        client.store.order.cancelTransfer(params.id, params.fields),
      acceptOrderTransfer: (params: AcceptOrderTransferParams) =>
        client.store.order.acceptTransfer(
          params.id,
          params.body,
          params.fields
        ),
      rejectOrderTransfer: (params: RejectOrderTransferParams) =>
        client.store.order.declineTransfer(
          params.id,
          params.body,
          params.fields
        )
    }
  }
})

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
    getProducts: (params: GetProductsParams) => GetProductsResponse
    getProduct: (params: GetProductParams) => GetProductResponse
    getCategories: (params: GetCategoriesParams) => GetCategoriesResponse
    getCategory: (params: GetCategoryParams) => GetCategoryResponse
    getCollections: (params: GetCollectionsParams) => GetCollectionsResponse
    getCollection: (params: GetCollectionParams) => GetCollectionResponse
  }
  region: {
    getRegions: (params: GetRegionsParams) => GetRegionsResponse
    getRegion: (params: GetRegionParams) => GetRegionResponse
  }
  order: {
    getOrders: (params: GetOrdersParams) => GetOrdersResponse
    getOrder: (params: GetOrderParams) => GetOrderResponse
    requestOrderTransfer: (
      params: RequestOrderTransferParams
    ) => RequestOrderTransferResponse
    cancelOrderTransfer: (
      params: CancelOrderTransferParams
    ) => CancelOrderTransferResponse
    acceptOrderTransfer: (
      params: AcceptOrderTransferParams
    ) => AcceptOrderTransferResponse
    rejectOrderTransfer: (
      params: RejectOrderTransferParams
    ) => RejectOrderTransferResponse
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

type GetProducts = MedusaClient['store']['product']['list']
export type GetProductsParams = Parameters<GetProducts>[0]
export type GetProductsResponse = ReturnType<GetProducts>

type GetProduct = MedusaClient['store']['product']['retrieve']
type GetProductId = Parameters<GetProduct>[0]
type GetProductFields = Parameters<GetProduct>[1]
export type GetProductParams = {
  id: GetProductId
  fields: GetProductFields
}
export type GetProductResponse = ReturnType<GetProduct>

type GetCategories = MedusaClient['store']['category']['list']
export type GetCategoriesParams = Parameters<GetCategories>[0]
export type GetCategoriesResponse = ReturnType<GetCategories>

type GetCategory = MedusaClient['store']['category']['retrieve']
type GetCategoryId = Parameters<GetCategory>[0]
type GetCategoryFields = Parameters<GetCategory>[1]
export type GetCategoryParams = {
  id: GetCategoryId
  fields: GetCategoryFields
}
export type GetCategoryResponse = ReturnType<GetCategory>

type GetCollections = MedusaClient['store']['collection']['list']
export type GetCollectionsParams = Parameters<GetCollections>[0]
export type GetCollectionsResponse = ReturnType<GetCollections>

type GetCollection = MedusaClient['store']['collection']['retrieve']
type GetCollectionId = Parameters<GetCollection>[0]
type GetCollectionFields = Parameters<GetCollection>[1]
export type GetCollectionParams = {
  id: GetCollectionId
  fields: GetCollectionFields
}
export type GetCollectionResponse = ReturnType<GetCollection>

type GetRegions = MedusaClient['store']['region']['list']
export type GetRegionsParams = Parameters<GetRegions>[0]
export type GetRegionsResponse = ReturnType<GetRegions>

type GetRegion = MedusaClient['store']['region']['retrieve']
type GetRegionId = Parameters<GetRegion>[0]
type GetRegionFields = Parameters<GetRegion>[1]
export type GetRegionParams = {
  id: GetRegionId
  fields: GetRegionFields
}
export type GetRegionResponse = ReturnType<GetRegion>

type GetOrders = MedusaClient['store']['order']['list']
export type GetOrdersParams = Parameters<GetOrders>[0]
export type GetOrdersResponse = ReturnType<GetOrders>

type GetOrder = MedusaClient['store']['order']['retrieve']
type GetOrderId = Parameters<GetOrder>[0]
type GetOrderFields = Parameters<GetOrder>[1]
export type GetOrderParams = {
  id: GetOrderId
  fields: GetOrderFields
}
export type GetOrderResponse = ReturnType<GetOrder>

type RequestOrderTransfer = MedusaClient['store']['order']['requestTransfer']
type RequestOrderTransferID = Parameters<RequestOrderTransfer>[0]
type RequestOrderTransferBody = Parameters<RequestOrderTransfer>[1]
type RequestOrderTransferFields = Parameters<RequestOrderTransfer>[2]
export type RequestOrderTransferParams = {
  id: RequestOrderTransferID
  body: RequestOrderTransferBody
  fields: RequestOrderTransferFields
}
export type RequestOrderTransferResponse = ReturnType<RequestOrderTransfer>

type CancelOrderTransfer = MedusaClient['store']['order']['cancelTransfer']
type CancelOrderTransferID = Parameters<CancelOrderTransfer>[0]
type CancelOrderTransferFields = Parameters<CancelOrderTransfer>[1]
export type CancelOrderTransferParams = {
  id: CancelOrderTransferID
  fields: CancelOrderTransferFields
}
export type CancelOrderTransferResponse = ReturnType<CancelOrderTransfer>

type AcceptOrderTransfer = MedusaClient['store']['order']['acceptTransfer']
type AcceptOrderTransferID = Parameters<AcceptOrderTransfer>[0]
type AcceptOrderTransferBody = Parameters<AcceptOrderTransfer>[1]
type AcceptOrderTransferFields = Parameters<AcceptOrderTransfer>[2]
export type AcceptOrderTransferParams = {
  id: AcceptOrderTransferID
  body: AcceptOrderTransferBody
  fields: AcceptOrderTransferFields
}
export type AcceptOrderTransferResponse = ReturnType<AcceptOrderTransfer>

type RejectOrderTransfer = MedusaClient['store']['order']['declineTransfer']
type RejectOrderTransferID = Parameters<RejectOrderTransfer>[0]
type RejectOrderTransferBody = Parameters<RejectOrderTransfer>[1]
type RejectOrderTransferFields = Parameters<RejectOrderTransfer>[2]
export type RejectOrderTransferParams = {
  id: RejectOrderTransferID
  body: RejectOrderTransferBody
  fields: RejectOrderTransferFields
}
export type RejectOrderTransferResponse = ReturnType<RejectOrderTransfer>
