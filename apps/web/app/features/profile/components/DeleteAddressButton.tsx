import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@medusa-starter/ui/alert-dialog'
import { Button } from '@medusa-starter/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useSyncAuthToken } from '~web/features/auth/hooks/useSyncAuthToken'
import { actions } from '~web/lib/medusa'
import { getMeQueryOptions } from '../actions'

type DeleteAddressButtonProps = {
  id: string
}

export const DeleteAddressButton: React.FC<DeleteAddressButtonProps> = ({
  id
}) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const token = useSyncAuthToken()

  const deleteAddressMutation = useMutation({
    mutationFn: actions.customer.address.delete,
    mutationKey: ['actions.customer.address.delete', id],
    onError: error => {
      toast.error('Failed to delete address', {
        description: error.message
      })
    },
    onSuccess: () => {
      toast.success('Address deleted successfully')
      navigate({
        to: '/profile/shipping-address'
      })

      queryClient.invalidateQueries({
        queryKey: getMeQueryOptions(token).queryKey
      })
    }
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="hover:bg-destructive/30 bg-destructive/15 hover:text-destructive"
        >
          Delete address
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You will not be able to recover this address after deletion.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteAddressMutation.mutate({ id })}
            disabled={deleteAddressMutation.isPending}
            className="hover:bg-destructive/30 bg-destructive/15 hover:text-destructive"
          >
            Delete address
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
