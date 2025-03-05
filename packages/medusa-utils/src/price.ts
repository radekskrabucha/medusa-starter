import { nonNullable } from '@medusa-starter/utils/common'
import type { Product, ProductVariant } from './models'

type ConvertToLocaleParams = {
  amount: number
  currencyCode: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  locale?: string
}

export const convertPriceAmountToLocale = ({
  amount,
  currencyCode,
  minimumFractionDigits,
  maximumFractionDigits,
  locale = 'en-US'
}: ConvertToLocaleParams) => {
  return currencyCode
    ? new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits,
        maximumFractionDigits
      }).format(amount)
    : amount.toString()
}

type GetPercentageDiffParams = {
  original: number
  calculated: number
}

export const getPercentageDiff = ({
  calculated,
  original
}: GetPercentageDiffParams) => {
  const diff = original - calculated
  const decrease = (diff / original) * 100

  return decrease
}

type FormatVariantCalculatedPriceParams = Omit<
  ConvertToLocaleParams,
  'amount' | 'currencyCode'
> & {
  currencyCode?: string
}

const createPriceFormatter = (
  calculatedAmount: number,
  currencyCode: string | null
) => {
  return (params: FormatVariantCalculatedPriceParams = {}) =>
    convertPriceAmountToLocale({
      amount: calculatedAmount,
      currencyCode: params.currencyCode ?? currencyCode ?? '',
      locale: params.locale,
      minimumFractionDigits: params.minimumFractionDigits,
      maximumFractionDigits: params.maximumFractionDigits
    })
}

export const getVariantPrices = (variant: ProductVariant) => {
  if (!nonNullable(variant.calculated_price)) {
    return null
  }
  if (!nonNullable(variant.calculated_price.calculated_amount)) {
    return null
  }

  const calculatedPrice = variant.calculated_price
  const calculatedAmount = variant.calculated_price.calculated_amount

  return {
    calculatedPrice: {
      number: calculatedAmount,
      formatted: createPriceFormatter(
        calculatedAmount,
        calculatedPrice.currency_code
      )
    },
    originalPrice: nonNullable(calculatedPrice.original_amount)
      ? {
          number: calculatedPrice.original_amount,
          formatted: createPriceFormatter(
            calculatedPrice.original_amount,
            calculatedPrice.currency_code
          )
        }
      : null,
    currencyCode: calculatedPrice.currency_code,
    priceType: calculatedPrice.calculated_price?.price_list_type,
    percentageDiff: () => {
      if (nonNullable(calculatedPrice.original_amount)) {
        const diff = getPercentageDiff({
          original: calculatedPrice.original_amount,
          calculated: calculatedAmount
        })
        return {
          number: diff,
          formatted: diff.toFixed(2)
        }
      }

      return null
    }
  }
}

type GetProductPriceParams = {
  product: Product
  variantId: string
}

type GetVariantPricesReturn = ReturnType<typeof getVariantPrices>
type GetProductPriceReturn = {
  cheapestVariant: ProductVariant | null
  variant: ProductVariant | null
  variantPrice: GetVariantPricesReturn | null
  cheapestVariantPrice: GetVariantPricesReturn | null
} | null

export const getProductPrice = ({
  product,
  variantId
}: GetProductPriceParams): GetProductPriceReturn => {
  if (!product || !product.id) {
    throw new Error('No product provided')
  }
  if (!nonNullable(product.variants)) {
    return null
  }
  if (product.variants.length === 0) {
    return null
  }

  const variants = product.variants

  const cheapestVariant = (() => {
    return variants.reduce<ProductVariant | null>(
      (cheapestVariant, currentVariant) => {
        if (!nonNullable(currentVariant.calculated_price)) {
          return cheapestVariant
        }

        const currentVariantPrice = currentVariant.calculated_price

        if (!nonNullable(currentVariantPrice.calculated_amount)) {
          return cheapestVariant
        }

        const currentVariantAmount = currentVariantPrice.calculated_amount

        if (
          currentVariantAmount <
          (cheapestVariant?.calculated_price?.calculated_amount ??
            Number.MAX_VALUE)
        ) {
          return currentVariant
        }

        return cheapestVariant
      },
      null
    )
  })()

  const variant = (() => {
    if (!variantId) {
      return null
    }

    const variant = variants.find(variant => variant.id === variantId)

    if (!variant) {
      return null
    }

    return variant
  })()

  const cheapestVariantPrice = nonNullable(cheapestVariant)
    ? getVariantPrices(cheapestVariant)
    : null
  const variantPrice = nonNullable(variant) ? getVariantPrices(variant) : null

  return {
    cheapestVariant,
    cheapestVariantPrice,
    variant,
    variantPrice
  }
}
