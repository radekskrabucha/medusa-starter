import { getCustomerDisplayName } from '@medusa-starter/medusa-utils/customer'
import type { Customer } from '@medusa-starter/medusa-utils/models'
import { buttonVariants } from '@medusa-starter/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@medusa-starter/ui/hover-card'
import { Separator } from '@medusa-starter/ui/separator'
import { Link } from '@tanstack/react-router'
import { format, fromUnixTime } from 'date-fns'
import { decode } from 'hono/jwt'
import { LogIn, User2 } from 'lucide-react'
import { LogOutButton } from '~web/features/auth/components/LogOutButton'

type ProfileCardProps = {
  customer: Customer
  token: string | null
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  customer,
  token
}) => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <Link
        to="/profile/details"
        className={buttonVariants({
          variant: 'ghost',
          size: 'icon',
          className:
            'hover:bg-foreground/5 !size-8 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
        })}
      >
        <User2 className="size-5" />
      </Link>
    </HoverCardTrigger>
    <HoverCardContent collisionPadding={16}>
      <div className="flex flex-col gap-2">
        <div className="text-muted-foreground text-center text-sm">
          <span>{getCustomerDisplayName(customer)}</span>
        </div>

        {/* TEMP */}
        <TempTokenExpDate token={token} />
        {/* TEMP */}

        <Separator />
        <Link
          to="/profile/details"
          className={buttonVariants({
            variant: 'ghost',
            className: 'text-foreground hover:bg-foreground/5 justify-start'
          })}
        >
          <User2 className="size-4" />
          <span>Profile Details</span>
        </Link>

        <Separator />
        <LogOutButton className="mt-2" />
      </div>
    </HoverCardContent>
  </HoverCard>
)

type ProfileCardNoUserProps = {
  disabled?: boolean
}

export const ProfileCardNoUser: React.FC<ProfileCardNoUserProps> = ({
  disabled
}) => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <Link
        to="/sign-in"
        disabled={disabled}
        className={buttonVariants({
          variant: 'ghost',
          size: 'icon',
          className:
            'hover:bg-foreground/5 !size-8 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
        })}
      >
        <User2 className="size-5" />
      </Link>
    </HoverCardTrigger>
    {!disabled && (
      <HoverCardContent collisionPadding={16}>
        <div className="flex flex-col gap-2">
          <div className="text-muted-foreground text-center text-sm">
            <span>Sign in to view your profile</span>
          </div>
          <Separator />
          <Link
            to="/sign-in"
            className={buttonVariants({ className: 'mt-2' })}
          >
            <LogIn className="size-4" />
            <span>Sign in</span>
          </Link>
        </div>
      </HoverCardContent>
    )}
  </HoverCard>
)

type TempTokenExpDateProps = {
  token: string | null
}

const TempTokenExpDate: React.FC<TempTokenExpDateProps> = ({ token }) => {
  if (!token) {
    return null
  }

  const expTime = decode(token).payload.exp

  if (!expTime) {
    return null
  }

  return (
    <>
      <Separator />
      <div className="text-muted-foreground text-center text-sm">
        <p>Token expires at:</p>
        <span>{format(fromUnixTime(expTime), 'PPPpp')}</span>
      </div>
    </>
  )
}
