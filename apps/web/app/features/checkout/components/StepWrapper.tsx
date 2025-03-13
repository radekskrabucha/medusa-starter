import { Button } from '@medusa-starter/ui/button'
import { Card, CardContent, CardHeader } from '@medusa-starter/ui/card'
import { cx } from 'class-variance-authority'
import { Check } from 'lucide-react'

type StepWrapperProps = {
  title: React.ReactNode
  isFilled: boolean
  onSelect: VoidFunction
  isActive: boolean
} & React.PropsWithChildren

export const StepWrapper: React.FC<StepWrapperProps> = ({
  children,
  title,
  isActive,
  isFilled,
  onSelect
}) => (
  <Card
    className={cx(
      '@container flex flex-col gap-4 transition-all',
      isActive && 'border-primary bg-primary/15'
    )}
  >
    <CardHeader className="flex flex-row flex-wrap-reverse items-center justify-between gap-4">
      <div className="flex items-center gap-4 text-2xl font-semibold">
        <h3>{title}</h3>
        {isFilled && !isActive && <Check className="shrink-0" />}
      </div>
      {!isActive && (
        <Button
          variant="link"
          className="hover:text-foreground text-muted-foreground ml-auto"
          onClick={onSelect}
        >
          Edit
        </Button>
      )}
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
)
