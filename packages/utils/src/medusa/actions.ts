import type {
  GetOrderParams,
  GetCategoriesParams,
  GetCategoriesResponse,
  GetCategoryParams,
  GetCategoryResponse,
  GetCollectionParams,
  GetCollectionsParams,
  GetCollectionsResponse,
  GetProductParams,
  GetProductResponse,
  GetProductsParams,
  GetProductsResponse,
  LogInWithEmailParams,
  LogInWithEmailResponse,
  MedusaClient,
  RefreshTokenResponse,
  ResetPasswordParams,
  ResetPasswordResponse,
  SetNewPasswordParams,
  SetNewPasswordResponse,
  SignUpWithEmailParams,
  SignUpWithEmailResponse,
  RequestOrderTransferParams,
  GetOrdersResponse,
  RequestOrderTransferResponse,
  GetOrderResponse,
  CancelOrderTransferParams,
  CancelOrderTransferResponse,
  AcceptOrderTransferParams,
  AcceptOrderTransferResponse,
  RejectOrderTransferParams,
  RejectOrderTransferResponse,
  GetCollectionResponse,
  GetRegionsParams,
  GetRegionsResponse,
  GetRegionResponse,
  CreateCartResponse,
  GetRegionParams,
  GetOrdersParams,
  UpdateCartParams,
  UpdateCartResponse,
  AddProductToCartParams,
  GetCartResponse,
  AddProductToCartResponse,
  CreateCartParams,
  UpdateCartProductResponse,
  RemoveCartProductParams,
  CompleteCartParams,
  CompleteCartResponse,
  RemoveCartProductResponse,
  TransferCartParams,
  TransferCartResponse,
  GetCartParams,
  UpdateCartProductParams,
  CreateCustomerParams,
  CreateCustomerResponse,
  UpdateCustomerResponse,
  GetCustomerResponse,
  GetCustomerParams,
  UpdateCustomerParams,
  AddNewAddressParams,
  AddNewAddressResponse,
  UpdateAddressResponse,
  GetAddressResponse,
  GetAddressesResponse,
  DeleteAddressResponse,
  GetCartShippingOptionsParams,
  GetCartShippingOptionsResponse,
  CalculateShippingOptionCostParams,
  CalculateShippingOptionCostResponse,
  UpdateAddressParams,
  GetAddressParams,
  GetAddressesParams,
  DeleteAddressParams
} from './types.js'

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
    },
    fulfillment: {
      getCartShippingOptions: (params: GetCartShippingOptionsParams) =>
        client.store.fulfillment.listCartOptions(params),
      calculateShippingOptionCost: (
        params: CalculateShippingOptionCostParams
      ) =>
        client.store.fulfillment.calculate(
          params.id,
          params.body,
          params.fields
        )
    }
  }
})

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
  fulfillment: {
    getCartShippingOptions: (
      params: GetCartShippingOptionsParams
    ) => GetCartShippingOptionsResponse
    calculateShippingOptionCost: (
      params: CalculateShippingOptionCostParams
    ) => CalculateShippingOptionCostResponse
  }
}
