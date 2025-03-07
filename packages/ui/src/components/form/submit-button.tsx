import React from 'react'
import { Button } from '../ui/button.js'
import { LoadingCircleIndicator } from '../ui/loading-circle-indicator.js'

type SubmitButtonProps = {
  isPending: boolean
  text: string
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isPending,
  text
}) => (
  <Button
    type="submit"
    disabled={isPending}
  >
    {isPending && <LoadingCircleIndicator />}
    {text}
  </Button>
)
