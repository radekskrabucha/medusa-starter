import { describe, it, expect } from 'vitest'
import type { Product } from '../src/models'
import { getProductOptionsWithVariants } from '../src/options'

describe('options utils', () => {
  describe('getProductOptionsWithVariants', () => {
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
    }

    const baseProduct = {
      id: 'prod_123',
      title: 'Test Product',
      handle: 'test-product',
      status: 'published',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      variants: null
    } as Product

    it('should return null when product has no variants', () => {
      const product = {
        ...baseProduct,
        variants: null
      }

      expect(getProductOptionsWithVariants(product)).toBeNull()
    })

    it('should return null when product has empty variants array', () => {
      const product = {
        ...baseProduct,
        variants: []
      }

      expect(getProductOptionsWithVariants(product)).toBeNull()
    })

    it('should group variants by options', () => {
      const product = {
        ...baseProduct,
        variants: [
          {
            ...baseVariant,
            id: 'variant_1',
            title: 'Small Black',
            options: [
              {
                id: 'opt_val_1',
                value: 'Small',
                option: {
                  id: 'opt_1',
                  title: 'Size'
                }
              },
              {
                id: 'opt_val_2',
                value: 'Black',
                option: {
                  id: 'opt_2',
                  title: 'Color'
                }
              }
            ]
          },
          {
            ...baseVariant,
            id: 'variant_2',
            title: 'Small White',
            options: [
              {
                id: 'opt_val_3',
                value: 'Small',
                option: {
                  id: 'opt_1',
                  title: 'Size'
                }
              },
              {
                id: 'opt_val_4',
                value: 'White',
                option: {
                  id: 'opt_2',
                  title: 'Color'
                }
              }
            ]
          }
        ]
      }

      const result = getProductOptionsWithVariants(product)
      expect(result).toHaveLength(2)

      // Check Size option
      const sizeOption = result?.find(o => o.id === 'opt_1')
      expect(sizeOption).toBeDefined()
      expect(sizeOption?.title).toBe('Size')
      expect(sizeOption?.variants).toHaveLength(2)
      expect(sizeOption?.variants.map(v => v.id)).toEqual([
        'variant_1',
        'variant_2'
      ])

      // Check Color option
      const colorOption = result?.find(o => o.id === 'opt_2')
      expect(colorOption).toBeDefined()
      expect(colorOption?.title).toBe('Color')
      expect(colorOption?.variants).toHaveLength(2)
      expect(colorOption?.variants.map(v => v.id)).toEqual([
        'variant_1',
        'variant_2'
      ])
    })

    it('should handle variants with missing options', () => {
      const product = {
        ...baseProduct,
        variants: [
          {
            ...baseVariant,
            id: 'variant_1',
            title: 'Small Black',
            options: null
          },
          {
            ...baseVariant,
            id: 'variant_2',
            title: 'Small White',
            options: [
              {
                id: 'opt_val_1',
                value: 'Small',
                option: {
                  id: 'opt_1',
                  title: 'Size'
                }
              }
            ]
          }
        ]
      }

      const result = getProductOptionsWithVariants(product)
      expect(result).toHaveLength(1)

      const sizeOption = result?.[0]
      expect(sizeOption?.id).toBe('opt_1')
      expect(sizeOption?.variants).toHaveLength(1)
      expect(sizeOption?.variants[0].id).toBe('variant_2')
    })

    it('should handle option values with missing option', () => {
      const product = {
        ...baseProduct,
        variants: [
          {
            ...baseVariant,
            id: 'variant_1',
            title: 'Small Black',
            options: [
              {
                id: 'opt_val_1',
                value: 'Small',
                option: null
              }
            ]
          }
        ]
      }

      const result = getProductOptionsWithVariants(product)
      expect(result).toHaveLength(0)
    })

    it('should not duplicate variants for the same option', () => {
      const product = {
        ...baseProduct,
        variants: [
          {
            ...baseVariant,
            id: 'variant_1',
            title: 'Small Black',
            options: [
              {
                id: 'opt_val_1',
                value: 'Small',
                option: {
                  id: 'opt_1',
                  title: 'Size'
                }
              },
              {
                id: 'opt_val_2',
                value: 'Small',
                option: {
                  id: 'opt_1',
                  title: 'Size'
                }
              }
            ]
          }
        ]
      }

      const result = getProductOptionsWithVariants(product)
      expect(result).toHaveLength(1)

      const sizeOption = result?.[0]
      expect(sizeOption?.variants).toHaveLength(1)
      expect(sizeOption?.variants[0].id).toBe('variant_1')
    })

    it('should remove options from variant objects in result', () => {
      const product = {
        ...baseProduct,
        variants: [
          {
            ...baseVariant,
            id: 'variant_1',
            title: 'Small Black',
            options: [
              {
                id: 'opt_val_1',
                value: 'Small',
                option: {
                  id: 'opt_1',
                  title: 'Size'
                }
              }
            ]
          }
        ]
      }

      const result = getProductOptionsWithVariants(product)
      const variant = result?.[0].variants[0]
      expect(variant).not.toHaveProperty('options')
    })
  })
})
