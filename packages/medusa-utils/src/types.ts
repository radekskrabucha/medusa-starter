import Medusa from '@medusajs/js-sdk'
import type { PaymentSession } from './models'

export type MedusaClient = InstanceType<typeof Medusa>

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

export type GetProductsWithFiltersParams =
  | (Pick<
      NonNullable<GetProductsParams>,
      'limit' | 'offset' | 'order' | 'fields'
    > & {
      categories?: Array<string>
      collections?: Array<string>
      types?: Array<string>
      tags?: Array<string>
    })
  | undefined

type GetProduct = MedusaClient['store']['product']['retrieve']
type GetProductId = Parameters<GetProduct>[0]
type GetProductFields = Parameters<GetProduct>[1]
export type GetProductParams = {
  id: GetProductId
} & GetProductFields
export type GetProductResponse = ReturnType<GetProduct>

type GetCategories = MedusaClient['store']['category']['list']
export type GetCategoriesParams = Parameters<GetCategories>[0]
export type GetCategoriesResponse = ReturnType<GetCategories>

type GetCategory = MedusaClient['store']['category']['retrieve']
type GetCategoryId = Parameters<GetCategory>[0]
type GetCategoryFields = Parameters<GetCategory>[1]
export type GetCategoryParams = {
  id: GetCategoryId
} & GetCategoryFields
export type GetCategoryResponse = ReturnType<GetCategory>

type GetCollections = MedusaClient['store']['collection']['list']
export type GetCollectionsParams = Parameters<GetCollections>[0]
export type GetCollectionsResponse = ReturnType<GetCollections>

type GetCollection = MedusaClient['store']['collection']['retrieve']
type GetCollectionId = Parameters<GetCollection>[0]
type GetCollectionFields = Parameters<GetCollection>[1]
export type GetCollectionParams = {
  id: GetCollectionId
} & GetCollectionFields
export type GetCollectionResponse = ReturnType<GetCollection>

type GetRegions = MedusaClient['store']['region']['list']
export type GetRegionsParams = Parameters<GetRegions>[0]
export type GetRegionsResponse = ReturnType<GetRegions>

type GetRegion = MedusaClient['store']['region']['retrieve']
type GetRegionId = Parameters<GetRegion>[0]
type GetRegionFields = Parameters<GetRegion>[1]
export type GetRegionParams = {
  id: GetRegionId
} & GetRegionFields
export type GetRegionResponse = ReturnType<GetRegion>

type GetOrders = MedusaClient['store']['order']['list']
export type GetOrdersParams = Parameters<GetOrders>[0]
export type GetOrdersResponse = ReturnType<GetOrders>

type GetOrder = MedusaClient['store']['order']['retrieve']
type GetOrderId = Parameters<GetOrder>[0]
type GetOrderFields = Parameters<GetOrder>[1]
export type GetOrderParams = {
  id: GetOrderId
} & GetOrderFields
export type GetOrderResponse = ReturnType<GetOrder>

type RequestOrderTransfer = MedusaClient['store']['order']['requestTransfer']
type RequestOrderTransferID = Parameters<RequestOrderTransfer>[0]
type RequestOrderTransferBody = Parameters<RequestOrderTransfer>[1]
type RequestOrderTransferFields = Parameters<RequestOrderTransfer>[2]
export type RequestOrderTransferParams = {
  id: RequestOrderTransferID
  body: RequestOrderTransferBody
} & RequestOrderTransferFields
export type RequestOrderTransferResponse = ReturnType<RequestOrderTransfer>

type CancelOrderTransfer = MedusaClient['store']['order']['cancelTransfer']
type CancelOrderTransferID = Parameters<CancelOrderTransfer>[0]
type CancelOrderTransferFields = Parameters<CancelOrderTransfer>[1]
export type CancelOrderTransferParams = {
  id: CancelOrderTransferID
} & CancelOrderTransferFields
export type CancelOrderTransferResponse = ReturnType<CancelOrderTransfer>

