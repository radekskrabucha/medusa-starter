import { Collections } from './components/Collections'

export const CollectionsPage = () => (
  <section className="layout-section gap-8">
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-semibold">All collections</h2>
      <p className="text-muted-foreground text-sm">
        Browse our collections to find the perfect gift for you.
      </p>
    </div>
    <Collections />
  </section>
)
