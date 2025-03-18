import type { Region, RegionCountry } from '@medusa-starter/medusa-utils/models'
import { cx } from 'class-variance-authority'
import { ReactCountryFlag } from 'react-country-flag'
import { appLayoutRouteApi } from '~web/layout/app/utils'
import { useSyncCountryId } from '../hooks/useSyncCountryId'
import { countryIdStore } from '../utils'

export const Regions = () => {
  const {
    regionsData: { regions }
  } = appLayoutRouteApi.useLoaderData()
  const countryId = useSyncCountryId()

  return (
    <div className="flex flex-col gap-4">
      {regions.map(region => (
        <Region
          key={region.id}
          region={region}
          countryId={countryId}
        />
      ))}
    </div>
  )
}

type RegionProps = {
  region: Region
  countryId: string | null
}

const Region: React.FC<RegionProps> = ({ region, countryId }) => (
  <div>
    <h4 className="text-muted-foreground text-sm">{region.name}</h4>
    <div className="flex flex-wrap gap-2 text-xl leading-none">
      {region?.countries?.map(country => (
        <Country
          key={country.iso_2}
          country={country}
          isSelected={country.iso_2 === countryId}
          onSelect={() =>
            country.iso_2 ? countryIdStore.set(country.iso_2) : undefined
          }
        />
      ))}
    </div>
  </div>
)

type CountryProps = {
  country: RegionCountry
  isSelected?: boolean
  onSelect: VoidFunction
}

const Country: React.FC<CountryProps> = ({ country, isSelected, onSelect }) =>
  country.iso_2 ? (
    <button
      type="button"
      onClick={onSelect}
      className={cx(
        'shrink-0 cursor-pointer rounded-sm border px-1 shadow-sm',
        isSelected ? 'bg-primary' : 'border-border/50'
      )}
    >
      <ReactCountryFlag countryCode={country.iso_2} />
    </button>
  ) : null
