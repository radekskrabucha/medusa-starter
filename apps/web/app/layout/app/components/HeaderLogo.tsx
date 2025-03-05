import { Link } from '@tanstack/react-router'
import type React from 'react'
import { appName } from '~web/config/app'

type HeaderLogoProps = {
  className?: string
}

export const HeaderLogo: React.FC<HeaderLogoProps> = ({ className }) => (
  <Link
    to="/"
    className={`text-center text-xl uppercase ${className}`}
  >
    {appName}
  </Link>
)
