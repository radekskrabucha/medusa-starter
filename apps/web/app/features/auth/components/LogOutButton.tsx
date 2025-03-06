import { Button } from '@medusa-starter/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { logOut } from '../actions'

type LogOutButtonProps = {
  className?: string
}

export const LogOutButton: React.FC<LogOutButtonProps> = ({ className }) => {
  const navigate = useNavigate()

  return (
    <Button
      variant="outline"
      className={className}
      onClick={() =>
        logOut(() =>
          navigate({
            to: '/'
          })
        )
      }
    >
      <LogOut className="size-4" />
      <span>Log out</span>
    </Button>
  )
}
