import { getName } from '@medusa-starter/utils/name'
import type { Customer } from './models'

export const getCustomerDisplayName = (customer: Customer) =>
  getName({ firstName: customer.first_name, lastName: customer.last_name }) ??
  customer.email
