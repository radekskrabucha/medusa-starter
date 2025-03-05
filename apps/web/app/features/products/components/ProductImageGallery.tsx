import type { ProductImage } from '@medusa-starter/medusa-utils/models'
import { getRouteApi, Link } from '@tanstack/react-router'
import { cx } from 'class-variance-authority'
import placeholderImage from '~web/public/images/shared/placeholder-image.avif'

type ProductImageGalleryProps = {
  images: Array<ProductImage>
  title: string
  handle: string
}

const routeApi = getRouteApi('/(app)/_layout/shop/item/$handle')

export const ProductImageGallery = ({
  images,
  title,
  handle
}: ProductImageGalleryProps) => {
  const { image } = routeApi.useSearch()

  const selectedImageId = image || images[0]?.id
  const selectedImage = images.find(image => image.id === selectedImageId)

  return (
    <div className="flex max-w-3xl flex-1 flex-col gap-6 max-lg:max-w-none max-lg:flex-row max-md:flex-col">
      <div className="aspect-square overflow-hidden rounded-lg max-lg:flex-1">
        <img
          src={selectedImage?.url || placeholderImage}
          alt={title}
          className="h-full w-full object-cover object-center"
        />
      </div>
      {images.length > 0 && (
        <div className="grid h-min grid-cols-[repeat(auto-fit,minmax(min(calc(100vw-3rem),80px),120px))] gap-5 max-md:grid-cols-[repeat(auto-fit,minmax(min(calc(100vw-3rem),50px),80px))]">
          {images.map((image, index) => (
            <Link
              key={image.id}
              to="/shop/item/$handle"
              search={prevState => ({
                ...prevState,
                image: image.id
              })}
              params={{
                handle
              }}
              className={cx(
                'hover:ring-primary aspect-square cursor-pointer overflow-hidden rounded-lg ring-2 ring-offset-2 transition-colors',
                selectedImageId === image.id ? 'ring-primary' : 'ring-border/50'
              )}
            >
              <img
                src={image.url}
                alt={`${title} - Image ${index + 1}`}
                className="h-full w-full object-cover object-center"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
