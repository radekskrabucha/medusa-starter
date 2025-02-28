import { getFullYear } from '@medusa-starter/utils/date'
import { appName } from '~web/config/app'

export const Copyright = () => (
  <h3 className="text-muted-foreground text-xs">
    © {getFullYear()} {appName}. All rights reserved.
  </h3>
)
