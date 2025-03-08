import { ProductsSection } from './components/ProductsSection'

export const StorePage = () => (
  <>
    <section className="layout-section gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Store</h2>
        <p className="text-muted-foreground text-sm">
          Browse our store to find the perfect gift for you.
        </p>
      </div>
    </section>
    <ProductsSection />
  </>
)
