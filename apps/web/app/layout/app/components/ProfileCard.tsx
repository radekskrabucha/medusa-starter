import { getCustomerDisplayName } from '@medusa-starter/medusa-utils/customer'
import type { Customer } from '@medusa-starter/medusa-utils/models'
import { Button, buttonVariants } from '@medusa-starter/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@medusa-starter/ui/hover-card'
import { Separator } from '@medusa-starter/ui/separator'
import { Link } from '@tanstack/react-router'
import { LogIn, LogOut, User2 } from 'lucide-react'
import { logOut } from '~web/lib/medusa'

type ProfileCardProps = {
  customer: Customer
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ customer }) => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <Link
        to="/profile"
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

        <Separator />
        <Link
          to="/profile"
          className={buttonVariants({
            variant: 'ghost',
            className: 'text-foreground hover:bg-foreground/5 justify-start'
          })}
        >
          <User2 className="size-4" />
          <span>Profile Details</span>
        </Link>

        <Separator />
        <Button
          variant="outline"
          className="mt-2"
          onClick={logOut}
        >
          <LogOut className="size-4" />
          <span>Log out</span>
        </Button>
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
