import { Button } from '@medusa-starter/ui/button'
import { Card, CardContent, CardHeader } from '@medusa-starter/ui/card'
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
}) => {
  return (
    <Card className="flex flex-col gap-4 transition-all">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-2xl font-semibold">
          <h3>{title}</h3>
          {isFilled && <Check />}
        </div>
        {!isActive && (
          <Button
            variant="link"
            className="hover:text-foreground text-muted-foreground"
            onClick={onSelect}
          >
            Edit
          </Button>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
