import type { ProductImage } from '@medusa-starter/medusa-utils/models'
import { buttonVariants } from '@medusa-starter/ui/button'
import { Link } from '@tanstack/react-router'
import { cx } from 'class-variance-authority'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useImageZoom } from '../hooks/useImageZoom'
import { getNavigationImageId, productPageRouteApi } from '../utils'

type ProductImageGalleryProps = {
  images: Array<ProductImage>
  title: string
  handle: string
}

const placeholderImage = '/images/shared/placeholder-image.avif?url'

export const ProductImageGallery = ({
  images,
  title,
  handle
}: ProductImageGalleryProps) => {
  const { image } = productPageRouteApi.useSearch()

  const selectedImageId = image || images[0]?.id || ''
  const selectedImage = images.find(image => image.id === selectedImageId)
  const selectedImageIndex = images.findIndex(
    image => image.id === selectedImageId
  )
  const { getNextImageId, getPrevImageId } = getNavigationImageId(
    selectedImageIndex,
    images
  )

  return (
    <div className="flex max-w-3xl flex-1 flex-col gap-6 max-lg:max-w-none">
      <MainImage
        selectedImage={selectedImage?.url}
        title={title}
        handle={handle}
        withNavigation={images.length > 1}
        nextImageId={getNextImageId()}
        prevImageId={getPrevImageId()}
      />
      {images.length > 0 && (
        <div className="grid h-min grid-cols-[repeat(auto-fill,minmax(min(calc(100vw-3rem),80px),1fr))] gap-5">
          {images.map((image, index) => (
            <Link
              key={image.id}
              to="/store/item/$handle"
              replace
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

type MainImageProps = {
  selectedImage: string | undefined
  title: string
  handle: string
  withNavigation: boolean
  nextImageId: string | undefined
  prevImageId: string | undefined
}

const MainImage: React.FC<MainImageProps> = ({
  selectedImage,
  title,
  handle,
  withNavigation,
  nextImageId,
  prevImageId
}) => {
  const { handleMouseMove, handleTouchMove, handleTouchEnd, zoomRef } =
    useImageZoom()
  const src = selectedImage || placeholderImage

  return (
    <div
      className="group relative aspect-square flex-1 overflow-hidden rounded-lg"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <img
        src={src}
        alt={title}
        className="h-full w-full object-cover object-center"
      />
      <div
        ref={zoomRef}
        className="pointer-events-none absolute inset-0 bg-cover bg-no-repeat opacity-0 transition-opacity duration-300"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: '200%'
        }}
      />
      {withNavigation && (
        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 transition-opacity group-hover:opacity-100 max-md:opacity-50">
          <Link
            to="/store/item/$handle"
            search={prevState => ({
              ...prevState,
              image: prevImageId
            })}
            params={{ handle }}
            replace
            className={buttonVariants({
              variant: 'outline'
            })}
          >
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <Link
            to="/store/item/$handle"
            search={prevState => ({
              ...prevState,
              image: nextImageId
            })}
            params={{ handle }}
            replace
            className={buttonVariants({
              variant: 'outline'
            })}
          >
            <ChevronRight className="h-6 w-6" />
          </Link>
        </div>
      )}
    </div>
  )
}
