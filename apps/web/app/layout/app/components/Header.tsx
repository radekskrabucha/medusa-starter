import { buttonVariants } from '@medusa-starter/ui/button'
import { Link } from '@tanstack/react-router'
import type React from 'react'

export const Header = () => (
  <header className="layout-container bg-background sticky top-0 isolate z-30 border-b border-border/10 shadow-sm">
    <div className="layout-section !flex-row justify-between">
      <HeaderLink
        label="Home"
        to="/"
      />
      <HeaderLink
        label="About"
        to="/about"
      />
      <HeaderLink
        label="Cart"
        to="/cart"
      />
    </div>
  </header>
)

type HeaderLinkProps = {
  label: string
} & React.ComponentProps<typeof Link>

const HeaderLink: React.FC<HeaderLinkProps> = ({ label, ...props }) => (
  <Link
    className={buttonVariants({
      variant: 'link',
      className: 'data-[status=active]:!primary-foreground !text-foreground'
    })}
    {...props}
  >
    {label}
  </Link>
)
