import type {
  Product,
  ProductImage,
  ProductOption,
  ProductOptionValue,
  ProductVariant
} from '@medusa-starter/medusa-utils/models'
import { getRouteApi } from '@tanstack/react-router'
import type { ProductSearch, QueryProductOption } from './validationSchemas'

export const productPageRouteApi = getRouteApi(
  '/(app)/_layout/store/item/$handle'
)

type Direction = 'prev' | 'next'

export const getNavigationImageId = (
  selectedImageIndex: number,
  images: Array<ProductImage>
) => {
  const getNavigationImageId = (direction: Direction) => {
    if (images.length < 2) {
      return undefined
    }

    const newIndex =
      direction === 'prev'
        ? (selectedImageIndex - 1 + images.length) % images.length
        : (selectedImageIndex + 1) % images.length
    const newImage = images[newIndex]

    if (!newImage) {
      return undefined
    }

    return newImage.id
  }

  return {
    getPrevImageId: () => getNavigationImageId('prev'),
    getNextImageId: () => getNavigationImageId('next')
  }
}

export const handleSelectOptionParams = (
  prevState: ProductSearch,
  optionName: string,
  optionValue: string
): ProductSearch => {
  const prevStateOptions = prevState.options

  if (!prevStateOptions) {
    return {
      ...prevState,
      options: [
        {
          name: optionName,
          value: optionValue
        }
      ]
    }
  }
  const prevStateOption = prevStateOptions.find(
    option => option.name === optionName
  )

  if (!prevStateOption) {
    return {
      ...prevState,
      options: [
        ...prevStateOptions,
        {
          name: optionName,
          value: optionValue
        }
      ]
    }
  }

  return {
    ...prevState,
    options: prevStateOptions.map(option =>
      option.name === optionName
        ? {
            name: optionName,
            value: optionValue
          }
        : option
    )
  }
}

export const getProductSelectedOptionsFromQuery = (
  queryOptions: ProductSearch['options'],
  options: Array<ProductOption>
): Array<ProductOptionValue> => {
  const selectedOptions = options.flatMap<ProductOptionValue>(option => {
    const defaultValue = option.values?.[0]

    if (!defaultValue) {
      return []
    }

    const selectedQueryOption = queryOptions?.reduce<
      QueryProductOption | undefined
    >((acc, curr) => {
      if (acc) {
        return acc
      }
      if (curr.name === option.title) {
        return curr
      }
      return undefined
    }, undefined)

    const selectedOptionValue = option.values?.find(
      value => value.value === selectedQueryOption?.value
    )

    if (!selectedOptionValue) {
      return defaultValue
    }

    return selectedOptionValue
  })

  return selectedOptions
}

export const getProductVariantFromOptionValues = (
  options: Array<ProductOptionValue>,
  variants: Array<ProductVariant>
): ProductVariant => {
  const defaultVariant = variants[0]

  if (!defaultVariant) {
    throw new Error('No default variant found')
  }

  const variant = variants.find(variant =>
    options.every(optionValue =>
      variant?.options?.some(option => option.value === optionValue.value)
    )
  )

  if (!variant) {
    return defaultVariant
  }

  return variant
}

export const getProductSelectedVariant = (
  product: Product,
  queryOptions: ProductSearch['options']
): ProductVariant => {
  const { options, variants } = product

  if (!options || !variants) {
    throw new Error('No options or variants found')
  }

  return getProductVariantFromOptionValues(
    getProductSelectedOptionsFromQuery(queryOptions, options),
    variants
  )
}
