import { type Address } from '@medusa-starter/medusa-utils/models'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@medusa-starter/ui/card'
import { getName } from '@medusa-starter/utils/name'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

type AddressSummaryTileProps = {
  address: Address
}

export const AddressSummaryTile = ({ address }: AddressSummaryTileProps) => (
  <Link
    to="/profile/shipping-addresses/edit/$id"
    params={{ id: address.id }}
  >
    <Card className="group gap-2">
      <CardHeader>
        <h3 className="font-medium">
          {address.address_name ||
            getName({
              firstName: address.first_name,
              lastName: address.last_name
            })}
        </h3>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <p className="text-muted-foreground text-sm">{address.address_1}</p>
        {address.address_2 && (
          <p className="text-muted-foreground text-sm">{address.address_2}</p>
        )}
        <p className="text-muted-foreground text-sm">
          {address.city}, {address.province} {address.postal_code}
        </p>
        <p className="text-muted-foreground text-sm">{address.country_code}</p>
      </CardContent>
      <CardFooter className="text-muted-foreground justify-end gap-2 text-sm">
        See details
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </CardFooter>
    </Card>
  </Link>
)
