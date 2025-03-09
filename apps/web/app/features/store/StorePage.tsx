import { ProductsSection } from './components/ProductsSection'
import { StorePageBreadcrumb } from './components/StorePageBreadcrumb'

export const StorePage = () => (
  <>
    <section className="layout-section gap-2">
      <StorePageBreadcrumb />
      <h2 className="text-2xl font-semibold">Store</h2>
      <p className="text-muted-foreground text-sm">
        Browse our store to find the perfect gift for you.
      </p>
    </section>
    <ProductsSection />
  </>
)
