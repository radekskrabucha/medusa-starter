import { Link } from '@tanstack/react-router'
import { User2 } from 'lucide-react'

export const ProfileButton = () => (
  <Link
    to="/"
    className="text-muted-foreground hover:text-foreground transition-colors"
  >
    <User2 className="size-5" />
  </Link>
)