type AcceptOrderTransfer = MedusaClient['store']['order']['acceptTransfer']
type AcceptOrderTransferID = Parameters<AcceptOrderTransfer>[0]
type AcceptOrderTransferBody = Parameters<AcceptOrderTransfer>[1]
type AcceptOrderTransferFields = Parameters<AcceptOrderTransfer>[2]
export type AcceptOrderTransferParams = {
  id: AcceptOrderTransferID
  body: AcceptOrderTransferBody
} & AcceptOrderTransferFields
export type AcceptOrderTransferResponse = ReturnType<AcceptOrderTransfer>

type RejectOrderTransfer = MedusaClient['store']['order']['declineTransfer']
type RejectOrderTransferID = Parameters<RejectOrderTransfer>[0]
type RejectOrderTransferBody = Parameters<RejectOrderTransfer>[1]
type RejectOrderTransferFields = Parameters<RejectOrderTransfer>[2]
export type RejectOrderTransferParams = {
  id: RejectOrderTransferID
  body: RejectOrderTransferBody
} & RejectOrderTransferFields
export type RejectOrderTransferResponse = ReturnType<RejectOrderTransfer>

type CreateCart = MedusaClient['store']['cart']['create']
type CreateCartBody = Parameters<CreateCart>[0]
type CreateCartFields = Parameters<CreateCart>[1]
export type CreateCartParams = {
  body: CreateCartBody
} & CreateCartFields
export type CreateCartResponse = ReturnType<CreateCart>

type UpdateCart = MedusaClient['store']['cart']['update']
type UpdateCartID = Parameters<UpdateCart>[0]
type UpdateCartBody = Parameters<UpdateCart>[1]
type UpdateCartFields = Parameters<UpdateCart>[2]
export type UpdateCartParams = {
  id: UpdateCartID
  body: UpdateCartBody
} & UpdateCartFields
export type UpdateCartResponse = ReturnType<UpdateCart>

type GetCart = MedusaClient['store']['cart']['retrieve']
type GetCartID = Parameters<GetCart>[0]
type GetCartFields = Parameters<GetCart>[1]
export type GetCartParams = {
  id: GetCartID
} & GetCartFields
export type GetCartResponse = ReturnType<GetCart>

type AddProductToCart = MedusaClient['store']['cart']['createLineItem']
type AddProductToCartID = Parameters<AddProductToCart>[0]
type AddProductToCartBody = Parameters<AddProductToCart>[1]
type AddProductToCartFields = Parameters<AddProductToCart>[2]
export type AddProductToCartParams = {
  cartId: AddProductToCartID
  body: AddProductToCartBody
} & AddProductToCartFields
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
} & UpdateCartProductFields
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
} & AddCartShippingMethodFields
export type AddCartShippingMethodResponse = ReturnType<AddCartShippingMethod>

type CompleteCart = MedusaClient['store']['cart']['complete']
type CompleteCartCartID = Parameters<CompleteCart>[0]
type CompleteCartFields = Parameters<CompleteCart>[1]
export type CompleteCartParams = {
  cartId: CompleteCartCartID
} & CompleteCartFields
export type CompleteCartResponse = ReturnType<CompleteCart>

type TransferCart = MedusaClient['store']['cart']['transferCart']
type TransferCartCartID = Parameters<TransferCart>[0]
type TransferCartFields = Parameters<TransferCart>[1]
export type TransferCartParams = {
  cartId: TransferCartCartID
} & TransferCartFields
export type TransferCartResponse = ReturnType<TransferCart>

type CreateCustomer = MedusaClient['store']['customer']['create']
type CreateCustomerBody = Parameters<CreateCustomer>[0]
type CreateCustomerFields = Parameters<CreateCustomer>[1]
export type CreateCustomerParams = {
  body: CreateCustomerBody
} & CreateCustomerFields
export type CreateCustomerResponse = ReturnType<CreateCustomer>

type UpdateCustomer = MedusaClient['store']['customer']['update']
type UpdateCustomerBody = Parameters<UpdateCustomer>[0]
type UpdateCustomerFields = Parameters<UpdateCustomer>[1]
export type UpdateCustomerParams = {
  body: UpdateCustomerBody
} & UpdateCustomerFields
export type UpdateCustomerResponse = ReturnType<UpdateCustomer>

