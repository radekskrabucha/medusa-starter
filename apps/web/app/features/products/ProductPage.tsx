import type { Product } from '@medusa-starter/medusa-utils/models'
import {
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@medusa-starter/ui/breadcrumb'
import { StorePageBreadcrumb } from '~web/features/store/components/StorePageBreadcrumb'
import { ProductAddToCartButton } from './components/ProductAddToCartButton'
import { ProductImageGallery } from './components/ProductImageGallery'
import { ProductInfo } from './components/ProductInfo'
import { ProductOptions } from './components/ProductOptions'

type ProductPageProps = {
  product: Product
}

export const ProductPage: React.FC<ProductPageProps> = ({ product }) => (
  <section className="layout-section gap-4">
    <StorePageBreadcrumb>
      <>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{product.title}</BreadcrumbPage>
        </BreadcrumbItem>
      </>
    </StorePageBreadcrumb>
    <div className="flex gap-8 max-md:flex-col">
      <ProductImageGallery
        images={product.images || []}
        title={product.title}
        handle={product.handle}
      />
      <div className="flex flex-1 flex-col gap-10">
        <ProductInfo product={product} />
        <ProductOptions
          handle={product.handle}
          options={product.options}
        />
        <ProductAddToCartButton />
      </div>
    </div>
  </section>
)
