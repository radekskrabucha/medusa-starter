import { Button, buttonVariants } from '@medusa-starter/ui/button'
import { Card, CardContent } from '@medusa-starter/ui/card'
import { Separator } from '@medusa-starter/ui/separator'
import { Link, Outlet } from '@tanstack/react-router'
import { LogOut, Settings } from 'lucide-react'
import { logOut } from '../auth/actions'

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
        <Button
          variant="outline"
          className="mt-2"
          onClick={logOut}
        >
          <LogOut className="size-4" />
          <span>Log out</span>
        </Button>
      </CardContent>
    </Card>
  </aside>
)