type GetCustomer = MedusaClient['store']['customer']['retrieve']
type GetCustomerFields = Parameters<GetCustomer>[0]
export type GetMeCustomerParams = GetCustomerFields
export type GetMeCustomerResponse = ReturnType<GetCustomer>

type AddNewAddress = MedusaClient['store']['customer']['createAddress']
type AddNewAddressBody = Parameters<AddNewAddress>[0]
type AddNewAddressFields = Parameters<AddNewAddress>[1]
export type AddNewAddressParams = {
  body: AddNewAddressBody
} & AddNewAddressFields
export type AddNewAddressResponse = ReturnType<AddNewAddress>

type UpdateAddress = MedusaClient['store']['customer']['updateAddress']
type UpdateAddressID = Parameters<UpdateAddress>[0]
type UpdateAddressBody = Parameters<UpdateAddress>[1]
type UpdateAddressFields = Parameters<UpdateAddress>[2]
export type UpdateAddressParams = {
  id: UpdateAddressID
  body: UpdateAddressBody
} & UpdateAddressFields
export type UpdateAddressResponse = ReturnType<UpdateAddress>

type GetAddress = MedusaClient['store']['customer']['retrieveAddress']
type GetAddressID = Parameters<GetAddress>[0]
type GetAddressFields = Parameters<GetAddress>[1]
export type GetAddressParams = {
  id: GetAddressID
} & GetAddressFields
export type GetAddressResponse = ReturnType<GetAddress>

type GetAddresses = MedusaClient['store']['customer']['listAddress']
export type GetAddressesParams = Parameters<GetAddresses>[0]
export type GetAddressesResponse = ReturnType<GetAddresses>

type DeleteAddress = MedusaClient['store']['customer']['deleteAddress']
export type DeleteAddressParams = {
  id: Parameters<DeleteAddress>[0]
}
export type DeleteAddressResponse = ReturnType<DeleteAddress>

type GetCartShippingOptions =
  MedusaClient['store']['fulfillment']['listCartOptions']
export type GetCartShippingOptionsParams = Parameters<GetCartShippingOptions>[0]
export type GetCartShippingOptionsResponse = ReturnType<GetCartShippingOptions>

type CalculateShippingOptionCost =
  MedusaClient['store']['fulfillment']['calculate']
type CalculateShippingOptionCostID = Parameters<CalculateShippingOptionCost>[0]
type CalculateShippingOptionCostBody =
  Parameters<CalculateShippingOptionCost>[1]
type CalculateShippingOptionCostFields =
  Parameters<CalculateShippingOptionCost>[2]
export type CalculateShippingOptionCostParams = {
  id: CalculateShippingOptionCostID
  body: CalculateShippingOptionCostBody
} & CalculateShippingOptionCostFields
export type CalculateShippingOptionCostResponse =
  ReturnType<CalculateShippingOptionCost>

type GetPaymentProviders =
  MedusaClient['store']['payment']['listPaymentProviders']
export type GetPaymentProvidersParams = Parameters<GetPaymentProviders>[0]
export type GetPaymentProvidersResponse = ReturnType<GetPaymentProviders>

type InitiatePaymentSession =
  MedusaClient['store']['payment']['initiatePaymentSession']
type InitiatePaymentSessionCart = Parameters<InitiatePaymentSession>[0]
type InitiatePaymentSessionBody = Parameters<InitiatePaymentSession>[1]
type InitiatePaymentSessionFields = Parameters<InitiatePaymentSession>[2]
export type InitiatePaymentSessionParams = {
  cart: InitiatePaymentSessionCart
  body: InitiatePaymentSessionBody
} & InitiatePaymentSessionFields
export type InitiatePaymentSessionResponse = ReturnType<InitiatePaymentSession>

export type CreatePaymentCollectionParams = {
  cart_id: string
}
export type CreatePaymentCollectionResponse = Promise<{
  payment_collection: {
    id: string
    currency_code: string
    amount: number
    payment_sessions: Array<PaymentSession>
  }
}>
