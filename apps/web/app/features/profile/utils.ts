import type { Order } from '@medusa-starter/medusa-utils/models'
import type { BadgeVariant } from '@medusa-starter/ui/badge'
import { getRouteApi } from '@tanstack/react-router'

export const addressDetailsPageRouteApi = getRouteApi(
  '/(app)/_layout/_authenticated/profile/_layout/shipping-address/$id/'
)

export const editAddressPageRouteApi = getRouteApi(
  '/(app)/_layout/_authenticated/profile/_layout/shipping-address/$id/edit'
)

export const ordersPageRouteApi = getRouteApi(
  '/(app)/_layout/_authenticated/profile/_layout/orders/'
)

type StatusConfig = {
  variant: BadgeVariant
  label: string
}

type PaymentStatus = NonNullable<Order['payment_status']>

export const paymentStatusMap: Record<PaymentStatus, StatusConfig> = {
  not_paid: {
    variant: 'destructive',
    label: 'Not Paid'
  },
  awaiting: {
    variant: 'outline',
    label: 'Awaiting Payment'
  },
  captured: {
    variant: 'default',
    label: 'Paid'
  },
  partially_refunded: {
    variant: 'secondary',
    label: 'Partially Refunded'
  },
  refunded: {
    variant: 'secondary',
    label: 'Refunded'
  },
  canceled: {
    variant: 'destructive',
    label: 'Canceled'
  },
  requires_action: {
    variant: 'outline',
    label: 'Action Required'
  },
  authorized: {
    variant: 'outline',
    label: 'Authorized'
  },
  partially_authorized: {
    variant: 'outline',
    label: 'Partially Authorized'
  },
  partially_captured: {
    variant: 'secondary',
    label: 'Partially Captured'
  }
}

type FulfillmentStatus = NonNullable<Order['fulfillment_status']>

export const fulfillmentStatusMap: Record<FulfillmentStatus, StatusConfig> = {
  not_fulfilled: {
    variant: 'outline',
    label: 'Not Fulfilled'
  },
  partially_fulfilled: {
    variant: 'secondary',
    label: 'Partially Fulfilled'
  },
  fulfilled: {
    variant: 'default',
    label: 'Fulfilled'
  },
  partially_shipped: {
    variant: 'secondary',
    label: 'Partially Shipped'
  },
  shipped: {
    variant: 'default',
    label: 'Shipped'
  },
  partially_delivered: {
    variant: 'secondary',
    label: 'Partially Delivered'
  },
  canceled: {
    variant: 'destructive',
    label: 'Canceled'
  },
  delivered: {
    variant: 'default',
    label: 'Delivered'
  }
}
