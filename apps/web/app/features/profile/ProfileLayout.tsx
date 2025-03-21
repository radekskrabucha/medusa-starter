import { buttonVariants } from '@medusa-starter/ui/button'
import { Card, CardContent } from '@medusa-starter/ui/card'
import { Separator } from '@medusa-starter/ui/separator'
import { Link, Outlet } from '@tanstack/react-router'
import { User2, Edit, Lock, Truck, Package } from 'lucide-react'
import { LogOutButton } from '~web/features/auth/components/LogOutButton'

export const ProfileLayout = () => (
  <div className="layout-section !grid grid-cols-[400px_1fr] !p-0 max-md:grid-cols-1">
    <Sidebar />
    <Outlet />
  </div>
)

const Sidebar = () => (
  <aside className="layout-section !self-start">
    <Card>
      <CardContent className="flex flex-col gap-2 capitalize">
        <Link
          to="/profile/details"
          className={buttonVariants({
            variant: 'ghost',
            className:
              'data-[status=active]:bg-foreground/10 hover:bg-foreground/5 justify-start'
          })}
        >
          <User2 className="size-4" />
          <span>Profile details</span>
        </Link>
        <Link
          to="/profile/edit"
          className={buttonVariants({
            variant: 'ghost',
            className:
              'data-[status=active]:bg-foreground/10 hover:bg-foreground/5 justify-start'
          })}
        >
          <Edit className="size-4" />
          <span>Edit profile</span>
        </Link>
        <Link
          to="/profile/change-password"
          className={buttonVariants({
            variant: 'ghost',
            className:
              'data-[status=active]:bg-foreground/10 hover:bg-foreground/5 justify-start'
          })}
        >
          <Lock className="size-4" />
          <span>Change password</span>
        </Link>
        <Link
          to="/profile/shipping-address"
          className={buttonVariants({
            variant: 'ghost',
            className:
              'data-[status=active]:bg-foreground/10 hover:bg-foreground/5 justify-start'
          })}
        >
          <Truck className="size-4" />
          <span>Shipping addresses</span>
        </Link>
        <Link
          to="/profile/orders"
          className={buttonVariants({
            variant: 'ghost',
            className:
              'data-[status=active]:bg-foreground/10 hover:bg-foreground/5 justify-start'
          })}
        >
          <Package className="size-4" />
          <span>Orders</span>
        </Link>

        <Separator />
        <LogOutButton className="mt-2" />
      </CardContent>
    </Card>
  </aside>
)
