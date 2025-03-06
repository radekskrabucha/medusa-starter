import { buttonVariants } from '@medusa-starter/ui/button'
import { Card, CardContent } from '@medusa-starter/ui/card'
import { Separator } from '@medusa-starter/ui/separator'
import { Link, Outlet } from '@tanstack/react-router'
import { Settings } from 'lucide-react'
import { LogOutButton } from '~web/features/auth/components/LogOutButton'

export const ProfileLayout = () => (
  <div className="grid grid-cols-[400px_1fr] max-md:grid-cols-1">
    <Sidebar />
    <Outlet />
  </div>
)

const Sidebar = () => (
  <aside className="layout-section !self-start">
    <Card>
      <CardContent className="flex flex-col gap-2">
        <Link
          to="/profile"
          className={buttonVariants({
            variant: 'ghost',
            className:
              'data-[status=active]:bg-foreground/10 hover:bg-foreground/5 justify-start'
          })}
        >
          <Settings className="size-5" />
          <span>Profile Settings</span>
        </Link>

        <Separator />
        <LogOutButton className="mt-2" />
      </CardContent>
    </Card>
  </aside>
)
