import { HeaderLogo } from '~web/layout/app/components/HeaderLogo'

export const Header = () => (
  <header className="layout-container bg-background border-border/10 sticky top-0 isolate z-30 border-b shadow-sm">
    <nav className="layout-section">
      <HeaderLogo className="self-center" />
    </nav>
  </header>
)
