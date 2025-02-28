import { Button } from '@medusa-starter/ui/button'
import { Link } from '@tanstack/react-router'
import { cx } from 'class-variance-authority'
import { MenuIcon, X } from 'lucide-react'
import React, { useState } from 'react'
import { Copyright } from './Copyright'
import { HeaderLogo } from './HeaderLogo'

export const HamburgerMenuButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="-ml-2 pr-9">
      <Button
        onClick={() => setIsOpen(true)}
        variant="ghost"
        size="icon"
        className="hover:bg-foreground/5"
      >
        <MenuIcon className="size-5" />
      </Button>
      <SideMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  )
}

type SideMenuProps = {
  isOpen: boolean
  onClose: () => void
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => (
  <>
    <div
      className={cx(
        'fixed inset-0 z-40 bg-black/50 transition-opacity',
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      )}
      onClick={onClose}
    />

    <div
      className={cx(
        'bg-background fixed top-0 left-0 z-50 mt-6 ml-6 h-[calc(100vh-3rem)] w-[min(30rem,calc(100vw-3rem))] rounded-lg shadow-lg transition-transform duration-300',
        isOpen ? 'translate-x-0' : '-translate-x-[calc(100%+3rem)]'
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b p-6">
          <HeaderLogo />
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="hover:bg-foreground/5"
          >
            <X className="size-6" />
          </Button>
        </div>
        <nav className="flex flex-1 flex-col justify-center p-6">
          <ul className="flex flex-col gap-8">
            <li>
              <Link
                to="/"
                className="text-muted-foreground hover:text-foreground text-2xl transition-colors"
                onClick={onClose}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-muted-foreground hover:text-foreground text-2xl transition-colors"
                onClick={onClose}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="text-muted-foreground hover:text-foreground text-2xl transition-colors"
                onClick={onClose}
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="text-muted-foreground hover:text-foreground text-2xl transition-colors"
                onClick={onClose}
              >
                Cart
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-6">
          <Copyright />
        </div>
      </div>
    </div>
  </>
)
