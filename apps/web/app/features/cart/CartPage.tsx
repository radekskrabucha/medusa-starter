import { CartSummarySection } from './components/CartSummarySection'

export const CartPage = () => (
  <section className="layout-section gap-8">
    <div className="flex flex-col gap-2">
      <h2 className="text-4xl font-semibold">Checkout</h2>
      <p className="text-muted-foreground text-sm">
        Review your items and proceed to checkout when you&apos;re ready.
      </p>
    </div>
    <CartSummarySection />
  </section>
)
