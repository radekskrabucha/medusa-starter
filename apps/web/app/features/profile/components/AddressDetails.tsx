import { getCountryDisplayName } from '@medusa-starter/medusa-utils/region'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@medusa-starter/ui/card'
import {
  Building2,
  Check,
  Globe,
  Home,
  MapPin,
  Phone,
  User
} from 'lucide-react'
import { QueryBoundary } from '~web/components/QueryBoundary'
import { useAddressQuery } from '~web/features/profile/hooks/useAddressQuery'
import { appLayoutRouteApi } from '~web/layout/app/utils'
import { AddressDetailItem } from './AddressDetailItem'
import { DeleteAddressButton } from './DeleteAddressButton'

type AddressDetailsProps = {
  id: string
}

export const AddressDetails: React.FC<AddressDetailsProps> = ({ id }) => {
  const getAddressQuery = useAddressQuery(id)
  const {
    regionsData: { regions }
  } = appLayoutRouteApi.useLoaderData()

  return (
    <QueryBoundary query={getAddressQuery}>
      {({
        address: {
          address_1,
          address_2,
          city,
          company,
          country_code,
          first_name,
          last_name,
          phone,
          postal_code,
          province,
          address_name,
          is_default_billing,
          is_default_shipping
        }
      }) => (
        <Card>
          <CardHeader className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">
              {address_name || 'Address'}
            </h3>
            <div className="flex flex-col gap-2">
              {is_default_shipping && (
                <div className="text-muted-foreground flex items-center gap-1">
                  <Check className="size-4" />
                  <span>This is your default shipping address</span>
                </div>
              )}
              {is_default_billing && (
                <div className="text-muted-foreground flex items-center gap-1">
                  <Check className="size-4" />
                  <span>This is your default billing address</span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pt-6">
            <div className="flex flex-wrap gap-4">
              <AddressDetailItem
                icon={User}
                label="First Name"
                value={first_name}
              />
              <AddressDetailItem
                icon={User}
                label="Last Name"
                value={last_name}
              />
            </div>

            {company && (
              <AddressDetailItem
                icon={Building2}
                label="Company"
                value={company}
              />
            )}

            <div className="flex flex-wrap gap-4">
              <AddressDetailItem
                icon={Home}
                label="Address Line 1"
                value={address_1}
              />
              <AddressDetailItem
                icon={Home}
                label="Address Line 2"
                value={address_2}
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <AddressDetailItem
                icon={MapPin}
                label="City"
                value={city}
              />
              <AddressDetailItem
                icon={MapPin}
                label="Postal Code"
                value={postal_code}
              />
            </div>

            <AddressDetailItem
              icon={MapPin}
              label="Province/State"
              value={province}
            />

            <div className="flex flex-wrap gap-4">
              <AddressDetailItem
                icon={Phone}
                label="Phone"
                value={phone}
              />
              {country_code && (
                <AddressDetailItem
                  icon={Globe}
                  label="Country"
                  value={getCountryDisplayName(country_code, regions)}
                />
              )}
            </div>
          </CardContent>

          <CardFooter className="flex gap-2">
            <DeleteAddressButton id={id} />
          </CardFooter>
        </Card>
      )}
    </QueryBoundary>
  )
}
