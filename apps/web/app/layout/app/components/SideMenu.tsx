import { Button } from '@medusa-starter/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@medusa-starter/ui/card'
import { Link } from '@tanstack/react-router'
import { cx } from 'class-variance-authority'
import { X } from 'lucide-react'
import { Copyright } from './Copyright'
import { HeaderLogo } from './HeaderLogo'

type SideMenuProps = {
  isOpen: boolean
  onClose: VoidFunction
}

export const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => (
  <>
    <div
      className={cx(
        'fixed inset-0 z-40 bg-black/50 transition-opacity',
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      )}
      onClick={onClose}
    />

    <Card
      className={cx(
        'fixed top-0 left-0 z-50 mt-6 ml-6 h-[calc(100vh-3rem)] w-[min(30rem,calc(100vw-3rem))] transition-transform duration-300',
        isOpen ? 'translate-x-0' : '-translate-x-[calc(100%+3rem)]'
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between border-b pb-6">
        <HeaderLogo />
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="hover:bg-foreground/5"
        >
          <X className="size-6" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1">
        <nav className="flex h-full flex-col justify-center">
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
                to="/store"
                className="text-muted-foreground hover:text-foreground text-2xl transition-colors"
                onClick={onClose}
              >
                Store
              </Link>
            </li>
            <li>
              <Link
                to="/collections"
                className="text-muted-foreground hover:text-foreground text-2xl transition-colors"
                onClick={onClose}
              >
                Collections
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
                to="/profile/details"
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
      </CardContent>
      <CardFooter>
        <Copyright />
      </CardFooter>
    </Card>
  </>
)
