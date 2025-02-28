import { buttonVariants } from '@medusa-starter/ui/button'
import { Link } from '@tanstack/react-router'
import { User2 } from 'lucide-react'

export const ProfileButton = () => (
  <Link
    to="/profile"
    className={buttonVariants({
      variant: 'ghost',
      size: 'icon',
      className: 'hover:bg-foreground/5'
    })}
  >
    <User2 className="size-5" />
  </Link>
)
