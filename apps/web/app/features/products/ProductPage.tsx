import type { Product } from '@medusa-starter/medusa-utils/models'
import { getProductOptionsWithVariants } from '@medusa-starter/medusa-utils/options'
import { ProductAddToCartButton } from './components/ProductAddToCartButton'
import { ProductImageGallery } from './components/ProductImageGallery'
import { ProductInfo } from './components/ProductInfo'
import { ProductOptions } from './components/ProductOptions'

type ProductPageProps = {
  product: Product
}

export const ProductPage: React.FC<ProductPageProps> = ({ product }) => (
  <div className="layout-section">
    <div className="flex gap-8 max-lg:flex-col">
      <ProductImageGallery
        images={product.images || []}
        title={product.title}
        handle={product.handle}
      />
      <div className="flex flex-1 flex-col gap-10">
        <ProductInfo product={product} />
        <ProductOptions
          handle={product.handle}
          options={getProductOptionsWithVariants(product)}
        />
        <ProductAddToCartButton />
      </div>
    </div>
  </div>
)
