import { CartButton } from './CartButton'
import { HamburgerMenuButton } from './HamburgerMenuButton'
import { HeaderLogo } from './HeaderLogo'
import { ProfileButton } from './ProfileButton'

export const Header = () => (
  <header className="layout-container bg-background border-border/10 sticky top-0 isolate z-30 border-b shadow-sm">
    <div className="layout-section !flex-row items-center justify-between gap-2">
      <HamburgerMenuButton />
      <HeaderLogo />
      <div className="-mr-2 flex items-center">
        <ProfileButton />
        <CartButton />
      </div>
    </div>
  </header>
)
