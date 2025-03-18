import { buttonVariants } from '@medusa-starter/ui/button'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Slider } from '~web/components/Slider'
import { ProductTile } from '~web/features/products/components/ProductTile'
import { homePageRouteApi } from '../utils'

export const FeaturedProducts = () => {
  const data = homePageRouteApi.useLoaderData()

  return (
    <section className="layout-section">
      <Slider
        header={{
          title: 'Featured Products',
          controllers: true,
          description: 'Collection of our best products.'
        }}
      >
        <div className="slider-wrapper scrollbar-hidden auto-cols-[minmax(min(calc(100vw-3rem),300px),1fr)] gap-6 max-md:gap-4">
          {data.products.map(product => (
            <ProductTile
              key={product.id}
              product={product}
            />
          ))}
          <Link
            to="/store"
            className={buttonVariants({
              variant: 'ghost',
              className: 'group w-min snap-end self-center'
            })}
          >
            See all products{' '}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Slider>
    </section>
  )
}
