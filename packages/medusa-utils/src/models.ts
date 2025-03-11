import type {
  GetProductResponse,
  GetAddressResponse,
  GetCartResponse,
  GetMeCustomerResponse,
  GetRegionResponse,
  GetOrderResponse,
  GetCollectionResponse,
  GetCategoryResponse,
  GetCartShippingOptionsResponse
} from './types'

export type Product = Awaited<GetProductResponse>['product']
export type ProductImage = NonNullable<Product['images']>[number]
export type ProductOption = NonNullable<Product['options']>[number]
export type ProductOptionValue = NonNullable<ProductOption['values']>[number]
export type ProductVariant = NonNullable<Product['variants']>[number]
export type ProductVariantWithoutOptions = Omit<ProductVariant, 'options'>
export type ProductOptionWithVariants = ProductOption & {
  variants: Array<ProductVariantWithoutOptions>
}
export type Address = Awaited<GetAddressResponse>['address']
export type Cart = Awaited<GetCartResponse>['cart']
export type CartItem = NonNullable<Cart['items']>[number]
export type Customer = Awaited<GetMeCustomerResponse>['customer']
export type Region = Awaited<GetRegionResponse>['region']
export type RegionCountry = NonNullable<Region['countries']>[number]
export type Order = Awaited<GetOrderResponse>['order']
export type Collection = Awaited<GetCollectionResponse>['collection']
export type Category = Awaited<GetCategoryResponse>['product_category']
export type CartShippingOption =
  Awaited<GetCartShippingOptionsResponse>['shipping_options'][number]
