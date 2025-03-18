import { Button } from '@medusa-starter/ui/button'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { logOut } from '../utils'

type LogOutButtonProps = {
  className?: string
}

export const LogOutButton: React.FC<LogOutButtonProps> = ({ className }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return (
    <Button
      variant="outline"
      className={className}
      onClick={() =>
        logOut(() => {
          navigate({
            to: '/'
          })
        }, queryClient)
      }
    >
      <LogOut className="size-4" />
      <span>Log out</span>
    </Button>
  )
}
