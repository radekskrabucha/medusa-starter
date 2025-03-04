import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@medusa-starter/ui/accordion'
import { Button, buttonVariants } from '@medusa-starter/ui/button'
import { Link, rootRouteId, useMatch } from '@tanstack/react-router'
import type React from 'react'

type ErrorFallbackProps<E extends Error = Error> = {
  error: E
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
}

export const DefaultErrorFallback = ({
  error,
  children,
  title,
  description
}: ErrorFallbackProps) => (
  <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center text-balance">
    <h2 className="text-3xl font-bold">{title || 'Something went wrong'}</h2>
    <p className="text-foreground-secondary">
      {description || 'Seems like some unexpected error occurred.'}
    </p>
    {children}
    <ErrorDetailsAccordion error={error} />
  </div>
)

export const NavigateToHomeButton = () => {
  const isRoot = useMatch({
    strict: false,
    select: state => state.id === rootRouteId
  })

  return isRoot ? (
    <Link
      to="/"
      className={buttonVariants({ variant: 'secondary' })}
    >
      Home
    </Link>
  ) : (
    <Button
      variant="secondary"
      onClick={e => {
        e.preventDefault()
        window.history.back()
      }}
    >
      Go Back
    </Button>
  )
}

type ErrorDetailsAccordionProps = {
  error: Error
}

export const ErrorDetailsAccordion: React.FC<ErrorDetailsAccordionProps> = ({
  error
}) => (
  <div className="flex w-full max-w-3xl flex-col gap-4">
    <Accordion
      type="single"
      collapsible
      className="w-full"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="justify-center">
          See details
        </AccordionTrigger>
        <AccordionContent className="text-left font-mono">
          <p>Name: {error.name}</p>
          <p>Error message: {error.message}</p>
          <p>Stack: {error.stack}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
)
