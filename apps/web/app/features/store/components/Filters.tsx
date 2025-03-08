import { Card, CardContent, CardHeader } from '@medusa-starter/ui/card'
import { Separator } from '@medusa-starter/ui/separator'
import { Filter } from 'lucide-react'

export const Filters = () => (
  <aside className="layout-section !self-start">
    <Card>
      <CardHeader className="flex-row items-center">
        <Filter className="size-4 shrink-0" />
        <h3 className="text-xl font-semibold">Filters</h3>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Separator />
      </CardContent>
    </Card>
  </aside>
)
