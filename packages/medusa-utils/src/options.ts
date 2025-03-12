import type { Product, ProductOptionWithVariants } from './models'

export const getProductOptionsWithVariants = (product: Product) => {
  const variants = product.variants

  if (!variants) {
    return null
  }
  if (variants.length === 0) {
    return null
  }

  const result = variants.reduce<Array<ProductOptionWithVariants>>(
    (acc, variant) => {
      if (!variant.options) {
        return acc
      }

      variant.options.forEach(optionValue => {
        const { option } = optionValue
        if (!option) {
          return
        }

        const existingOption = acc.find(o => o.id === option.id)

        if (existingOption) {
          // Add variant to existing option if not already present
          const { options: _, ...variantWithoutOptions } = variant

          if (!existingOption.variants.some(v => v.id === variant.id)) {
            existingOption.variants.push(variantWithoutOptions)
          }
        } else {
          // Create new option with the current variant
          const { options: _, ...variantWithoutOptions } = variant

          acc.push({
            ...option,
            variants: [variantWithoutOptions]
          })
        }
      })

      return acc
    },
    [] as Array<ProductOptionWithVariants>
  )

  return result
}
