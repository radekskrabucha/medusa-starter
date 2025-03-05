import { nonNullable } from '@medusa-starter/utils/common'
import type { ProductVariant } from './models'

type ConvertToLocaleParams = {
  amount: number
  currencyCode: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  locale?: string
}

export const convertToLocale = ({
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
  'amount' | 'currency_code'
> & {
  currency_code?: string
}

const createPriceFormatter = (
  calculatedAmount: number,
  currencyCode: string | null
) => {
  return (params: FormatVariantCalculatedPriceParams) =>
    convertToLocale({
      amount: calculatedAmount,
      currencyCode: params.currency_code ?? currencyCode ?? '',
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
