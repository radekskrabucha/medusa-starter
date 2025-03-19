import type { Region } from './models'

export const transformRegionCountriesToOptions = (region: Region) => {
  if (!region.countries) {
    return []
  }

  return region.countries.flatMap(country => {
    if (!country.display_name || !country.iso_2) {
      return []
    }

    return {
      label: country.display_name,
      value: country.iso_2
    }
  })
}
