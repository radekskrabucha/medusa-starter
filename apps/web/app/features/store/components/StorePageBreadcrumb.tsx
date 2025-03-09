import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@medusa-starter/ui/breadcrumb'
import { Link } from '@tanstack/react-router'

export const StorePageBreadcrumb: React.FC<React.PropsWithChildren> = ({
  children
}) => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link to="/">Home</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link to="/store">Store</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      {children}
    </BreadcrumbList>
  </Breadcrumb>
)
