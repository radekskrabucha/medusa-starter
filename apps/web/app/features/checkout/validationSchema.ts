import { phoneNumberRegex } from '@medusa-starter/utils/regex'
import { z } from 'zod'

export const shippingAddressSchema = z.object({
  email: z.string().email('Invalid email'),
  phone: z.string().regex(phoneNumberRegex, 'Invalid phone number'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  company: z.string(),
  address1: z.string().min(2, 'Address 1 must be at least 2 characters'),
  address2: z.string(),
  postalCode: z.string().min(2, 'Postal code must be at least 2 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  province: z.string().min(2, 'Province must be at least 2 characters'),
  billingPhone: z.string(),
  billingFirstName: z.string(),
  billingLastName: z.string(),
  billingCompany: z.string(),
  billingAddress1: z.string(),
  billingAddress2: z.string(),
  billingPostalCode: z.string(),
  billingCity: z.string(),
  billingProvince: z.string()
})

export const addressSchema = z
  .object({
    billingSameAddress: z.boolean()
  })
  .extend(shippingAddressSchema.shape)
  .superRefine((data, ctx) => {
    if (!data.billingSameAddress) {
      if (!data.billingPhone.match(phoneNumberRegex)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid phone number',
          path: ['billingPhone']
        })
      }
      if (data.billingFirstName.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'First name must be at least 2 characters',
          path: ['billingFirstName']
        })
      }
      if (data.billingLastName.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Last name must be at least 2 characters',
          path: ['billingLastName']
        })
      }
      if (data.billingAddress1.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Address 1 must be at least 2 characters',
          path: ['billingAddress1']
        })
      }
      if (data.billingPostalCode.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Postal code must be at least 2 characters',
          path: ['billingPostalCode']
        })
      }
      if (data.billingCity.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'City must be at least 2 characters',
          path: ['billingCity']
        })
      }
      if (data.billingProvince.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Province must be at least 2 characters',
          path: ['billingProvince']
        })
      }
    }
  })
