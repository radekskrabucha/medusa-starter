import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@medusa-starter/ui/card'
import { cx } from 'class-variance-authority'
import type { LucideIcon } from 'lucide-react'

type EmptyStateProps = {
  icon?: LucideIcon
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  className?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  className
}) => (
  <Card className={cx('items-center text-center', className)}>
    {Icon && (
      <CardHeader className="items-center">
        <div className="bg-muted flex size-12 shrink-0 items-center justify-center rounded-full">
          <Icon className="text-muted-foreground size-6" />
        </div>
      </CardHeader>
    )}
    <CardContent className="flex max-w-sm flex-col items-center gap-1 text-balance">
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && (
        <p className="text-muted-foreground text-sm">{description}</p>
      )}
    </CardContent>
    {action && <CardFooter>{action}</CardFooter>}
  </Card>
)
