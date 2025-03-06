import type { Customer } from './models'

export const getCustomerDisplayName = (customer: Customer) => {
  if (customer.first_name) {
    return customer.first_name
  }

  return customer.email
}
