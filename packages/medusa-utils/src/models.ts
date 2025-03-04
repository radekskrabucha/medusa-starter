import type {
  GetProductResponse,
  GetAddressResponse,
  GetCartResponse,
  GetCustomerResponse,
  GetRegionResponse,
  GetOrderResponse,
  GetCollectionResponse,
  GetCategoryResponse,
  GetCartShippingOptionsResponse
} from './types'

export type Product = Awaited<GetProductResponse>['product']
export type Address = Awaited<GetAddressResponse>['address']
export type Cart = Awaited<GetCartResponse>['cart']
export type Customer = Awaited<GetCustomerResponse>['customer']
export type Region = Awaited<GetRegionResponse>['region']
export type Order = Awaited<GetOrderResponse>['order']
export type Collection = Awaited<GetCollectionResponse>['collection']
export type Category = Awaited<GetCategoryResponse>['product_category']
export type CartShippingOption =
  Awaited<GetCartShippingOptionsResponse>['shipping_options'][number]
