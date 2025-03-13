import type {
  CalculateShippingOptionCostParams,
  GetCartShippingOptionsParams,
  GetPaymentProvidersParams
} from '@medusa-starter/medusa-utils/types'
import { queryOptions } from '@tanstack/react-query'
import { actions } from '~web/lib/medusa'

export const getShippingMethodsQueryOptions = (
  params: GetCartShippingOptionsParams
) =>
  queryOptions({
    queryFn: () => actions.fulfillment.getCartShippingOptions(params),
    queryKey: ['actions.fulfillment.getCartShippingOptions', params]
  })

export const getShippingMethodCostQueryOptions = (
  params: CalculateShippingOptionCostParams
) =>
  queryOptions({
    queryFn: () => actions.fulfillment.calculateShippingOptionCost(params),
    queryKey: ['actions.fulfillment.calculateShippingOptionCost', params]
  })

export const getPaymentProvidersQueryOptions = (
  params: GetPaymentProvidersParams
) =>
  queryOptions({
    queryFn: () => actions.payment.getPaymentProviders(params),
    queryKey: ['actions.payment.getPaymentProviders', params]
  })
