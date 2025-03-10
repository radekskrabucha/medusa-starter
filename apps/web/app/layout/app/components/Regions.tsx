import type { Region, RegionCountry } from '@medusa-starter/medusa-utils/models'
import { cx } from 'class-variance-authority'
import CountryFlag from 'react-country-flag'
import { appLayoutRouteApi } from '../utils'

export const Regions = () => {
  const {
    regionsData: { regions }
  } = appLayoutRouteApi.useLoaderData()

  return (
    <div className="flex flex-col gap-4">
      {regions.map(region => (
        <Region
          key={region.id}
          region={region}
        />
      ))}
    </div>
  )
}

type RegionProps = {
  region: Region
}

const Region: React.FC<RegionProps> = ({ region }) => (
  <div>
    <h4 className="text-muted-foreground text-sm">{region.name}</h4>
    <div className="flex flex-wrap gap-2 text-xl leading-none">
      {region?.countries?.map(country => (
        <Country
          key={country.id}
          country={country}
        />
      ))}
    </div>
  </div>
)

type CountryProps = {
  country: RegionCountry
  isSelected?: boolean
}

const Country: React.FC<CountryProps> = ({ country, isSelected }) =>
  country.iso_2 ? (
    <div
      className={cx(
        'shrink-0 rounded-sm border px-1 shadow-sm',
        isSelected ? 'bg-primary' : 'border-border/50'
      )}
    >
      <CountryFlag countryCode={country.iso_2} />
    </div>
  ) : null
