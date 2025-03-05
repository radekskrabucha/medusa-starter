import type { ProductImage } from '@medusa-starter/medusa-utils/models'
import type { ProductSearch } from './validationSchemas'
import { getRouteApi } from '@tanstack/react-router'

export const productPageRouteApi = getRouteApi('/(app)/_layout/shop/item/$handle')

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
  optionValueId: string
): ProductSearch => {
  const prevStateOptions = prevState.options

  if (!prevStateOptions) {
    return {
      ...prevState,
      options: [
        {
          name: optionName,
          value: optionValueId
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
          value: optionValueId
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
            value: optionValueId
          }
        : option
    )
  }
}
