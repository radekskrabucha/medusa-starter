import { Filters } from './Filters'
import { Products } from './Products'

export const ProductsSection = () => (
  <div className="layout-section !grid grid-cols-[380px_1fr] !p-0 max-lg:grid-cols-1">
    <Filters />
    <section className="layout-section gap-8 !self-start">
      <Products />
    </section>
  </div>
)
