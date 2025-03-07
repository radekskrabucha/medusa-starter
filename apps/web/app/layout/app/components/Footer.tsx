import { Link } from '@tanstack/react-router'
import { SocialLinks } from '~web/components/SocialLinks'
import { appName } from '~web/config/app'
import { Collections } from './Collections'
import { Copyright } from './Copyright'

export const Footer = () => (
  <footer className="layout-container bg-background">
    <section className="layout-section !flex-row flex-wrap justify-between gap-10 !py-20">
      <Link
        to="/"
        className="text-muted-foreground hover:text-foreground text-xl uppercase transition-colors"
      >
        {appName}
      </Link>
      <div className="flex flex-wrap gap-x-20 gap-y-6 md:pr-40">
        <Collections />
        <SocialLinks />
      </div>
    </section>
    <section className="layout-section">
      <Copyright />
    </section>
  </footer>
)
