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
    },
    cart: {
      create: (params: CreateCartParams) =>
        client.store.cart.create(params.body, params.fields),
      update: (params: UpdateCartParams) =>
        client.store.cart.update(params.id, params.body, params.fields),
      get: (params: GetCartParams) =>
        client.store.cart.retrieve(params.id, params.fields),
      addProduct: (params: AddProductToCartParams) =>
        client.store.cart.createLineItem(
          params.cartId,
          params.body,
          params.fields
        ),
      updateProduct: (params: UpdateCartProductParams) =>
        client.store.cart.updateLineItem(
          params.cartId,
          params.id,
          params.body,
          params.fields
        ),
      removeProduct: (params: RemoveCartProductParams) =>
        client.store.cart.deleteLineItem(params.cartId, params.id),
      complete: (params: CompleteCartParams) =>
        client.store.cart.complete(params.cartId, params.fields),
      transfer: (params: TransferCartParams) =>
        client.store.cart.transferCart(params.cartId, params.fields)
    },
    customer: {
      create: (params: CreateCustomerParams) =>
        client.store.customer.create(params.body, params.fields),
      update: (params: UpdateCustomerParams) =>
        client.store.customer.update(params.body, params.fields),
      get: (params: GetCustomerParams) =>
        client.store.customer.retrieve(params.fields),
      address: {
        add: (params: AddNewAddressParams) =>
          client.store.customer.createAddress(params.body, params.fields),
        update: (params: UpdateAddressParams) =>
          client.store.customer.updateAddress(
            params.id,
            params.body,
            params.fields
          ),
        getAddress: (params: GetAddressParams) =>
          client.store.customer.retrieveAddress(params.id, params.fields),
        getAddresses: (params: GetAddressesParams) =>
          client.store.customer.listAddress(params),
        delete: (params: DeleteAddressParams) =>
          client.store.customer.deleteAddress(params.id)
      }
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
  cart: {
    create: (params: CreateCartParams) => CreateCartResponse
    update: (params: UpdateCartParams) => UpdateCartResponse
    get: (params: GetCartParams) => GetCartResponse
    addProduct: (params: AddProductToCartParams) => AddProductToCartResponse
    updateProduct: (
      params: UpdateCartProductParams
    ) => UpdateCartProductResponse
    removeProduct: (
      params: RemoveCartProductParams
    ) => RemoveCartProductResponse
    complete: (params: CompleteCartParams) => CompleteCartResponse
    transfer: (params: TransferCartParams) => TransferCartResponse
  }
  customer: {
    create: (params: CreateCustomerParams) => CreateCustomerResponse
    update: (params: UpdateCustomerParams) => UpdateCustomerResponse
    get: (params: GetCustomerParams) => GetCustomerResponse
    address: {
      add: (params: AddNewAddressParams) => AddNewAddressResponse
      update: (params: UpdateAddressParams) => UpdateAddressResponse
      getAddress: (params: GetAddressParams) => GetAddressResponse
      getAddresses: (params: GetAddressesParams) => GetAddressesResponse
      delete: (params: DeleteAddressParams) => DeleteAddressResponse
    }
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

type CreateCart = MedusaClient['store']['cart']['create']
type CreateCartBody = Parameters<CreateCart>[0]
type CreateCartFields = Parameters<CreateCart>[1]
export type CreateCartParams = {
  body: CreateCartBody
  fields: CreateCartFields
}
export type CreateCartResponse = ReturnType<CreateCart>

type UpdateCart = MedusaClient['store']['cart']['update']
type UpdateCartID = Parameters<UpdateCart>[0]
type UpdateCartBody = Parameters<UpdateCart>[1]
type UpdateCartFields = Parameters<UpdateCart>[2]
export type UpdateCartParams = {
  id: UpdateCartID
  body: UpdateCartBody
  fields: UpdateCartFields
}
export type UpdateCartResponse = ReturnType<UpdateCart>

type GetCart = MedusaClient['store']['cart']['retrieve']
type GetCartID = Parameters<GetCart>[0]
type GetCartFields = Parameters<GetCart>[1]
export type GetCartParams = {
  id: GetCartID
  fields: GetCartFields
}
export type GetCartResponse = ReturnType<GetCart>

type AddProductToCart = MedusaClient['store']['cart']['createLineItem']
type AddProductToCartID = Parameters<AddProductToCart>[0]
type AddProductToCartBody = Parameters<AddProductToCart>[1]
type AddProductToCartFields = Parameters<AddProductToCart>[2]
export type AddProductToCartParams = {
  cartId: AddProductToCartID
  body: AddProductToCartBody
  fields: AddProductToCartFields
}
export type AddProductToCartResponse = ReturnType<AddProductToCart>

type UpdateCartProduct = MedusaClient['store']['cart']['updateLineItem']
type UpdateCartProductCartID = Parameters<UpdateCartProduct>[0]
type UpdateCartProductID = Parameters<UpdateCartProduct>[1]
type UpdateCartProductBody = Parameters<UpdateCartProduct>[2]
type UpdateCartProductFields = Parameters<UpdateCartProduct>[3]
export type UpdateCartProductParams = {
  cartId: UpdateCartProductCartID
  id: UpdateCartProductID
  body: UpdateCartProductBody
  fields: UpdateCartProductFields
}
export type UpdateCartProductResponse = ReturnType<UpdateCartProduct>

type RemoveCartProduct = MedusaClient['store']['cart']['deleteLineItem']
type RemoveCartProductCartID = Parameters<RemoveCartProduct>[0]
type RemoveCartProductID = Parameters<RemoveCartProduct>[1]
export type RemoveCartProductParams = {
  cartId: RemoveCartProductCartID
  id: RemoveCartProductID
}
export type RemoveCartProductResponse = ReturnType<RemoveCartProduct>

type AddCartShippingMethod = MedusaClient['store']['cart']['addShippingMethod']
type AddCartShippingMethodCartID = Parameters<AddCartShippingMethod>[0]
type AddCartShippingMethodBody = Parameters<AddCartShippingMethod>[1]
type AddCartShippingMethodFields = Parameters<AddCartShippingMethod>[2]
export type AddCartShippingMethodParams = {
  cartId: AddCartShippingMethodCartID
  body: AddCartShippingMethodBody
  fields: AddCartShippingMethodFields
}
export type AddCartShippingMethodResponse = ReturnType<AddCartShippingMethod>

type CompleteCart = MedusaClient['store']['cart']['complete']
type CompleteCartCartID = Parameters<CompleteCart>[0]
type CompleteCartFields = Parameters<CompleteCart>[1]
export type CompleteCartParams = {
  cartId: CompleteCartCartID
  fields: CompleteCartFields
}
export type CompleteCartResponse = ReturnType<CompleteCart>

type TransferCart = MedusaClient['store']['cart']['transferCart']
type TransferCartCartID = Parameters<TransferCart>[0]
type TransferCartFields = Parameters<TransferCart>[1]
export type TransferCartParams = {
  cartId: TransferCartCartID
  fields: TransferCartFields
}
export type TransferCartResponse = ReturnType<TransferCart>

type CreateCustomer = MedusaClient['store']['customer']['create']
type CreateCustomerBody = Parameters<CreateCustomer>[0]
type CreateCustomerFields = Parameters<CreateCustomer>[1]
export type CreateCustomerParams = {
  body: CreateCustomerBody
  fields: CreateCustomerFields
}
export type CreateCustomerResponse = ReturnType<CreateCustomer>

type UpdateCustomer = MedusaClient['store']['customer']['update']
type UpdateCustomerBody = Parameters<UpdateCustomer>[0]
type UpdateCustomerFields = Parameters<UpdateCustomer>[1]
export type UpdateCustomerParams = {
  body: UpdateCustomerBody
  fields: UpdateCustomerFields
}
export type UpdateCustomerResponse = ReturnType<UpdateCustomer>

type GetCustomer = MedusaClient['store']['customer']['retrieve']
type GetCustomerFields = Parameters<GetCustomer>[0]
export type GetCustomerParams = {
  fields: GetCustomerFields
}
export type GetCustomerResponse = ReturnType<GetCustomer>

type AddNewAddress = MedusaClient['store']['customer']['createAddress']
type AddNewAddressBody = Parameters<AddNewAddress>[0]
type AddNewAddressFields = Parameters<AddNewAddress>[1]
export type AddNewAddressParams = {
  body: AddNewAddressBody
  fields: AddNewAddressFields
}
export type AddNewAddressResponse = ReturnType<AddNewAddress>

type UpdateAddress = MedusaClient['store']['customer']['updateAddress']
type UpdateAddressID = Parameters<UpdateAddress>[0]
type UpdateAddressBody = Parameters<UpdateAddress>[1]
type UpdateAddressFields = Parameters<UpdateAddress>[2]
export type UpdateAddressParams = {
  id: UpdateAddressID
  body: UpdateAddressBody
  fields: UpdateAddressFields
}
export type UpdateAddressResponse = ReturnType<UpdateAddress>

type GetAddress = MedusaClient['store']['customer']['retrieveAddress']
type GetAddressID = Parameters<GetAddress>[0]
type GetAddressFields = Parameters<GetAddress>[1]
export type GetAddressParams = {
  id: GetAddressID
  fields: GetAddressFields
}
export type GetAddressResponse = ReturnType<GetAddress>

type GetAddresses = MedusaClient['store']['customer']['listAddress']
export type GetAddressesParams = Parameters<GetAddresses>[0]
export type GetAddressesResponse = ReturnType<GetAddresses>

type DeleteAddress = MedusaClient['store']['customer']['deleteAddress']
export type DeleteAddressParams = {
  id: Parameters<DeleteAddress>[0]
}
export type DeleteAddressResponse = ReturnType<DeleteAddress>
