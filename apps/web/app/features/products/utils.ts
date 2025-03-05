import type { ProductImage } from '@medusa-starter/medusa-utils/models'

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
