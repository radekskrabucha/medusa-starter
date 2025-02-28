import { Link } from '@tanstack/react-router'
import { appName } from '~web/config/app'

export const HeaderLogo = () => (
  <Link
    to="/"
    className="text-xl uppercase"
  >
    {appName}
  </Link>
)
