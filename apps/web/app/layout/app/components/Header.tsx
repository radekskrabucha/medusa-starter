import { CartButton } from './CartButton'
import { HamburgerMenuButton } from './HamburgerMenuButton'
import { HeaderLogo } from './HeaderLogo'
import { ProfileButton } from './ProfileButton'

export const Header = () => (
  <header className="layout-container bg-background border-border/10 sticky top-0 isolate z-30 border-b shadow-sm">
    <div className="layout-section !grid grid-cols-[64px_1fr_64px] place-items-center">
      <HamburgerMenuButton />
      <HeaderLogo className="justify-self-center" />
      <div className="-mr-2 flex items-center justify-self-end">
        <ProfileButton />
        <CartButton />
      </div>
    </div>
  </header>
)
