import { describe, it, expect } from 'vitest'
import { getCustomerDisplayName } from '../src/customer'
import type { Customer } from '../src/models'

describe('customer utils', () => {
  describe('getCustomerDisplayName', () => {
    const baseCustomer = {
      id: 'cus_123',
      email: 'test@example.com',
      first_name: null,
      last_name: null,
      billing_address_id: null,
      phone: null,
      has_account: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
      metadata: {},
      addresses: [],
      default_billing_address_id: null,
      default_shipping_address_id: null,
      company_name: null
    } as Customer

    it('should return full name when both first_name and last_name are provided', () => {
      const customer = {
        ...baseCustomer,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com'
      }

      expect(getCustomerDisplayName(customer)).toBe('John Doe')
    })

    it('should return first_name when only first_name is provided', () => {
      const customer = {
        ...baseCustomer,
        first_name: 'John',
        last_name: null,
        email: 'john@example.com'
      }

      expect(getCustomerDisplayName(customer)).toBe('John')
    })

    it('should return last_name when only last_name is provided', () => {
      const customer = {
        ...baseCustomer,
        first_name: null,
        last_name: 'Doe',
        email: 'doe@example.com'
      }

      expect(getCustomerDisplayName(customer)).toBe('Doe')
    })

    it('should return email when neither first_name nor last_name is provided', () => {
      const customer = {
        ...baseCustomer,
        first_name: null,
        last_name: null,
        email: 'customer@example.com'
      }

      expect(getCustomerDisplayName(customer)).toBe('customer@example.com')
    })
  })
})
