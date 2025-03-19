import type { Cart, Customer } from '@medusa-starter/medusa-utils/models'
import { formOptions } from '@tanstack/react-form'
import type { CheckoutStep } from './types'
import { addressSchema } from './validationSchema'

export const getActiveStep = (cart: Cart | undefined): CheckoutStep => {
  if (!cart) {
    return 'address'
  }
  if (!cart.email || !cart.shipping_address || !cart.billing_address) {
    return 'address'
  }
  if (!cart.shipping_methods?.length) {
    return 'shipping'
  }

  if (!cart.payment_collection?.payment_sessions?.length) {
    return 'payment'
  }

  return 'review'
}

export const getAddressFormOptions = (
  cart: Cart,
  customer: Customer | undefined,
  selectedCountryId: string | undefined
) =>
  formOptions({
    defaultValues: {
      email: cart.email ?? customer?.email ?? '',
      phone: cart.shipping_address?.phone ?? customer?.phone ?? '',
      firstName:
        cart.shipping_address?.first_name ?? customer?.first_name ?? '',
      lastName: cart.shipping_address?.last_name ?? customer?.last_name ?? '',
      company: cart.shipping_address?.company ?? customer?.company_name ?? '',
      address1: cart.shipping_address?.address_1 ?? '',
      address2: cart.shipping_address?.address_2 ?? '',
      city: cart.shipping_address?.city ?? '',
      postalCode: cart.shipping_address?.postal_code ?? '',
      province: cart.shipping_address?.province ?? '',
      countryCode:
        cart.shipping_address?.country_code ?? selectedCountryId ?? '',
      billingSameAddress: true,
      billingPhone: cart.billing_address?.phone ?? '',
      billingFirstName: cart.billing_address?.first_name ?? '',
      billingLastName: cart.billing_address?.last_name ?? '',
      billingCompany: cart.billing_address?.company ?? '',
      billingAddress1: cart.billing_address?.address_1 ?? '',
      billingAddress2: cart.billing_address?.address_2 ?? '',
      billingCity: cart.billing_address?.city ?? '',
      billingPostalCode: cart.billing_address?.postal_code ?? '',
      billingProvince: cart.billing_address?.province ?? '',
      billingCountryCode:
        cart.billing_address?.country_code ?? selectedCountryId ?? ''
    },
    validators: {
      onSubmit: addressSchema
    }
  })
