import { describe, it, expect } from 'vitest'
import type { Product, ProductVariant } from '../src/models'
import {
  convertPriceAmountToLocale,
  getPercentageDiff,
  getVariantPrices,
  getProductPrice
} from '../src/price'

describe('price utils', () => {
  describe('convertPriceAmountToLocale', () => {
    it('should format price with currency', () => {
      expect(
        convertPriceAmountToLocale({
          amount: 1000,
          currencyCode: 'USD'
        })
      ).toBe('$1,000.00')

      expect(
        convertPriceAmountToLocale({
          amount: 1000,
          currencyCode: 'EUR'
        })
      ).toBe('€1,000.00')
    })

    it('should respect locale', () => {
      const result = convertPriceAmountToLocale({
        amount: 1000,
        currencyCode: 'EUR',
        locale: 'de-DE'
      })
      expect(result).toMatch(/1\.000,00/)
      expect(result).toMatch(/€/)
    })

    it('should respect fraction digits', () => {
      expect(
        convertPriceAmountToLocale({
          amount: 1000,
          currencyCode: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        })
      ).toBe('$1,000')
    })

    it('should return amount as string when no currency code provided', () => {
      expect(
        convertPriceAmountToLocale({
          amount: 1000,
          currencyCode: ''
        })
      ).toBe('1000')
    })
  })

  describe('getPercentageDiff', () => {
    it('should calculate percentage difference', () => {
      expect(
        getPercentageDiff({
          original: 100,
          calculated: 80
        })
      ).toBe(20)

      expect(
        getPercentageDiff({
          original: 100,
          calculated: 120
        })
      ).toBe(-20)
    })

    it('should handle zero values', () => {
      expect(
        getPercentageDiff({
          original: 0,
          calculated: 0
        })
      ).toBe(0)
    })
  })

  describe('getVariantPrices', () => {
    const baseVariant = {
      id: 'variant_1',
      title: 'Test Variant',
      product_id: 'prod_123',
      sku: 'TEST-1',
      barcode: null,
      ean: null,
      upc: null,
      variant_rank: 0,
      inventory_quantity: 100,
      allow_backorder: false,
      manage_inventory: true,
      hs_code: null,
      origin_country: null,
      mid_code: null,
      material: null,
      weight: null,
      length: null,
      height: null,
      width: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
      metadata: null,
      options: null
    } as ProductVariant

    it('should return null when variant has no calculated price', () => {
      const variant = {
        ...baseVariant,
        calculated_price: undefined
      }

      expect(getVariantPrices(variant)).toBeNull()
    })

    it('should return null when variant has no calculated amount', () => {
      const variant = {
        ...baseVariant,
        calculated_price: {
          id: 'calc_1',
          calculated_amount: null,
          original_amount: null,
          original_amount_with_tax: null,
          original_amount_without_tax: null,
          currency_code: 'USD'
        }
      }

      expect(getVariantPrices(variant)).toBeNull()
    })

    it('should return prices with original price when available', () => {
      const variant = {
        ...baseVariant,
        calculated_price: {
          id: 'calc_1',
          calculated_amount: 80,
          original_amount: 100,
          original_amount_with_tax: 110,
          original_amount_without_tax: 90,
          currency_code: 'USD'
        }
      }

      const prices = getVariantPrices(variant)
      expect(prices?.calculatedPrice.number).toBe(80)
      expect(prices?.calculatedPrice.formatted()).toBe('$80.00')
      expect(prices?.originalPrice?.number).toBe(100)
      expect(prices?.originalPrice?.formatted()).toBe('$100.00')
      expect(prices?.currencyCode).toBe('USD')
      expect(prices?.percentageDiff()?.number).toBe(20)
      expect(prices?.percentageDiff()?.formatted).toBe('20.00')
    })

    it('should return prices without original price when not available', () => {
      const variant = {
        ...baseVariant,
        calculated_price: {
          id: 'calc_1',
          calculated_amount: 80,
          original_amount: null,
          original_amount_with_tax: null,
          original_amount_without_tax: null,
          currency_code: 'USD'
        }
      }

      const prices = getVariantPrices(variant)
      expect(prices?.calculatedPrice.number).toBe(80)
      expect(prices?.calculatedPrice.formatted()).toBe('$80.00')
      expect(prices?.originalPrice).toBeNull()
      expect(prices?.percentageDiff()).toBeNull()
    })

    it('should format prices with custom locale and fraction digits', () => {
      const variant = {
        ...baseVariant,
        calculated_price: {
          id: 'calc_1',
          calculated_amount: 80,
          original_amount: 100,
          original_amount_with_tax: 110,
          original_amount_without_tax: 90,
          currency_code: 'EUR'
        }
      }

      const prices = getVariantPrices(variant)
      const formattedPrice = prices?.calculatedPrice.formatted({
        locale: 'de-DE',
        minimumFractionDigits: 0
      })
      expect(formattedPrice).toMatch(/80/)
      expect(formattedPrice).toMatch(/€/)
    })
  })

  describe('getProductPrice', () => {
    const baseVariant = {
      id: 'variant_1',
      title: 'Test Variant',
      product_id: 'prod_123',
      sku: 'TEST-1',
      barcode: null,
      ean: null,
      upc: null,
      variant_rank: 0,
      inventory_quantity: 100,
      allow_backorder: false,
      manage_inventory: true,
      hs_code: null,
      origin_country: null,
      mid_code: null,
      material: null,
      weight: null,
      length: null,
      height: null,
      width: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
      metadata: null,
      options: null
    } as ProductVariant

    const baseProduct = {
      id: 'prod_123',
      title: 'Test Product',
      handle: 'test-product',
      status: 'published',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    } as Product

    it('should throw error when no product provided', () => {
      expect(() =>
        getProductPrice({
          product: null as unknown as Product,
          variantId: 'variant_1'
        })
      ).toThrow('No product provided')
    })

    it('should return null when product has no variants', () => {
      const product = {
        ...baseProduct,
        variants: null
      }

      expect(getProductPrice({ product, variantId: 'variant_1' })).toBeNull()
    })

    it('should return null when product has empty variants array', () => {
      const product = {
        ...baseProduct,
        variants: []
      }

      expect(getProductPrice({ product, variantId: 'variant_1' })).toBeNull()
    })

    it('should find cheapest variant', () => {
      const product = {
        ...baseProduct,
        variants: [
          {
            ...baseVariant,
            id: 'variant_1',
            calculated_price: {
              id: 'calc_1',
              calculated_amount: 100,
              original_amount: null,
              original_amount_with_tax: null,
              original_amount_without_tax: null,
              currency_code: 'USD'
            }
          },
          {
            ...baseVariant,
            id: 'variant_2',
            calculated_price: {
              id: 'calc_2',
              calculated_amount: 80,
              original_amount: null,
              original_amount_with_tax: null,
              original_amount_without_tax: null,
              currency_code: 'USD'
            }
          }
        ]
      }

      const result = getProductPrice({ product, variantId: 'variant_1' })
      expect(result?.cheapestVariant?.id).toBe('variant_2')
      expect(result?.cheapestVariantPrice?.calculatedPrice.number).toBe(80)
    })

    it('should find specific variant by id', () => {
      const product = {
        ...baseProduct,
        variants: [
          {
            ...baseVariant,
            id: 'variant_1',
            calculated_price: {
              id: 'calc_1',
              calculated_amount: 100,
              original_amount: null,
              original_amount_with_tax: null,
              original_amount_without_tax: null,
              currency_code: 'USD'
            }
          },
          {
            ...baseVariant,
            id: 'variant_2',
            calculated_price: {
              id: 'calc_2',
              calculated_amount: 80,
              original_amount: null,
              original_amount_with_tax: null,
              original_amount_without_tax: null,
              currency_code: 'USD'
            }
          }
        ]
      }

      const result = getProductPrice({ product, variantId: 'variant_1' })
      expect(result?.variant?.id).toBe('variant_1')
      expect(result?.variantPrice?.calculatedPrice.number).toBe(100)
    })

    it('should handle variants with missing calculated price', () => {
      const product = {
        ...baseProduct,
        variants: [
          {
            ...baseVariant,
            id: 'variant_1',
            calculated_price: undefined
          },
          {
            ...baseVariant,
            id: 'variant_2',
            calculated_price: {
              id: 'calc_2',
              calculated_amount: 80,
              original_amount: null,
              original_amount_with_tax: null,
              original_amount_without_tax: null,
              currency_code: 'USD'
            }
          }
        ]
      }

      const result = getProductPrice({ product, variantId: 'variant_1' })
      expect(result?.cheapestVariant?.id).toBe('variant_2')
      expect(result?.variant?.id).toBe('variant_1')
      expect(result?.variantPrice).toBeNull()
    })

    it('should handle variants with missing calculated amount', () => {
      const product = {
        ...baseProduct,
        variants: [
          {
            ...baseVariant,
            id: 'variant_1',
            calculated_price: {
              id: 'calc_1',
              calculated_amount: null,
              original_amount: null,
              original_amount_with_tax: null,
              original_amount_without_tax: null,
              currency_code: 'USD'
            }
          },
          {
            ...baseVariant,
            id: 'variant_2',
            calculated_price: {
              id: 'calc_2',
              calculated_amount: 80,
              original_amount: null,
              original_amount_with_tax: null,
              original_amount_without_tax: null,
              currency_code: 'USD'
            }
          }
        ]
      }

      const result = getProductPrice({ product, variantId: 'variant_1' })
      expect(result?.cheapestVariant?.id).toBe('variant_2')
      expect(result?.variant?.id).toBe('variant_1')
      expect(result?.variantPrice).toBeNull()
    })
  })
})
