import { Link } from '@tanstack/react-router'
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

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold">Find us on</h3>
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Facebook
            </Link>
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Instagram
            </Link>
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Twitter
            </Link>
          </div>
        </div>
      </div>
    </section>
    <section className="layout-section">
      <Copyright />
    </section>
  </footer>
)
