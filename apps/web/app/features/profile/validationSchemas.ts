import { z } from 'zod'

export const shippingAddressSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phoneNumber: z.string().min(2, 'Phone number must be at least 2 characters'),
  companyName: z.string(),
  addressName: z.string().min(2, 'Address name must be at least 2 characters'),
  address1: z.string().min(2, 'Address 1 must be at least 2 characters'),
  address2: z.string(),
  city: z.string().min(2, 'City must be at least 2 characters'),
  province: z.string().min(2, 'Province must be at least 2 characters'),
  postalCode: z.string().min(2, 'Postal code must be at least 2 characters'),
  isDefaultBilling: z.boolean(),
  isDefaultShipping: z.boolean(),
  countryCode: z.string().min(1, 'Country is required')
})

export type ShippingAddress = z.infer<typeof shippingAddressSchema>
