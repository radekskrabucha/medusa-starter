import React from 'react'
import { Button } from '../ui/button.js'
import { LoadingCircleIndicator } from '../ui/loading-circle-indicator.js'

type SubmitButtonProps = {
  isPending: boolean
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isPending }) => (
  <Button
    type="submit"
    disabled={isPending}
  >
    {isPending && <LoadingCircleIndicator />}
    Update Address
  </Button>
)
