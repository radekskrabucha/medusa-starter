import { Link } from '@tanstack/react-router'
import { SocialLinks } from '~web/components/SocialLinks'
import { appName } from '~web/config/app'
import { Regions } from '~web/features/regions/components/Regions'
import { Categories } from './Categories'
import { Collections } from './Collections'
import { Copyright } from './Copyright'

export const Footer = () => (
  <footer className="layout-container bg-background">
    <section className="layout-section flex-wrap justify-between gap-10 !py-20 md:!flex-row">
      <div className="flex flex-col justify-between gap-4">
        <Link
          to="/"
          className="text-muted-foreground hover:text-foreground text-xl uppercase transition-colors"
        >
          {appName}
        </Link>
        <Regions />
      </div>
      <div className="flex flex-wrap gap-x-20 gap-y-6 max-sm:gap-x-8 lg:pr-40">
        <Categories />
        <Collections />
        <SocialLinks />
      </div>
    </section>
    <section className="layout-section">
      <Copyright />
    </section>
  </footer>
)
