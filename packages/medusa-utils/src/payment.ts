export const PaymentProviderIds = {
  default: 'pp_system_default'
} as const

export type PaymentProviderIdsKey = keyof typeof PaymentProviderIds
export type PaymentProviderID =
  (typeof PaymentProviderIds)[PaymentProviderIdsKey]
