import { buttonVariants } from '@medusa-starter/ui/button'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { QueryBoundary } from '~web/components/QueryBoundary'
import { Slider } from '~web/components/Slider'
import { getProductsQueryOptions } from '~web/features/products/actions'
import { ProductTile } from '~web/features/products/components/ProductTile'

export const FeaturedProducts = () => {
  const getProductsQuery = useQuery(getProductsQueryOptions({ limit: 5 }))

  return (
    <section className="layout-section">
      <QueryBoundary
        query={getProductsQuery}
        isDataEmpty={data => data?.count === 0}
      >
        {data => (
          <Slider
            header={{
              title: 'Featured Products',
              controllers: true,
              description: 'Collection of our best products.'
            }}
          >
            <div className="slider-wrapper auto-cols-[minmax(min(calc(100vw-3rem),300px),1fr)] gap-6 max-md:gap-4">
              {data.products.map(product => (
                <ProductTile
                  key={product.id}
                  product={product}
                />
              ))}
              <Link
                to="/"
                className={buttonVariants({
                  variant: 'ghost',
                  className: 'self-center'
                })}
              >
                <ArrowRight /> See all products
              </Link>
            </div>
          </Slider>
        )}
      </QueryBoundary>
    </section>
  )
}
